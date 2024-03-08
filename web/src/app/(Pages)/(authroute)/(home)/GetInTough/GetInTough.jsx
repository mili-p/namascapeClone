'use client'
import React from 'react'
import './GetInTough.scss'
import H2 from '@/app/components/common/h2'
import ContactList from '@/app/components/ContactList/ContactList'
import ContactUsCard from './ContactUsCard/ContactUsCard'
import { useTranslation } from 'react-i18next'

const GetInTough = ({getData}) => {
    const {t,i18n} = useTranslation()
  return (
    <>
        <section className='get-in-tough'>
            <div className="container">
                <div className='md:flex'>
                    <div className='3xl:w-3/5 md:w-1/2 get-in-content'>
                        <div className='title-wrapper'>
                            <H2 className="title">{i18n.t('home.GetInTough.title')}</H2>
                            <p>{i18n.t('home.GetInTough.description')}</p>
                        </div>
                        <ContactList getData={getData}/>
                    </div>
                    <div className='3xl:w-2/5 md:w-1/2 pt-50 md:p-0'>
                        <ContactUsCard/>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default GetInTough