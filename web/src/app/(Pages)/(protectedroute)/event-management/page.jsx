import React from 'react'
import './event-management.scss'
import EventManagement from './EventManagement'
import { cookies } from 'next/headers'
const page = () => {
  function getAccessTokenCookie() {
    const nextCookies = cookies(); // Get cookies object
    const language = nextCookies.get("language")?.value || "de"
    return language;
  }
  const languageName = getAccessTokenCookie()
  return (
    <>
      <EventManagement languageName={languageName}/>
    </>
  )
}

export default page