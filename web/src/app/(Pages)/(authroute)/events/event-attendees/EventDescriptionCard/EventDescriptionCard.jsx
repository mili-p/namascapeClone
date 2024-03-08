"use client";
import EventProviderList from "@/app/components/EventProviderList/EventProviderList";
import Image from "next/image";
import React from "react";
import "./EventDescriptionCard.scss";
import H1 from "../../../../../components/common/h1";
import {
  convertTimestampToTimeFormat,
  eventdetailsformatDate,
  eventType,
  language,
  currency,
  currencyName,
  //  eventCategory
} from "@/app/components/common/Common";
import { eventDetailsCategoryFN, eventTypeFn } from "@/i18n/i18nCM/i18CM";
import { useTranslation } from "react-i18next";
import EmptyImage from "@/public/assets/images/empty-image.png";
import { useRouter, useSearchParams } from "next/navigation";
import { TimeZoneMoment } from "@/utils/commonfn/Date_TimeTS";

const EventDescriptionCard = ({ eventDetails, isLoading, languageName }) => {
  const { i18n } = useTranslation();
  const router = useRouter();
  const search = useSearchParams();
  const category = search.get("cId");
  const eventId = search.get("AId");
  const eventCategory = eventDetailsCategoryFN(i18n);
  const eventType = eventTypeFn(i18n);
  // const eventType = {
  //   1: 'Online',
  //   2: 'Offline',
  //   3: 'As A Gift',
  //   4: 'For Myself',
  // }

  // const language = {
  //   1: 'EN',
  //   2: 'GE',
  // }

  // const currency = {
  //   1: '$',
  //   2: '₣',
  //   3: '€'
  // }

  // const currencyName = {
  //   1: 'USD',
  //   2: 'CHF',
  //   3: 'EUR'
  // }

  // const eventCategory = {
  //   1: 'Gatherings',
  //   2: 'Retreats',
  //   3: 'Treats',
  //   4: 'Classes'
  // }
  // const HandleBookEvent = (id) => {
  //   if (userData) {
  //     if (id === "view") {
  //       router.push(
  //         `/e-ticket?tId=${eventDetails?.eventData?.eventId}&cId=${params.category}`
  //       );
  //     } else {
  //       router.push(
  //         `/events/payment?eId=${eventDetails?.eventData?.eventId}&cId=${params.category}&qty=${count}&gt=${checkAsAGift}`
  //       );
  //     }
  //   } else {
  //     router.push(`/signin/?from=${btoa(pathname)}`);
  //   }
  // };

  const SetEventDate = () => {
    if (eventDetails?.eventData?.startTime) {
      if (eventDetails?.eventData?.endTime) {
        return `${eventdetailsformatDate(
          parseInt(eventDetails?.eventData?.startTime),
          languageName
        )} - ${eventdetailsformatDate(
          parseInt(eventDetails?.eventData?.endTime),
          languageName
        )}`;
      } else {
        return `${eventdetailsformatDate(
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
        eventDetails?.eventData?.city?.name &&
        eventDetails?.eventData?.city?.name,
      subTitle:
        eventDetails?.eventData?.venue && eventDetails?.eventData?.venue,
    },
    {
      icon: (
        <>
          <i className="icon-ticket"></i>
        </>
      ),
      title: eventDetails?.eventData?.price
        ? `${
            ![2].includes(eventDetails?.eventData?.currency)
              ? currency[eventDetails?.eventData?.currency]
              : ""
          }${eventDetails?.eventData?.price} ${
            currencyName[eventDetails?.eventData?.currency]
          }`
        : i18n.t("organizer.event.eventDetails.free"),
      subTitle: eventDetails?.eventData?.price
        ? `${i18n.t(`organizer.event.eventDetails.pricePerTicket`)}`
        : "",
    },
  ];
  return (
    <section className="evenet-attende-wrapper pt-120">
      <div className="container">
        <div className="sm:flex sm:items-stretch flex-col sm:flex-row w-full event-attende-card">
          <a className="redirect-link" href="/event-details"></a>
          <div className="image-wrapper relative">
            {isLoading ? (
              <Image
                src={EmptyImage}
                alt="event image"
                title="event image"
                width={512}
                height={366}
              />
            ) : (
              <Image
                src={eventDetails?.eventData?.media?.[0]?.imageUrl}
                alt="event image"
                title="event image"
                width={512}
                height={366}
              />
            )}
            {eventDetails?.eventData?.category && (
              <span className="badge">
                {/* {eventDetails?.eventData?.isSponsored
                  ? i18n.t(`useEvent.Sponsored`)
                  :  */}
                {eventCategory[eventDetails?.eventData?.category]}
                {/* } */}
              </span>
            )}
          </div>
          <div className="w-full content-wrapper">
            <div className="flex items-center gap-4 btn-wrap">
              {[1, 2].includes(eventDetails?.eventData?.eventType) && (
                <div className="event-badge offline-btn">
                  {eventType?.[eventDetails?.eventData?.eventType]}
                </div>
              )}
              {eventDetails?.eventData?.language?.[0] && (
                <div className="event-badge lang-btn">
                  {eventDetails?.eventData?.language?.length < 2
                    ? language?.[eventDetails?.eventData?.language?.[0]]
                    : `${
                        language?.[eventDetails?.eventData?.language?.[0]]
                      } & ${
                        language?.[eventDetails?.eventData?.language?.[1]]
                      }`}
                </div>
              )}
            </div>
            {eventDetails?.eventData?.title && (
              <H1 className="h2 title">{eventDetails?.eventData?.title}</H1>
            )}
            <EventProviderList EventListWrapper={EventListWrapper} />
            <>
              {/* {eventDetails?.isUserAttendingEvent ||
              eventDetailsPayment?.data?.isUserAttendingEvent ? (
                <button
                  className="solid-btn"
                  onClick={() => HandleBookEvent("view")}
                >
                  {i18n.t("useEvent.ViewTicket")}
                </button>
              ) : (
                <>
                  <div className="event-btn-group">
                    <button
                      className="solid-btn"
                      onClick={() => HandleBookEvent("book")}
                    >
                      {i18n.t("useEvent.bookBTN")}
                    </button>
                  </div>
                </>
              )} */}
            </>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDescriptionCard;
