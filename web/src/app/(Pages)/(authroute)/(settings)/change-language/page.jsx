import H1 from '@/app/components/common/h1'
import React from 'react'
import LanguageRadioBtn from './LanguageRadioBtn'
import dynamicTitle from '@/utils/commonfn/dynamicMetaFunction';

// export const metadata = {
//   title: 'Namascape - Change Language',
//   description: 'Namascape - Change Language',
// }

export async function generateMetadata() {
  return { 
    // title: `NamaScape - ${params?.category === "event" ? "Events" :Capitalize}`,
    // openGraph:{
    //   images : `${process.env.NEXT_PUBLIC_OG_PURPOSE}/assets/images/ogimages/${params?.category}.jpg`
    // },
    title:dynamicTitle({de : `Namascape - sprache ändern` , en : `Namascape - Change language`}), 
    description : dynamicTitle({de : `Namascape - sprache ändern` , en : `Namascape - Change language`})
  };
}

const page = () => {
  return (
    <>
      <form className='change-language'>
        {/* <H1 className='h2'>Change Language</H1> */}
        {/* <div className='input-group'>
          <label>Language</label> */}
          <LanguageRadioBtn />
        {/* </div> */}
      </form>
    </>
  )
}

export default page