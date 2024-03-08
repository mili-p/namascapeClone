import React from "react";
import EventAttendeesMain from "./EventAttendeesMain";
import { cookies } from "next/headers";

const page = ({params}) => {
  function getAccessTokenCookie() {
    const nextCookies = cookies(); // Get cookies object
    const language = nextCookies.get("language")?.value || "de";
    return language;
  }
  const languageName = getAccessTokenCookie()
  return (
    <>
      <EventAttendeesMain params={params} languageName={languageName}/>
    </>
  );
};

export default page;
