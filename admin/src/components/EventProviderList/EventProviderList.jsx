import React, { useId } from "react";
import "./EventProviderList.scss";

const EventProviderList = ({
  EventListWrapper,
  userBooking,
  googleMapsLink,
  onlineMeetingLink,
}) => {
  console.log(EventListWrapper, "rrrrrrrrrrrrrrrrrrrrr");
  return (
    <>
      <ul className="flex items-center flex-wrap event-list-wrapper">
        {EventListWrapper?.map((list, i) => {
          console.log(list?.title, "ggffvdvdcvvvxv");
          if (typeof list?.title === "string" && list?.title && list.subTitle) {
            return (
              <li className="flex items-center w-full xl:w-1/2" key={i}>
                <span className="inline-flex items-center justify-center icon">
                  {list.icon}
                </span>
                <div>
                  <span className="block head">{list.title}</span>
                  {userBooking?.data?.eventDetails?.googleMapsLink ||
                  googleMapsLink ||
                  onlineMeetingLink ||
                  userBooking?.data?.eventDetails?.onlineMeetingLink ? (
                    <a
                      target="_blank"
                      href={
                        userBooking?.data?.eventDetails?.googleMapsLink
                          ? userBooking?.data?.eventDetails?.googleMapsLink
                          : onlineMeetingLink
                          ? onlineMeetingLink
                          : googleMapsLink
                          ? googleMapsLink
                          : userBooking?.data?.eventDetails?.onlineMeetingLink
                          ? userBooking?.data?.eventDetails?.onlineMeetingLink
                          : "/"
                      }
                    >
                      {list.subTitle}
                    </a>
                  ) : (
                    list.subTitle
                  )}
                </div>
              </li>
            );
          }
        })}
      </ul>
    </>
  );
};

export default EventProviderList;
