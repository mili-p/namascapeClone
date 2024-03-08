
import viewEventAPI from '@/utils/ssrapi/organizer/event'
import React from 'react'
import { cookies } from 'next/headers'
import EventDetails from './EventDetails';
import "./event-details.scss";

const Page = async({params}) => {
  function getAccessTokenCookie() {
    const nextCookies = cookies(); // Get cookies object
    const token = nextCookies.get("authToken")?.value;
    return token;
  }
  const authToken = getAccessTokenCookie()
  function getAccessTokenCookie() {
    const nextCookies = cookies(); // Get cookies object
    const language = nextCookies.get("language")?.value || "de";
    return language;
  }
  const languageName = getAccessTokenCookie()

  const viewData = await viewEventAPI(params?.id,authToken)
  return (
   <EventDetails uniqueId = {params?.id} languageName={languageName}/>
  )
}

export default Page