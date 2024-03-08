import dynamic from "next/dynamic";
import React from "react";
import EventForm from "./EventForm";
import { cookies } from "next/headers";
// const EventForm = dynamic(() => import("./EventForm"), { ssr: false });

const page = () => {
  function getAccessTokenCookie() {
    const nextCookies = cookies(); // Get cookies object
    const language = nextCookies.get("language")?.value || "de";
    return language;
  }
  const languageName = getAccessTokenCookie()
  return <EventForm languageName={languageName}/>;
};

export default page;
