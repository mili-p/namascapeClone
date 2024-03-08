import React from "react";
import "./EventCardWeb.scss";
import Image from "next/image";
import H3 from "../common/h3";
import Link from "next/link";
// import { shortformatDate } from "../common/Common";
import {
  eventdetailsformatDate,
  // eventCategory,
  currencyName,
  currency,
  EventCardTitle,
} from "@/app/components/common/Common";
import { useTranslation } from "react-i18next";
import {
  eventDetailsCategoryFN,
  EventCategoryTitleFn,
} from "@/i18n/i18nCM/i18CM";
import EmptyImage from "@/public/assets/images/empty-image.png";
import { usePathname } from "next/navigation";
import { priceFormator } from "@/utils/commonfn/PriceCMFun";
const EventCardWeb = ({
  item,
  OrganizerProfile,
  languageName,
  category,
  duration,
}) => {
  const { i18n } = useTranslation();
  const EventCategoryTitle = EventCategoryTitleFn(i18n);
  const eventCategory = eventDetailsCategoryFN(i18n);
  const pathName = usePathname();
  console.log(duration, "durationdurationdurationduration");
  // item.category
  //  5 : 'sponsored-event',

  // const eventCategory = {
  //     1 : 'Events',
  //     2 : 'Retreats',
  //     3 : 'Treats',
  //     4 : 'Classes',
  //     7 : 'Coaching',
  //     8 : 'Training'
  // }
  // const currencyName = {
  //   1: 'USD',
  //   2: 'CHF',
  //   3: 'EUR'
  // }

  // const currency = {
  //   1: '$',
  //   2: '₣',
  //   3: '€'
  // }

  // const Title =
  // {
  //   1: 'gatherings-event',
  //   2: 'retreats-event',
  //   3: 'treats-event',
  //   4: 'classes-event',
  //   7: 'coaching-event',
  //   8: 'training-event'
  // }

  return (
    <div className="event-card-web w-full">
      <Link
        href={
          item?.isSponsored && pathName === "/events/sponsored/"
            ? `/events/sponsored/${item?._id ? item?._id : item?.eventId}`
            : `/events/${EventCardTitle?.[item?.category]}/${
                item?._id ? item?._id : item?.eventId
              }`
        }
        className="link"
      ></Link>
      <div className="event-image-box relative">
        {item?.media?.[0] ? (
          <>
            <Image
              src={item?.media?.[0]?.imageUrl}
              alt="event image"
              title="event image"
              width={376}
              height={274}
            />
          </>
        ) : (
          <>
            <Image
              src={EmptyImage}
              alt="event image"
              title="event image"
              width={376}
              height={274}
            />
          </>
        )}
        {OrganizerProfile ? (
          <>
            {item.eventType > 0 && (
              <span className="badge">{eventCategory?.[item.category]}</span>
            )}
          </>
        ) : (
          <>
            {console.log(duration, "durationdxcxzcuration", duration?.id !== 1)}
            {item?.startTime && (
              <span className="badge">
                {duration?.id === 1
                  ? item?.startTime && item?.endTime
                    ? `${eventdetailsformatDate(
                        parseInt(item?.startTime),
                        languageName
                      )} - ${eventdetailsformatDate(
                        parseInt(item?.endTime),
                        languageName
                      )}`
                    : item?.startTime &&
                      eventdetailsformatDate(
                        parseInt(item?.startTime),
                        languageName
                      )
                  : duration?.title}
              </span>
            )}
          </>
        )}
      </div>
      <div className="event-card-content">
        <div>
          {OrganizerProfile && item?.startTime && (
            <p className="date">
              {duration?.id === 1
                ? item?.startTime && item?.endTime
                  ? `${eventdetailsformatDate(
                      parseInt(item?.startTime),
                      languageName
                    )} - ${eventdetailsformatDate(
                      parseInt(item?.endTime),
                      languageName
                    )}`
                  : item?.startTime &&
                    eventdetailsformatDate(
                      parseInt(item?.startTime),
                      languageName
                    )
                : duration?.title}

              {/* {eventdetailsformatDate(parseInt(item?.startTime), languageName)} */}
            </p>
          )}
          <H3>{item?.title}</H3>
          <pre className="description">{item?.description}</pre>
        </div>
        <div>
          {!["treats", 3].includes(category) && (
            <p className="location flex item-center">
              <i className="icon-location"></i>{" "}
              {item?.city ? item?.city?.name : "Online"}
            </p>
          )}
          {/* {item?.venue && <p className="location flex item-center">
            <i className="icon-location"></i> {item?.venue}
          </p>} */}
          {OrganizerProfile === 2 && (
            <div className="flex items-center justify-between price-wrap">
              {/* {item?.price > 0 && <H3 className="mb-0">
                {currency[item?.currency]}{item?.price} {currencyName[item?.currency]}
              </H3>} */}
              <H3 className="mb-0">
                {item?.price > 0 &&
                  `${
                    item?.currency !== 2 ? currency[item?.currency] : ""
                  } ${priceFormator(item?.price, i18n?.language)} ${
                    currencyName[item?.currency]
                  }`}
              </H3>
              {item?.isUserAttendingEvent ? (
                <Link href={`/e-ticket?tId=${item?.eventId}`}>
                  <button type="button" className="solid-btn">
                    {i18n.t("useEvent.ViewTicket")}
                  </button>
                </Link>
              ) : (
                <Link href={`/events/payment?eId=${item?.eventId}`}>
                  <button type="button" className="solid-btn">
                    {i18n.t("useEvent.bookBTN")}
                  </button>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCardWeb;
