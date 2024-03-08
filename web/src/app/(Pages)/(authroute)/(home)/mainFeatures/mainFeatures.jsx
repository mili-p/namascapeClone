'use client'
import React, { useState } from 'react'
import H2 from '@/app/components/common/h2'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import './mainFeatures.scss'
import 'swiper/css';
import 'swiper/css/pagination';
import { useTranslation } from 'react-i18next'

const MainFeatures = () => {
    const {t,i18n} = useTranslation()
    const MainFeatures = [
        {
            title:i18n.t('home.MainFeatures.map.title1'),
            description:i18n.t('home.MainFeatures.map.description1'),
            image:'/assets/images/home-screen-image.webp'
        },
        {
            title:i18n.t('home.MainFeatures.map.title2'),
            description:i18n.t('home.MainFeatures.map.description2'),
            image:'/assets/images/organizer-screen-image.webp'
        },
        {
            title:i18n.t('home.MainFeatures.map.title3'),
            description:i18n.t('home.MainFeatures.map.description3'),
            image:'/assets/images/e-ticket-screen-image.webp'
        }
    ]

  return (
    <>
        <section className='main-features pt-120'>
            <div className="container">
                <div className="title-wrapper">
                    <H2 className="title">{i18n.t('home.MainFeatures.title')}</H2>
                    {/* <p>{i18n.t('home.MainFeatures.description')}</p> */}
                </div>
                <div className='main-features-list'>
                    <Swiper
                        slidesPerView={2}
                        spaceBetween={16}
                        pagination={{
                            clickable: true,
                        }}
                        breakpoints={{
                            481: {
                                slidesPerView: 2,
                                spaceBetween: 16,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 16,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            1440:{
                                slidesPerView: 3,
                                spaceBetween: 32,
                            }
                        }}
                        modules={[Pagination]}
                        className="mySwiper"
                        >
                        
                            {MainFeatures?.map((list,i)=>{
                                return(
                                    <React.Fragment key={i}>
                                        <SwiperSlide className='features-card text-center'>
                                            <h3>{list.title}</h3>
                                            <p>{list.description}</p>
                                            <div className="image-wrapper">
                                                <Image src={list.image} alt={list.title} width={380} height={368} sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw" />
                                            </div>
                                        </SwiperSlide>
                                    </React.Fragment>
                                )
                            })}
                    
                    </Swiper>
                </div>
            </div>
        </section>
    </>
  )
}

export default MainFeatures