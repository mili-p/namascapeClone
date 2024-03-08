"use client"
import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import i18n from '@/i18n/i18n'
import store from '../../../../redux/store'
import { usePathname } from 'next/navigation'
import { getCookie, setCookie } from 'cookies-next'

let ignorePathname = ["/","/signup/","/signin/","/forgot-password/","/reset-password/","/otp-verification/"]
const ReduxProvider = ({children}) => {
 const pathName =  usePathname()
    useEffect(() => {
        if (localStorage.getItem('language')) {
            i18n.changeLanguage(localStorage.getItem('language'))
        }
    }, [])
    useEffect(()=> {  
      if(!ignorePathname.includes(pathName)){
        document.cookie = `currentPage=${pathName}; path=/`;
      }
    },[pathName])
  return (
    <Provider store={store}>{children}</Provider>
  )
}

export default ReduxProvider