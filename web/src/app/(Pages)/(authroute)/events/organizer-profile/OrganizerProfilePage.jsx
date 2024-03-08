'use client'
import React, { useEffect, useState } from 'react'
import OrganizerProfile from '@/app/components/OrganizerProfile/OrganizerProfile'
import EventsLists from './EventsLists/EventsLists'
import { useDispatch, useSelector } from 'react-redux'
import { asyncOrganizerprofile } from '../../../../../../redux/Thunks/User/organizerprofile.thunk'
import { useRouter, useSearchParams } from 'next/navigation'
import EventCardWebSkeleton from '@/app/components/EventCardWeb/EventCardWebSkeleton'
import { errorOrganizerProfile } from '../../../../../../redux/slices/User/organizerprofile'
import {UserTermsAndConditionsViewThunk} from '../../../../../../redux/Thunks/User/TermsAndConditions/termsandconditions.thunk'
const OrganizerProfilePage = () => {
  const search = useSearchParams()
  const router = useRouter()
  const organizerId = search.get('organizerId')
  // console.log('organizerId',organizerId)
  const dispatch = useDispatch()
  const { organizerProfileData, isLoading,error} = useSelector((m) => m.organizerprofile)
  const { ActiveTab } = useSelector((m) => m.organizerprofile)
  // console.log('ActiveTab',ActiveTab)
  // console.log('organizerProfileData',organizerProfileData)

  useEffect(() => {
    let obj = {}
    obj.web = true
    obj.userId = organizerId
    if(ActiveTab === 1){
      obj.hosted = true
    }
    if(ActiveTab === 2){
      obj.upcoming = true
    }
    // console.log('obj',obj)
    dispatch(asyncOrganizerprofile(obj))
  },[ActiveTab])

  useEffect(() => {
    if(organizerId){
        dispatch(UserTermsAndConditionsViewThunk({userId : organizerId}));
    }
  }, [organizerId])
  

  useEffect(()=> {
    if(!!error){
      router.push("/events/") 
      dispatch(errorOrganizerProfile())
    }
  },[error])

  

  return (
    <>
        <OrganizerProfile ProfileData={organizerProfileData?.data?.organizerDetails} activeTab={ActiveTab} isLoading={isLoading}/>
        {isLoading ? (
          <>
          <div className='events-wraps mb-120 organizer-events-wrap'>
              <div className='container'>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
                  {Array.from({ length: 4 }).map((_, j) => {
                  return (
                      <React.Fragment key={j}>
                      <EventCardWebSkeleton />
                      </React.Fragment>
                  );
                  })}
                </div>
              </div>
          </div>
          </>
      ) : (
          <>
          <EventsLists eventData={organizerProfileData?.data?.eventData} activeTab={ActiveTab} />
          </>
      )
      
  }
       
    </>
  )
}

export default OrganizerProfilePage