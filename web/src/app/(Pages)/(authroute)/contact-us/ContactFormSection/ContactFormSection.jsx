'use client'
import ContactUsForm from '@/app/components/ContactUsForm/ContactUsForm'
import SiteMap from '@/app/components/SiteMap/SiteMap'
import H2 from '@/app/components/common/h2'
import React from 'react'
import './ContactFormSection.scss'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'

const ContactFormSection = () => {
    const {t,i18n} = useTranslation()
  return (
    <div className='contact-s-section pb-120'>
        <div className="container">
            <div className="title-wrapper">
                <H2 className="title">{i18n.t('ContactUs.ContactFormSection.title')}</H2>
            </div>
            <div className='lg:flex lg:items-stretch lg:flex-row-reverse card-group'>
                <div className='lg:w-1/2 contact-form'>
                    <ContactUsForm/>
                </div>
                <div className='lg:w-1/2'>
                    {/* <SiteMap/> */}
                    <Image src={'/assets/images/contact-us.jpg'} alt="about image" title="about image" width={942} height={671} sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default ContactFormSection