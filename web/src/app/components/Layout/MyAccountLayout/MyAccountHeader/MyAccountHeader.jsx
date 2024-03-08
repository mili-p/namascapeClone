'use client'
import SiteBreadcrumb from '@/app/components/SiteBreadcrumb/SiteBreadcrumb'
import H2 from '@/app/components/common/h2';
import React from 'react'
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';

const MyAccountHeader = () => {

  const pathname = usePathname()
  const {i18n} = useTranslation()

  const BreadcrumbData = [
    {
      title: i18n.t(`organizer.myaccount.breadCrumb.home`),
      url: "/",
    },
    {
      title: i18n.t(`organizer.myaccount.breadCrumb.myaccount`),
      url: '/myaccount/'
    },
    // {
    //   title: pathname.substring(1)
    // }

  ];


  const lastElement = [
    {
      title: i18n.t(`organizer.myaccount.breadCrumb.personaldetails`),
      url: '/myaccount/personal-details/'
    },
    {
      title: i18n.t(`organizer.myaccount.breadCrumb.bankdetails`),
      url: '/myaccount/bank-details/'
    },
    {
      title: i18n.t(`organizer.myaccount.breadCrumb.changepassword`),
      url: '/myaccount/change-password/'
    },
  ]
  return (
    <>
      <SiteBreadcrumb BreadcrumbData={BreadcrumbData} lastElement={lastElement} lastDataORGAccount
        className="protected-breadcrumb" />
      <div className="protected-head flex items-center justify-between flex-wrap">
        <H2>{i18n.t(`organizer.myaccount.header`)}</H2>
        {/* <button type="button" className="solid-btn dashboard-form-btn">
          Save
        </button> */}
      </div>
    </>
  )
}

export default MyAccountHeader