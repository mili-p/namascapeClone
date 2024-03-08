// 'use client'
import React from 'react'
import ChangePassword from './ChangePassword'
import dynamicTitle from '@/utils/commonfn/dynamicMetaFunction';
// import H2 from '@/app/components/common/H2'


export async function generateMetadata() {
  return { 
    // title: `NamaScape - ${params?.category === "event" ? "Events" :Capitalize}`,
    // openGraph:{
    //   images : `${process.env.NEXT_PUBLIC_OG_PURPOSE}/assets/images/ogimages/${params?.category}.jpg`
    // },
    title:dynamicTitle({de : `Namascape - Passwort ändern` , en : `Namascape - Change password`}), 
    description : dynamicTitle({de : `Namascape - Passwort ändern` , en : `Namascape - Change password`})
  };
}


const page = () => {
  // const [passwordToggle, setPasswordToggle] = useState(false)
  // const togglePassFun = () => {
  //     setPasswordToggle(passwordToggle ? false : true)
  // }
  return (
    <>
      <ChangePassword/>
      {/* <form className='change-password'>
        <H2>Change Password</H2>
        <div className="input-group">
          <label>Current Password</label>
          <div className="pwd-input">
            <input
                type={passwordToggle ? 'text' : 'password'}
                id="password"
                name="password"
            />

            <button
                type="button"
                className="eye-btn"
                onClick={togglePassFun}
            >
                <i
                    className={
                      passwordToggle
                          ? 'icon-eye-open'
                          : 'icon-eye-close'
                    }
                ></i>
            </button>
          </div>
        </div>
        <div className="input-group">
          <label>New Password</label>
          <div className="pwd-input">
            <input
                type={passwordToggle ? 'text' : 'password'}
                id="password"
                name="password"
            />

            <button
                type="button"
                className="eye-btn"
                onClick={togglePassFun}
            >
                <i
                    className={
                      passwordToggle
                          ? 'icon-eye-open'
                          : 'icon-eye-close'
                    }
                ></i>
            </button>
          </div>
        </div>
        <div className="input-group">
          <label>Confirm Password</label>
          <div className="pwd-input">
            <input
                type={passwordToggle ? 'text' : 'password'}
                id="password"
                name="password"
            />

            <button
                type="button"
                className="eye-btn"
                onClick={togglePassFun}
            >
                <i
                    className={
                      passwordToggle
                          ? 'icon-eye-open'
                          : 'icon-eye-close'
                    }
                ></i>
            </button>
          </div>
        </div>
      </form> */}
    </>
  )
}

export default page