'use client'
import React, { useEffect, useState } from 'react'
import AccountProfileHead from './AccountProfileHead/AccountProfileHead'
import { AttendedEvents } from './AttendedEvents/AttendedEvents'
import { useDispatch, useSelector } from 'react-redux'
import { asyncOtherUserProfile } from '../../../../../../redux/Thunks/User/otheruserprofile.thunk'

const MyAccountMain = ({params}) => {
    const dispatch = useDispatch()
    const { userOtherProfileData, totalCount, isLoading } = useSelector((m) => m.otheruserprofile);
    const [currentPage, setCurrentPage] = useState(1);
    // console.log('totalCount',totalCount)
    // console.log('userProfileData',userProfileData)
    const TotalLimit = 9;
    useEffect(() => {
        dispatch(asyncOtherUserProfile({
            userId: params.userId,
            limit: TotalLimit,
            page: currentPage,
            web : true
        }))
    }, [currentPage])
  return (
    <>
        <AccountProfileHead userProfileData={userOtherProfileData}/>
        <AttendedEvents 
            userProfileData={userOtherProfileData} 
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