'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import InnerBanner from '../InnerBanner/InnerBanner'
const InnerDataTitleCM = ({ heading,bredcrumbTitle }) => {
    const { i18n } = useTranslation()
    const BreadcrumbData = [
        {
            title: i18n.t(`useEvent.headerTitle.homeTitle`),
            url: '/'
        },
        {
            title: i18n.t(`useEvent.headerTitle.${[bredcrumbTitle]}`)
        }
    ]
const heading1 = i18n.t(`useEvent.headerTitle.${heading}`)
   
    return (
        <>
            <InnerBanner
                BreadcrumbData={BreadcrumbData}
                heading={heading1}
                className="mb-120"
            />
        </>
    )
}

export default InnerDataTitleCM
