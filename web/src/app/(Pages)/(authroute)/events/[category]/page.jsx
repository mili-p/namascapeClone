import React from "react";
import EventsCategory from "./EventsCategory";
import { notFound } from "next/navigation";
import dynamicTitle from "@/utils/commonfn/dynamicMetaFunction";
import { cookies } from "next/headers";


const page = ({ params }) => {
  // const breadcrumbItems = [
  //   { name: "Home", url: "/" },
  //   { name: `${params?.category === "event" ? "events" : params?.category}`, url: `/events/${params?.category}/` },
  // ];
  // 'gatherings-event'

  const categoryUrl = [
    "sponsored",
    "classes",
    "retreats",
    "event",
    "treats",
    // 'all-event',
    "trainings",
    "coachings",
  ];
  if (!categoryUrl.includes(params?.category)) {
    notFound();
  }
  function getAccessTokenCookie() {
    const nextCookies = cookies(); // Get cookies object
    const language = nextCookies.get("language")?.value || "de";
    return language;
  }
  const languageName = getAccessTokenCookie()
  return (
    <>
      <EventsCategory params={params} languageName={languageName} />
    </>
  );
};

const metaTitleDE= {
  sponsored : "Sponsored",
  event: 'Events',
  classes : "Klassen",
  treats: 'Treats',
  retreats: 'Retreats',
  coachings: 'Coachings',
  trainings: 'Trainings'
}


export async function generateMetadata({ params }) {

  const Capitalize = params?.category?.charAt(0).toUpperCase() + params?.category.slice(1)
  return { 
    // title: `NamaScape - ${params?.category === "event" ? "Events" :Capitalize}`,
    openGraph:{
      images : `${process.env.NEXT_PUBLIC_OG_PURPOSE}/assets/images/ogimages/${params?.category}.jpg`
    },
    title:dynamicTitle({de : `Namascape - ${metaTitleDE[params?.category]}` , en : `Namascape - ${params?.category === "event" ? "Events" :Capitalize}`}), 
    description : dynamicTitle({de : `Namascape - ${metaTitleDE[params?.category]}` , en : `Namascape - ${params?.category === "event" ? "Events" :Capitalize}`})
  };
}

export default page;
