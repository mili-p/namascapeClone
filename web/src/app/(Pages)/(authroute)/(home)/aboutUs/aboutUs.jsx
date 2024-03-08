'use client'
import React from 'react'
import './aboutUs.scss'
import Image from 'next/image'
import H2 from '@/app/components/common/h2'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import aboutUsImage from '@/public/assets/images/about-us-image.webp'

const AboutUs = () => {
  const {t,i18n} = useTranslation()
  return (
    <section className='about-us pt-120'>
      <div className="container">
          <div className='lg:flex lg:flex-row-reverse lg:justify-end xl:flex-row card-box relative'>
              <div className='lg:w-1/2 xl:w-3/5 content-wrapper'>
                <div className='title-wrapper'>
                  <H2 className="title">{i18n.t('home.AboutUs.title')}</H2>
                  <ul className='moon-list'>
                    <li className='flex items-baseline'> <i className='icon-moon-right-1 moon-icon'></i><p>{i18n.t('home.AboutUs.description1.1')}</p></li>
                    <li className='flex items-baseline'> <i className='icon-moon-right-2 moon-icon'></i> <p>{i18n.t('home.AboutUs.description1.2')}</p> </li>
                    <li className='flex items-baseline'> <i className='icon-moon-right-3 moon-icon'></i> <p>{i18n.t('home.AboutUs.description1.3')}</p> </li>
                    <li className='flex items-baseline'> <i className='icon-moon-full moon-icon'></i> <p>{i18n.t('home.AboutUs.description1.4')}</p> </li>
                  </ul>
                  <ul className='moon-list-reverse'>
                    <li className='flex items-baseline'> <i className='icon-moon-full moon-icon'></i> <p>{i18n.t('home.AboutUs.description2.1')}</p> </li>
                    <li className='flex items-baseline'> <i className='icon-moon-left-3 moon-icon'></i> <p>{i18n.t('home.AboutUs.description2.2')}</p> </li>
                    <li className='flex items-baseline'> <i className='icon-moon-left-2 moon-icon'></i> <p>{i18n.t('home.AboutUs.description2.3')}</p> </li>
                    <li className='flex items-baseline'> <i className='icon-moon-left-1 moon-icon'></i> <p>{i18n.t('home.AboutUs.description2.4')}</p> </li>
                  </ul>
                  {/* <p>{i18n.t('home.AboutUs.description1')}</p>
                  <p>{i18n.t('home.AboutUs.description2')}</p> */}
                </div>
                {/* <Link href="/signin?type=organizer" className='solid-btn'>{i18n.t('home.AboutUs.link')}</Link> */}
              </div>
              <div className='lg:w-1/2 xl:w-3/5 image-wrapper xl:absolute'>
                  <Image src={"/assets/images/about-us-image.webp"} alt="about image" width={942} height={747} sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw" />
              </div>
          </div>
      </div>
    </section>
  )
}

export default AboutUs