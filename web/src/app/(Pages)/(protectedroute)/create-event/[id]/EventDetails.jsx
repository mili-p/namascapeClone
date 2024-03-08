"use client";
import EventProviderList from "@/app/components/EventProviderList/EventProviderList";
import SiteBreadcrumb from "@/app/components/SiteBreadcrumb/SiteBreadcrumb";
import DeleteLogoutModal from "@/app/components/SiteModal/DeleteLogoutModal/DeleteLogoutModal";
import PageNotFound from "@/app/components/PageNotFound/PageNotFound";
import H2 from "@/app/components/common/h2";
import H3 from "@/app/components/common/h3";
import H4 from "@/app/components/common/h4";
import H5 from "@/app/components/common/h5";
import { sweetalert } from "@/app/components/common/Common";
import Image from "next/image";
import {
  OrgGetDate,
  OrgGetTime,
  OrgGetFullDate,
  TimeZoneMoment,
} from "@/utils/commonfn/Date_TimeTS/index";
// import { Currency, EventRecurrence } from "@/utils/commonfn";
import {
  EventCategoryFn,
  EventRecurrenceFn,
  CurrencyFn,
  languageListFn,
} from "@/i18n/i18nCM/i18CM";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEventThunk,
  viewEventThunk,
} from "../../../../../../redux/Thunks/Organizer/EventForm/event.thunk";
import { removeEventData } from "../../../../../../redux/slices/Organizer/EventManagement/EventManagementSlice";
import { notFound, useRouter } from "next/navigation";
// import { EventCategory, languageList } from "@/utils/commonfn";
import LightboxSlider from "@/app/components/LightboxSlider/LightboxSlider";
import Skeleton from "@/app/components/Skeleton/Skeleton";
import { useTranslation } from "react-i18next";
import { priceFormator } from "@/utils/commonfn/PriceCMFun/index";
// import EventPreview from "../EventPreview/EventPreview";

const EventDetails = ({ uniqueId, languageName }) => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const { eventData, isLoading, error } = useSelector(
    (e) => e.EventManagementSlice
  );

  /////////////////////////////////
  const EventRecurrence = EventRecurrenceFn(i18n);
  const Currency = CurrencyFn(i18n);
  const EventCategory = EventCategoryFn(i18n);
  const languageList = languageListFn(i18n);
  ///////////////////////////////////////////

  const router = useRouter();
  const [show, setshow] = useState(false);
  // const Currency = [
  //   { title: "$", id: 1, name: "USD" },
  //   { title: "₣", id: 2, name: "CHF" },
  //   { title: "€", id: 3, name: "EUR" },
  //   // { title: "Sponsored", id: 5 },
  // ];
  const BreadcrumbData = [
    {
      title: i18n.t(`organizer.event.eventmanagement.breadcrumb.home`),
      url: "/dashboard",
    },
    {
      title: i18n.t(
        `organizer.event.eventmanagement.breadcrumb.eventmanagement`
      ),
      url: "/event-management",
    },
    {
      title: i18n.t(`organizer.event.eventmanagement.breadcrumb.eventdetails`),
    },
  ];
  const StatusLable = [
    {
      title: i18n.t(
        `organizer.event.eventmanagement.protectedeventCard.inreview`
      ),
      class: "in-review",
      id: 1,
    },
    {
      title: i18n.t(
        `organizer.event.eventmanagement.protectedeventCard.active`
      ),
      class: "active",
      id: 2,
    },
    {
      title: i18n.t(
        `organizer.event.eventmanagement.protectedeventCard.rejected`
      ),
      class: "rejected",
      id: 3,
    },
  ];

  // const EventRecurrence = [
  //   { title: "Not Repeated", id: 1 },
  //   { title: "Every Day", id: 2 },
  //   { title: "Every Week", id: 3 },
  //   { title: "Every Month", id: 4 },
  //   // { title: "Customized", id: 5 },
  // ];
  const currency = Currency.find((e) => e?.id === eventData?.currency);
  const getDate = (data) => {
    // const dateObject = new Date(+data);
    // const formattedDate = dateObject.toLocaleString("en-US", {
    //   weekday: "short",
    //   month: "short",
    //   day: "numeric",
    // });
    // return formattedDate;
    const dateObject = new Date(+data);
    const day = dateObject.getDate().toString().padStart(2, "0");
    const month = dateObject.toLocaleString("en-US", { month: "short" });
    const year = dateObject.getFullYear();
    const formattedDate = `${day} ${month} ${year}`;
    return formattedDate;
  };

  const getTime = (data) => {
    const timeObject = new Date(+data);
    // Format time
    const hours = timeObject.getHours();
    const minutes = timeObject.getMinutes();
    // const formattedTime = `${hours % 12 || 12}:${
    //   minutes < 10 ? "0" : ""
    // }${minutes} ${hours < 12 ? "AM" : "PM"}`;
    const formattedTime = `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
    return formattedTime;
  };
  const duration = EventRecurrence.find((e) => e?.id === eventData?.duration);
  const eventRecurrence = duration
    ? i18n.t(
        `organizer.event.commonArray.EventRecurrence.option.${duration.id}`
      )
    : "";

  const eventcateogry = EventCategory.find(
    (e) => e?.id === eventData?.category
  );
  const EventListWrapper = [
    {
      icon: <i className="icon-calendar"></i>,
      title: (
        <>
          {eventData?.startTime &&
            `${OrgGetFullDate(eventData?.startTime, languageName)}`}
          {eventData?.endTime &&
            ` - ${OrgGetFullDate(eventData?.endTime, languageName)}`}
        </>
      ),
      subTitle: (
        <>
          {eventData?.startTime && eventData?.endTime
            ? `${OrgGetTime(eventData?.startTime)} - ${OrgGetTime(
                eventData?.endTime
              )} (${TimeZoneMoment()}) `
            : eventData?.startTime
            ? `${OrgGetTime(eventData?.startTime)} (${TimeZoneMoment()}) `
            : ""}
          {/* {eventData?.startTime &&
            `${OrgGetTime(eventData?.startTime)} ${TimeZoneMoment()}`}
          {eventData?.endTime &&
            ` - ${OrgGetTime(eventData?.endTime)} ${TimeZoneMoment()}`} */}
        </>
      ),
    },
    {
      icon: <i className="icon-location"></i>,
      title: eventData?.city
        ? `${eventData?.city?.name} , ${eventData?.venue}`
        : "Online Meet Link",
      subTitle: (
        <Link
          href={
            eventData?.googleMapsLink
              ? eventData?.googleMapsLink?.toLocaleString() || ""
              : eventData?.onlineMeetingLink?.toLocaleString() || ""
          }
          target="_blank"
        >
          {eventData?.googleMapsLink
            ? eventData?.googleMapsLink
            : eventData?.onlineMeetingLink}
        </Link>
      ),
    },
    {
      icon: <i className="icon-ticket"></i>,
      title: eventData?.price
        ? eventData?.currency !== 2
          ? `${currency?.name}${priceFormator(
              eventData?.price,
              i18n.language
            )} ${currency?.title}`
          : `${priceFormator(eventData?.price, i18n.language)} ${
              currency?.title
            }`
        : i18n.t("organizer.event.eventDetails.free"),
      subTitle: i18n.t(`organizer.event.eventDetails.pricePerTicket`),
    },
    // {
    //   icon: (
    //     <>
    //       <i className="icon-percentage"></i>
    //     </>
    //   ),
    //   title: `${
    //     eventData?.discount?.type === 2
    //       ? `${eventData?.discount?.discountValue}%`
    //       : `${eventData?.discount?.discountValue}${currency?.title}`
    //   } OFF`,
    //   subTitle: "Discount",
    // },
    {
      icon: (
        <>
          <i className="icon-language-square"></i>
        </>
      ),
      title: `${eventData?.language
        ?.map((e) => languageList?.[e])
        .join(" | ")}`,
      subTitle: i18n.t("organizer.event.eventDetails.eventlanguage"),
    },
    {
      icon: <i className="icon-calendar"></i>,
      title: eventRecurrence,
      subTitle: i18n.t("organizer.event.eventDetails.eventRecurrence"),
    },
  ];

  // const Filter =     && i18n.t('organizer.event.commonArray.EventRecurrence.option')
  //   Object.keys(eventData?.discount || {})?.length > 0
  //     ? EventListWrapper
  //     : EventListWrapper.splice(3, 1);
  !eventData?.onlineMeetingLink &&
    !eventData?.googleMapsLink &&
    EventListWrapper.splice(1, 1);

  !eventData?.startTime && !eventData?.endTime && EventListWrapper.shift();

  useEffect(() => {
    if (uniqueId) {
      dispatch(viewEventThunk({ eventId: uniqueId }));
    }
  }, [uniqueId]);

  useEffect(() => {
    return () => {
      dispatch(removeEventData());
    };
  }, []);

  const [PreviewModal, setPreviewModal] = useState(false);
  const [Modal, setModal] = useState(false);
  const [istrue, setistrue] = useState(true);
  return (
    <>
      <div className="protected-event-details">
        <SiteBreadcrumb
          BreadcrumbData={BreadcrumbData}
          className="protected-breadcrumb"
        />
        <div className="protected-head">
          <H2>
            {i18n.t(`organizer.event.eventmanagement.breadcrumb.eventdetails`)}
          </H2>
          {!error && eventData?.isUpcoming && (
            <div className="flex items-center flex-wrap card-action">
              {/* <div
                className="flex items-center link"
                onClick={()=>{setPreviewModal(true)}}
              >
                <i className="icon-delete"></i>Preview
              </div> */}
              <Link
                className="flex items-center link edit"
                href={{
                  pathname: "/create-event",
                  query: { uniqueId: eventData?.eventId },
                }}
              >
                <i className="icon-edit"></i>
                {i18n.t(
                  `organizer.event.eventmanagement.protectedeventCard.edit`
                )}
              </Link>
              <div
                className="flex items-center link delete"
                onClick={() => setshow(true)}
              >
                <i className="icon-delete"></i>
                {i18n.t(
                  `organizer.event.eventmanagement.protectedeventCard.delete`
                )}
              </div>
            </div>
          )}
          {/* <EventPreview setPreviewModal={setPreviewModal} PreviewModal={PreviewModal}/> */}
        </div>
        <div className="flex items-start flex-wrap bg-white mt-32 event-details-wrapper">
          {!eventData && !isLoading && error ? (
            <div className="data-not-found">
              {i18n.t("organizer.event.eventDetails.nodatafound")}
            </div>
          ) : (
            <>
              <div className="w-full md:w-1/2 xl:w-2/5 3xl:w-2/6 slider-wrapper">
                <div className="flex items-stretch flex-wrap slider-thumbnail">
                  {isLoading ? (
                    <>
                      {Array.from({ length: 4 }).map((_, j) => {
                        return (
                          <div
                            className="w-1/4 thumbnail-image skeleton-thumbnail"
                            key={j}
                          >
                            <Skeleton />
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      {eventData?.media?.map((image, i, er) => {
                        return (
                          <>
                            <div className="w-1/4 thumbnail-image" key={i}>
                              <Image
                                src={image?.imageUrl}
                                alt="slider-image"
                                width={452}
                                height={396}
                                onClick={() => {
                                  setModal(i + 1);
                                }}
                              />
                              {image?.type === "video" && (
                                <span
                                  className="flex items-center justify-center video-btn"
                                  onClick={() => {
                                    setModal(i + 1);
                                  }}
                                >
                                  <i className="icon-play-btn"></i>
                                </span>
                              )}
                              {i === 0 && (
                                <span className="badge">
                                  {eventcateogry?.title}
                                </span>
                              )}
                            </div>
                          </>
                        );
                      })}
                    </>
                  )}
                  {/* {istrue && eventData?.media?.length > 5 && (
                  <div
                    className="w-1/4 thumbnail-image"
                    onClick={() => {
                      setistrue(false);
                    }}
                  >
                    +
                  </div>
                )} */}

                  {Modal > 0 && (
                    <LightboxSlider
                      Modal={Modal}
                      setModal={setModal}
                      eventData={eventData?.media}
                    />
                  )}
                </div>
              </div>
              <div className="w-full md:w-1/2 xl:w-3/5 3xl:w-4/6 event-details-body">
                {isLoading ? (
                  <>
                    <ul className="flex items-center flex-wrap stock-list">
                      {Array.from({ length: 4 }).map((e, i) => {
                        return (
                          <>
                            <li className="w-1/2 xl:w-1/4" key={i}>
                              <div className="inner skeleton-inner">
                                <Skeleton
                                  width={40}
                                  height={40}
                                  className="mb-3"
                                />
                                <Skeleton width="100%" height={20} />
                              </div>
                            </li>
                          </>
                        );
                      })}
                    </ul>
                  </>
                ) : (
                  <>
                    <ul className="flex items-center flex-wrap stock-list">
                      {/* {eventData?.seats &&
                      Object.entries(eventData?.seats)?.map((e, i) => {
                        return (
                          <li className="w-1/2 xl:w-1/4" key={i}>
                            <div className="inner">
                              <H2 className="count">{e[1]}</H2>
                              <p>{e[0]}</p>
                            </div>
                          </li>
                        );
                      })} */}
                      <li className="w-1/2 xl:w-1/4">
                        <div className="inner">
                          <H2 className="count">
                            {eventData?.seats?.total || 0}
                          </H2>
                          <p>
                            {i18n.t(
                              "organizer.event.eventDetails.totalcapacity"
                            )}
                          </p>
                        </div>
                      </li>
                      <li className="w-1/2 xl:w-1/4">
                        <div className="inner">
                          <H2 className="count">
                            {eventData?.seats?.available || 0}
                          </H2>
                          <p>
                            {i18n.t("organizer.event.eventDetails.available")}
                          </p>
                        </div>
                      </li>
                      <li className="w-1/2 xl:w-1/4">
                        <div className="inner">
                          <H2 className="count">
                            {eventData?.seats?.sold || 0}
                          </H2>
                          <p>{i18n.t("organizer.event.eventDetails.sold")}</p>
                        </div>
                      </li>
                      <li className="w-1/2 xl:w-1/4">
                        <div className="inner">
                          <H2 className="count">
                            {eventData?.seats?.scanned || 0}
                          </H2>
                          <p>
                            {i18n.t("organizer.event.eventDetails.scanned")}
                          </p>
                        </div>
                      </li>
                    </ul>
                  </>
                )}
                {isLoading ? (
                  <>
                    {Array.from({ length: 2 }).map((e, i) => {
                      return (
                        <React.Fragment key={i}>
                          <Skeleton width={200} height={20} className="mb-3" />
                          <Skeleton width="100%" height={10} className="mb-1" />
                          <Skeleton width="100%" height={10} className="mb-1" />
                          <Skeleton width="100%" height={10} className="mb-1" />
                          <Skeleton width="50%" height={10} className="mb-4" />
                          <br />
                        </React.Fragment>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between flex-wrap status-head">
                      <div className="flex items-center flex-wrap card-action status-label">
                        {[1, 2].includes(eventData?.eventType) && (
                          <div className="link">
                            {eventData?.eventType === 1
                              ? i18n.t(
                                  `organizer.event.eventForm.inputs.EventType.EventTypeTitle2`
                                )
                              : eventData?.eventType === 2
                              ? i18n.t(
                                  `organizer.event.eventForm.inputs.EventType.EventTypeTitle1`
                                )
                              : // : eventData?.eventType === 3
                                // ? i18n.t(
                                //   `organizer.event.eventForm.inputs.EventType.EventTypeTitle3`
                                // )
                                // : eventData?.eventType === 4
                                // ? i18n.t(
                                //   `organizer.event.eventForm.inputs.EventType.EventTypeTitle4`
                                // )
                                ""}
                          </div>
                        )}

                        {StatusLable?.map((e, i) => {
                          return (
                            <>
                              {e?.id === eventData?.status && (
                                <H4 className={`text ${e?.class}`} key={i}>
                                  {e?.title}{" "}
                                </H4>
                              )}
                            </>
                          );
                        })}
                      </div>

                      {eventData?.isSponsored && (
                        <div class="flex items-center flex-wrap action-btn-group">
                          <button
                            type="button"
                            class="flex items-center gap-1 action-btn sponser-remove-btn"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="14"
                              width="16"
                              viewBox="0 0 576 512"
                            >
                              <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                            </svg>
                            {i18n.t(
                              `organizer.event.eventForm.inputs.EventType.isSponsored`
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                    <H3 className="title">{eventData?.title}</H3>
                    {eventData?.description && (
                      <>
                        <span className="event-caption">
                          {i18n.t(
                            `organizer.event.eventDetails.descriptionInEnglish`
                          )}
                        </span>
                        <pre className="description">
                          {eventData?.description}{" "}
                        </pre>
                      </>
                    )}
                    {eventData?.descriptionDe && (
                      <>
                        <span className="event-caption">
                          {i18n.t(
                            `organizer.event.eventDetails.descriptionInGerman`
                          )}
                        </span>
                        <pre className="description">
                          {eventData?.descriptionDe}
                        </pre>
                      </>
                    )}
                  </>
                )}
                {isLoading ? (
                  <>
                    <ul className="flex items-center flex-wrap event-list-wrapper">
                      {Array.from({ length: 4 }).map((e, i) => {
                        return (
                          <>
                            <li
                              className="flex items-center w-full xl:w-1/2"
                              key={i}
                            >
                              <span className="inline-flex items-center justify-center icon">
                                <Skeleton
                                  className="circle"
                                  width="100%"
                                  height="100%"
                                />
                              </span>
                              <div style={{ width: "100%" }}>
                                <Skeleton
                                  width={200}
                                  height={20}
                                  className="mb-2"
                                />
                                <br />
                                <Skeleton width={200} height={10} />
                              </div>
                            </li>
                          </>
                        );
                      })}
                    </ul>
                  </>
                ) : (
                  <>
                    <EventProviderList
                      EventListWrapper={
                        [1, 2, 4].includes(eventcateogry?.id)
                          ? EventListWrapper
                          : EventListWrapper.slice(0, 2)
                      }
                      eventData={eventData}
                    />
                  </>
                )}
              </div>
            </>
          )}
        </div>
        {show && (
          <DeleteLogoutModal
            show={show}
            setshow={setshow}
            title={
              i18n.t(`organizer.event.eventDetails.deleteEvent`)
              // <>
              //   are you sure you want to <br /> delete this event? deleteBTN
              // </>
            }
            IconclassName={"icon-delete"}
            SolidBTNText={i18n.t(`organizer.event.eventDetails.deleteBTN`)}
            onClickCancle={() => setshow(false)}
            onClickOK={() => {
              if (eventData?.canBeDeleted) {
                dispatch(
                  deleteEventThunk({ eventId: uniqueId }, () => {
                    setshow(false);
                    router.push("/event-management");
                  })
                );
              } else {
                setshow(false);
                sweetalert({
                  message: i18n.t(`organizer.event.sweetdeleteMessage.title`),
                  type: "error",
                });
              }
            }}
          />
        )}
      </div>
    </>
  );
};

export default EventDetails;
