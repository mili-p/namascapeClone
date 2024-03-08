'use client'
import React, { useEffect, useState } from 'react'
import './EventOrganizer.scss'
import Image from 'next/image'
import H3 from '../common/h3'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

const EventOrganizer = ({className}) => {
    const {t,i18n} = useTranslation()
    const [isLogin, setisLogin] = useState(null)
    const {userData} = useSelector((g) => g?.authentication)
    const userDATA  = typeof localStorage !== "undefined" ? localStorage.getItem('userData') : null
    useEffect(() => {
        setisLogin(userDATA)
    }, [userDATA])

  return (
    <>
    <section className={`even-organizer ${className ? className: ""}`}>
    {!isLogin && 
        <div className="container">
            <div className='md:flex md:items-center md:justify-between even-organizer-card'>
                <div className='content-wrapper'>
                    <H3 className="title">{i18n.t('EventOrganizer.title')}</H3>
                    <p dangerouslySetInnerHTML={{__html : i18n.t('EventOrganizer.description')}}></p>
                    {/* <p>{i18n.t('EventOrganizer.description1')}</p> */}
                    <ul className='event-organizer-listing'>
                        <li className='flex items-center'><i className='icon-checkmark-circle'></i><p>{i18n.t('EventOrganizer.listDesc1')}</p></li>
                        <li className='flex items-center'><i className='icon-checkmark-circle'></i><p>{i18n.t('EventOrganizer.listDesc2')}</p></li>
                        <li className='flex items-center'><i className='icon-checkmark-circle'></i><p>{i18n.t('EventOrganizer.listDesc3')}</p></li>
                        <li className='flex items-center'><i className='icon-checkmark-circle'></i><p>{i18n.t('EventOrganizer.listDesc4')}</p></li>
                    </ul>
                </div>
                <div className='image-wrapper'>
                    <Image src={'/assets/images/even-organizer-image.webp'} width={540} height={300} alt='even-organizer-image' />
                    <Image src={'/assets/images/even-organizer-hover-image.webp'} width={540} height={300} alt='even-organizer-image' className='hover' />
                </div>
                <Link href="/signup?type=organizer" className='solid-btn card-btn shrink-0'>{i18n.t('EventOrganizer.link')}</Link>
            </div>
        </div>
    }
    </section> 
    </>
  )
}

export default EventOrganizer