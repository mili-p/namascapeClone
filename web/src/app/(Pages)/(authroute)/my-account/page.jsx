import React from 'react'
import './my-account.scss'
import MyAccountMain from './MyAccountMain'
import dynamicTitle from '@/utils/commonfn/dynamicMetaFunction';

// export const metadata = {
//   title: 'Namascape - My Account',
//   description: 'Namascape - My Account',
// }

export async function generateMetadata() {
  return { 
    // title: `NamaScape - ${params?.category === "event" ? "Events" :Capitalize}`,
    // openGraph:{
    //   images : `${process.env.NEXT_PUBLIC_OG_PURPOSE}/assets/images/ogimages/${params?.category}.jpg`
    // },
    title:dynamicTitle({de : `Namascape - Mein Konto` , en : `Namascape - My Account`}), 
    description : dynamicTitle({de : `Namascape - Mein Konto` , en : `Namascape - My Account`})
  };
}

const page = () => {
  return (
    <>
        <MyAccountMain />
    </>
  )
}

export default page