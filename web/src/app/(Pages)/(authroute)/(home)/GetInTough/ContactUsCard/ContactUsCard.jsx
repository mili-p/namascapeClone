import ContactUsForm from '@/app/components/ContactUsForm/ContactUsForm'
import H3 from '@/app/components/common/h3'
import React from 'react'
import './ContactUsCard.scss'
import { useTranslation } from 'react-i18next'

const ContactUsCard = () => {
 const {t,i18n} = useTranslation()
  return (
    <>
        <div className='contact-us-card'>
            <H3 className={'h2'}>{i18n.t(`contactus.title`)}</H3>
            <ContactUsForm/>
        </div>
    </>
  )
}

export default ContactUsCard