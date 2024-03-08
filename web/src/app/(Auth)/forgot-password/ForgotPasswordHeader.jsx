'use client'
import React from 'react'
import LRFHeader from '@/app/components/common/LRFHeader';
import { useTranslation } from 'react-i18next'

const ForgotPasswordHeader = () => {
    const {i18n} = useTranslation()
  return (
    <>
       <LRFHeader
          title= {i18n.t(`forgotpassword.header.title`)}
          description={i18n.t(`forgotpassword.header.description`)}
        />
    </>
  )
}

export default ForgotPasswordHeader