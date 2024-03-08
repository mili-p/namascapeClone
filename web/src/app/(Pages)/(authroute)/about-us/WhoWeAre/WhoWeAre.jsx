'use client'
import H2 from '@/app/components/common/h2'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useTranslation } from 'react-i18next'
import './WhoWeAre.scss'

const WhoWeAre = ({data}) => {
    const {i18n} = useTranslation()
  return (
    <>
        <section className='who-we-are pt-120'>
            <div className="container">
                <div className='lg:flex lg:flex-row-reverse lg:justify-end xl:flex-row card-box relative'>
                    <div className='lg:w-1/2 xl:w-3/5 flex items-center content-wrapper'>
                        <div className='policy-content title-wrapper'>
                            <H2 className="title">{i18n.t('aboutUs.WhoWeAre.heading')}</H2>
                            {/* <h3>{i18n.t('aboutUs.WhoWeAre.Mission.title')}</h3> */}
                            {/* <p>{i18n.t('aboutUs.WhoWeAre.Mission.description')}</p> */}
                            <div dangerouslySetInnerHTML={{__html:data?.ourMissionDo}} className='ck-data'/>

                            {/* <h3>{i18n.t('aboutUs.WhoWeAre.Vision.title')}</h3> */}
                            {/* <div dangerouslySetInnerHTML={{__html:data?.ourVision}} className='ck-data'/> */}
                            {/* <p>{i18n.t('aboutUs.WhoWeAre.Vision.description')}</p> */}
                            {/* <h3>{i18n.t('aboutUs.WhoWeAre.Values.title')}</h3> */}
                            {/* <div dangerouslySetInnerHTML={{__html:data?.ourValues}} className='ck-data'/> */}
                            {/* <p>{i18n.t('aboutUs.WhoWeAre.Values.description')}</p>  */}
                        </div>
                    </div>
                    <div className='lg:w-1/2 xl:w-3/5  xl:absolute image-wrapper'>
                        <Image src={'/assets/images/mission.jpeg'} alt="about image" title="about image" width={942} height={671} sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw" />
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default WhoWeAre