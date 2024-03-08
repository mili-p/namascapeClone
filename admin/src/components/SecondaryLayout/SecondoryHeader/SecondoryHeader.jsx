import React, {useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './SecondoryHeader.scss'
import DeleteLogoutModal from '../../SiteModal/DeleteLogoutModal/DeleteLogoutModal'
import { asynclogoutUser } from '../../../redux/thunk/authThunk/signin.thunk'
import Logo from '../../../assets/images/protected-logo.svg'
import defaultImage from '../../../assets/images/signUpUser.png'
import { editAccount, home, myaccount } from '../../../config/routeConsts'

import NotificationToggle from '../../NotificationToggle/NotificationToggle'
import { asynceditprofile } from '../../../redux/thunk/authThunk/editprofile.thunk'
// import useDeviceDetection from '../../../Hooks/useDeviceDetection'

const SecondoryHeader = ({ setmobileToggle }) => {
    const dispatch = useDispatch()
    // const device = useDeviceDetection()

    // const [DV,setDV] =useState('') 

    // useEffect(()=>{
    //     if(device){
    //         setDV(device) 
    //     } 
    // },[DV])
    
    const { adminDetails, device_token } = useSelector((e) => e.signin)

    const [show, setshow] = useState(false)
    const [Toggle, setToggle] = useState(false)
    const [Toggle2, setToggle2] = useState(false)

    const OpenMenu = () => {
        setToggle(!Toggle)
        setToggle2(false)
    }
    const OpenMenu2 = () => {
        setToggle2(!Toggle2)
        setToggle(false)
    }

    const openMobileMenu = () => {
        setmobileToggle(true)
        document.body.classList.add('open-menu')
    }

    const logOutClickFunction = () => {
        setshow(true)
        setToggle2(false)
    }

    useEffect(() => {
        dispatch(asynceditprofile())
      }, [])

    return (
        <>
            <header className="flex justify-between protected-header">
                <div className="flex items-center">
                    <div className="flex items-center protected-logo">
                        <div
                            className="flex items-center protected-mobile-toggle"
                            onClick={openMobileMenu}
                        >
                            <i className=""></i>
                        </div>
                        <NavLink to={home}>
                            <img src={Logo} alt="logo" />
                        </NavLink>
                    </div>
                    {/* <p>{DV}</p> */}
                </div>
                <div className="flex items-center action-group">
                    {/* <div
                        className="flex items-center justify-center notification-main"
                        onMouseLeave={() => setToggle(false)}
                    >
                        <div
                            className="flex items-center justify-center notification-btn"
                            onClick={OpenMenu}
                        >
                            <i className="icon-ball"></i>
                            {notificationList?.meta?.totalCount > 0 && (
                                <span className="ball-count">
                                    {notificationList?.meta?.totalCount}
                                </span>
                            )}
                        </div>
                        <div
                            className={`notification-body ${
                                Toggle == true ? 'show' : ''
                            }`}
                        >
                            <ul>
                                {notificationList?.data?.notificationData
                                    ?.length > 0 ? (
                                    notificationList?.data?.notificationData?.map(
                                        (notification, i) => {
                                            return (
                                                <li key={notificationId}>
                                                    {notification?.title}
                                                    <span className="flex items-center">
                                                        <i className="icon-clock"></i>
                                                        {getHumanReadableTime(
                                                            notification?.createdAt
                                                        )}
                                                    </span>
                                                </li>
                                            )
                                        }
                                    )
                                ) : (
                                    <li className="empty-notification">
                                        <div className="data-not-found">
                                            No Notifiction
                                        </div>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div> */}
                    <NotificationToggle Toggle={Toggle} setToggle={setToggle} OpenMenu={OpenMenu}  />
                    <div
                        className="my-account-dropdown"
                        onMouseLeave={() => setToggle2(false)}
                    >
                        <div
                            className="flex items-center account-toggle"
                            onClick={OpenMenu2}
                        >
                            <img
                                src={adminDetails?.profilePicture || defaultImage}
                                alt="user-image"
                                width={50}
                                height={50}
                            />
                            <h5 className="title">
                                {adminDetails?.firstName +
                                    ' ' +
                                    adminDetails?.lastName ??
                                    'Leslie Alexander'}
                            </h5>
                            <i className="icon-back"></i>
                        </div>
                        <div
                            className={`account-body ${
                                Toggle2 == true ? 'show' : ''
                            }`}
                        >
                            <NavLink
                                to={editAccount}
                                className="flex items-center link"
                                onClick={() => setToggle2(false)}
                            >
                                <i className="icon-account"></i>My Account
                            </NavLink>
                            <div
                                className="flex items-center link"
                                onClick={() => logOutClickFunction()}
                            >
                                <i className="icon-logout"></i>Log Out
                            </div>
                        </div>
                    </div>
                </div>
                <DeleteLogoutModal
                    show={show}
                    setshow={setshow}
                    title={
                        <>
                            are you sure you want <br /> Log out?
                        </>
                    }
                    IconClass={'icon-logout'}
                    SolidBTNText={'Log Out'}
                    deleteItem={asynclogoutUser}
                    payload={{ deviceToken: 'deviceToken' }}
                />
            </header>
        </>
    )
}

export default React.memo(SecondoryHeader)
