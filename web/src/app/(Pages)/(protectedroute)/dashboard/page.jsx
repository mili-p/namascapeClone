import React from 'react'
import Dashboard from './Dashboard'
import { cookies } from 'next/headers';




const Page = () => {
  function getAccessTokenCookie() {
    const nextCookies = cookies(); // Get cookies object
    const language = nextCookies.get("language")?.value || "de";
    return language;
  }
  const languageName = getAccessTokenCookie()
  return (
    <Dashboard languageName={languageName} />
  )
}

export default Page