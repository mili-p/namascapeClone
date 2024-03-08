import React from 'react'
import './ProtectedHostedEventCard.scss'
import Skeleton from '@/app/components/Skeleton/Skeleton'

const ProtectedHostedEventCardSkeleton = () => {
  return (
    <>
        <div className="flex items-stretch flex-col sm:flex-row w-full protected-hosted-event-card">
            <div className="w-full">
                <Skeleton width="40%" height={20}/>
                <br />
                <Skeleton width="30%" height={10} className="mb-1"/>
                <br />
                <Skeleton width="90%" height={20} className="mb-4"/>
                <div className="flex items-center image-wrapper">
                    {Array.from({ length: 3 }).map((_, j) => {
                    return (
                        <>
                            <Skeleton width={35} height={35}/>
                        </>
                    );
                    })}
                </div>
                <div className="text-end">
                <Skeleton width="20%" height={15}/>
                </div>
            </div>
        </div>
    </>
  )
}

export default ProtectedHostedEventCardSkeleton