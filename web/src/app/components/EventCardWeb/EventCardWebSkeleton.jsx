import React from 'react'
import './EventCardWeb.scss'
import Skeleton from '@/app/components/Skeleton/Skeleton'
import H3 from '@/app/components/common/h3'

const EventCardWebSkeleton = ({OrganizerProfile}) => {
  return (
    <>
        <div className="event-card-web w-full">
            <div className="event-image-box relative">
                <Skeleton width='100%' height='100%' />
            </div>
            <div className="event-card-content">
                <H3><Skeleton width='100%' height={20} /></H3>
                <p className="description">
                    <Skeleton width='100%' height={15} count={3}/>
                </p>
                {OrganizerProfile === 2 && 
                <div className="flex items-center justify-between price-wrap">
                    <Skeleton width={100} height={20} />
                    <Skeleton width={100} height={40} />
                </div>
                }
            </div>
        </div>
    </>
  )
}

export default EventCardWebSkeleton