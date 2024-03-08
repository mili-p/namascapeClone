
import React from 'react'
import EventBooking from './EventBooking'
import { cookies } from 'next/headers';

const page = () => {
  function getAccessTokenCookie() {
    const nextCookies = cookies(); // Get cookies object
    const language = nextCookies.get("language")?.value || "de"
    return language;
  }
  const languageName = getAccessTokenCookie()
  return (
    <EventBooking languageName={languageName}/>
  )
}

export default page