import InnerBanner from '@/app/components/InnerBanner/InnerBanner'
import getPrivacyPolicyListData from '@/utils/ssrapi/user/getprivacypolicy'
import React from 'react'
import TermsContent from './TermsContent/TermsContent'
import InnerDataTitleCM from "@/app/components/InnerDataTitleCM/InnerDataTitleCM";
import dynamicTitle from '@/utils/commonfn/dynamicMetaFunction';

// export const metadata = {
//   title: 'NamaScape - Terms And Conditions',
//   description: 'NamaScape - Terms And Conditions',
// }

export async function generateMetadata({ params }) {
  return {
    title:dynamicTitle({de : `Namascape - geschäftsbedingungen` , en : 'Namascape - Terms And Conditions'}) ,
    description: dynamicTitle({de : `Namascape - geschäftsbedingungen` , en : 'Namascape - Terms And Conditions'}),
  }
}

const TermsAndConditions = async (params) => {

  const slugParam = "terms-and-conditions"
  const getData = await getPrivacyPolicyListData({params :slugParam})

    
  return (
    <>
       {/* <InnerBanner 
            BreadcrumbData={BreadcrumbData}
            heading={'Terms and condition'}
        /> */}
        {/* <InnerDataTitleCM heading={"Events"} bredcrumbTitle = {"eventsTitle"}/> */}
        <InnerDataTitleCM bredcrumbTitle={"tearmsAndCondiTitle"} heading={"TearmsAndCondiHeading"} />
        <TermsContent data={getData?.data?.description}/>
    </>
  )
}

export default TermsAndConditions