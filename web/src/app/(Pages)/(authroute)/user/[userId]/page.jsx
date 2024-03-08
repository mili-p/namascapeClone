import React from 'react'
import './my-account.scss'
import MyAccountMain from './MyAccountMain'
import dynamicTitle from '@/utils/commonfn/dynamicMetaFunction';

// export const metadata = {
//   title: 'Namascape - My Account',
//   description: 'Namascape - My Account',
//   {i18n.t(`headerDropDown.dropDown.myaccount`)}
// }

export async function generateMetadata() {
  return { 
    // title: `NamaScape - ${params?.category === "event" ? "Events" :Capitalize}`,
    // openGraph:{
    //   images : `${process.env.NEXT_PUBLIC_OG_PURPOSE}/assets/images/ogimages/${params?.category}.jpg`
    // },
    title:dynamicTitle({de : `Namascape - Benutzer:in` , en : `Namascape - User`}), 
    description : dynamicTitle({de : `Namascape - Benutzer:in` , en : `Namascape - User`})
  };
}

const page = ({params}) => {
  // console.log('params',params)
  return (
    <>
        <MyAccountMain params={params} />
    </>
  )
}

export default page