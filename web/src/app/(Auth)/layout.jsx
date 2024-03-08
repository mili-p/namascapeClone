'use client'
import React from 'react'
import "./layout.scss";
import Image from 'next/image'
import { usePathname } from 'next/navigation';
import AuthenticationImage from '@/public/assets/images/authentication-image.webp'

const Layout = ({ children }) => {
  const GetURL = usePathname();
  return (
    <>
      <main className='flex items-center justify-center relative md:h-screen auth-wrapper'>
        <section className='flex justify-end relative auth-card'>
          <div className='image-box w-full'>
            <Image src={AuthenticationImage} alt='authentication-image' width={828} height={989} sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"/>
          </div>
          <div className={`auth-form-wrapper md:flex md:items-center md:relative ${GetURL.split('/').join('')}`}>
            {children}
          </div>
        </section>
      </main>
    </>
  )
}

export default Layout
