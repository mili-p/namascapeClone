'use client'
import React from 'react'
import LRFHeader from '@/app/components/common/LRFHeader';
import { useTranslation } from 'react-i18next';

const ResetPassHeader = () => {
    const {i18n} = useTranslation()
  return (
    <>
        <LRFHeader 
            title={i18n.t(`resetPassword.header.title`)}
            description={i18n.t(`resetPassword.header.description`)}
        />
    </>
  )
}

export default ResetPassHeader