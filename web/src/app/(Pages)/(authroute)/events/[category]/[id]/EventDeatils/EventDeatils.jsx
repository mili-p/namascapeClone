"use client";
import React, { useEffect, useState } from "react";
import "./EventDeatils.scss";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import H1 from "@/app/components/common/h1";
import Link from "next/link";
import EventProviderList from "@/app/components/EventProviderList/EventProviderList";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { priceFormator } from "@/utils/commonfn/PriceCMFun/index";
import {
  convertTimestampToTimeFormat,
  eventdetailsformatDate,
  eventdetailsformatFullDate,
  // eventType,
  language,
  currency,
  currencyName,
  // eventDetailsCategory
} from "@/app/components/common/Common";
import LightboxSlider from "@/app/components/LightboxSlider/LightboxSlider";
import { asyncEventDetailsPayment } from "../../../../../../../../redux/Thunks/User/eventdetailspayment.thunk";
import LoaderBtn from "@/app/components/common/LoaderBtn";
import {
  eventDetailsCategoryFN,
  eventTypeFn,
  paramsCategoryFn,
} from "@/i18n/i18nCM/i18CM";
import { useTranslation } from "react-i18next";
import { useParams } from "next/navigation";
import UserBreadCrumb from "@/app/components/UserBreadCrumb/UserBreadCrumb";
import { TimeZoneMoment } from "@/utils/commonfn/Date_TimeTS";

const EventDeatils = ({ eventDetails, languageName }) => {
  const { i18n } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const params = useParams();
  const params1 = paramsCategoryFn(i18n);
  const [count, setCount] = useState(1);
  const [checkAsAGift, setCheckAsAGift] = useState(false);
  const { userData } = useSelector((m) => m.authentication);
  const [Modal, setModal] = useState(false);
  const { eventDetailsPayment, isLoading } = useSelector(
    (m) => m.eventdetailspayment
  );
  const eventDetailsCategory = eventDetailsCategoryFN(i18n);
  const eventType = eventTypeFn(i18n);
  const breadcrumbItems = [
    { name: i18n.t(`userBreadcrumb.home`), url: "/" },
    {
      name: `${params1[params?.category]}`,
      url: `/events/${params.category}/`,
    },
    {
      name: i18n.t(`userBreadcrumb.experiencesDetails`),
      url: `/events/${params.category}/${params.id}/`,
    },
  ];
  const HandleBookEvent = (id) => {
    if (userData) {
      if (id === "view") {
        router.push(
          `/e-ticket?tId=${eventDetails?.eventData?.eventId}&cId=${params.category}`
        );
      } else {
        router.push(
          `/events/payment?eId=${eventDetails?.eventData?.eventId}&cId=${params.category}&qty=${count}&gt=${checkAsAGift}`
        );
      }
    } else {
      router.push(`/signin/`);
    }
  };

  useEffect(() => {
    dispatch(
      asyncEventDetailsPayment({
        eventId: eventDetails?.eventData?.eventId,
        web: true,
      })
    );
  }, []);
  const SetEventDate = () => {
    if (eventDetails?.eventData?.startTime) {
      if (eventDetails?.eventData?.endTime) {
        return `${eventdetailsformatFullDate(
          parseInt(eventDetails?.eventData?.startTime),
          languageName
        )} - ${eventdetailsformatFullDate(
          parseInt(eventDetails?.eventData?.endTime),
          languageName
        )}`;
      } else {
        return `${eventdetailsformatFullDate(
          parseInt(eventDetails?.eventData?.startTime),
          languageName
        )}`;
      }
    } else {
      return "";
    }
  };
  const SetEventTime = () => {
    if (eventDetails?.eventData?.startTime) {
      if (eventDetails?.eventData?.endTime) {
        return `${convertTimestampToTimeFormat(
          parseInt(eventDetails?.eventData?.startTime)
        )} - ${convertTimestampToTimeFormat(
          parseInt(eventDetails?.eventData?.endTime)
        )} (${TimeZoneMoment()})`;
      } else {
        return `${convertTimestampToTimeFormat(
          parseInt(eventDetails?.eventData?.startTime)
        )} (${TimeZoneMoment()})`;
      }
    } else {
      return "";
    }
  };

  const isUserAttendingEvent = (eventDetails?.isUserAttendingEvent || eventDetailsPayment?.data?.isUserAttendingEvent);
  const EventListWrapper = [
    {
      icon: (
        <>
          <i className="icon-calendar"></i>
        </>
      ),
      title: SetEventDate(),
      subTitle: SetEventTime(),
    },
    {
      icon: (
        <>
          <i className="icon-location"></i>
        </>
      ),
      title:
        eventDetails?.eventData?.city?.name ||
        ([1, 2].includes(eventDetails?.eventData?.eventType) &&
          eventType?.[eventDetails?.eventData?.eventType]),
      subTitle: eventDetails?.eventData?.venue
        ? eventDetails?.eventData?.venue
        : (isUserAttendingEvent && eventDetails?.eventData?.onlineMeetingLink)
        ? i18n.t("useEvent.meetLinkTitle")
        : "",
      link: eventDetails?.eventData?.googleMapsLink,
      meetLink: eventDetails?.eventData?.onlineMeetingLink || "",
    },
    {
      icon: (
        <>
          <i className="icon-ticket"></i>
        </>
      ),
      title: eventDetails?.eventData?.price ? (
        <>
          <i
            className={
              eventDetails?.eventData?.currency === 1
                ? "icon-USD"
                : eventDetails?.eventData?.currency === 2
                ? "" //////// "icon-CHF"
                : eventDetails?.eventData?.currency === 3
                ? "icon-EUR"
                : ""
            }
          ></i>
          {`${priceFormator(eventDetails?.eventData?.price, i18n?.language)} ${
            currencyName[eventDetails?.eventData?.currency]
          }`}
        </>
      ) : (
        i18n.t(`useEvent.EventPaid.Free`)
      ),
      subTitle: eventDetails?.eventData?.price
        ? i18n.t(`organizer.event.eventDetails.pricePerTicket`)
        : i18n.t(`organizer.event.eventDetails.pricePerTicket`),
    },
  ];

  // {
  //   icon: <i className="icon-ticket"></i>,
  //   title: eventData?.price
  //     ? (eventData?.currency !== 2) ? `${currency?.name}${eventData?.price} ${currency?.title}` : `${eventData?.price} ${currency?.title}`
  //     : i18n.t('organizer.event.eventDetails.free'),
  //   subTitle: eventData?.price ? i18n.t(`organizer.event.eventDetails.pricePerTicket`) : "",
  // },

  return (
    <>
      <section className="user-bread-crumb-wrapper">
        <div className="container">
          <UserBreadCrumb items={breadcrumbItems} />
        </div>
      </section>
      <section className="event-category-detail pt-120">
        <div className="container">
          <div className="xl:flex xl:flex-row xl:justify-end about-inner event-details-wrap relative">
            <div className="w-full xl:w-1/2 xl:absolute image-wrapper">
              <Swiper
                slidesPerView={1}
                spaceBetween={16}
                pagination={{
                  clickable: true,
                }}
                // breakpoints={{
                //   768: {
                //       slidesPerView: 2,
                //   },
                //   }}
                modules={[Pagination]}
                className="mySwiper"
              >
                <React.Fragment>
                  {eventDetails?.eventData?.media
                    // ?.filter((item) => item?.type === "image")
                    ?.map((item, i) => {
                      if (item?.type === "image") {
                        return (
                          <SwiperSlide key={i}>
                            <div className="slide-image-box">
                              <Image
                                src={item?.imageUrl}
                                alt=""
                                title=""
                                width={785}
                                height={658}
                                onClick={() => {
                                  setModal(i + 1);
                                }}
                              />
                              <span className="badge">
                                {
                                  eventDetailsCategory[
                                    eventDetails?.eventData?.category
                                  ]
                                }
                              </span>
                            </div>
                          </SwiperSlide>
                        );
                      } else {
                        return (
                          <SwiperSlide key={i}>
                            <div
                              className="slide-image-box"
                              onClick={() => {
                                setModal(i + 1);
                              }}
                            >
                              <video>
                                <source src={item?.videoUrl}></source>
                              </video>
                              <i className="icon-play-btn play-btn"></i>
                              <span className="badge">
                                {
                                  eventDetailsCategory[
                                    eventDetails?.eventData?.category
                                  ]
                                }
                              </span>
                            </div>
                          </SwiperSlide>
                        );
                      }
                    })}
                  {/* {eventDetails?.eventData?.media
                    ?.filter((item) => item?.type === "video")
                    ?.map((item, i) => {
                      return (
                        <SwiperSlide key={i}>
                          <div
                            className="slide-image-box"
                            onClick={() => {
                              setModal(i + 1);
                            }}
                          >
                            <video
                            // poster={item?.imageUrl}
                            // controls
                            >
                              <source src={item?.videoUrl}></source>
                            </video>
                            <i className="icon-play-btn play-btn"></i>
                            <span className="badge">
                              {
                                eventDetailsCategory[
                                  eventDetails?.eventData?.category
                                ]
                              }
                            </span>
                          </div>
                        </SwiperSlide>
                      );
                    })} */}
                </React.Fragment>
              </Swiper>
              {Modal > 0 && (
                <LightboxSlider
                  Modal={Modal}
                  setModal={setModal}
                  eventData={eventDetails?.eventData?.media}
                />
              )}
            </div>
            <div className="w-full xl:w-4/5 content-wrapper">
              <div className="flex items-center gap-4 btn-wrap">
                {[1, 2].includes(eventDetails?.eventData?.eventType) && (
                  <div className="event-badge offline-btn">
                    {eventType?.[eventDetails?.eventData?.eventType]}
                  </div>
                )}

                <div className="event-badge lang-btn">
                  {eventDetails?.eventData?.language?.length < 2
                    ? language?.[eventDetails?.eventData?.language?.[0]]
                    : `${
                        language?.[eventDetails?.eventData?.language?.[0]]
                      } & ${
                        language?.[eventDetails?.eventData?.language?.[1]]
                      }`}
                </div>
              </div>

              <H1 className="h2 title">{eventDetails?.eventData?.title}</H1>
              <EventProviderList
                EventListWrapper={EventListWrapper}
                booking={
                  eventDetails?.isUserAttendingEvent ||
                  eventDetailsPayment?.data?.isUserAttendingEvent
                }
              />
              {/* {isLoading ?
              <button className="solid-btn">
                <LoaderBtn />
              </button>
              : */}

              <>
              {eventDetails?.eventData?.isUpcoming && (
                !eventDetails?.isUserAttendingEvent &&
                eventDetails?.eventData?.allTicketsSoldOut ? (
                  <span className="solid-btn">
                    {i18n.t("useEvent.SoldOut")}
                  </span>
                ) : (
                  <>
                    {eventDetails?.isUserAttendingEvent ||
                    eventDetailsPayment?.data?.isUserAttendingEvent ? (
                      <button
                        className="solid-btn"
                        onClick={() => HandleBookEvent("view")}
                      >
                        {i18n.t("useEvent.ViewTicket")}
                      </button>
                    ) : (
                      <>
                        <div className="flex items-center flex-wrap qty-group-wrapper">
                          <div className="qty-group">
                            <span className="count">{count}</span>
                            <span
                              className="icon-back qty-btn min"
                              onClick={() => {
                                if (count > 1) {
                                  setCount((e) => e - 1);
                                }
                              }}
                            ></span>
                            <span
                              className="icon-back qty-btn max"
                              onClick={() => {
                                if (count < 10) {
                                  setCount((e) => e + 1);
                                }
                              }}
                            ></span>
                          </div>
                          <p>{i18n.t("useEvent.NumberofTikits")}</p>
                        </div>
                        {eventDetails?.eventData?.eventType === 3 && (
                          <>
                            <div className="flex items-center site-checkbox-group input-group">
                              <input
                                type="checkbox"
                                id="Gift-Check"
                                checked={checkAsAGift}
                                // onChange={(e) => {
                                //     const isChecked = e.target.checked;
                                //     const value = isChecked ? 1 : 0;
                                //     setCheckAsAGift(value);
                                // }}
                                onChange={(e) => {
                                  setCheckAsAGift(e.target.checked);
                                }}
                              />
                              <label for="Gift-Check">
                                {i18n.t("useEvent.asAGift")}
                              </label>
                            </div>
                          </>
                        )}
                        <div className="event-btn-group">
                          <button
                            className="solid-btn"
                            onClick={() => HandleBookEvent("book")}
                          >
                            {i18n.t("useEvent.bookBTN")}
                          </button>
                        </div>
                      </>
                    )}
                  </>
                )
              )}
              </>
              {/* } */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EventDeatils;
