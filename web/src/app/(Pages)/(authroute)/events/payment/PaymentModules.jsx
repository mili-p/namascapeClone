"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { asyncEventDetailsPayment } from "../../../../../../redux/Thunks/User/eventdetailspayment.thunk";
import { asyncBookEvent } from "../../../../../../redux/Thunks/User/bookevent.thunk";
import EventCardBox from "./EventCardBox";
import CreditCard from "./CreditCard";
import { sweetalert } from "@/app/components/common/Common";
import PaymentSideBar from "./PaymentSideBar";
import AttendeesModal from "@/app/components/SiteModal/AttendeesModal/AttendeesModal";
import { useRouter } from "next/navigation";
import SuccessModal from "@/app/components/SiteModal/SuccessModal/SuccessModal";
import PaymentErrorModal from "@/app/components/SiteModal/PaymentErrorModal/PaymentErrorModal";
import ErrorModal from "@/app/components/SiteModal/ErrorModal/ErrorModal";
import Paypal from "./Paypal";
import Twint from "./Twint";
import { getRedirectUrl } from "../../../../../utils/Redirect/redirect";
import TermsandConditionsModal from "@/app/components/SiteModal/TermsandConditionsModal/TermsandConditionsModal";
import {
  eventPaymentAdyanCreditCardThunk,
  eventPaymentStatusThunk,
} from "../../../../../../redux/Thunks/User/payment.adyan.thunk";
import { UserTermsAndConditionsViewThunk } from "../../../../../../redux/Thunks/User/TermsAndConditions/termsandconditions.thunk";
import AdyenCheckout from "@adyen/adyen-web";
import "@adyen/adyen-web/dist/adyen.css";
import H1 from "@/app/components/common/h1";
import Skeleton from "@/app/components/Skeleton/Skeleton";
import { useTranslation } from "react-i18next";
import { getCookie, deleteCookie } from "cookies-next";

const PaymentModules = ({ category, languageName, organizerId }) => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const paymentContainer = useRef(null);
  const router = useRouter();
  const { eventDetailsPayment, isLoading: detailLoader } = useSelector(
    (m) => m.eventdetailspayment
  );
  const {
    session,
    config,
    bookedEvent,
    isPaymentLoder,
    errorMessage: bookedErrormessage,
  } = useSelector((e) => e.creditCardSlice);
  const [openTandC, setOpenTandC] = useState(false);
  const search = useSearchParams();
  const eId = search.get("eId");
  // const cId = search.get("cId")
  const quantityForBook = search.get("qty") || 1;
  const redirectResult = search.get("redirectResult");
  const asAGift = search.get("gt");
  const showUserProfileInData = search.get("atd");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const EventData = eventDetailsPayment?.data?.eventData;
  const EventPrice = eventDetailsPayment?.data?.paymentDetails;
  const FreeEvents = Math.ceil(
    Number(eventDetailsPayment?.data?.paymentDetails?.subTotal)
  );
  // const attendessModelCookie = getCookie("attendees")
  const attendessModelCookie =
    typeof window !== "undefined" && localStorage.getItem("attendees");
  const { viewDataTandC } = useSelector((e) => e?.TermsandConditionsUserSlice);
  const [paymentMode, setPaymentMode] = useState("Credit Card");
  const [show, setshow] = useState(false);
  // const [showAttendeesModal, setShowAttendeesModal] = useState(false);
  const [paymentError, setPaymentError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  useEffect(() => {
    dispatch(
      asyncEventDetailsPayment({ eventId: eId, quantity: quantityForBook })
    );
  }, []);

  useEffect(() => {
    if (organizerId) {
      dispatch(UserTermsAndConditionsViewThunk({ userId: organizerId }));
    }
  }, [organizerId]);

  useEffect(() => {
    if (!!FreeEvents) {
      let obj = {};
      obj.eventId = eId;
      obj.quantity = quantityForBook;
      if (asAGift !== "null") {
        obj.asAGift = JSON.parse(asAGift);
      }
      obj.returnUrl = `${process.env.NEXT_PUBLIC_BASE_URL_REDIRECTION}/events/status/?id=${eId}&cId=${category}`
      // obj.showUserProfileInData = showUserProfileInData === "true" ? true : false

      dispatch(eventPaymentAdyanCreditCardThunk(obj));
    }
    // if (!attendessModelCookie) {
    //   setShowAttendeesModal(true);
    // }
  }, [FreeEvents]);

  const [first, setfirst] = useState(false);
  
  useEffect(() => {
    if (!isPaymentLoder) {
      setLoading(true);
      let ignore = false;
      let a;
      if (!session || !paymentContainer.current) {
        // initiateCheckout is not finished yet.
        return;
      }

      const createCheckout = async () => {
        const checkout = await AdyenCheckout({
          ...config,
          // paypalConfiguration,
          session,
          onPaymentCompleted: (response, _component, ...etc) => {
            setTimeout(() => {
              router.push(
                getRedirectUrl(
                  response?.resultCode,
                  EventData?.eventId,
                  category
                ),
                { replace: true }
              );
              setfirst(false);
            }, 12000);
            setfirst(true);
            // setStatus(response.resultCode)
          },

          onError: (error, _component, ...etc) => {
            if (error?.message) {
              setPaymentError(true);
              setErrorMessage(error?.message);
            }
            //   router.push(`/events/status?error="error"&er=${error.message}`, {
            //     replace: true,
            //   });
          },
        });

        if (paymentContainer.current && !ignore && !paymentError) {
          setLoading(false);
          checkout.create("dropin").mount(paymentContainer.current);
        }
      };

      createCheckout();
      // if (redirectResult) {
      //   // checkout.submitDetails({ details: { redirectResult: redirectResult } });
      //   dispatch(
      //     eventPaymentStatusThunk({
      //       details: { redirectResult: redirectResult },
      //     })
      //   );
      // }
      return () => {
        ignore = true;
      };
    }
  }, [session, config]);

  const CancelModal = () => {
    setshow(false);
    // setShowAttendeesModal(true)
    router.push(`/e-ticket?tId=${EventData?.eventId}&cId=${category}`);
    document.body.classList.remove("open-modal");
  };

  const OpenSuccessModal = () => {
    setShowAttendeesModal(true);
  };

  const AttendeesName = (show) => {
    const data = {
      eventId: EventData?.eventId,
      organizerId: EventData?.userId,
      eventPrice: EventPrice?.totalPrice,
      currency: EventData?.currency ? EventData?.currency : 0,
      paymentMethod: !FreeEvents && 1,
      amountPaid: EventPrice?.totalPrice,
      showUserProfileInData: show === "Yes" ? true : false,
      quantity: quantityForBook,
    };
    setShowAttendeesModal(false);
    dispatch(
      asyncBookEvent(data, () => {
        setshow(true);
        document.body.classList.add("open-modal");
      })
    );
  };

  const PaymentMode = () => {
    if (paymentMode === "Paypal") {
      return <Paypal EventData={EventData} EventPrice={EventPrice} />;
    } else if (paymentMode === "Credit Card") {
      return <CreditCard />;
    } else if (paymentMode === "Twint") {
      return <Twint />;
    }
  };

  return (
    <>
      {/* <div className="container"> */}

      {/* </div> */}

      {first ? (
        <div className="page-load">
          <div className="loader">
            <span className="loader-circle "></span>
            <span className="loader-text">
              {i18n.t(`payment.paymentProgressMesaage`)}
            </span>
          </div>
        </div>
      ) : (
        <>
          {(!!FreeEvents && isPaymentLoder) || (!FreeEvents && detailLoader) ? (
            <div className="page-load">
              <div className="loader">
                <span className="loader-circle "></span>
                <span className="loader-text">{i18n.t(`payment.Loading`)}</span>
              </div>
            </div>
          ) : (
            <div className="flex items-stretch justify-between flex-col md:flex-row web-setting-wrapper">
              <div className="web-setting-content payment-setting-content">
                <div className="flex items-center card-details ">
                  <>
                    {!!FreeEvents && (
                      <div className="payment-card-body">
                        <p className="policy-title">
                          {i18n.t(`payment.paymentrefundline`)}{" "}
                          <span
                            className="link"
                            onClick={() =>
                              Object.values(viewDataTandC)?.length > 0 &&
                              setOpenTandC(true)
                            }
                          >
                            {i18n.t(`payment.paymentrefundline1`)}
                          </span>{" "}
                          {i18n.t(`payment.paymentrefundline2`)}
                        </p>
                        <H1 className="h3 title">{i18n.t(`payment.title`)}</H1>
                        {!!FreeEvents && loading && (
                          <div className="flex items-center flex-col payment-card-skeleton">
                            <Skeleton
                              width={700}
                              height={418}
                              className="mb-4"
                            />
                            <Skeleton width={700} height={60} />
                          </div>
                        )}
                        <div
                          className="payment-card"
                          ref={paymentContainer}
                        ></div>
                      </div>
                    )}
                    <div
                      className={`w-full ${
                        !FreeEvents ? "freecard   " : "lg:w-1/2 3xl:w-2/5"
                      }`}
                    >
                      <EventCardBox
                        eventData={eventDetailsPayment?.data}
                        languageName={languageName}
                      />
                      {/* {!FreeEvents && (
                        <button
                          type="button"
                          className="solid-btn mt-32"
                          onClick={OpenSuccessModal}
                        >
                          {i18n.t(`payment.cnfBtn`)}
                        </button>
                      )} */}
                    </div>
                  </>
                </div>
              </div>
            </div>
          )}
          {openTandC && (
            <TermsandConditionsModal
              show={openTandC}
              title={i18n.t(`organizer.termsandconditions.heading`)}
              description={viewDataTandC?.termsAndConditions}
              CancelModal={() => setOpenTandC(false)}
              cancelBtn={i18n.t(`settings.deleteModal.cancleBtn`)}
            />
          )}

          <SuccessModal
            show={show}
            title={i18n.t(`payment.model.SuccessModal.title`)}
            description={i18n.t(`payment.model.SuccessModal.description`)}
            SolidBTNText={i18n.t(`payment.model.SuccessModal.SolidBTNText`)}
            CancelModal={() => {
              CancelModal();
            }}
          />
          {/* {!!FreeEvents && showAttendeesModal && (
            <AttendeesModal
              show={showAttendeesModal}
              setshow={setShowAttendeesModal}
              title={i18n.t(`payment.model.AttendeesModal.title`)}
              onClickCancleText={i18n.t(
                `payment.model.AttendeesModal.onClickCancleText`
              )}
              SolidBTNText={i18n.t(`payment.model.AttendeesModal.SolidBTNText`)}
              onClickCancle={
                () => {
                  router.push(
                    `/events/payment/?eId=${eId}&cId=${category}&qty=${quantityForBook}&gt=${asAGift}&atd=false`
                  );
                  setShowAttendeesModal(false);
                  // document.cookie = 'attendees="false";'
                  localStorage.setItem("attendees", "false");
                }
                // AttendeesName(
                //   i18n.t(`payment.model.AttendeesModal.onClickCancleText`)
                // )
              }
              onClickOK={
                () => {
                  router.push(
                    `/events/payment/?eId=${eId}&cId=${category}&qty=${quantityForBook}&gt=${asAGift}&atd=true`
                  );
                  setShowAttendeesModal(false);
                  // document.cookie = 'attendees="true";'
                  localStorage.setItem("attendees", "true");
                }
                // AttendeesName(
                //   i18n.t(`payment.model.AttendeesModal.SolidBTNText`)
                // )
              }
            />
          )} */}
          {paymentError && (
            <PaymentErrorModal
              show={paymentError}
              title={
                errorMessage
                  ? errorMessage
                  : i18n.t(`payment.model.PaymentErrorModal.title`)
              }
              // description={i18n.t(
              //   `payment.model.PaymentErrorModal.description`
              // )}
              SolidBTNText={i18n.t(
                `payment.model.PaymentErrorModal.SolidBTNText`
              )}
              CancelModal={() => {
                window.location.reload();
                setPaymentError(false);
                setErrorMessage(null);
              }}
            />
          )}
          {bookedEvent && (
            <ErrorModal
              show={bookedEvent}
              setshow={setshow}
              url={"/events/"}
              description={bookedErrormessage}
              //  CancelModal = {()=>{
              //      setshow(false)
              //      router.push('/events/')
              //     }}
            />
          )}
        </>
      )}
    </>
  );
};

export default PaymentModules;
