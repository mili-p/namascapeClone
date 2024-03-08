import React, { useEffect } from "react";
import SiteBreadcrumb from "../../../components/SiteBreadcrumb/SiteBreadcrumb";
import {
  eventdetails,
  eventmanagement,
  home,
} from "../../../config/routeConsts";
import MyAccountUser from "../../../assets/images//myaccount-user-image.png";
import QRCode from "../../../assets/images//QR-code.png";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncbookingViewThunk } from "../../../redux/thunk/bookingThunk/booking.thunk";
import {
  Currency,
  EVENTCATEGORY,
  PAYMENTMETHODS,
} from "../../../common/constsforCodes";
import {
    OrgGetDate,
  OrgGetTime,
  priceFormator,
  timeDifference2,
  timeDifference3,
} from "../../../functions/functions";

const EventUserDetails = () => {
  const { eventBookingId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { booking, isLoading } = useSelector((e) => e.booking);

  //#region Route Breadcrum
  const BreadcrumbData = [
    {
      title: "Home",
      url: home,
    },
    {
      title: "Experience Management",
      url: eventmanagement,
    },
    // {
    //     title: 'Event Details',
    //     url:  eventdetails
    // },
    {
      title: "User Details",
    },
  ];
  //#endregion

  useEffect(() => {
    if (!eventBookingId) {
      navigate(bookingsmanagement);
    } else {
      dispatch(asyncbookingViewThunk({ eventBookingId: eventBookingId }));
    }
  }, []);

  //#region Consts Objs
  const eventcateogry = EVENTCATEGORY.find(
    (e) => e?.id === booking?.data?.eventDetails?.category
  );
  const paymentMethod = PAYMENTMETHODS.find(
    (e) => e?.id === booking?.data?.paymentMethod
  );
  const Paymentcurrency = Currency.find(
    (e) => e?.id === booking?.data?.currency
  );
  //#endregion

  return (
    <>
      <div className="event-user-details">
        <SiteBreadcrumb
          BreadcrumbData={BreadcrumbData}
          className="protected-breadcrumb"
        />
        <div className="protected-head">
          <h2>User details</h2>
        </div>
        <div className="bg-white user-details-card mt-32">
          <div className="booking-details-inner">
            <div className="flex items-center justify-between booking-user-head">
              <div>
                <div className="users-image flex items-start justify-center">
                  <img
                    src={
                      booking?.data?.userDetails?.profileImage ?? MyAccountUser
                    }
                  />
                </div>
                <h3>
                  {" "}
                  {booking?.data?.userDetails?.firstName}{" "}
                  {booking?.data?.userDetails?.lastName}
                </h3>
                <p>{booking?.data?.userDetails?.email}</p>
              </div>
              <div className="qr-code">
                <img src={booking?.data?.qrcode} width={153} height={153} />
              </div>
            </div>
            <ul className="user-content-list">
              <li>
                <div className="label-name">Booking ID</div>
                <h4>{booking?.data?.bookingId}</h4>
              </li>
              <li>
                <div className="label-name">Payment Method</div>
                <h4>{paymentMethod?.title}</h4>
              </li>
              <li>
                <div className="label-name">Booking Date and Time</div>
                <h4>
                {booking?.data?.bookingTime
                    ? `${OrgGetDate(
                        Number(booking?.data?.bookingTime)
                      )}, ${OrgGetTime(Number(booking?.data?.bookingTime))}`
                    : ""}
                    {/* {timeDifference3(booking?.data?.bookingTime)} */}
                </h4>
              </li>
              <li>
                <div className="label-name">Experience Price</div>
                <h4>
                  {booking?.data?.eventPrice == 0
                    ? "Free"
                    : booking?.data?.eventPrice > 0
                    ? `${
                        Paymentcurrency?.name === "CHF"
                          ? " "
                          : Paymentcurrency?.title
                      }` +
                      "" +
                      priceFormator(booking?.data?.eventPrice) +
                      " " +
                      Paymentcurrency?.name
                    : "-"}{" "}
                </h4>
              </li>
              <li>
                <div className="label-name">Discount Amount</div>
                <h4>
                  {booking?.data?.isFree == true ? (
                    0
                  ) : booking?.data?.discountType == 2 ? (
                    <>{`${userBooking?.data?.paymentDetails?.discountAmount} %`}</>
                  ) : booking?.data?.discountAmount ? (
                    Paymentcurrency?.title + "" + booking?.data?.discountAmount
                  ) : (
                    0
                  )}
                </h4>
              </li>
              {console.log(booking?.data?.amountPaid,"booking?.data?.amountPaid")}
              {!!booking?.data?.amountPaid && (
              <li>
                <div className="label-name">Amount Paid</div>
                <h4>
                  {booking?.data?.amountPaid == 0
                    ? "-"
                    : `${
                        Paymentcurrency?.name === "CHF"
                          ? " "
                          : Paymentcurrency?.title
                      }` +
                      "" +
                      booking?.data?.amountPaid +
                      " " +
                      Paymentcurrency?.name}
                </h4>
              </li>
              )}
            </ul>
            <ul className="user-content-list">
              <li>
                <div className="label-name">Experience</div>
                <h4>{booking?.data?.eventDetails?.title}</h4>
              </li>
              {/* <li>
                <div className="label-name">Experience Location</div>
                <h4>
                  {booking?.data?.eventDetails?.eventType == 2
                    ? booking?.data?.eventDetails?.venue +
                      " " +
                      booking?.data?.eventDetails?.city?.name
                    : [3, 4].includes(booking?.data?.eventDetails?.eventType)
                    ? "-"
                    : booking?.data?.eventDetails?.onlineMeetingLink}
                </h4>
              </li> */}
               {(booking?.data?.eventDetails?.onlineMeetingLink ||
                booking?.data?.eventDetails?.city?.name) && (
                <li>
                  <div className="label-name">
                    {booking?.data?.eventDetails?.onlineMeetingLink
                      ? "Online Link"
                      : "Experience Location"}
                  </div>
                  <h4>
                    {booking?.data?.eventDetails?.venue &&
                      `${booking?.data?.eventDetails?.venue} - ${booking?.data?.eventDetails?.city?.name}`}
                    {(booking?.data?.eventDetails?.onlineMeetingLink ||
                      booking?.data?.eventDetails?.googleMapsLink) && (
                      <Link
                        to={
                          booking?.data?.eventDetails?.onlineMeetingLink
                            ? booking?.data?.eventDetails?.onlineMeetingLink
                            : booking?.data?.eventDetails?.googleMapsLink
                        }
                        target="_blank"
                      >
                        {booking?.data?.eventDetails?.onlineMeetingLink
                          ? booking?.data?.eventDetails?.onlineMeetingLink
                          : booking?.data?.eventDetails?.googleMapsLink}
                      </Link>
                    )}

                    {/* {booking?.data?.eventDetails?.eventType == 2
                      ? booking?.data?.eventDetails?.venue +
                        " " +
                        booking?.data?.eventDetails?.city?.name
                      : [3, 4].includes(booking?.data?.eventDetails?.eventType)
                      ? "-"
                      : booking?.data?.eventDetails?.onlineMeetingLink} */}
                  </h4>
                </li>
              )}
              {(booking?.data?.eventDetails?.startTime || booking?.data?.eventDetails?.endTime) && (
              <li>
                <div className="label-name">Experience Date and Time</div>
                <h4>
                  {booking?.data?.eventDetails?.startTime &&
                  booking?.data?.eventDetails?.endTime
                    ? `${OrgGetDate(
                        Number(booking?.data?.eventDetails?.startTime)
                      )}, ${OrgGetTime(
                        Number(booking?.data?.eventDetails?.startTime)
                      )} - ${OrgGetDate(
                        Number(booking?.data?.eventDetails?.endTime)
                      )}, ${OrgGetTime(
                        Number(booking?.data?.eventDetails?.endTime)
                      )}`
                    : booking?.data?.eventDetails?.startTime
                    ? `${OrgGetDate(
                        Number(booking?.data?.eventDetails?.startTime)
                      )}, ${OrgGetTime(
                        Number(booking?.data?.eventDetails?.startTime)
                      )}`
                    : ""}
                  {/* {booking?.data?.eventDetails?.category ===
                                        3 ||
                                    booking?.data?.eventDetails?.category ===
                                        7 ||
                                    booking?.data?.eventDetails?.category === 8
                                        ? '-'
                                        : timeDifference3(
                                              booking?.data?.eventDetails
                                                  ?.startTime
                                          )} */}
                </h4>
              </li>
              )}
              <li>
                <div className="label-name">Experience Category</div>
                <h4>{eventcateogry?.title}</h4>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventUserDetails;
