'use client'
import React, { useEffect, useState } from 'react'
import "./EventAttendees.scss";
import H2 from '@/app/components/common/h2';
import Link from 'next/link';
import UserAttendeesCard from '@/app/components/UserAttendeesCard/UserAttendeesCard';
import UserAttendeesCardSkeleton from '@/app/components/UserAttendeesCard/UserAttendeesCardSkeleton';
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';


const EventAttendees = ({eventDetails,params}) => {
  const {i18n} = useTranslation()
  const { userData } = useSelector((m) => m.authentication)
  const { eventDetailsPayment, isLoading } = useSelector((m) => m.eventdetailspayment)

  const eventAttendeesData = eventDetails?.isUserAttendingEvent ? eventDetails : eventDetailsPayment?.data
  const [first, setFirst] = useState(null)
  useEffect(() => {
    setFirst(userData)
  }, [userData])

  return (
      <section className={`events-attendees-section pb-120`}>
        <div className="container">
          <div className="event-title-wrapper flex items-center justify-between flex-wrap">
            {/* <H2>Event Attendees</H2> */}
            <H2 className='title'>{i18n.t(`useEvent.eventAttendees`)}</H2>
            {first ?
              <Link href={`/events/event-attendees/?AId=${eventAttendeesData?.eventData?.eventId}&cId=${params.category}`}>{eventAttendeesData?.eventAttendeesCount} {i18n.t(`useEvent.booked`)}</Link>
              :
              <Link href={''}>{eventAttendeesData?.eventAttendeesCount} {i18n.t(`useEvent.booked`)}</Link>
            }
          </div>
          {first ?
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-5 2xl:gap-8 wrap-users-details">
              {eventAttendeesData?.eventAttendees?.map((item, i) =>{
                return (
                  <React.Fragment key={i}>
                    <UserAttendeesCard item={item} />
                  </React.Fragment>
                )
              })

              }
            </div>
            :
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-5 2xl:gap-8 wrap-users-details">
              <UserAttendeesCardSkeleton/>
              <UserAttendeesCardSkeleton/>
              <UserAttendeesCardSkeleton/>
              <UserAttendeesCardSkeleton/>
              <UserAttendeesCardSkeleton/>
              <UserAttendeesCardSkeleton/>
            </div>
          }
        </div>
      </section>
  )
}

export default EventAttendees