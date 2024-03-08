import InnerBanner from '@/app/components/InnerBanner/InnerBanner'
import getPrivacyPolicyListData from '@/utils/ssrapi/user/getprivacypolicy'
import React from 'react'
import PolicyContent from './PolicyContent/PolicyContent'
import InnerDataTitleCM from "@/app/components/InnerDataTitleCM/InnerDataTitleCM";
import dynamicTitle from '@/utils/commonfn/dynamicMetaFunction';

// export const metadata = {
//   title: 'NamaScape - Privacy Policy',
//   description: 'NamaScape - Privacy Policy',
// }

export async function generateMetadata({ params }) {
  return {
    title:dynamicTitle({de : `Namascape - datenschutz-bestimmungen` , en : 'Namascape - Privacy Policy'}) ,
    description: dynamicTitle({de : `Namascape - datenschutz-bestimmungen` , en : 'Namascape - Privacy Policy'}),
  }
}


const PrivacyPolicy = async (params) => {

  const slugParam = "privacy-policy"
  const getData = await getPrivacyPolicyListData({params :slugParam})

    return (
    <>
       {/* <InnerBanner 
            BreadcrumbData={BreadcrumbData}
            heading={'Privacy Policy'}
        /> */}
         <InnerDataTitleCM bredcrumbTitle={"privacyPolicyTitle"} heading={"PrivacyPolicyHeading"} />
        <PolicyContent data={getData?.data?.description}/>
    </>
  )
}

export default PrivacyPolicy