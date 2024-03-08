'use client'
import React from 'react'
import './WhatWeDo.scss'
import Image from 'next/image'
import H2 from '@/app/components/common/h2'
import H4 from '@/app/components/common/h4'
import { useTranslation } from 'react-i18next'

const WhatWeDo = ({data}) => {
    const {i18n} = useTranslation()
  return (
    <>
        <section className='what-we-do pt-120'>
            <div className="container">
                <div className='lg:flex lg:items-stretch lg:flex-row what-we-card'>
                    <div className='lg:w-1/2 xl:w-3/5 content-wrapper flex items-center'>
                        <div className='policy-content title-wrapper'>
                            <H2 className="title">{i18n.t('aboutUs.WhatWeDo.title')}</H2>
                            <H4 className="title">{i18n.t('aboutUs.WhatWeDo.subtitle')}</H4>
                            {/* <p>{i18n.t('aboutUs.WhatWeDo.description1')}</p>
                            <p>{i18n.t('aboutUs.WhatWeDo.description2')}</p> */}
                            <div dangerouslySetInnerHTML={{__html: data}} className='ck-data'/>
                        </div>
                    </div>
                    <div className='lg:w-1/2 xl:w-3/5 image-wrapper'>
                        <Image src={'/assets/images/This-is-for-you-if.jpg'} alt="about image" title="about image" width={773} height={660} sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw" />
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default WhatWeDo