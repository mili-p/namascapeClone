'use client'
import React, { useEffect, useState } from 'react'
import './AboutUsSection.scss'
import H2 from '@/app/components/common/h2'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

const AboutUsSection = ({data}) => {
    const {i18n} = useTranslation()
    const [isLogin, setisLogin] = useState(null)
    const {userData} = useSelector((g) => g?.authentication)
    const userDATA  = typeof localStorage !== "undefined" ? localStorage.getItem('userData') : null
    useEffect(() => {
        setisLogin(userDATA)
    }, [userDATA])

   

  return (
    <>
        <section className='about-us-section pt-120'>
            <div className="container">
                <div className='lg:flex lg:flex-row lg:justify-end about-inner relative'>
                    <div className='lg:w-1/2 xl:w-4/5 flex items-center content-wrapper'>
                    {/* <div
                        className="policy-content"
                        dangerouslySetInnerHTML={{
                            __html: data
                        }}
                    />   */}

                        <div>
                            <div className='policy-content title-wrapper'>
                                <H2 className="title">{i18n.t('aboutUs.AboutUsSection.title')}</H2>
                                <div dangerouslySetInnerHTML={{__html: data}} className='ck-data'/>
                            </div>
                            {!isLogin ? 
                            <Link href="/signup?type=organizer" className='solid-btn'>{i18n.t('aboutUs.AboutUsSection.link')}</Link> : "" }
                        </div>
                    </div>
                    <div className='lg:w-1/2 xl:absolute image-wrapper'>
                        <Image src={'/assets/images/about-us1.jpeg'} alt="about image" title="about image" width={785} height={733} sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw" />
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default AboutUsSection