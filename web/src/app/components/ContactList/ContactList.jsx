'use client'
import React from 'react'
import './ContactList.scss'
import { useTranslation } from 'react-i18next'

const ContactList = ({ getData }) => {
    const {t,i18n} = useTranslation()
    const contactListData = [
        {
            Icon:<><i className='icon-call'></i></>,
            cardTitle: i18n.t('home.GetInTough.ContactList.MobileNumber.cardTitle'),
            Title: `${getData?.data?.country?.dialingCode} ${getData?.data?.phone}`,
            URL: `tel:${getData?.data?.country?.dialingCode}${getData?.data?.phone}`,
        },
        {
            Icon:<><i className='icon-mail'></i></>,
            cardTitle: i18n.t('home.GetInTough.ContactList.EmailAddress.cardTitle'),
            Title: getData?.data?.email,
            URL: `mailto:${getData?.data?.email}`,
        },
        {
            Icon:<><i className='icon-location'></i></>,
            cardTitle: i18n.t('home.GetInTough.ContactList.Address.cardTitle'),
            Title: getData?.data?.address,
        }
    ]
  return (
    <>
        <ul className='contact-list'>
            {contactListData?.map((list,i)=>{
                return(
                    <React.Fragment key={i}>
                        <li>{list?.URL ? 
                                <a href={list.URL} title={list.Title} className='inline-flex items-center gap-2 md:gap-3 xl:gap-4 2xl:gap-6 link' target='_blank'><span className='inline-flex items-center justify-center icon'>{list.Icon}</span> <span className='h3 card-title hidden'>{list.cardTitle}</span> {list.Title}</a> 
                                : 
                                <div className='inline-flex items-center gap-2 md:gap-3 xl:gap-4 2xl:gap-6 link'><span className='inline-flex items-center justify-center icon'>{list.Icon}</span> <span className='h3 card-title hidden'>{list.cardTitle}</span> {list.Title}</div>
                            }
                        </li>
                    </React.Fragment>
                )
            })}
        </ul>
    </>
  )
}

export default ContactList