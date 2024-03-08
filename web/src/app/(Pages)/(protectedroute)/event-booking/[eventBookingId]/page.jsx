
import React from 'react'
import "./booking-details.scss";
import OrganizerBookingDetails from './OrganizerBookingDetails'
import { cookies } from 'next/headers';

const BookingDetails = ({params}) => {
  function getAccessTokenCookie() {
    const nextCookies = cookies(); // Get cookies object
    const language = nextCookies.get("language")?.value || "de"
    return language;
  }
  const languageName = getAccessTokenCookie()
  return (
    <OrganizerBookingDetails eventBookingId = {params?.eventBookingId} languageName={languageName}/>
  )
}

export default BookingDetails