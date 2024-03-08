'use client'
import React, { useEffect, useState } from 'react'
import AccountProfileHead from './AccountProfileHead/AccountProfileHead'
import { AttendedEvents } from './AttendedEvents/AttendedEvents'
import { useDispatch, useSelector } from 'react-redux'
import { asyncUserProfile } from '../../../../../redux/Thunks/User/userprofile.thunk'

const MyAccountMain = () => {
    const dispatch = useDispatch()
    const { userProfileData, totalCount, isLoading } = useSelector((m) => m.userprofile);
    const UserId = typeof localStorage !== "undefined" ? JSON.parse(localStorage.getItem('userData')) : null
    const [currentPage, setCurrentPage] = useState(1);
    // console.log('totalCount',totalCount)
    // console.log('userProfileData',userProfileData)
    const TotalLimit = 9;
    useEffect(() => {
        dispatch(asyncUserProfile({
            userId: UserId?.data?.userId,
            limit: TotalLimit,
            page: currentPage
        }))
    }, [currentPage])
  return (
    <>
        <AccountProfileHead userProfileData={userProfileData}/>
        <AttendedEvents 
            userProfileData={userProfileData} 
            totalCount={totalCount} 
            currentPage={currentPage} 
            setCurrentPage={setCurrentPage}
            TotalLimit={TotalLimit}
            isLoading={isLoading}
        />
    </>
  )
}

export default MyAccountMain