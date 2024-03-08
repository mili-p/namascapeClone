'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import H1 from '../../../../components/common/h1'
const PrivacyPolicy = ({data}) => {
  const  {i18n} = useTranslation()
  return (
    <>
    <H1 className="h2">{i18n.t('settings.privacypolicy.title')}</H1>
    <div
      className="policy-content"
      dangerouslySetInnerHTML={{
          __html: data
      }}
    />
</>
  )
}

export default PrivacyPolicy