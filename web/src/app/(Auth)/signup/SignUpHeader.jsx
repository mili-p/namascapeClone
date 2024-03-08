'use client'
import React from 'react'
import { useSearchParams } from "next/navigation";
import LRFHeader from '@/app/components/common/LRFHeader';
import { useTranslation } from 'react-i18next';

const SignUpHeader = () => {
    const {i18n} = useTranslation()
    const search = useSearchParams()
    const userTypeQuery = search.get('type')
    return (
        <LRFHeader
            title={userTypeQuery === 'organizer' ? i18n.t(`signup.orgHeader.title`) : i18n.t('signup.Userheader.title')}
            description={userTypeQuery === 'organizer' ? i18n.t(`signup.orgHeader.description`) : i18n.t('signup.Userheader.description')}
        />
    )
}

export default SignUpHeader