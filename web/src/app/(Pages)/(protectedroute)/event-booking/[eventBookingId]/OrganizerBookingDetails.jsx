"use client";
import SiteBreadcrumb from "@/app/components/SiteBreadcrumb/SiteBreadcrumb";
import H2 from "@/app/components/common/h2";
import H4 from "@/app/components/common/h4";
import React, { useEffect } from "react";
import Image from "next/image";
import H3 from "@/app/components/common/h3";
import { priceFormator } from "@/utils/commonfn/PriceCMFun/index";
import {
  EventBookingTimeStamp,
  // PaymentMethods,
  // EventCategory,
  // Currency,
} from "@/utils/commonfn";
import {
  EventCategoryFn,
  CurrencyFn,
  PaymentMethodsFn,
} from "@/i18n/i18nCM/i18CM";
import { useDispatch, useSelector } from "react-redux";
import { EventBookingViewThunk } from "../../../../../../redux/Thunks/Organizer/EventBooking/eventBooking.thunk";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import Skeleton from "@/app/components/Skeleton/Skeleton";
import { OrgGetDate, OrgGetTime } from "@/utils/commonfn/Date_TimeTS/index";

const OrganizerBookingDetails = ({ eventBookingId, languageName }) => {
  const { i18n } = useTranslation();

  /////////////////////////////////
  const Currency = CurrencyFn(i18n);
  const EventCategory = EventCategoryFn(i18n);
  ///////////////////////////////////////////
  const dispatch = useDispatch();
  const PaymentMethods = PaymentMethodsFn(i18n);
  const { eventBookingView, isLoading } = useSelector(
    (e) => e.EventBookingSlice
  );
  const PaymentType = PaymentMethods?.find(
    (e) => e?.id === eventBookingView?.paymentMethod
  );
  const category = EventCategory?.find(
    (e) => e?.id === eventBookingView?.eventDetails?.category
  );
  const currency = Currency?.find((e) => e?.id === eventBookingView?.currency);
  const BreadcrumbData = [
    {
      title: i18n.t(`organizer.eventBooking.breadCrumb.home`),
      url: "/dashboard/",
    },
    {
      title: i18n.t(`organizer.eventBooking.breadCrumb.eventBookings`),
      url: "/event-booking/",
    },
    {
      title: i18n.t(`organizer.eventBooking.breadCrumb.bookingDetails`),
    },
  ];

  useEffect(() => {
    dispatch(
      EventBookingViewThunk({
        eventBookingId: eventBookingId,
      })
    );
  }, []);

  return (
    <div className="booking-details">
      <SiteBreadcrumb
        BreadcrumbData={BreadcrumbData}
        className="protected-breadcrumb"
      />
      <div className="protected-head">
        <H2>{i18n.t(`organizer.eventBooking.breadCrumb.bookingDetails`)}</H2>
      </div>
      <div className="bg-white booking-details-card mt-32">
        {isLoading ? (
          <div className="booking-details-inner">
            <div className="flex items-center justify-between booking-user-head">
              <div>
                <div className="users-image flex items-start justify-center">
                  <Skeleton className="circle" width="100%" height="100%" />
                </div>
                <Skeleton width="100%" height={20} />
                <Skeleton width="100%" height={10} />
              </div>
              <div className="qr-code" style={{ width: "153px" }}>
                <Skeleton width={153} height={153} />
              </div>
            </div>
            <ul className="user-content-list">
              <li>
                <div className="label-name">
                  {i18n.t(`organizer.eventBooking.bookingDetailCard.BookingID`)}
                </div>
                <Skeleton width={200} height={15} />
              </li>
              <li>
                <div className="label-name">
                  {i18n.t(
                    `organizer.eventBooking.bookingDetailCard.PaymentMethod`
                  )}
                </div>
                <Skeleton width={200} height={15} />
              </li>
              <li>
                <div className="label-name">
                  {i18n.t(
                    `organizer.eventBooking.bookingDetailCard.BookingDateandTime`
                  )}
                </div>
                <Skeleton width={200} height={15} />
              </li>
              <li>
                <div className="label-name">
                  {i18n.t(
                    `organizer.eventBooking.bookingDetailCard.EventPrice`
                  )}
                </div>
                <Skeleton width={200} height={15} />
              </li>
              {eventBookingView?.eventPrice > 0 && (
                <>
                  <li>
                    <div className="label-name">
                      {i18n.t(
                        `organizer.eventBooking.bookingDetailCard.DiscountAmount`
                      )}
                    </div>
                    <Skeleton width={200} height={15} />
                  </li>
                  <li>
                    <div className="label-name">
                      {i18n.t(
                        `organizer.eventBooking.bookingDetailCard.AmountPaid`
                      )}
                    </div>
                    <Skeleton width={200} height={15} />
                  </li>
                </>
              )}
            </ul>
            <ul className="user-content-list">
              <li>
                <div className="label-name">
                  {i18n.t(`organizer.eventBooking.bookingDetailCard.Event`)}
                </div>
                <Skeleton width={200} height={15} />
              </li>
              {(eventBookingView?.eventDetails?.onlineMeetingLink ||
                eventBookingView?.eventDetails?.googleMapsLink) && (
                <li>
                  <div className="label-name">
                    {i18n.t(
                      `organizer.eventBooking.bookingDetailCard.EventLocation`
                    )}
                  </div>
                  <Skeleton width={200} height={15} />
                </li>
              )}

              {(eventBookingView?.eventDetails?.startTime ||
                eventBookingView?.eventDetails?.endTime) && (
                <li>
                  <div className="label-name">
                    {i18n.t(
                      `organizer.eventBooking.bookingDetailCard.EventDateandTime`
                    )}
                  </div>
                  <Skeleton width={200} height={15} />
                </li>
              )}
              <li>
                <div className="label-name">
                  {i18n.t(
                    `organizer.eventBooking.bookingDetailCard.EventCategory`
                  )}
                </div>
                <Skeleton width={200} height={15} />
              </li>
            </ul>
          </div>
        ) : (
          <div className="booking-details-inner">
            <div className="flex items-center justify-between booking-user-head">
              <div>
                <div className="users-image flex items-start justify-center">
                  <Image
                    src={eventBookingView?.userDetails?.profileImage || ""}
                    width={100}
                    height={100}
                  />
                </div>
                <H3>{`${eventBookingView?.userDetails?.firstName} ${eventBookingView?.userDetails?.lastName}`}</H3>
                <p>{eventBookingView?.userDetails?.email}</p>
              </div>
              <div className="qr-code">
                <Image
                  src={eventBookingView?.qrcode || ""}
                  width={153}
                  height={153}
                />
              </div>
            </div>
            <ul className="user-content-list">
              <li>
                <div className="label-name">
                  {i18n.t(`organizer.eventBooking.bookingDetailCard.BookingID`)}
                </div>
                <H4>{eventBookingView?.bookingId}</H4>
              </li>
              <li>
                <div className="label-name">
                  {i18n.t(
                    `organizer.eventBooking.bookingDetailCard.PaymentMethod`
                  )}
                </div>
                <p>{PaymentType?.title}</p>
              </li>
              <li>
                <div className="label-name">
                  {i18n.t(
                    `organizer.eventBooking.bookingDetailCard.experienceQty`
                  )}
                </div>
                <H4>{eventBookingView?.quantity}</H4>
              </li>
              {/* <li>
                <div className="label-name">
                  {i18n.t(
                    `organizer.eventBooking.bookingDetailCard.BookingDateandTime`
                  )}
                </div>
                <H4>
                  {eventBookingView?.bookingTime
                    ? `${OrgGetDate(
                        Number(eventBookingView?.bookingTime,languageName),
                        languageName
                      )}, ${OrgGetTime(Number(eventBookingView?.bookingTime))}`
                    : ""}
                </H4>
              </li> */}
              <li>
                <div className="label-name">
                  {i18n.t(
                    `organizer.eventBooking.bookingDetailCard.EventPrice`
                  )}
                </div>
                {eventBookingView?.eventPrice > 0 && (
                  <>
                    <H4>
                      {/* {eventBookingView?.eventPrice > 0 && ( */}
                      <i
                        className={
                          currency?.id === 1
                            ? "icon-USD"
                            : currency?.id === 2
                            ? "" //////// "icon-CHF"
                            : currency?.id === 3
                            ? "icon-EUR"
                            : ""
                        }
                      ></i>
                      {/* )} */}
                      {/* {eventBookingView?.eventPrice > 0 ?  */}
                      {`${priceFormator(
                        eventBookingView?.eventPrice,
                        i18n?.language
                      )} ${currency?.title}`}
                      {/* // : i18n.t(`organizer.eventBooking.PaymentMethodsFn.free1`)} */}
                    </H4>
                  </>
                )}
                {eventBookingView?.eventPrice === 0 && (
                  <p>
                    {i18n.t(`organizer.eventBooking.PaymentMethodsFn.free1`)}
                  </p>
                )}
              </li>
              {eventBookingView?.eventPrice > 0 && (
                <>
                  <li>
                    <div className="label-name">
                      {i18n.t(
                        `organizer.eventBooking.bookingDetailCard.DiscountAmount`
                      )}
                    </div>
                    <H4>
                      {priceFormator(
                        eventBookingView?.discoutAmount,
                        i18n?.language
                      )}
                    </H4>
                  </li>
                  <li>
                    <div className="label-name">
                      {i18n.t(
                        `organizer.eventBooking.bookingDetailCard.AmountPaid`
                      )}
                    </div>
                    <H4>
                      <>
                        {eventBookingView?.amountPaid > 0 && (
                          <i
                            className={
                              currency?.id === 1
                                ? "icon-USD"
                                : currency?.id === 2
                                ? "" ////////////  "icon-CHF"
                                : currency?.id === 3
                                ? "icon-EUR"
                                : ""
                            }
                          ></i>
                        )}
                        {eventBookingView?.amountPaid > 0
                          ? `${priceFormator(
                              eventBookingView?.amountPaid,
                              i18n?.language
                            )} ${currency?.title}`
                          : i18n.t(
                              "organizer.eventBooking.PaymentMethodsFn.free"
                            )}
                      </>
                    </H4>
                  </li>
                </>
              )}
              <li>
                <div className="label-name">
                  {i18n.t(
                    `organizer.eventBooking.bookingDetailCard.BookingDateandTime`
                  )}
                </div>
                <H4>
                  {eventBookingView?.bookingTime
                    ? `${OrgGetDate(
                        Number(eventBookingView?.bookingTime, languageName),
                        languageName
                      )}, ${OrgGetTime(Number(eventBookingView?.bookingTime))}`
                    : ""}
                </H4>
              </li>
              {/* <li>
                    <div className="label-name">
                        {i18n.t(
                        `organizer.eventBooking.bookingDetailCard.experienceQty`
                        )}
                    </div>
                    <H4>{eventBookingView?.quantity}</H4>
                </li> */}
            </ul>
            <ul className="user-content-list">
              <li>
                <div className="label-name">
                  {i18n.t(`organizer.eventBooking.bookingDetailCard.Event`)}
                </div>
                <p>{eventBookingView?.eventDetails?.title}</p>
              </li>
              {(eventBookingView?.eventDetails?.onlineMeetingLink ||
                eventBookingView?.eventDetails?.googleMapsLink) && (
                <li>
                  <div className="label-name">
                    {eventBookingView?.eventDetails?.googleMapsLink
                      ? i18n.t(
                          `organizer.eventBooking.bookingDetailCard.EventLocation`
                        )
                      : i18n.t(
                          `organizer.eventBooking.bookingDetailCard.onlineLink`
                        )}
                  </div>
                  {eventBookingView?.eventDetails?.googleMapsLink && (
                  <p>
                    {/* {eventBookingView?.eventDetails?.city?.name && ( */}
                    <>
                      {eventBookingView?.eventDetails?.city?.name && (
                        <Link
                          target="_blank"
                          href={
                            eventBookingView?.eventDetails?.googleMapsLink ||
                            "/"
                          }
                        >
                          {`${eventBookingView?.eventDetails?.city?.name}, ${eventBookingView?.eventDetails?.venue}`}
                        </Link>
                      )}

                      {/* <span>
                          {eventBookingView?.eventDetails?.city?.name},
                        </span>
                        <span>{eventBookingView?.eventDetails?.venue}</span> */}
                    </>
                    {/* )} */}
                  </p>
                  )}
                  {eventBookingView?.eventDetails?.onlineMeetingLink && (
                    <Link
                      target="_blank"
                      href={
                        eventBookingView?.eventDetails?.onlineMeetingLink
                          ? eventBookingView?.eventDetails?.onlineMeetingLink
                          : "/"
                      }
                    >
                      {eventBookingView?.eventDetails?.onlineMeetingLink}
                    </Link>
                  )}
                  {/* <Link
                      target="_blank"
                      href={
                        eventBookingView?.eventDetails?.onlineMeetingLink
                          ? eventBookingView?.eventDetails?.onlineMeetingLink
                          : eventBookingView?.eventDetails?.googleMapsLink || ""
                      }
                    >
                      {eventBookingView?.eventDetails?.onlineMeetingLink
                        ? eventBookingView?.eventDetails?.onlineMeetingLink
                        : eventBookingView?.eventDetails?.googleMapsLink}
                    </Link> */}
                </li>
              )}

              {(eventBookingView?.eventDetails?.startTime ||
                eventBookingView?.eventDetails?.endTime) && (
                <li>
                  <div className="label-name">
                    {i18n.t(
                      `organizer.eventBooking.bookingDetailCard.EventDateandTime`
                    )}
                  </div>
                  <H4>
                    {eventBookingView?.eventDetails?.startTime
                      ? `${OrgGetDate(
                          Number(
                            eventBookingView?.eventDetails?.startTime,
                            languageName
                          ),
                          languageName
                        )}, ${OrgGetTime(
                          Number(eventBookingView?.eventDetails?.startTime)
                        )}`
                      : ""}{" "}
                    {" - "}
                    {eventBookingView?.eventDetails?.endTime
                      ? `${OrgGetDate(
                          Number(
                            eventBookingView?.eventDetails?.endTime,
                            languageName
                          ),
                          languageName
                        )}, ${OrgGetTime(
                          Number(eventBookingView?.eventDetails?.endTime)
                        )}`
                      : ""}
                  </H4>
                </li>
              )}
              <li>
                <div className="label-name">
                  {i18n.t(
                    `organizer.eventBooking.bookingDetailCard.EventCategory`
                  )}
                </div>
                <p>{category?.title}</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrganizerBookingDetails;
