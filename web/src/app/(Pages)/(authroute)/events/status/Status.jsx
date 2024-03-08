"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import H1 from "../../../../components/common/h1";
import "./status.scss";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import AttendeesModal from "@/app/components/SiteModal/AttendeesModal/AttendeesModal";
import { useDispatch, useSelector } from "react-redux";
import { AttendessAcceptDeclineThunk } from "../../../../../../redux/Thunks/User/AttendessAcceptDecline/AttendessAcceptDecline.thunk";
import { eventPaymentStatusThunk } from "../../../../../../redux/Thunks/User/payment.adyan.thunk";

const Status = () => {
  const { i18n } = useTranslation();
  const params = useSearchParams();
  const status = params.get("st");
  const category = params.get("cId");
  const redirectResult = params.get("redirectResult");
  const id = params.get("id");
  const router = useRouter();
  const dispatch = useDispatch();
  console.log(status, "STATTATTATAT", id);

  const { statusLoader, statusDetail } = useSelector((e) => e?.creditCardSlice);
  console.log(statusDetail, "statusDetail");
  const [webHookLoader, setWebHookLoader] = useState(false);
  const commonErrorArray = ["error", "failed"];
  const statusErrorDetails = ["Error", "Refused", "Cancelled"];
  const statusSuccessDetails = ["Authorised"];
  const commonSuccessArray = ["success", "pending"];
  const attendessModelCookie =
    typeof window !== "undefined" && localStorage.getItem("attendees");
  const [showAttendeesModal, setShowAttendeesModal] = useState(false);

  useEffect(() => {
    console.log(
      !attendessModelCookie && statusDetail?.resultCode !== "Error",
      "HELLO",
      statusDetail?.resultCode
    );

    // if(statusDetail?.resultCode !== "Error" && !attendessModelCookie){
    //   setShowAttendeesModal(true);
    // }
    // if (!attendessModelCookie && (status !== "failed" || status !== "error" || statusDetail?.resultCode !== "Error")) {
    //   setShowAttendeesModal(true);
    // }
  }, []);

  useEffect(() => {
    if (!!redirectResult) {
      dispatch(
        eventPaymentStatusThunk({
          details: { redirectResult: redirectResult },
        })
      );
    }
  }, [redirectResult]);

  useEffect(() => {
    if (!id) {
      router.push("/events/");
    }
  }, [id]);

  useEffect(() => {
    return () => {
      localStorage.removeItem("attendees");
    };
  }, []);

  return (
    <>
      {statusLoader && (
        <div className="h-screen page-load logout-loader">
          <div className="h-screen justify-center loader">
            <span className="loader-circle "></span>
            <span className="loader-text">{i18n.t(`payment.Loading`)}...</span>
          </div>
        </div>
      )}
      {console.log(webHookLoader, "webHookLoaderwebHookLoader")}
      {webHookLoader && (
        <div className="h-screen page-load logout-loader">
          <div className="h-screen justify-center loader">
            <span className="loader-circle "></span>
            <span className="loader-text">{i18n.t(`payment.Loading`)}...</span>
          </div>
        </div>
      )}
      <section className="payment-success pt-120 pb-120">
        <div className="container">
          {(status === "success" ||
            status === "pending" ||
            statusSuccessDetails?.includes(statusDetail?.resultCode)) && (
            <Image
              src="/assets/images/successfully-icon.svg"
              width={100}
              height={100}
            />
          )}
          {(status === "failed" ||
            status === "error" ||
            statusErrorDetails?.includes(statusDetail?.resultCode)) && (
            <Image
              src="/assets/images/icon-error.svg"
              width={100}
              height={100}
            />
          )}
          {/* icon-error */}
          {(status === "success" ||
            status === "pending" ||
            statusSuccessDetails?.includes(statusDetail?.resultCode)) && (
            <H1 className="title">{i18n.t(`payment.status.title`)}</H1>
          )}
          {(status === "failed" ||
            status === "error" ||
            statusErrorDetails?.includes(statusDetail?.resultCode)) && (
            <p>{i18n.t(`payment.status.error`)}</p>
          )}
          {(status === "success" ||
            status === "pending" ||
            statusSuccessDetails?.includes(statusDetail?.resultCode)) && (
            <p> {i18n.t(`payment.status.success`)}</p>
          )}

          {/* <Link
            href={id ? `/e-ticket?tId=${id}&cId=${category}` : "/"}
            className="solid-btn"
          >
            {i18n.t(`payment.status.btn`)}
          </Link> */}
          <button
            className="solid-btn"
            onClick={() => {
              if (
                statusDetail?.resultCode === "Error" ||
                commonErrorArray?.includes(status) ||
                statusErrorDetails?.includes(statusDetail?.resultCode)
              ) {
                router.push("/events");
              }
              if (
                commonSuccessArray?.includes(status) ||
                statusSuccessDetails?.includes(statusDetail?.resultCode)
              ) {
                setShowAttendeesModal(true);
              }
            }}
          >
            {i18n.t(`payment.status.btn`)}
          </button>
        </div>
      </section>
      {/* {(status === "success" || status === "pending") && showAttendeesModal && ( */}
      <AttendeesModal
        show={showAttendeesModal}
        setshow={setShowAttendeesModal}
        title={i18n.t(`payment.model.AttendeesModal.title`)}
        onClickCancleText={i18n.t(
          `payment.model.AttendeesModal.onClickCancleText`
        )}
        SolidBTNText={i18n.t(`payment.model.AttendeesModal.SolidBTNText`)}
        onClickCancle={() => {
          // localStorage.setItem("attendees", "false");
          setWebHookLoader(true);
          setTimeout(() => {
            dispatch(
              AttendessAcceptDeclineThunk(
                {
                  eventId: id,
                  showUserProfileInData: false,
                },
                () => {
                  setShowAttendeesModal(false);
                  router.push(`/e-ticket?tId=${id}&cId=${category}`);
                }
              )
            );
            setWebHookLoader(false);
          }, 7000);
        }}
        onClickOK={() => {
          // localStorage.setItem("attendees", "true");
          setWebHookLoader(true);
          setTimeout(() => {
            dispatch(
              AttendessAcceptDeclineThunk(
                {
                  eventId: id,
                  showUserProfileInData: true,
                },
                () => {
                  setShowAttendeesModal(false);
                  router.push(`/e-ticket?tId=${id}&cId=${category}`);
                }
              )
            );
            setWebHookLoader(false);
          }, 7000);
        }}
      />
      {/* )} */}
    </>
  );
};

export default Status;
