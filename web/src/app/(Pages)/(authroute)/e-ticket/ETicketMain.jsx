'use client'
import React from 'react'
import './e-ticket.scss'
import ETicket from './ETicket'
import UserBreadCrumb from '@/app/components/UserBreadCrumb/UserBreadCrumb'
import { useSearchParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { paramsCategoryFn } from '@/i18n/i18nCM/i18CM'

const ETicketMain = ({languageName}) => {
    const {i18n} = useTranslation()
    const search = useSearchParams()
    const params1 = paramsCategoryFn(i18n)
      const category = search.get('cId')
      const eventId = search.get('tId')
    const breadcrumbItems = [
      { name: i18n.t(`userBreadcrumb.home`), url: "/" },
      { name: `${params1[category]}`, url: `/events/${category}/` },
      { name: i18n.t(`userBreadcrumb.experiencesDetails`), url: `/events/${category}/${eventId}/` },
      { name: i18n.t(`userBreadcrumb.eTicket`) , url : '/e-ticket/'},
    ];
  return (
    <>
      <section className="user-bread-crumb-wrapper">
        <div className="container">
          <UserBreadCrumb items={breadcrumbItems} />
        </div>
      </section>
      <section className="e-ticket pt-120 pb-120">
        <div className="container">
          <ETicket languageName={languageName}/>
        </div>
      </section>
    </>
  );
};

export default ETicketMain;
