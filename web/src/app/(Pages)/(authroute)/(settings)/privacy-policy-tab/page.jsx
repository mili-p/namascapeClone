import dynamicTitle from '@/utils/commonfn/dynamicMetaFunction';
import getPrivacyPolicyListData from '@/utils/ssrapi/user/getprivacypolicy';
import React from 'react'
import PrivacyPolicy from './PrivacyPolicy';
// export const metadata = {
//   title: 'NamaScape - Privacy Policy',
//   description: 'NamaScape - Privacy Policy',
// }

export async function generateMetadata() {
  return { 
    // title: `NamaScape - ${params?.category === "event" ? "Events" :Capitalize}`,
    // openGraph:{
    //   images : `${process.env.NEXT_PUBLIC_OG_PURPOSE}/assets/images/ogimages/${params?.category}.jpg`
    // },
    title:dynamicTitle({de : `Namascape - Datenschutzrichtlinien` , en : `Namascape - Privacy policy`}), 
    description : dynamicTitle({de : `Namascape - Datenschutzrichtlinien` , en : `Namascape - Privacy policy`})
  };
}

// export async function generateMetadata({ params }) {
//   return {
//     title:dynamicTitle({de : `NamaScape - datenschutz-bestimmungen` , en : 'NamaScape - Privacy Policy'}) ,
//     description: dynamicTitle({de : `NamaScape - datenschutz-bestimmungen` , en : 'NamaScape - Privacy Policy'}),
//   }
// }


const page = async (params) => {

  const slugParam = "privacy-policy"
  const getData = await getPrivacyPolicyListData({params :slugParam})
  
  return (
    <>
      <div className='privacy-policy-tab'>
        {/* <H1 className="h2">Privacy policy</H1> */}
      
          {/* <ul> */}
          <PrivacyPolicy data={getData?.data?.description}/>
          {/* <div dangerouslySetInnerHTML={{__html: getData?.data?.description}}/> */}
            {/* <div dangerouslySetInnerHTML={{__html:getData?.data}} /> */}
            {/* {getData?.data} */}
            {/* <li>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </li>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor
              sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </li>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor
              sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </li> */}
          {/* </ul> */}
        
      </div>
    </>
  )
}

export default page