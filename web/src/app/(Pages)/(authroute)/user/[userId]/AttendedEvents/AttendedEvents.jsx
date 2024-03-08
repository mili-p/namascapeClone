'use client'
import EventCardWeb from '@/app/components/EventCardWeb/EventCardWeb'
import H2 from '@/app/components/common/h2'
import React from 'react'
import './AttendedEvents.scss'
import i18n from '@/i18n/i18n'
import Pagination from '@/app/components/Pagination/Pagination'
import EventCardWebSkeleton from '@/app/components/EventCardWeb/EventCardWebSkeleton';

export const AttendedEvents = ({ userProfileData, totalCount, currentPage, setCurrentPage, TotalLimit, isLoading }) => {
  return (
    <>
      <section className='my-account-attended-events pt-120 pb-120'>
        <div className="container">
          <div className='event-title-wrapper flex items-center justify-between flex-wrap'>
            {/* <H2>Attended Events</H2> */}
            <H2 className="title">{i18n.t(`myAccount.attendedEvent.eventTitles`)}</H2>
          </div>
          <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6 3xl:gap-8'>
            {isLoading ?
              <>
                {Array.from({ length: 3 }).map((_, j) => {
                  return (
                    <React.Fragment key={j}>
                      <EventCardWebSkeleton />
                    </React.Fragment>

                  );
                })}
              </>
              :
              <>
                {userProfileData?.data?.eventData?.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <EventCardWeb
                        item={item}
                        OrganizerProfile={1}
                      />
                    </React.Fragment>
                  )
                })}
              </> 
            }
          </div>
          {totalCount > 9 && (
            <Pagination
              totalCount={totalCount}
              setCurrentPage={(e) => setCurrentPage(e)}
              activePage={currentPage}
              TotalLimit={TotalLimit}
              className='mt-32'
              pageCount={Math?.ceil(totalCount / TotalLimit)}
            />
          )}

          {userProfileData?.data?.eventData?.length <= 0  &&  
                  <div className="data-not-found">{i18n.t(`myAccount.attendedEvent.noBoughtExp`)}</div>
          }
        </div>
      </section>
    </>
  )
}
