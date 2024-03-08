"use client"
import React, { useEffect, useState } from 'react'
import './banner.scss'
import H1 from '@/app/components/common/h1'
import Link from 'next/link'
import Image from 'next/image'
import {useTranslation} from 'react-i18next'
import { useSelector } from 'react-redux'
import heroImage from '../../../../../../public/assets/images/main.png'
import LoaderBtn from '../../../../components/common/LoaderBtn'


const Banner = () => {
    const {t,i18n} = useTranslation()
    const [isLogin, setisLogin] = useState(null)
    const {userData} = useSelector((g) => g?.authentication)
    const userDATA  = typeof localStorage !== "undefined" ? localStorage.getItem('userData') : null
    useEffect(() => {
        setisLogin(userDATA)
//         generateError()
//         // In another component
// const generateError = () => {
//     throw new Error('Something went wrong!');
//   };
//   };
    }, [userDATA])
    
 return (
    <section className='banner'>
        <div className="container h-full">
            <div className='flex items-center h-full'>
                <div className='w-1/2 banner-content'>
                    <H1 className="title">{i18n.t('home.Banner.title')}</H1>
                    <p dangerouslySetInnerHTML={{__html : i18n.t('home.Banner.description')}}></p>

                    {/* {!isLogin ?  */}
                        <Link href={'/events/'} className='solid-btn banner-btn'>{i18n.t('home.Banner.link')}</Link>
                    {/* // : '' }   */}
                </div>
                <div className='w-1/2 banner-image'>
                    <div className="image-wrapper">
                        <Image src={heroImage} alt='banner image' width={720} height={576} />
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Banner