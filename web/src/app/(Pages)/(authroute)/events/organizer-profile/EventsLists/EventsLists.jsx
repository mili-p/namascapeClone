"use client"
import EventCardWeb from "@/app/components/EventCardWeb/EventCardWeb";
import i18next from "i18next";
import React from "react";
import "./EventsLists.scss";
import { EventRecurrenceFn } from "@/i18n/i18nCM/i18CM";
import { useTranslation } from "react-i18next";

const EventsLists = ({ activeTab, eventData }) => {
  const {i18n} = useTranslation()
  const EventRecurrence = EventRecurrenceFn(i18n);
  return (
    <section className="events-wraps mb-120 organizer-events-wrap">
      <div className="container">
        {eventData?.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
            {eventData?.map((item, index) => {
              const duration = EventRecurrence?.find((e)=>e?.id === item?.duration)
              return (
                <React.Fragment key={index}>
                  <EventCardWeb
                    category={item?.category}
                    item={item}
                    OrganizerProfile={activeTab}
                    duration={duration}
                  />
                </React.Fragment>
              );
            })}
          </div>
        ) : (
          <div className="flex items-center justify-center flex-col data-not-found">
            <i className="icon-event-management"></i>
            {/* There is no events. */}
            {i18next.t(`useEvent.noEvents`)}
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsLists;
