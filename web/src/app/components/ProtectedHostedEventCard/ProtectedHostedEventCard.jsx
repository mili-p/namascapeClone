import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useTranslation } from "react-i18next";
import H2 from "../common/h2";
import "./ProtectedHostedEventCard.scss";
import { TimeZoneMoment } from "@/utils/commonfn/Date_TimeTS";

const ProtectedHostedEventCard = ({
  title,
  startDate,
  startTime,
  endDate,
  endTime,
  images,
  category,
  viewDetailsLink,
  venue,
}) => {
  const { i18n } = useTranslation();
  const router = useRouter();
  return (
    <>
      <div className="flex items-stretch flex-col sm:flex-row w-full protected-hosted-event-card">
        <Link href={viewDetailsLink} className="card-link"></Link>
        <div className="w-full" onClick={() => router.push(viewDetailsLink)}>
          <p className="date">
            {" "}
            {`${startDate}  ${endDate ? `- ${endDate}` : ""}`}
          </p>
          {/* <p className="time"> */}
          {startTime && endTime ? (
                <p className="time">
                {`${startTime} - ${endTime} (${TimeZoneMoment()})`}
                </p>
              ) : startTime ? (
                <p className="time">
                {`${startTime} (${TimeZoneMoment()})`}
                </p>
              ) : <p className="time"></p>}
            {/* {`${startTime}  ${
            endTime ? `- ${endTime}` : ""
          }`} */}
          {/* </p> */}
          <H2 className="title">{title}</H2>
          <div className="flex items-center image-wrapper">
            {images?.map((image, i) => {
              return (
                image?.imageUrl !== "" && (
                  <Image
                    key={i}
                    src={image?.imageUrl}
                    alt="event-image"
                    width={35}
                    height={35}
                  />
                )
              );
            })}
            {/* <Image
                            src="/assets/images/protected-event-image.png"
                            alt="event-image"
                            width={35}
                            height={35}
                        />
                        <Image
                            src="/assets/images/protected-event-image2.png"
                            alt="event-image"
                            width={35}
                            height={35}
                        />
                        <Image
                            src="/assets/images/protected-event-image3.png"
                            alt="event-image"
                            width={35}
                            height={35}
                        />
                        <Image
                            src="/assets/images/protected-event-image.png"
                            alt="event-image"
                            width={35}
                            height={35}
                        /> */}
            {/* <span className="flex items-center justify-center image-count">
                            +210
                        </span> */}
          </div>
          {/* {venue &&  */}
          {category !== 3 && (
            <p className="flex items-center location">
              <i className="icon-location-fill"></i>
              <span>
                {venue ? venue : i18n.t(`useEvent.FilterEventType.onLine`)}
              </span>
            </p>
          )}
          {/* <p className="flex items-center location">
            {venue && <i className="icon-location-fill"></i>}
            <span>{venue}</span>
          </p> */}

          {/* } */}
          <div className="text-end">
            <Link href={viewDetailsLink}>
              {i18n.t(`organizer.event.upcomingEventCard.viewDetails`)}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProtectedHostedEventCard;
