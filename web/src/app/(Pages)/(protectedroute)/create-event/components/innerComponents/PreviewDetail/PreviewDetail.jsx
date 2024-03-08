"use client";
import React, { forwardRef, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import H1 from "@/app/components/common/h1";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { TimeZoneMoment } from "@/utils/commonfn/Date_TimeTS";
import { useRouter, usePathname } from "next/navigation";
import LightboxSlider from "@/app/components/LightboxSlider/LightboxSlider";
import { useTranslation } from "react-i18next";
import { useParams } from "next/navigation";
import {OrgGetDate,OrgGetTime,OrgGetFullDate} from "@/utils/commonfn/Date_TimeTS/index"
import { priceFormator } from "@/utils/commonfn/PriceCMFun/index";
import {
  convertTimestampToTimeFormat,
  eventdetailsformatDate,
  // eventType,
  language,
  currency,
  currencyName,
  // eventDetailsCategory
} from "@/app/components/common/Common";
import { eventDetailsCategoryFN, eventTypeFn } from "@/i18n/i18nCM/i18CM";

const PreviewDetail = ({languageName}, ref) => {
  const { i18n } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const params = useParams();
  const eventDetailsCategory = eventDetailsCategoryFN(i18n);
  const eventType = eventTypeFn(i18n);
  const [count, setCount] = useState(1);
  const [Modal, setModal] = useState(false);
  const [first, setfirst] = useState(false)

  return (
    <div className="event-category-detail">
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
                {ref?.current?.media
                  ?.filter((item) => item?.type === "image")
                  ?.map((item, i) => {
                    return (
                      <SwiperSlide key={i}>
                        <div className="slide-image-box">
                          <Image
                            src={
                              typeof item?.imageUrl === "object"
                                ? URL.createObjectURL(item?.imageUrl)
                                : item?.imageUrl
                            }
                            alt=""
                            title=""
                            width={785}
                            height={658}
                            // onClick={() => {
                            //   setModal(i + 1);
                            // }}
                          />
                          <span className="badge">
                            {eventDetailsCategory[ref?.current?.category]}
                          </span>
                        </div>
                      </SwiperSlide>
                    );
                  })}
                {ref?.current?.media
                  ?.filter((item) => item?.type === "video")
                  ?.map((item, i) => {
                    return (
                      <SwiperSlide key={i}>
                        <div className="slide-image-box" >
                          <video
                            // poster={
                            //   typeof item?.videoUrl === "object"
                            //     ? URL.createObjectURL(item?.videoUrl)
                            //     : item?.videoUrl
                            // }

                            // controls
                          >
                            <source
                              src={
                                typeof item?.videoUrl === "object"
                                  ? URL.createObjectURL(item?.videoUrl)
                                  : item?.videoUrl
                              }
                            ></source>
                          </video>
                          <i className="icon-play-btn play-btn"></i>
                          <span className="badge">
                            {eventDetailsCategory[ref?.current?.category]}
                          </span>
                        </div>
                      </SwiperSlide>
                    );
                  })}
              </React.Fragment>
            </Swiper>
            {/* {Modal > 0 && (
              <LightboxSlider
                Modal={Modal}
                setModal={setModal}
                eventData={ref?.current?.media}
              />
            )} */}
          </div>
          <div className="w-full xl:w-4/5 content-wrapper">
            <div className="flex items-center gap-4 btn-wrap">
              {[1,2].includes(+ref?.current?.eventType)  && (
              <div className="event-badge offline-btn">
                {eventType?.[ref?.current?.eventType]}
              </div>
              )}
              <div className="event-badge lang-btn">
                {ref.current.description && ref.current.descriptionDe
                  ? "EN & DE"
                  : ref.current.description
                  ? "EN"
                  : "DE"}
              </div>
            </div>
            <H1 className="h2 title">{ref?.current?.title}</H1>

            {(ref?.current?.startTime || ref?.current?.endTime) && (
              <ul className="flex items-center flex-wrap event-list-wrapper">
                <li className="flex items-center w-full xl:w-1/2">
                  <span className="inline-flex items-center justify-center icon">
                    <i className="icon-calendar"></i>
                  </span>
                  <div>
                    <span className={`block head`}>
                      {ref?.current?.startTime && ref?.current?.endTime
                        ? `${OrgGetFullDate(
                            parseInt(ref?.current?.startTime),languageName
                          )} - ${OrgGetFullDate(
                            parseInt(ref?.current?.endTime),languageName
                          )}`
                        : ref?.current?.startTime
                        ? `${OrgGetFullDate(
                            parseInt(ref?.current?.startTime),languageName
                          )}`
                        : ""}
                    </span>
                    {ref?.current?.startTime && ref?.current?.endTime
                      ? `${OrgGetTime(
                          parseInt(ref?.current?.startTime)
                        )} - ${OrgGetTime(
                          parseInt(ref?.current?.endTime)
                        )} (${TimeZoneMoment()})`
                      : ref?.current?.startTime
                      ? `${OrgGetTime(
                          parseInt(ref?.current?.startTime)
                        )} (${TimeZoneMoment()})`
                      : ""}
                  </div>
                </li>
              </ul>
            )}
            {ref?.current?.city && ref?.current?.venue && (
              <ul className="flex items-center flex-wrap event-list-wrapper">
                <li className="flex items-center w-full xl:w-1/2">
                  <span className="inline-flex items-center justify-center icon">
                    <i className="icon-location"></i>
                  </span>
                  <div>
                    <span className={`block head`}>
                      {ref?.current?.city?.name}
                    </span>
                    {ref?.current?.venue}
                  </div>
                </li>
              </ul>
            )}
            <ul className="flex items-center flex-wrap event-list-wrapper">
              <li className="flex items-center w-full xl:w-1/2">
                <span className="inline-flex items-center justify-center icon">
                  <i className="icon-ticket"></i>
                </span>
                <div>
                  <span className={`block head`}>
                    {ref?.current?.price
                      ? `${ref?.current?.currency !== 2 ? currency[ref?.current?.currency] : ""}${
                        priceFormator(ref?.current?.price,i18n?.language)
                        } ${currencyName[ref?.current?.currency]}`
                      : i18n.t(`useEvent.EventPaid.Free`)}
                  </span>
                  {i18n.t(`organizer.event.eventDetails.pricePerTicket`)}
                </div>
              </li>
            </ul>
            <div className="flex items-center flex-wrap qty-group-wrapper">
              <div className="qty-group">
                <span className="count">1</span>
                <span className="icon-back qty-btn min"></span>
                <span className="icon-back qty-btn max"></span>
              </div>
              
              <p>{i18n.t("useEvent.NumberofTikits")}</p>

            </div>
            <div className="event-btn-group">
                        <button
                          className="solid-btn"
                        >
                          {i18n.t("useEvent.bookBTN")}
                        </button>
                      </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(PreviewDetail);
