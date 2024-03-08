"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import H2 from "../common/h2";
import "./ProtectedEventCard.scss";
import H3 from "../common/h3";
import H4 from "../common/h4";
import { sweetalert } from "@/app/components/common/Common";
import DeleteLogoutModal from "../SiteModal/DeleteLogoutModal/DeleteLogoutModal";
import { useDispatch } from "react-redux";
import { deleteEventThunk } from "../../../../redux/Thunks/Organizer/EventForm/event.thunk";
import { eventManagementThunk } from "../../../../redux/Thunks/Organizer/EventManagement/eventmanagement.thunk";
import { useRouter } from "next/navigation";
// import { Currency } from "@/utils/commonfn";
import { useTranslation } from "react-i18next";
import { EventCategoryFn, CurrencyFn } from "@/i18n/i18nCM/i18CM";
import { priceFormator } from "@/utils/commonfn/PriceCMFun/index";
import { TimeZoneMoment } from "@/utils/commonfn/Date_TimeTS";

const ProtectedEventCard = ({
  isOngoing,
  isSponsored,
  city,
  // EventCategory,
  thumbnail,
  canBeDeleted,
  currency: symbol,
  uniqueId,
  category,
  event,
  activeTab,
  badge,
  startDate,
  startTime,
  endDate,
  endTime,
  viewDetailsLink,
  title,
  description,
  descriptionDe,
  location,
  status,
  eventImage,
  price,
  available,
  sold,
  duration,
  peoplejoined,
}) => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const router = useRouter();
  const [show, setshow] = useState(false);

  /////////////////////////////////
  const EventCategory = EventCategoryFn(i18n);
  const Currency = CurrencyFn(i18n);
  ///////////////////////////////////////////

  const StatusLable = [
    {
      title: i18n.t(
        `organizer.event.eventmanagement.protectedeventCard.inreview`
      ),
      class: "in-review-card",
      id: 1,
    },
    {
      title: i18n.t(
        `organizer.event.eventmanagement.protectedeventCard.active`
      ),
      class: "active-card",
      id: 2,
    },
    {
      title: i18n.t(
        `organizer.event.eventmanagement.protectedeventCard.rejected`
      ),
      class: "rejected-card",
      id: 3,
    },
  ];

  const currency = Currency.find((e) => e?.id === symbol);

  const Treats = EventCategory?.find((e) => [3, 7, 8].includes(e?.id));
  return (
    <>
      <div className="flex items-stretch flex-col sm:flex-row w-full protected-event-card">
        <Link
          href={`/create-event/${uniqueId}`}
          className="redirect-link"
        ></Link>
        <div className="image-wrapper">
          <Image
            src={eventImage ? eventImage : thumbnail}
            alt="event-image"
            width={222}
            height={296}
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
          />
          {EventCategory?.map(
            (e) =>
              e.id === category && (
                <span className="badge" key={e.id}>
                  {e?.title}
                  {/* {i18n.t(`organizer.event.commonArray.EventCategory.option.1`)} */}
                </span>
              )
          )}
        </div>
        <div className="flex items-center w-full content-wrapper">
          <div className="w-full">
            <div className="flex items-start flex-wrap flex-col-reverse 3xl:items-center 3xl:flex-row justify-between">
              <p className="date">
                {[1, 2, 4].includes(category) &&
                  `${startDate} ${endDate ? ` - ${endDate}` : ""}`}
                {/* {startDate} {endDate ? ` - ${endDate}` : ""} */}
              </p>
              {event && (
                <div className="flex items-center flex-wrap overlap-area card-action">
                  {event && (activeTab === "1" || activeTab === "2") && (
                    <div
                      className="flex items-center link duplicate"
                      onClick={() => {
                        router.push(
                          `/create-event?uniqueId=${uniqueId}&duplicate=${true}`
                        );
                      }}
                    >
                      {/* <Link
                      // href={`/create-event/${uniqueId}`}
                      href={{
                        pathname: "/create-event",
                        query: { uniqueId: uniqueId },
                      }}
                      // href="/create-event" passQueryString={{ paramA: "a", paramB: "b" }}
                      // className="flex items-center link duplicate"
                    > */}
                      <i className="icon-duplicate"></i>
                      {i18n.t(
                        `organizer.event.eventmanagement.protectedeventCard.duplicate`
                      )}
                      {/* </Link> */}
                    </div>
                  )}
                  {event && activeTab === "1" && !isOngoing && (
                    <>
                      <Link
                        // href={`/create-event/${uniqueId}`}
                        href={{
                          pathname: "/create-event",
                          query: { uniqueId: uniqueId },
                        }}
                        // href="/create-event" passQueryString={{ paramA: "a", paramB: "b" }}
                        className="flex items-center link edit"
                      >
                        <i className="icon-edit"></i>
                        {i18n.t(
                          `organizer.event.eventmanagement.protectedeventCard.edit`
                        )}
                      </Link>
                      <div
                        className="flex items-center link delete"
                        onClick={() => {
                          setshow(true);
                        }}
                      >
                        <i className="icon-delete"></i>
                        {i18n.t(
                          `organizer.event.eventmanagement.protectedeventCard.delete`
                        )}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* {!(Treats?.id === category) && (
              <>

              {(startTime || endTime) &&(
                <p className="time">
                  {startTime} {endTime ? `- ${endTime}` : ""}
                </p>
               )} 
                {duration &&(
                  <p className="date mt-3">{duration}</p>
                )}
              </>
            )} */}

            {[1, 2, 4].includes(category) && (
              <>
              {startTime && endTime ? (
                <p className="time">
                {`${startTime} - ${endTime} (${TimeZoneMoment()})`}
                </p>
              ) : startTime ? (
                <p className="time">
                {`${startTime} (${TimeZoneMoment()})`}
                </p>
              ) : ""}
                {/* {(startTime || endTime) && (
                  <p className="time">
                    {startTime} {endTime ? `- ${endTime}` : ""}
                  </p>
                )} */}
                {duration && <p className="date mt-3">{duration}</p>}
              </>
            )}

            <H2 className="title">{title}</H2>
            {(description || descriptionDe) && (
              <pre className="description">
                {description ? description : descriptionDe}
              </pre>
            )}
            {/* {descriptionDe && <p className="description">{descriptionDe}</p>} */}
            {category !== 3 && (
              <>
              <p className="flex items-center location">
                <i className="icon-location-fill"></i>
                <span>
                  {location ? `${location} ${city}` : i18n.t(`useEvent.FilterEventType.onLine`)}
                </span>
              </p>
            </>
            )}
            {/* {location && (
              <>
                <p className="flex items-center location">
                  <i className="icon-location-fill"></i>
                  <span>
                    {location}, {city}
                  </span>
                </p>
              </>
            )} */}
            <ul className="flex items-center flex-wrap about-list">
              {((event && activeTab === "1") || activeTab === "2") && (
                <li>
                  {i18n.t(
                    `organizer.event.eventmanagement.protectedeventCard.price`
                  )}
                  <H3>
                    {price > 0 && (
                      <i
                        className={
                          currency?.id === 1
                            ? "icon-USD"
                            : currency?.id === 2
                            ? "" // "icon-CHF"
                            : currency?.id === 3
                            ? "icon-EUR"
                            : ""
                        }
                      ></i>
                    )}
                    {price > 0
                      ? `${priceFormator(price,i18n.language)} ${currency?.title}`
                      : i18n.t(`useEvent.EventPaid.Free`)}
                  </H3>
                </li>
              )}
              {event && activeTab === "1" && (
                <>
                  <li>
                    {i18n.t(
                      `organizer.event.eventmanagement.protectedeventCard.available`
                    )}
                    <H3>{available || 0} </H3>
                  </li>
                  <li>
                    {i18n.t(
                      `organizer.event.eventmanagement.protectedeventCard.sold`
                    )}
                    <H3>{sold || 0} </H3>
                  </li>
                </>
              )}
              {event && activeTab === "2" && (
                <>
                  <li>
                    {i18n.t(`organizer.event.upcomingEventCard.peoplejoined`)}
                    <H3>{peoplejoined}</H3>
                  </li>
                </>
              )}
            </ul>
            {activeTab !== "1" && activeTab !== "2" && (
              <p className="people-joined">
                {peoplejoined}{" "}
                {i18n.t(`organizer.event.upcomingEventCard.peoplejoined`)}
              </p>
            )}
            {activeTab !== "1" && (
              <div className="text-end overlap-area">
                <Link href={viewDetailsLink}>
                  {i18n.t(`organizer.event.upcomingEventCard.viewDetails`)}
                </Link>
              </div>
            )}
            {event &&
              activeTab === "1" &&
              StatusLable.map((item, i) => {
                return (
                  <React.Fragment key={i}>
                    {status === item.id && (
                      <div
                        className={`flex items-center flex-wrap justify-between overlap-area status-label ${item.class}`}
                      >
                        <H4 className="text">{item.title}</H4>
                        {/* {(item.title === "Active" || item.title === "Aktiv") && ( */}
                        {item?.id && status === 2 && (
                          <Link href={viewDetailsLink}>
                            {i18n.t(
                              `organizer.event.upcomingEventCard.viewDetails`
                            )}
                          </Link>
                        )}
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            {isSponsored && (
              <div className="flex items-center flex-wrap justify-end overlap-area status-label active-card sponsor-card-btn">
                <span className="flex items-center gap-1 link">
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
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      {show && (
        <DeleteLogoutModal
          show={show}
          setshow={setshow}
          title={
            i18n.t(`organizer.event.eventDetails.deleteEvent`)
            // <>
            //   are you sure you want to <br /> delete this event?
            // </>
          }
          IconclassName={"icon-delete"}
          SolidBTNText={i18n.t(`organizer.event.eventDetails.deleteBTN`)}
          Delete
          onClickCancle={() => setshow(false)}
          onClickOK={() => {
            if (canBeDeleted) {
              dispatch(
                deleteEventThunk({ eventId: uniqueId }, () => {
                  setshow(false);
                  dispatch(
                    eventManagementThunk({
                      search: "",
                      sortBy: "createdAt:-1",
                      limit: 6,
                      page: 1,
                      upcoming: activeTab === "1",
                      hosted: activeTab === "2",
                    })
                  );
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
    </>
  );
};

export default ProtectedEventCard;
