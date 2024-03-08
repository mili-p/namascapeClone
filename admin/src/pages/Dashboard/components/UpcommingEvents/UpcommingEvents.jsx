import React from 'react'
import ProtectedEventCard from '../../../../components/ProtectedEventCard/ProtectedEventCard'
import { Link } from 'react-router-dom'
import { eventmanagement } from '../../../../config/routeConsts'
import ProtectedEventCardSkeleton from '../../../../components/ProtectedEventCard/ProtectedEventCardSkeleton'

const UpcommingEvents = ({ data, isLoading }) => {
    return (
        <div className="bg-white events-card">
            <div className="flex items-center justify-between flex-wrap head">
                <h2>upcoming Experience</h2>
                <Link to={eventmanagement}>See All</Link>
            </div>
            {isLoading ? (
                <>
                    <div className="events-list">
                        {Array.from({ length: 4 }).map((_, j) => {
                            return <ProtectedEventCardSkeleton />
                        })}
                    </div>
                </>
            ) : (
                <>
                    {data?.length > 0 ? (
                        <>
                            <div className="events-list">
                                {data?.map((event, i) => {
                                    return (
                                        <React.Fragment key={i}>
                                            <ProtectedEventCard
                                                eventData={event}
                                            />
                                        </React.Fragment>
                                    )
                                })}
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center justify-center flex-col data-not-found">
                            <i className="icon-event-management"></i>
                            No Events Available
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default React.memo(UpcommingEvents)
