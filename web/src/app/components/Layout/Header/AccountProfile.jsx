import React from 'react'
import Notification from './Notification'
import Image from 'next/image'
import H5 from '../../common/h5'
import Link from 'next/link'
import i18n from '@/i18n/i18n'
import deafultImage from '@/public/assets/images/signUpUser.png'
const AccountProfile = ({Toggle,setToggle, Toggle2,setToggle2, OpenMenu, OpenMenu2, userData, OpenLogoutModal}) => {
    console.log(userData?.data?.profileImage,"userData?.data?.profileImage")
    return (
        <>
            <Notification Toggle={Toggle} setToggle={setToggle} OpenMenu={OpenMenu} />
            <div className='my-account-dropdown' onMouseLeave={()=>setToggle2(false)}>
                <div className={`flex items-center account-toggle ${Toggle2 == true ? "active" : ""}`} onClick={OpenMenu2}>
                    <Image src={userData?.data?.profileImage ? userData?.data?.profileImage : deafultImage} alt='user-image' width={50} height={50} />
                    <H5 className="title">{userData?.data?.firstName} {userData?.data?.lastName}</H5>
                    <i className="icon-back"></i>
                </div>
                <div className={`account-body ${Toggle2 == true ? "show" : ""}`}>
                    <Link href={'/my-account'} className='flex items-center link' onClick={OpenMenu2}><i className='icon-account'></i>{i18n.t(`headerDropDown.dropDown.myaccount`)}</Link>
                    <Link href={'/edit-profile'} className='flex items-center link' onClick={OpenMenu2}><i className='icon-setting'></i>{i18n.t(`headerDropDown.dropDown.settings`)}</Link>
                    <div className='flex items-center link' onClick={OpenLogoutModal}><i className='icon-logout'></i>{i18n.t(`headerDropDown.dropDown.logout`)}</div>
                </div>
            </div>
        </>
    )
}

export default AccountProfile