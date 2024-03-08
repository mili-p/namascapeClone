import React from "react";
import RelatedEvents from "./RelatedEvents/RelatedEvents";
import EventDeatils from "./EventDeatils/EventDeatils";
import UserBreadCrumb from "@/app/components/UserBreadCrumb/UserBreadCrumb";
import AboutEvent from "./AboutEvent/AboutEvent";
import EventAttendees from "./EventAttendees/EventAttendees";
import getEventDetails from "@/utils/ssrapi/user/geteventdetails";
import { notFound } from "next/navigation";
import dynamicTitle from "@/utils/commonfn/dynamicMetaFunction";
import { cookies } from "next/headers";
import RecurrenceEvent from "./RecurrenceEvent/RecurrenceEvent";

const metaTitleDE = {
  sponsored: "Sponsored",
  event: "Events",
  classes: "Klassen",
  treats: "Treats",
  retreats: "Retreats",
  coachings: "Coachings",
  trainings: "Trainings",
};

export async function generateMetadata({ params }) {
  const Capitalize =
    params?.category?.charAt(0).toUpperCase() + params?.category.slice(1);
  return {
    title: dynamicTitle({
      de: `Namascape - ${metaTitleDE[params?.category]}`,
      en: `Namascape - ${params?.category === "event" ? "Events" : Capitalize}`,
    }),
    description: dynamicTitle({
      de: `Namascape - ${metaTitleDE[params?.category]}`,
      en: `Namascape - ${params?.category === "event" ? "Events" : Capitalize}`,
    }),
    // openGraph: {
    //        images: "/assets/images/ogimages/og-about-us.jpg",
    //      }
  };
}

const page = async ({ params }) => {
  const eventDetails = await getEventDetails(params?.id);
  // const breadcrumbItems = [
  //   { name: "Home", url: "/" },
  //   { name: `${params.category}`, url: `/events/${params.category}/` },
  //   { name: `Experiences Details`, url: `/events/${params.category}/${params.id}/` },
  // ];

  function getAccessTokenCookie() {
    const nextCookies = cookies(); // Get cookies object
    const language = nextCookies.get("language")?.value || "de";
    return language;
  }
  const languageName = getAccessTokenCookie();

  if (!eventDetails?.data) {
    notFound();
  }
  return (
    <>
      {/* <section className="user-bread-crumb-wrapper">
        <div className="container">
          <UserBreadCrumb items={breadcrumbItems} />
        </div>
      </section> */}

      <EventDeatils
        eventDetails={eventDetails?.data}
        languageName={languageName}
      />
      <AboutEvent eventDetails={eventDetails?.data} />
      {eventDetails?.data?.otherRecurringEventData?.length > 0 && (
        <RecurrenceEvent
          otherRecurringEventData={eventDetails?.data?.otherRecurringEventData}
          languageName={languageName}
          category={params?.category}
        />
      )}
      {eventDetails?.data?.eventAttendees?.length > 0 && (
        <EventAttendees eventDetails={eventDetails?.data} params={params} />
      )}

      {eventDetails?.data?.relatedEvents?.length > 0 && (
        <RelatedEvents eventDetails={eventDetails?.data} />
      )}
    </>
  );
};

export default page;
