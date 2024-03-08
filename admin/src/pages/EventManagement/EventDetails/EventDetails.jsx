import React, { useEffect, useState, useId } from "react";
import "./EventDetails.scss";
import { eventmanagement, home } from "../../../config/routeConsts";
import SiteBreadcrumb from "../../../components/SiteBreadcrumb/SiteBreadcrumb";
import EventProviderList from "../../../components/EventProviderList/EventProviderList";
import EventDetailsTable from "./EventDetailsTable";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  asyncEventAcceptDeclineThunk,
  asyncEventSponserThunk,
  asynceventViewThunk,
} from "../../../redux/thunk/eventThunk/event.thunk";
import LightboxSlider from "../../../components/LightboxSlider/LightboxSlider";
import Skeleton from "../../../components/Skeleton";

import {
  EVENTSTATUS,
  EVENTTYPE,
  EVENTCATEGORY,
  Currency,
  languageList,
  EventRecurrence,
} from "../../../common/constsforCodes";
import {
  OrgGetDate,
  OrgGetFullDate,
  OrgGetTime,
  formatDatewihnewdate,
  getTime,
  getTimeFromTimestamp,
  priceFormator,
} from "../../../functions/functions";

const EventDetails = () => {
  const dispatch = useDispatch();
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { event, isLoading } = useSelector((e) => e.event);

  const currency = Currency.find((e) => e?.id === event?.data?.currency);
  const eventstatus = EVENTSTATUS.find((e) => e?.id === event?.data?.status);
  const eventtype = EVENTTYPE.find((e) => e?.id === event?.data?.eventType);
  const eventcateogry = EVENTCATEGORY.find(
    (e) => e?.id === event?.data?.category
  );
  console.log(eventtype, "eventtype");
  console.log(eventcateogry, "eventcateogryeventcateogryeventcateogry");
  const duration = EventRecurrence.find((e) => e?.id === event?.data?.duration);

  useEffect(() => {
    if (!eventId) {
      navigate(eventmanagement);
    } else {
      dispatch(asynceventViewThunk({ eventId: eventId }));
    }
  }, []);

  const [Modal, setModal] = useState(false);

  const BreadcrumbData = [
    {
      title: "Home",
      url: home,
    },
    {
      title: "Experience Management",
      url: eventmanagement,
    },
    {
      title: "Experience Details",
    },
  ];
  console.log(event?.data, "vccccccccccccccccccccccc");
  const EventListWrapper = [
    {
      icon: <i className="icon-calendar"></i>,
      title: `${
        event?.data?.endTime && event?.data?.startTime
          ? `${OrgGetDate(+event?.data?.startTime)} - 
            ${OrgGetDate(+event?.data?.startTime)}`
          : event?.data?.startTime
          ? `${OrgGetDate(+event?.data?.startTime)}`
          : ""
      }`,
      // event?.data?.startTime  ? `${formatDatewihnewdate(+event?.data?.startTime)}` :'-',
      subTitle: `${
        event?.data?.endTime && event?.data?.startTime
          ? `${OrgGetTime(event?.data?.startTime)} - ${OrgGetTime(
              event?.data?.endTime
            )}`
          : event?.data?.startTime
          ? `${OrgGetTime(event?.data?.startTime)}`
          : ""
      }`,

      // (
      //     <>
      //         {event?.data?.startTime && `${getTimeFromTimestamp(event?.data?.startTime)}`}{' '}
      //         {event?.data?.endTime &&
      //             ` - ${getTimeFromTimestamp(event?.data?.endTime)}`}
      //     </>
      // )
    },
    {
      icon: <i className="icon-location"></i>,
      title:
        event?.data?.onlineMeetingLink || event?.data?.googleMapsLink
          ? event?.data?.city?.name
            ? `Location`
            : "Online Meet Link"
          : "",
      // event?.data?.city && event?.data?.venue
      //   ? `${event?.data?.venue}, ${event?.data?.city?.name}`
      //   : "Online Meet Link",
      //   subTitle: (
      //     <a
      //       href={
      //         event?.data?.googleMapsLink
      //           ? event?.data?.googleMapsLink?.toLocaleString() || ""
      //           : event?.data?.onlineMeetingLink?.toLocaleString() || ""
      //       }
      //       target="_blank"
      //     >
      //       {event?.data?.googleMapsLink
      //         ? event?.data?.googleMapsLink
      //         : event?.data?.onlineMeetingLink}
      //     </a>
      //   ),
      subTitle:
        event?.data?.eventType !== 3
          ? event?.data?.googleMapsLink && event?.data?.city?.name
            ? `${event?.data?.venue}, ${event?.data?.city?.name}`
            : event?.data?.onlineMeetingLink
            ? event?.data?.onlineMeetingLink
            : ""
          : "",
    },

    {
      icon: (
        <>
          <i className="icon-ticket"></i>
        </>
      ),
      title: `${
        event?.data?.price
          ? `
            ${currency?.name !== "CHF" ? currency?.title : ""}
            ${priceFormator(event?.data?.price)}
             ${currency?.name}`
          : `Free`
      }`,
      // subTitle: `${event?.data?.price && ("Price per ticket")}`
      subTitle: "Price per ticket",
    },

    // ${currency?.name !== "CHF" ? currency?.title : ""}

    // {
    //     icon: (
    //         <>
    //             <i className="icon-percentage"></i>
    //         </>
    //     ),
    //     title: `${
    //         event?.data?.discount?.type === 2
    //             ? `${event?.data?.discount?.discountValue}%`
    //             : `${event?.data?.discount?.discountValue}${currency?.title}`
    //     } OFF`,
    //     subTitle: 'Discount'
    // },
    {
      icon: (
        <>
          <i className="icon-language-square"></i>
        </>
      ),
      title: `${event?.data?.language
        ?.map((e) => languageList?.[e])
        .join(" | ")}`,
      subTitle: "Experience language",
    },
    {
      icon: <i className="icon-calendar"></i>,
      title: duration?.title,
      subTitle: "Experience recurrence",
    },
  ];
  // const Filter =
  //   Object.keys(eventData?.discount || {})?.length > 0
  //     ? EventListWrapper
  //     : EventListWrapper.splice(3, 1);
  //   !event?.data?.onlineMeetingLink &&
  //     !event?.data?.googleMapsLink &&
  //     EventListWrapper.splice(1, 1);
  return (
    <>
      <div div className="event-details">
        <SiteBreadcrumb
          BreadcrumbData={BreadcrumbData}
          className="protected-breadcrumb"
        />
        <div className="protected-head">
          <h2>Experience Details</h2>
        </div>

        <div className="flex items-start flex-wrap bg-white mt-32 event-details-wrapper">
          {/* hiren's Code Start */}
          <div className="w-full md:w-1/2 xl:w-2/5 3xl:w-2/6 slider-wrapper">
            <div className="flex items-stretch flex-wrap slider-thumbnail">
              {isLoading ? (
                <>
                  {Array.from({ length: 5 }).map((_, i) => {
                    return (
                      <div
                        className="w-1/4 thumbnail-image skeleton-thumbnail"
                        key={i}
                      >
                        <Skeleton />
                      </div>
                    );
                  })}
                </>
              ) : (
                <>
                  {event?.data?.media.map((image, i) => {
                    return (
                      <>
                        <div className="w-1/4 thumbnail-image" key={i}>
                          <img
                            src={image.imageUrl}
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
              {Modal > 0 && (
                <LightboxSlider
                  Modal={Modal}
                  setModal={setModal}
                  eventData={event?.data?.media}
                />
              )}
            </div>
          </div>

          {/* hiren's Code End */}

          <div className="w-full md:w-1/2 xl:w-3/5 3xl:w-4/6 event-details-body">
            {isLoading ? (
              <>
                <ul className="flex items-center flex-wrap stock-list">
                  {Array.from({ length: 4 }).map((e, i) => {
                    return (
                      <>
                        <li className="w-1/2 xl:w-1/4" key={i}>
                          <div className="inner skeleton-inner">
                            <Skeleton width={40} height={40} className="mb-3" />
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
                  <li className="w-1/2 xl:w-1/4">
                    <div className="inner">
                      <h2 className="count">{event?.data?.seats?.total}</h2>
                      <p>Total Capacity</p>
                    </div>
                  </li>
                  <li className="w-1/2 xl:w-1/4">
                    <div className="inner">
                      <h2 className="count">{event?.data?.seats?.available}</h2>
                      <p>Available</p>
                    </div>
                  </li>
                  <li className="w-1/2 xl:w-1/4">
                    <div className="inner">
                      <h2 className="count">{event?.data?.seats?.sold}</h2>
                      <p>Sold</p>
                    </div>
                  </li>
                  <li className="w-1/2 xl:w-1/4">
                    <div className="inner">
                      <h2 className="count">{event?.data?.seats?.scanned}</h2>
                      <p>Scanned</p>
                    </div>
                  </li>
                </ul>
              </>
            )}

            {isLoading ? (
              <>
                {Array.from({ length: 2 }).map((_, i) => {
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
                  <div
                    className={`flex items-center flex-wrap card-action status-label ${
                      eventstatus?.id == 1
                        ? "in-review-card"
                        : eventstatus?.id == 2
                        ? "active-card"
                        : "rejected-card"
                    }`}
                  >
                    {[1, 2]?.includes(eventtype?.id) && (
                      <div className="link" style={{ pointerEvents: "none" }}>
                        {/* {event?.data?.eventType == 1
                                                ? 'Online'
                                                : 'Offline'} */}
                        {eventtype?.title}
                      </div>
                    )}
                    <h4 className="text">{eventstatus?.title}</h4>
                  </div>

                  <div className="flex items-center flex-wrap action-btn-group">
                    <button
                      type="button"
                      className={`flex items-center gap-1 action-btn ${
                        event?.data?.isSponsored == true
                          ? "sponser-remove-btn"
                          : "sponser-add-btn"
                      }`}
                      onClick={() =>
                        dispatch(
                          asyncEventSponserThunk(
                            {
                              eventId: eventId,
                              isSponsored:
                                event?.data?.isSponsored == true ? false : true,
                            },
                            () =>
                              dispatch(
                                asynceventViewThunk({
                                  eventId: eventId,
                                })
                              )
                          )
                        )
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="14"
                        width="16"
                        viewBox="0 0 576 512"
                      >
                        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                      </svg>
                      {event?.data?.isSponsored == true
                        ? "Remove from Sponsor"
                        : "Add as a Sponsor"}{" "}
                    </button>

                    {event?.data?.status === 1 && (
                      <>
                        <button
                          type="button"
                          className="action-btn accept"
                          onClick={() => {
                            dispatch(
                              asyncEventAcceptDeclineThunk(
                                {
                                  eventId: event?.data?.eventId,
                                  status: 2,
                                },
                                () =>
                                  dispatch(
                                    asynceventViewThunk({
                                      eventId: eventId,
                                    })
                                  )
                              )
                            );
                          }}
                        >
                          Accept
                        </button>

                        <button
                          type="button"
                          className="action-btn reject"
                          onClick={() => {
                            dispatch(
                              asyncEventAcceptDeclineThunk(
                                {
                                  eventId: event?.data?.eventId,
                                  status: 3,
                                },
                                () =>
                                  dispatch(
                                    asynceventViewThunk({
                                      eventId: eventId,
                                    })
                                  )
                              )
                            );
                          }}
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <h3 className="title">{event?.data?.title}</h3>
                {event?.data?.description && (
                  <>
                    <span className="event-caption">
                      Description in English
                    </span>
                    <pre className="description">
                      {event?.data?.description}
                    </pre>
                  </>
                )}
                {event?.data?.descriptionDe && (
                  <>
                    <span className="event-caption">Description in German</span>
                    <pre className="description">
                      {event?.data?.descriptionDe}
                    </pre>
                  </>
                )}
              </>
            )}
            {isLoading ? (
              <>
                <ul className="flex items-center flex-wrap event-list-wrapper">
                  {Array.from({ length: 4 }).map((_, i) => {
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
                          <div
                            style={{
                              width: "100%",
                            }}
                          >
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
                  EventListWrapper={EventListWrapper}
                  //  EventListWrapper={event?.data}
                  googleMapsLink = {event?.data?.googleMapsLink}
                  onlineMeetingLink = {event?.data?.onlineMeetingLink}
                  isLoading={isLoading}
                />
              </>
            )}
          </div>
        </div>
        <div className="mt-32">
          <EventDetailsTable />
        </div>
      </div>
    </>
  );
};

export default EventDetails;
