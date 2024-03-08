import React from "react";
import "./ProtectedEventCard.scss";
import { Link } from "react-router-dom";
import { eventdetails } from "../../config/routeConsts";
import {
  getTimeFromTimestamp,
  formatDateWithNewFormat,
  formatDatewihnewdate,
  priceFormator,
} from "../../functions/functions";
import { EVENTCATEGORY, Currency } from "../../common/constsforCodes";

const ProtectedEventCard = ({ eventData }) => {
  const currency = Currency.find((e) => e?.id === eventData?.currency);
  const eventcateogry = EVENTCATEGORY.find(
    (e) => e?.id === eventData?.category
  );

  return (
    <>
      <div className="flex items-stretch flex-col sm:flex-row w-full protected-event-card">
        <Link
          to={`${eventdetails}/${eventData?.eventId}`}
          className="redirect-link"
        ></Link>
        <div className="image-wrapper">
          <img src={eventData?.media[0]?.imageUrl} alt="event-image" />
          {eventData?.category && (
            <span className="badge">{eventcateogry?.title}</span>
          )}
          {/* <div className='sold-out'>
                <span>Sold Out</span>
            </div> */}
        </div>
        <div className="flex items-center w-full content-wrapper">
          <div className="w-full">
            <div className="flex items-center flex-wrap justify-between">
              {/* <p className='date'>{formatDateWithNewFormat(eventData?.startTime)}</p> */}
              <p className="date">
                {formatDatewihnewdate(+eventData?.startTime)}
              </p>
            </div>
            <p className="time">
              {getTimeFromTimestamp(eventData?.startTime)} -{" "}
              {getTimeFromTimestamp(eventData?.endTime)}
            </p>
            <h2 className="title">{eventData?.title}</h2>
            {eventData?.cityName && (
              <p className="flex items-center location">
                <i className="icon-location"></i>
                <span>{eventData?.cityName + " , " + eventData?.venue}</span>
              </p>
            )}
            <ul className="flex items-center flex-wrap about-list">
              {eventData?.price ? (
                <li>
                  Price
                  <h3>
                    {currency?.name == "CHF" ? "" : currency?.title}
                    {priceFormator(eventData?.price)} {currency?.name}
                  </h3>
                </li>
              ) : (
                <li>
                  Price
                  <h3>Free</h3>
                </li>
              )}
              <li>
                Total Capacity
                <h3>{eventData?.seats?.total}</h3>
              </li>
              <li>
                Available
                <h3>{eventData?.seats?.available}</h3>
              </li>
              <li>
                Sold
                <h3>{eventData?.seats?.sold}</h3>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProtectedEventCard;
