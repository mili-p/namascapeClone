'use client'
import React, { useEffect, useState } from 'react'
import H3 from '@/app/components/common/h3'
import Image from 'next/image'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import Skeleton from '@/app/components/Skeleton/Skeleton'
import { useTranslation } from 'react-i18next'

const AboutEventOrganizer = ({ eventDetails }) => {
    const {i18n} = useTranslation()
    const { userData } = useSelector((m) => m.authentication)
    const [first, setfirst] = useState(null)

    useEffect(() => {
        setfirst(userData)
    }, [userData])


    return (
        <>
            {first  ? (
                <>
                    <div className="w-full lg:w-1/2 xl:w-2/5 event-organizer-box">
                        <Link
                            href={`/events/organizer-profile?organizerId=${eventDetails?.eventData?.userId}`}
                            className="link"
                        ></Link>
                        <div className="organizer-title flex items-center gap-3 md:gap-5">
                            <div className="usersicon">
                                <Image
                                    src={
                                        eventDetails?.eventData?.user
                                            ?.profileImage
                                    }
                                    alt="user image"
                                    width={64}
                                    height={64}
                                />
                            </div>
                            <div className="content-user">
                                <H3>{`${eventDetails?.eventData?.user?.firstName} ${eventDetails?.eventData?.user?.lastName}`}</H3>
                                <p>{i18n.t(`useEvent.partner`)}</p>
                            </div>
                        </div>
                        {eventDetails?.eventData?.user?.bio && (
                            <p>{eventDetails?.eventData?.user?.bio}</p>
                        )}
                    </div>
                </>
            ) : (
                <>
                    <div className="w-full lg:w-1/2 xl:w-2/5 event-organizer-box">
                        <div className="organizer-title flex items-center gap-3 md:gap-5">
                            <div
                                className="usersicon"
                                style={{ flexShrink: '0' }}
                            >
                                <Skeleton width={64} height={64} />
                            </div>
                            <div
                                className="content-user"
                                style={{ width: '100%' }}
                            >
                                <Skeleton
                                    width="75%"
                                    height={20}
                                    className="mb-2"
                                />
                                <Skeleton width="40%" height={15} />
                            </div>
                        </div>
                        <Skeleton width="100%" height={10} className="mb-1" />
                        <Skeleton width="100%" height={10} />
                        <Skeleton width="100%" height={10} />
                    </div>
                </>
            )}
        </>
    )
}

export default AboutEventOrganizer
