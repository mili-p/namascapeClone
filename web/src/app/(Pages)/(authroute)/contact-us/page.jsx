import React from 'react'
import InnerBanner from '@/app/components/InnerBanner/InnerBanner'
import ContactUsInfo from './ContactUsInfo/ContactUsInfo'
import ContactFormSection from './ContactFormSection/ContactFormSection'
import InnerDataTitleCM from "@/app/components/InnerDataTitleCM/InnerDataTitleCM";
import dynamicTitle from '@/utils/commonfn/dynamicMetaFunction';

// export const metadata = {
//   title: 'NamaScape - Contact Us',
//   description: 'NamaScape - Contact Us',
//   openGraph: {
//     images: '../../../../../public/assets/images/ogimages/og-contact-us.jpg',
//   }
// }

export async function generateMetadata({ params }) {
  return {
    title:dynamicTitle({de : "Namascape - kontaktieren uns" , en : "Namascape - Contact Us"}) ,
    description: dynamicTitle({de : "Namascape - kontaktieren uns" , en : "Namascape - Contact Us"}),
    openGraph: {
      images: '../../../../../public/assets/images/ogimages/og-contact-us.jpg',
    }
  }
}


const ContactUs = () => {

  return (
    <>
       {/* <InnerBanner 
        BreadcrumbData={BreadcrumbData}
        heading={'Contact Us'}
      /> */}
      <InnerDataTitleCM bredcrumbTitle={"contactUsTitle"} heading={"ContactUsHeading"} />
      
      <section className='md:flex md:flex-col-reverse flex-col'>
        <ContactFormSection/>
        <ContactUsInfo/>
      </section>
    </>
  )
}

export default ContactUs