"use client"
import React, { forwardRef } from 'react'
import H2 from "@/app/components/common/h2";
import H3 from '@/app/components/common/h3'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Image from 'next/image';
const PreviewAbout = (_,ref) => {
    const {i18n} = useTranslation()
    const { userDetail } = useSelector((action) => action.viewprofile)
  return (
    <div className="about-event-section pt-120">
        <div className="container">
        <div className="flex items-start flex-col justify-between lg:flex-row gap-6 xl:gap-8">
            <div className="w-full lg:w-1/2 xl:w-3/5 about-contents">
            <div className="event-title-wrapper">
                <H2 className='title'>{i18n.t(`useEvent.aboutEvents`)}</H2>
            </div>
            <pre className='description'>
                {ref?.current?.description && ref?.current?.descriptionDe ? ref?.current?.description : ref?.current?.description ? ref?.current?.description : ref?.current?.descriptionDe ? ref?.current?.descriptionDe : ""  }
            </pre>
            </div>
            <div className="w-full lg:w-1/2 xl:w-2/5 event-organizer-box">
                            {/* <Link
                                href={`/events/organizer-profile?organizerId=${eventDetails?.eventData?.userId}`}
                                className="link"
                            ></Link> */}
                            <div className="organizer-title flex items-center gap-3 md:gap-5">
                                <div className="usersicon">
                                    <Image
                                        src={
                                            userDetail?.data?.profileImage
                                        }
                                        alt="user image"
                                        width={64}
                                        height={64}
                                    />
                                </div>
                                <div className="content-user">
                                    <H3>{`${userDetail?.data?.firstName} ${userDetail?.data?.lastName}`}</H3>
                                    <p>{i18n.t(`useEvent.partner`)}</p>
                                </div>
                            </div>
                            {userDetail?.data?.bio && (
                                <p>{userDetail?.data?.bio}</p>
                            )}
                        </div>
        </div>
        </div>
    </div>
  )
}

export default forwardRef(PreviewAbout)