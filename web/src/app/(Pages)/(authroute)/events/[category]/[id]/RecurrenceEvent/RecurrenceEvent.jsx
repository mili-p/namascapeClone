"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import "./RecurrenceEvent.scss";
import H2 from "@/app/components/common/h2";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination,Navigation } from "swiper/modules";
import { useTranslation } from "react-i18next";
import {
  shortToshortFormateDate,
  convertTimestampToTimeFormat,
} from "@/app/components/common/Common";
import CountButton from "./CountButton";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { TimeZoneMoment } from "@/utils/commonfn/Date_TimeTS";
const RecurrenceEvent = ({
  otherRecurringEventData,
  languageName,
  category,
}) => {
  const { i18n } = useTranslation();
  const { userData } = useSelector((m) => m.authentication);
  const { eventDetailsPayment } = useSelector((m) => m.eventdetailspayment);
  const [Modal, setModal] = useState(false);
  const [mainCount, setMainCount] = useState(1);
  const router = useRouter();
  const HandleBookEvent = (status, id) => {
    if (userData) {
      if (status === "view") {
        router.push(`/e-ticket?tId=${id}&cId=${category}`);
      } else {
        router.push(
          `/events/payment?eId=${id}&cId=${category}&qty=${mainCount}`
        );
      }
    } else {
      router.push(`/signin/`);
    }
  };

  useEffect(() => {
    if (userData) {
      router.refresh();
    }
  }, [userData]);

  return (
    <>
      <section className="recurrence-events-wrapper pb-120">
        <div className="container">
          <div className="event-title-wrapper flex items-center justify-between flex-wrap">
            {/* <H2>Event Attendees</H2> */}
            <H2 className="title">{i18n.t(`useEvent.recurrence.title`)} </H2>
          </div>
          <div className="recurrence-inner-slider">
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              pagination={false}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 16,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 16,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 20,
                },
              }}
              // onSlideChange={() => console.log("slide change")}
              // onSwiper={(swiper) => console.log(swiper)}
              navigation={true}
              modules={[Pagination,Navigation]}
            >
              {otherRecurringEventData?.length > 0 &&
                otherRecurringEventData?.map((e) => {
                  return (
                    <>
                      <SwiperSlide>
                        <div className="recurrence-slider-box">
                          <h3 className="date-title">
                            {e?.startTime && e?.endTime
                              ? `${shortToshortFormateDate(
                                  Number(e?.startTime),
                                  languageName
                                )} - ${shortToshortFormateDate(
                                  Number(e?.endTime),
                                  languageName
                                )}`
                              : e?.startTime
                              ? `${shortToshortFormateDate(
                                  Number(e?.startTime),
                                  languageName
                                )}`
                              : ""}
                          </h3>
                          <span className="timing">
                            {e?.startTime && e?.endTime
                              ? `${convertTimestampToTimeFormat(
                                  Number(e?.startTime),
                                  languageName
                                )} - ${convertTimestampToTimeFormat(
                                  Number(e?.endTime),
                                  languageName
                                )} (${TimeZoneMoment()})`
                              : e?.startTime
                              ? `${convertTimestampToTimeFormat(
                                  Number(e?.startTime),
                                  languageName
                                )} (${TimeZoneMoment()})`
                              : ""}
                          </span>
                          {/* <div className="flex items-center flex-wrap qty-group-wrapper">
                            <div className="qty-group">
                              <span className="count">{count}</span>
                              <span
                                className="icon-back qty-btn min"
                                onClick={
                                  () => {
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
                            <p className="qty-text">
                              {i18n.t("useEvent.NumberofTikits")}
                            </p>
                          </div> */}
                          <CountButton
                            setMainCount={(e) => {
                              setMainCount(e);
                            }}
                          />
                          {/* {eventDetails?.eventData?.eventType === 3 && (
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
                          )} */}
                          <button
                            class="solid-btn recurrence-slide-btn"
                            onClick={() =>
                              HandleBookEvent(
                                e?.isUserAttendingEvent ? "view" : "book",
                                e?.eventId
                              )
                            }
                          >
                            {!!e?.allTicketsSoldOut
                              ? i18n.t("useEvent.SoldOut")
                              : !!e?.isUserAttendingEvent
                              ? i18n.t("useEvent.ViewTicket")
                              : i18n.t("useEvent.bookBTN")}
                          </button>
                        </div>
                      </SwiperSlide>
                    </>
                  );
                })}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
};

export default RecurrenceEvent;
