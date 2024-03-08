import React from 'react'
import Skeleton from '@/app/components/Skeleton/Skeleton'
import "./UserAttendeesCard.scss";

const UserAttendeesCardSkeleton = () => {
  return (
    <>
        <div className='user-attend-card flex items-center flex-col '>
            <div className='user-image-box flex items-center justify-center'>
                <Skeleton width={120} height={120}/>
            </div>
            <Skeleton width='100%' height={15} className="mt-3"/>
        </div>
    </>
  )
}

export default UserAttendeesCardSkeleton