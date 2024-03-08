import React from 'react'
import Footer from '../../components/Layout/Footer'
import Header from '../../components/Layout/Header'
import { cookies } from 'next/headers'

export const metadata = {
  title: 'Namascape',
  description: 'Namascape',
  openGraph: {
    images: '../../../../../public/assets/images/ogimages/og-home-image.jpg',
  }
}

const layout = ({ children }) => {
  function getAccessTokenCookie() {
    const nextCookies = cookies(); // Get cookies object
    const token = nextCookies.get("authToken")?.value;
    return token;
  }
  const loginToken = getAccessTokenCookie()


  function cookieGetForAcceptDecline() {
    const nextCookies = cookies(); // Get cookies object
    const token = nextCookies.get("CookieConsent")?.value;
    return token;
  }
  const getCookieValueAcceptDecline = cookieGetForAcceptDecline()
  
  return (
    <>
      <Header /> 
      {/* {!result && <Header/>} */}
      <main className={`site-content ${loginToken ? 'user-login' : ""}`}>{children}</main>
      {/* {!result && <Footer/>} */}
      <Footer getCookieValueAcceptDecline={getCookieValueAcceptDecline}/>
    </>
  )
}

export default layout
