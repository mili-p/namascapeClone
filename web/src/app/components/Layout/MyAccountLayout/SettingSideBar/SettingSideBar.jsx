'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import H3 from '@/app/components/common/h3'
import './SettingSideBar.scss'
import { usePathname, useRouter } from 'next/navigation'
import DeleteLogoutModal from '@/app/components/SiteModal/DeleteLogoutModal/DeleteLogoutModal'
import { deleteUserAccount } from '../../../../../../redux/Thunks/Account/languagechange.thunk'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

const SettingSideBar = ({ payment, heading, heading2, settings, setMobileToggle}) => {
    const activeURL = usePathname()
    const [show, setshow] = useState(false)
    const dispatch = useDispatch()
    const {i18n} =useTranslation()
    const router = useRouter()
    const CancelModal = () =>{
        setshow(false)
        document.body.classList.remove('open-modal')
      }

      const onDeleteClickFun = ()=>{
        dispatch(deleteUserAccount('',()=>{
          setshow(false)
          router.push('/')
        }))
      }

    const general = [
        {
            icon: (
                <>
                    <i className="icon-edit"></i>
                </>
            ),
            text : i18n.t(`settings.settingsSideBar.general.editProfile`),
            url: '/edit-profile/'
        },
        {
            icon:<><i className='icon-password'></i></>,
            text : i18n.t(`settings.settingsSideBar.general.changepassword`),
            url  : "/change-password/"
        },
        {
            icon: (
                <>
                    <i className="icon-language"></i>
                </>
            ),
            text : i18n.t(`settings.settingsSideBar.general.changelanguage`),
            url: '/change-language/'
        }
    ]

    const legal = [
        {
            icon: (
                <>
                    <i className="icon-terms-condition"></i>
                </>
            ),
            text: i18n.t(`settings.settingsSideBar.legal.termsofservices`),
            url: '/terms-of-service/'
        },
        {
            icon: (
                <>
                    <i className="icon-privacy-policy"></i>
                </>
            ),
            text: i18n.t(`settings.settingsSideBar.legal.privacypolicy`),
            url: '/privacy-policy-tab/'
        }
    ]

    const paymentSidebarDataList = [
        {
            icon: (
                <>
                    <i className="icon-card"></i>
                </>
            ),
            title: 'Credit Card',
            url: '/credit-card/'
        },
        {
            icon: (
                <>
                    <i className="icon-twint"></i>
                </>
            ),
            title: 'Twint',
            url: '/twint/'
        }
    ]

    const OpenLogoutModal = () => {
        setshow(true)
        document.body.classList.add('open-modal')
    }

    return (
        <>
            <aside className="web-setting-sidebar">
                <div className='sticky-inner'>
                    <H3>{heading}</H3>
                    <ul className='flex items-center md:block web-setting-menu'>
                        {payment
                            ? paymentSidebarDataList?.map((listdata, i) => {
                                return (
                                    <li key={i} className='w-1/2 sm:w-1/3 md:w-full'>
                                        <Link
                                            href={listdata?.url}
                                            className={`flex items-center link ${
                                                listdata?.url === activeURL
                                                    ? 'active'
                                                    : ''
                                            }`}
                                        >
                                            {listdata.icon} {listdata?.title}
                                        </Link>
                                    </li>
                                )
                            })
                            : general?.map((listdata, i) => {
                                return (
                                    <li key={i} className='w-1/2 sm:w-1/3 md:w-full'>
                                        <Link
                                            href={listdata?.url}
                                            className={`flex items-center link ${
                                                listdata?.url === activeURL
                                                    ? 'active'
                                                    : ''
                                            }`}
                                            onClick={()=>{setMobileToggle(true)}}
                                        >
                                            {listdata.icon} {listdata?.text}
                                        </Link>
                                    </li>
                                )
                            })}
                    </ul>
                    {/* flex items-cenweb-setting-sidebarter link */}
                    {settings && (
                        <>
                            <H3>{heading2}</H3>
                            <ul className="flex items-center md:block web-setting-menu">
                                {legal?.map((listdata, i) => {
                                    return (
                                        <li key={i} className='w-1/2 sm:w-1/3 md:w-full'>
                                            <Link
                                                href={listdata?.url}
                                                className={`flex items-center link ${
                                                    listdata?.url === activeURL
                                                        ? 'active'
                                                        : ''
                                                }`}
                                                onClick={()=>{setMobileToggle(true)}}
                                            >
                                                {listdata?.icon} {listdata?.text}
                                            </Link>
                                        </li>
                                    )
                                })}
                                <li className='w-1/2 sm:w-1/3 md:w-full'>
                                    {' '}
                                    <div
                                        className="flex items-center link"
                                        onClick={OpenLogoutModal}
                                    >
                                        <i className="icon-delete"></i> 
                                        {i18n.t(`settings.settingsSideBar.legal.deleteaccount`)}
                                    </div>
                                </li>
                            </ul>
                        </>
                    )}
                </div>
                <DeleteLogoutModal
                    show={show}
                    setshow={setshow}
                    // title={<>are you sure you want to <br /> delete your account?</>}
                    title = {i18n.t(`settings.deleteModal.title`)}
                    IconClass={'icon-delete'}
                    SolidBTNText={i18n.t(`settings.deleteModal.deleteBtn`)}
                    Delete
                    onClickCancle={()=>CancelModal()}
                    onClickOK = {()=>onDeleteClickFun()}
                />
           </aside>
        </>
    )
}

export default SettingSideBar
