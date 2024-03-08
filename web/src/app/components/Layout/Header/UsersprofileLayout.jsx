import React from 'react'
import Link from 'next/link'
import AccountProfile from "./AccountProfile"

const UserProfileLayout = ({OpenMenu2, OpenMenu, Toggle,setToggle, Toggle2,setToggle2, userData, OpenLogoutModal, NavData }) => {
    return (
        <>
           {userData ?
                <AccountProfile
                    OpenMenu2={OpenMenu2}
                    OpenMenu={OpenMenu}
                    Toggle={Toggle}
                    setToggle={setToggle}
                    Toggle2={Toggle2}
                    setToggle2={setToggle2}
                    userData={userData}
                    OpenLogoutModal={OpenLogoutModal}
                />
            :
                <>
                    <Link href={'/signup/'} className='border-btn action-btn' title={NavData.SignUp}>{NavData.SignUp}</Link>
                    <Link href={'/signin/'} className='solid-btn action-btn' title={NavData.SignIn}>{NavData.SignIn}</Link>
                </>
            }
        </>
    )
}

export default UserProfileLayout