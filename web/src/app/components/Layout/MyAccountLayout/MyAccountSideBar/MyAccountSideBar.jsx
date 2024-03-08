import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useTranslation } from 'react-i18next'

const MyAccountSideBar = ({children}) => {

    const pathname = usePathname()
    const {i18n} = useTranslation()
    const sideBarDataList = [
        {
            text : i18n.t(`organizer.myaccount.breadCrumb.personaldetails`),
            url  : "/myaccount/personal-details/"
        },
        {
            text : i18n.t(`organizer.myaccount.breadCrumb.bankdetails`),
            url  : "/myaccount/bank-details/"
        },
        {
            text : i18n.t(`organizer.myaccount.breadCrumb.changepassword`),
            url  : "/myaccount/change-password/"
        }
    ]


  return (
    <div className='my-account xl:flex xl:items-stretch mt-32'>
        <ul className='my-account-sidebar xl:flex xl:items-center bg-white'>
            {sideBarDataList?.map((listdata,i)=>{
                return (
                    <li key={i}>
                        <Link href={listdata?.url} className = {`flex items-center ${pathname===listdata?.url ? 'active' : "" }`}>{listdata?.text}</Link>
                    </li>
                )
            })}
        </ul>
        <div className='account-details bg-white w-full mt-32'>
            {children}
        </div>
    </div>
  )
}

export default MyAccountSideBar
