'use client'
import React from 'react'
import "./EventAttendeesUsers.scss";
import UserAttendeesCard from '@/app/components/UserAttendeesCard/UserAttendeesCard';
import H2 from '@/app/components/common/h2';
import UserAttendeesCardSkeleton from '@/app/components/UserAttendeesCard/UserAttendeesCardSkeleton';
import { useTranslation } from 'react-i18next';
import Pagination from '@/app/components/Pagination/Pagination'
import { useState } from 'react';

const EventAttendeesUsers = ({ AttendeesData, isLoading }) => {
  const {i18n} = useTranslation()
  const TotalLimit = 10
  const [currentPage,setCurrentPage] = useState(1)
  const AttendeesCard = [
    {
      profileImage: '/assets/images/user.png',
      userName: 'Sípos Veronika'
    },
    {
      profileImage: '/assets/images/user.png',
      userName: 'Sípos Veronika'
    },
    {
      profileImage: '/assets/images/user.png',
      userName: 'Sípos Veronika'
    },
    {
      profileImage: '/assets/images/user.png',
      userName: 'Sípos Veronika'
    },
    {
      profileImage: '/assets/images/user.png',
      userName: 'Sípos Veronika'
    },
    {
      profileImage: '/assets/images/user.png',
      userName: 'Sípos Veronika'
    },
    {
      profileImage: '/assets/images/user.png',
      userName: 'Sípos Veronika'
    },
    {
      profileImage: '/assets/images/user.png',
      userName: 'Sípos Veronika'
    },
    {
      profileImage: '/assets/images/user.png',
      userName: 'Sípos Veronika'
    },
    {
      profileImage: '/assets/images/user.png',
      userName: 'Sípos Veronika'
    },
    {
      profileImage: '/assets/images/user.png',
      userName: 'Sípos Veronika'
    },
    {
      profileImage: '/assets/images/user.png',
      userName: 'Sípos Veronika'
    }
  ]

  return (
    <section className="attende-users-section pt-120 pb-120">
      <div className="container">
        <div className="attende-users-wrapper">
           <H2 className="title mb-50">{i18n.t(`useEvent.eventAttendees2`)}</H2> {/* <span>{AttendeesData?.meta?.totalCount}</span>*/}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-5 2xl:gap-8 wrap-users-details">
            {isLoading ?
              <>
                {Array.from({ length: 6 }).map((_, j) => {
                  return (
                    <React.Fragment key={j}>
                      <UserAttendeesCardSkeleton />
                    </React.Fragment>
                  );
                })}
              </>
              :
              <>
                {AttendeesData?.data?.userData.map((item, i) => {
                  return (
                    <React.Fragment key={i}>
                      <UserAttendeesCard item={item} />
                    </React.Fragment>
                  )
                })
                }

              {/* {AttendeesData?.data?.userData?.length > 9 && (
                  <Pagination
                    // totalCount={totalCount}
                    setCurrentPage={(e) => {
                      setCurrentPage(currentPage+1)
                      console.log(currentPage+1,"QQQQQQQQQQQQQQQQQQQQQQQQQQQQQ")
                      }
                    }
                    activePage={currentPage}
                    TotalLimit={TotalLimit}
                    className="mt-32"
                    // pageCount={Math?.ceil(totalCount / TotalLimit)}
                  />
                )} */}


              </>
            }
          </div>
        </div>
      </div>
    </section>
  )
}

export default EventAttendeesUsers