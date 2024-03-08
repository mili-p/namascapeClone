// 'use client'
// import React from 'react'
// import PaymentModules from './PaymentModules'
// import './payment.scss'
// import UserBreadCrumb from '@/app/components/UserBreadCrumb/UserBreadCrumb'
// import { useSearchParams } from 'next/navigation'
// import { useSelector } from 'react-redux'
// import { useTranslation } from 'react-i18next'
// import { paramsCategoryFn } from '@/i18n/i18nCM/i18CM'

// const Page = () => {
//     const {i18n} = useTranslation()
//     const search = useSearchParams()
//     const category = search.get('cId')
//     const eventId = search.get('eId')
//     const params1 = paramsCategoryFn(i18n)
//     const { eventDetailsPayment, isLoading: detailLoader } = useSelector(
//         (m) => m.eventdetailspayment
//     )


//     const breadcrumbItems = [
//         { name: i18n.t(`userBreadcrumb.home`), url: "/" },
//         { name: `${params1[category]}`, url: `/events/${category}/` },
//         { name: i18n.t(`userBreadcrumb.experiencesDetails`), url: `/events/${category}/${eventId}/` },
//         { name: i18n.t(`userBreadcrumb.payment`) , url : '/events/payment/'},
//       ];

//     return (
//         <>
//             <section className="user-bread-crumb-wrapper">
//                 <div className="container">
//                 <UserBreadCrumb items={breadcrumbItems} />
//                 </div>
//             </section>
//             <section className="web-setting pt-120 pb-120">
//                 <div className="container">
//                     <PaymentModules category={category}/>
//                 </div>
//             </section>
//         </>
//     )
// }

// export default Page

import React from 'react'
import PaymentMain from './PaymentMain'
import { cookies } from 'next/headers';

const page = () => {
    function getAccessTokenCookie() {
        const nextCookies = cookies(); // Get cookies object
        const language = nextCookies.get("language")?.value || "de";
        return language;
      }
      const languageName = getAccessTokenCookie()
  return (
    <PaymentMain languageName={languageName}/>
  )
}

export default page