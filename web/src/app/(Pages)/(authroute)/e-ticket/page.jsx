import React from 'react'
import ETicketMain from './ETicketMain'
import { cookies } from 'next/headers';
import dynamicTitle from '@/utils/commonfn/dynamicMetaFunction';

export async function generateMetadata() {
  return { 
    // title: `NamaScape - ${params?.category === "event" ? "Events" :Capitalize}`,
    // openGraph:{
    //   images : `${process.env.NEXT_PUBLIC_OG_PURPOSE}/assets/images/ogimages/${params?.category}.jpg`
    // },
    title:dynamicTitle({de : `Namascape - E-Ticket` , en : `Namascape - E-Ticket`}), 
    description : dynamicTitle({de : `Namascape - E-Ticket` , en : `Namascape - E-Ticket`})
  };
}
const page = () => {
  function getAccessTokenCookie() {
    const nextCookies = cookies(); // Get cookies object
    const language = nextCookies.get("language")?.value || "de";
    return language;
  }
  const languageName = getAccessTokenCookie()
  return (
    <ETicketMain languageName={languageName}/>
  )
}

export default page