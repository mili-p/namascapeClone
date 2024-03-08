import React from 'react'
import WhoWeAre from './WhoWeAre/WhoWeAre'
import WhatWeDo from './WhatWeDo/WhatWeDo'
import AboutUsSection from './AboutUsSection/AboutUsSection'
import InnerBanner from '@/app/components/InnerBanner/InnerBanner'
import EventOrganizer from '@/app/components/EventOrganizer/EventOrganizer'
import getPrivacyPolicyListData from '@/utils/ssrapi/user/getprivacypolicy'
import InnerDataTitleCM from "@/app/components/InnerDataTitleCM/InnerDataTitleCM";
import ogAboutus from '@/public/assets/images/ogimages/og-about-us.jpg'
import { cookies } from 'next/headers'
import dynamicTitle from '../../../../utils/commonfn/dynamicMetaFunction'

// function dynamicTitle(p) {
//   const lang = cookies().get('language').value 
//   return p?.[lang]
// }


// export const metadata = {
//   title: 'NamaScape - About Us',
//   description: 'NamaScape - About Usczxccxzcxzcxcxzczc',
//   openGraph: {
//     images: "/assets/images/ogimages/og-about-us.jpg",
//   }
// }

export async function generateMetadata({ params }) {
  return {
    title:dynamicTitle({de : "Namascape - über uns" , en : "Namascape - About Us"}) ,
    description: dynamicTitle({de : "Namascape - über uns" , en : "Namascape - About Us"}),
    openGraph: {
           images: "/assets/images/ogimages/og-about-us.jpg",
         }
  }
}


const AboutUs = async () => {

  const slugParam = "about-us"
  const getData = await getPrivacyPolicyListData({params :slugParam})
  // console.log(getData,"getData getData  getData");
  return (
    <>
      {/* <InnerBanner 
        BreadcrumbData={BreadcrumbData}
        heading='About Us'
      /> */}
      <InnerDataTitleCM heading={"AboutUsHeading"}  bredcrumbTitle={"aboutusTitle"}/>
      <AboutUsSection  data = {getData?.data?.aboutUs}/>
      <WhatWeDo data={getData?.data?.whatWeDo}/>
      <WhoWeAre data={getData?.data}/>
      <EventOrganizer className='pt-120 pb-120'/>
    </>
  )
}

export default AboutUs