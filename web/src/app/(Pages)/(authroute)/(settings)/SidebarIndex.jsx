'use client'
import React, { useState } from 'react'
import SettingSideBar from '@/app/components/Layout/MyAccountLayout/SettingSideBar/SettingSideBar'
import { useTranslation } from 'react-i18next'

const SidebarIndex = ({children}) => {
  const {i18n} = useTranslation()
  const [MobileToggle, setMobileToggle] = useState(false)
  return (
    <section className='web-setting pt-120 pb-120'>
      <div className="container">
        <div className='flex items-stretch justify-between flex-col md:flex-row web-setting-wrapper'>
          <SettingSideBar setMobileToggle={setMobileToggle}  heading = {i18n.t(`settings.settingsSideBar.generalTitle`)} heading2 = {i18n.t(`settings.settingsSideBar.legaltitle`)} settings />
          <div className={`web-setting-content ${MobileToggle===true ? "show-mobile":""}`}>
            <span className='setting-back-btn'  onClick={()=>{setMobileToggle(false)}}></span>
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SidebarIndex