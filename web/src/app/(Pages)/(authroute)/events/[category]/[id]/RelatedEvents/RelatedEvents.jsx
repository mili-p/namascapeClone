"use client";
import H2 from "@/app/components/common/h2";
import "./RelatedEvents.scss";
import React from "react";
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from "swiper/modules";
import EventCardWeb from "@/app/components/EventCardWeb/EventCardWeb";
import { useTranslation } from "react-i18next";
import { EventRecurrenceFn } from "@/i18n/i18nCM/i18CM";

const RelatedEvents = ({eventDetails}) => {
  const {i18n} = useTranslation()
  const EventRecurrence = EventRecurrenceFn(i18n);
  // console.log('eventDetails',eventDetails)

  // const EventCardData = [
  //   {
  //     detailsLink: '/events/event-details',
  //     img: '/assets/images/crystal-event-image.png',
  //     badgeDate: 'Fri, Dec 23',
  //     title: 'Austin Limits Events.',
  //     description: 'Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna...',
  //     location: 'New Jersey 45463.',
  //   },
  //   {
  //     detailsLink: '/events/event-details',
  //     img: '/assets/images/crystal-event-image.png',
  //     badgeDate: 'Fri, Dec 23',
  //     title: 'Austin Limits Events.',
  //     description: 'Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna...',
  //     location: 'New Jersey 45463.',
  //   },
  //   {
  //     detailsLink: '/events/event-details',
  //     img: '/assets/images/crystal-event-image.png',
  //     badgeDate: 'Fri, Dec 23',
  //     title: 'Austin Limits Events.',
  //     description: 'Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna...',
  //     location: 'New Jersey 45463.',
  //   },
  //   {
  //     detailsLink: '/events/event-details',
  //     img: '/assets/images/crystal-event-image.png',
  //     badgeDate: 'Fri, Dec 23',
  //     title: 'Austin Limits Events.',
  //     description: 'Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna...',
  //     location: 'New Jersey 45463.',
  //   },
  // ]
  return eventDetails?.relatedEvents?.length > 0 && (
    <>
      <section className="pb-120 related-events-section">
        <div className="container">
          <div className="event-title-wrapper">
            {/* <H2>Related events</H2> */}
            <H2 className='title'>{i18n.t(`useEvent.relateEevents`)}</H2>
          </div>

          <Swiper
            slidesPerView={1}
            spaceBetween={16}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              481: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {eventDetails?.relatedEvents?.map((item, index) => {
              const duration = EventRecurrence?.find((e)=>e?.id === item?.duration)
              return (
                <SwiperSlide key={index}>
                  <EventCardWeb
                    item={item}
                    category={item?.category}
                    duration={duration}
                  />
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default RelatedEvents;
