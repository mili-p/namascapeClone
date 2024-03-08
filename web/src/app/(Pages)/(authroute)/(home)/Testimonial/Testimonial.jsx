'use client'
import React, { useState } from 'react'
import H2 from '@/app/components/common/h2'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination , Autoplay } from 'swiper/modules';
import './Testimonial.scss'
import 'swiper/css';
import 'swiper/css/pagination';
import { useTranslation } from 'react-i18next'

const Testimonial = () => {
    const {i18n} = useTranslation()
    const TestimonialContent = [
        {
            image:'/assets/images/testomonial-user-1.png',
            // description: "Namascape has become my primary platform whenever I find myself stuck in the  monotonous cycle of my daily routine. It has been helping me to get out of my head into my body. Exploring three different events through Namascape has proven to be a series of transformative experiences, each offering a unique and enriching journey in itself.",
            description : i18n.t(`home.testimonial.card1.description`),
            UserName : i18n.t(`home.testimonial.card1.userName`),
            userPost : i18n.t('home.testimonial.card1.userPost'),
            id:1
        },
        {
            image:'/assets/images/testimonial3.png',
            // description: "Namascape has simplified my journey into mindfulness. The user-friendly platform and diverse events consistently inspire me to explore new classes. It's a great platform for discovering new experiences and connecting with like-minded individuals.",
            description : i18n.t(`home.testimonial.card2.description`),
            UserName : i18n.t(`home.testimonial.card2.userName`),
            userPost : i18n.t('home.testimonial.card2.userPost'),
            id:2
        },
        // {
        //     image:'/assets/images/testomonial-user-1.webp',
        //     // description: "Namascape has become my primary platform whenever I find myself stuck in the  monotonous cycle of my daily routine. It has been helping me to get out of my head into my body. Exploring three different events through Namascape has proven to be a series of transformative experiences, each offering a unique and enriching journey in itself.",
        //     description : i18n.t(`home.testimonial.card1.description`),
        //     UserName : i18n.t(`home.testimonial.card1.userName`),
        //     userPost : i18n.t('home.testimonial.card1.userPost')
        // },
        // {
        //     image:'/assets/images/testomonial-user-2.webp',
        //     // description: "Namascape has simplified my journey into mindfulness. The user-friendly platform and diverse events consistently inspire me to explore new classes. It's a great platform for discovering new experiences and connecting with like-minded individuals.",
        //     description : i18n.t(`home.testimonial.card2.description`),
        //     UserName : i18n.t(`home.testimonial.card2.userName`),
        //     userPost : i18n.t('home.testimonial.card2.userPost')
        // },
    ]
  return (
    <>
        <section className='testimonial-section pt-120'>
            <div className="container">
                <div className="title-wrapper">
                    <H2 className="title">{i18n.t(`home.testimonial.header`)}</H2>
                </div>
                <div className='testimonial-content'>
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={16}
                        pagination={{
                            clickable: true,
                        }}
                        navigation={true}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 16,
                            },
                            // 768: {
                            //     slidesPerView: 2,
                            //     spaceBetween: 16,
                            // },
                            // 1024: {
                            //     slidesPerView: ,
                            //     spaceBetween: 20,
                            // },
                            // 1440:{
                            //     slidesPerView: 3,
                            //     spaceBetween: 32,
                            // }
                        }}
                        // autoplay={{
                        //     delay: 3000,
                        //     disableOnInteraction: false,
                        //   }}
                        modules={[Pagination , Autoplay]}
                        className="mySwiper"
                        >
                            <div className='flex items-stretch'>
                            {TestimonialContent && TestimonialContent?.map((list,i)=>{
                                return(
                                    <React.Fragment key={list?.id}>
                                        <SwiperSlide className='testimonial-card text-center'>
                                            <div className='image-wrapper'>
                                                <div className="user-img">
                                                    <Image src={list.image} alt='user-image' width={180} height={180} sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw" />
                                                </div>
                                            </div>
                                            <div className='users-reviews'>
                                                <p><i className='icon-quote1'></i> {list.description}<i className='icon-quote-2'></i></p>
                                                <h3>{list.UserName} 
                                                {/* <span className='user-posting'>{list.userPost}</span> */}
                                                </h3>
                                            </div>
                                        </SwiperSlide>
                                    </React.Fragment>
                                )
                            })}
                            </div>
                    </Swiper>
                </div>
            </div>
        </section>
    </>
  )
}

export default Testimonial