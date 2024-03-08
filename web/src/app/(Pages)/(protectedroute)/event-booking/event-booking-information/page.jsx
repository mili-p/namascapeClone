import React from 'react'
import './event-booking-information.scss'
import SiteBreadcrumb from '@/app/components/SiteBreadcrumb/SiteBreadcrumb';
import H2 from '@/app/components/common/h2';
import EventTable from '../EventTable';
import Image from 'next/image';
import H3 from '@/app/components/common/h3';

const page = () => {
    const BreadcrumbData = [
        {
            title: "Home",
            url: "/dashboard/",
        },
        {
          title: "Event Bookings",
          url: "/booking-details/",
        },
        {
            title: "Event Booking Information",
        }
    ];
  return (
    <>
        <div className='event-booking-information'>
            <SiteBreadcrumb
                BreadcrumbData={BreadcrumbData}
                className="protected-breadcrumb"
            />
            <div className='protected-head'><H2>Event booking information</H2></div>
            <div className='sm:flex sm:items-center bg-white mt-32 event-information-detail'>
                <div className="image-wrapper">
                    <Image src="/assets/images/slider-image.png" alt="event-image" width={222} height={150}/>
                    <span className="badge">Retreat</span>
                </div>
                <div className='content-wrapper'>
                    <p className='date'>Fri, 03 Nov</p>
                    <p className='time'>10:00 - 11:00 AM</p>
                    <H3 className='title'>Develop a Unique and Compelling Theme</H3>
                </div>
            </div>
            <div className='mt-32'>
                <EventTable />
            </div>
        </div>
    </>
  )
}

export default page