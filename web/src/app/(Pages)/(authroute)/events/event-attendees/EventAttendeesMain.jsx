"use client";
import React, { useEffect, useState } from "react";
import EventDescriptionCard from "./EventDescriptionCard/EventDescriptionCard";
import EventAttendeesUsers from "./EventAttendeesUsers/EventAttendeesUsers";
import { asyncEventAttendees } from "../../../../../../redux/Thunks/User/eventattendees.thunk";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@/app/components/Pagination/Pagination";
import UserBreadCrumb from "@/app/components/UserBreadCrumb/UserBreadCrumb";
import { useTranslation } from "react-i18next";
import { errorEventAttendees } from "../../../../../../redux/slices/User/eventattendees";

const EventAttendeesMain = ({ params, languageName }) => {
  const { i18n } = useTranslation();
  const search = useSearchParams();
  const eventAId = search.get("AId");
  const category = search.get("cId");
  const router = useRouter()
  const dispatch = useDispatch();
  const { eventAttendeesData, isLoading, totalCount ,error} = useSelector(
    (m) => m.eventattendees
  );
  const [currentPage, setCurrentPage] = useState(1);

  const breadcrumbItems = [
    { name: i18n.t(`userBreadcrumb.home`), url: "/" },
    {
      name: `${category === "event" ? "events" : category || "events"}`,
      url: `${category ? `/events/${category}/` : "/events/"}`,
    },
    {
      name: `${i18n.t(`userBreadcrumb.experiencesDetails`)} : ${eventAttendeesData?.data?.eventData?.title}`,
      url: `${category && eventAId ?  `/events/${category}/${eventAId}/` : "/events/"}`,
    },
    {
      name : i18n.t(`userBreadcrumb.boughtby`),
      url: `/events/event-attendees/`
    }
  ];

  const TotalLimit = 12;
  useEffect(() => {
  
      dispatch(
        asyncEventAttendees({
          eventId: eventAId,
          limit: TotalLimit,
          page: currentPage,
        })
      );
  
  }, [currentPage]);

  useEffect(() => {
    if(error){
      router.push('/events/')
      dispatch(errorEventAttendees())
    }
  }, [error])
  

  return (
    <>
      <section className="user-bread-crumb-wrapper">
        <div className="container">
          <UserBreadCrumb items={breadcrumbItems} />
        </div>
      </section>
      {/* <EventDescriptionCard
        eventDetails={eventAttendeesData?.data}
        isLoading={isLoading}
        languageName={languageName}
      /> */}
      {eventAttendeesData?.data?.userData?.length > 0 && (
        <EventAttendeesUsers
          AttendeesData={eventAttendeesData}
          isLoading={isLoading}
        />
      )}
      {eventAttendeesData?.data?.userData?.length > 0 && totalCount > 12 && (
        <Pagination
          totalCount={totalCount}
          setCurrentPage={(e) => {
            setCurrentPage(e);
          }}
          activePage={currentPage}
          TotalLimit={TotalLimit}
          className="mt-32"
          pageCount={Math?.ceil(totalCount / TotalLimit)}
        />
      )}
    </>
  );
};

export default EventAttendeesMain;
