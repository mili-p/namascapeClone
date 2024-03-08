'use client'
import React from 'react'
import { useSearchParams } from "next/navigation";
import LRFHeader from '@/app/components/common/LRFHeader';
import { useTranslation } from 'react-i18next'

const SignInHeader = () => {
    const search = useSearchParams()
    const userTypeQuery = search.get('type')
    const {i18n} = useTranslation()
    return (
        <LRFHeader
            title={userTypeQuery === 'organizer' ? i18n.t('signin.orgHeader.title') : i18n.t('signin.headerSignin.title')}
            description={userTypeQuery === 'organizer' ? i18n.t('signin.orgHeader.description') : i18n.t('signin.headerSignin.description')}
        />
    )
}

export default SignInHeader