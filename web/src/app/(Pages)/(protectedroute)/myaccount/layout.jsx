'use client'
import MyAccountHeader from '@/app/components/Layout/MyAccountLayout/MyAccountHeader/MyAccountHeader'
import MyAccountSideBar from '@/app/components/Layout/MyAccountLayout/MyAccountSideBar/MyAccountSideBar'
import { usePathname } from 'next/navigation'
import React from 'react'
import "../myaccount/myaccount.scss";
// import '../layout2.scss'

const Layout = ({children}) => {
    const pathname = usePathname()
  return (
    <div className='my-account-wrapper'>
        <MyAccountHeader />
          {pathname !== "/myaccount/" ? <MyAccountSideBar>{children}</MyAccountSideBar> : children }
    </div>
  )
}

export default Layout