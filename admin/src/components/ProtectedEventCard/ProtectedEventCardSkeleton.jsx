import React from 'react'
import './ProtectedEventCard.scss'
import Skeleton from '../../components/Skeleton'

const ProtectedEventCardSkeleton = () => {
  return (
    <>
        <div className="flex items-stretch flex-col sm:flex-row w-full protected-event-card skeleton-event-card">
            <div className="image-wrapper">
                <Skeleton />
            </div>
            <div className='flex items-center w-full content-wrapper'>
                <div className='flex items-start flex-col gap-3 w-full'>
                    <Skeleton  width='60%' height={20}/>
                    <Skeleton  width='40%' height={10}/>
                    <Skeleton  width='100%' height={30}/>
                    <Skeleton  width='40%' height={10}/>
                    <ul  className='flex items-center flex-wrap about-list m-0'>
                        <li className='items-center '><Skeleton  width='100%' height={30}/></li>
                        <li className='items-center '><Skeleton  width='100%' height={30}/></li>
                    </ul>
                </div>
            </div>
        </div>
    </>
  )
}

export default ProtectedEventCardSkeleton