"use client";
import EventCardWeb from "@/app/components/EventCardWeb/EventCardWeb";
import H2 from "@/app/components/common/h2";
import React from "react";
import "./AttendedEvents.scss";
import i18n from "@/i18n/i18n";
import Pagination from "@/app/components/Pagination/Pagination";
import EventCardWebSkeleton from "@/app/components/EventCardWeb/EventCardWebSkeleton";
import { EventRecurrenceFn } from "@/i18n/i18nCM/i18CM";

export const AttendedEvents = ({
  userProfileData,
  totalCount,
  currentPage,
  setCurrentPage,
  TotalLimit,
  isLoading,
}) => {
  const EventRecurrence = EventRecurrenceFn(i18n);
  return (
    <>
      <section className="my-account-attended-events pt-120 pb-120">
        <div className="container">
          <div className="event-title-wrapper flex items-center justify-between flex-wrap">
            {/* <H2>Attended Events</H2> */}
            <H2 className="title">
              {i18n.t(`myAccount.attendedEvent.eventTitles`)}
            </H2>
          </div>
          {userProfileData?.data?.eventData.length < 1 && (
            <div className="flex items-center justify-center flex-col data-not-found">
              <i className="icon-event-management"></i>
              {/* {`You haven't attended any events yet.`} */}
              {i18n.t(`myAccount.attendedEvent.noboughtExpmyAccount`)}
            </div>
          )}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 3xl:gap-8">
            {isLoading ? (
              <>
                {Array.from({ length: 3 }).map((_, j) => {
                  return (
                    <React.Fragment key={j}>
                      <EventCardWebSkeleton />
                    </React.Fragment>
                  );
                })}
              </>
            ) : (
              <>
                {userProfileData?.data?.eventData?.map((item, index) => {
                    const duration = EventRecurrence?.find((e)=>e?.id === item?.duration)
                  return (
                    <React.Fragment key={index}>
                      <EventCardWeb
                        category={item?.category}
                        item={item}
                        OrganizerProfile={1}
                        duration={duration}
                      />
                    </React.Fragment>
                  );
                })}
              </>
            )}
          </div>
          {totalCount > 9 && (
            <Pagination
              totalCount={totalCount}
              setCurrentPage={(e) => setCurrentPage(e)}
              activePage={currentPage}
              TotalLimit={TotalLimit}
              className="mt-32"
              pageCount={Math?.ceil(totalCount / TotalLimit)}
            />
          )}
        </div>
      </section>
    </>
  );
};
