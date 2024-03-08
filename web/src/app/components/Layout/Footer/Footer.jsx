"use client"
import React, { useEffect, useState } from 'react'
import './footer.scss'
import Link from 'next/link'
import Image from 'next/image'
import {Cinzel } from 'next/font/google'
import { usePathname } from 'next/navigation'
import SocialMedia from '../../SocialMedia/SocialMedia'
import { useTranslation } from 'react-i18next'
import CookiesModal from '@/app/components/SiteModal/CookiesModal/CookiesModal'
import { getCookie } from 'cookies-next';


const cinzel = Cinzel({ subsets: ['latin' ,] , weight: "700" })

const Footer = ({getCookieValueAcceptDecline}) => {
  const cookieModal = getCookie('CookieConsent')
  const [cookie,setCookie] = useState()

//   useEffect(() => {
//     //   dispatch(signInSuccess(userProfile))
//     if (typeof localStorage !== 'undefined') {
//       setCookie(cookieModal)
//     }
// }, [cookie])

  const {t,i18n} = useTranslation()
  const activeURL = usePathname()
  const NavData = {
    Link :[
      {
        text: i18n.t(`Footer.NavData.home.text`),
        url :'/'  
      },
      {
        text: i18n.t(`Footer.NavData.events.text`),
        url :'/events/'  
      },
      {
          text: i18n.t('Footer.NavData.aboutUs.text'),
          url :'/about-us/'  
      },
      {
          text: i18n.t('Footer.NavData.contactUs.text'),
          url :'/contact-us/'  
      },
    ],
  }
  const privacyLinks = [
    {
      title: i18n.t('Footer.privacyLinks.PrivacyPolicy.title'),
      url:'/privacy-policy/',
    },
    {
      title: i18n.t('Footer.privacyLinks.TermsNConditions.title'),
      url:'/terms-and-conditions/',
    },
  ]

  const GetCurrentYear = () => {
    let currentYear = new Date().getFullYear()
    return currentYear
  }

  return (
    <>
      <footer className='site-footer'>
        <div className="top-footer">
          <div className="container">
             <div className='footer-logo-box'>
               <Link href={'/'} title='logo' className='logo'><Image src="/assets/images/footer-logo.svg" width={104} height={104} alt='logo' /></Link>
            </div>
            <div className="inner">
                <div className="col logo-group">
                  <div className='logo-content-wrapper'>
                    {/* <Link href={'/'} title='logo' className='logo'><Image src="/assets/images/footer-logo.svg" width={104} height={104} alt='logo' /></Link> */}
                    <p>{i18n.t('Footer.description')}</p>
                  </div>
                    <ul className='footer-menu'>
                      {NavData.Link?.map((list, i) => {
                        return (
                            <li key={i} className='menu-item'>
                              <Link href={list.url} className= {`menu-link ${cinzel.className} ${list.url===activeURL? "active" : ""}` } title={list.text}>{list.text}</Link>
                            </li>
                        )
                      })}
                    </ul>
                </div>
                <div className='col download-group'>
                    <div className="item">
                      <h2>{i18n.t('Footer.Download.User')}</h2>
                      <div className='download-links'>
                        <Link href={'/'}  title='google play' target='_blank'><Image src="/assets/images/google-play-image.svg" alt='google play' width={173} height={52} /></Link>
                        <Link href={'/'} title='app store' target='_blank'><Image src="/assets/images/app-store-image.svg" alt='app store' width={173} height={52} /></Link>
                      </div>
                    </div>
                    <div className="item">
                      <h2>{i18n.t('Footer.Download.Organizer')}</h2>
                      <div className='download-links'>
                        <Link href={'/'}  title='google play' target='_blank'><Image src="/assets/images/google-play-image.svg" alt='google play' width={173} height={52} /></Link>
                        <Link href={'/'} title='app store' target='_blank'><Image src="/assets/images/app-store-image.svg" alt='app store' width={173} height={52} /></Link>
                      </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
        <div className="bottom-fotter">
          <div className="container">
            <div className="inner">
              <p>{GetCurrentYear()} {i18n.t('Footer.copyRights')}</p>
              <SocialMedia />
              <ul className='privacy-links'>
                  {privacyLinks?.map((list,i)=>{
                    return(
                      <React.Fragment key={i}>
                        <li><Link href={list.url} className= {`${list.url===activeURL? "active" : ""}` }>{list.title}</Link></li>
                      </React.Fragment>
                    )
                  })}
              </ul>
            </div>
          </div>
        </div>
        {/* {cookieModal !== "true" &&    */}
         {/* {!(consentStatus === true || consentStatus === false || consentStatus === undefined)  && */}
            <CookiesModal getCookieValueAcceptDecline={getCookieValueAcceptDecline}/>
          {/* } */}
         {/* }  */}
      </footer>
    </>
  )
}

export default Footer