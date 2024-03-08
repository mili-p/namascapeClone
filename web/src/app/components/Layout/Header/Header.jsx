'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import './header.scss'
import { Cinzel } from 'next/font/google'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import DeleteLogoutModal from '../../SiteModal/DeleteLogoutModal/DeleteLogoutModal'
import UserProfileLayout from './UsersprofileLayout'
import { logOutUser } from '../../../../../redux/Thunks/auth.thunk'
import { signInSuccess } from '../../../../../redux/slices/authentication'
import { Controller, useForm } from 'react-hook-form'
import ReactSelectcmp from '../../ReactSelectcmp/ReactSelectcmp'
import { LanguageList } from '@/utils/commonfn'
import { useTranslation } from 'react-i18next'
import { langChangeSlice } from '../../../../../redux/slices/wholelangChange'
import { asyncUserProfile } from '../../../../../redux/Thunks/User/userprofile.thunk'
const cinzel = Cinzel({ subsets: ['latin'], weight: '700' })

const Header = () => {
    const pathname = usePathname()
    const [show, setshow] = useState(false)
    const activeURL = usePathname()
    const dispatch = useDispatch()
    const router = useRouter()
    const params = useParams()
    const { i18n, t } = useTranslation()
    const [active, setActive] = useState(false)
    const userProfileData =
        typeof localStorage !== 'undefined'
            ? localStorage.getItem('userData')
            : null
    const userProfile = JSON.parse(userProfileData)
   
    const getDataLG =
        typeof localStorage !== 'undefined'
            ? localStorage.getItem('language')
            : 'de'
    const lg = {
        id: getDataLG ? getDataLG : 'de',
        name: getDataLG === 'en' ? 'EN' : 'DE'
    }
    const { control, watch } = useForm({
        defaultValues: {
            launguage: lg
            // launguage : { id: "de", name: "DE" },
            // language : localStorage.getItem('language')
        }
    })

    function changeLanguage(lang) {
        i18n.changeLanguage(lang)
    }

    // console.log(pathname, 'pathnamepathname')

    // const userProfileData = typeof window !=="undefined" ? localStorage.getItem('userData') : null
    // const userProfile = JSON.parse(userProfileData)
    // console.log('userData', userProfile)
    // const userData = getCookie('userType');
    const [openMenu, setopenMenu] = useState(false)
    const [Toggle, setToggle] = useState(false)
    const [Toggle2, setToggle2] = useState(false)

    useEffect(() => {
        //   dispatch(signInSuccess(userProfile))
        if (typeof localStorage !== 'undefined') {
            setActive(true)
        }
    }, [])

    const { userData } = useSelector((m) => m.authentication)

    const OpenMenu = () => {
        setToggle(!Toggle)
        setToggle2(false)
    }
    const OpenMenu2 = () => {
        setToggle2(!Toggle2)
        setToggle(false)
    }

    const OpenMenuClick = () => {
        setopenMenu(true)
        document.body.classList.add('open-menu')
    }
    const CloseMenuClick = () => {
        setopenMenu(false)
        document.body.classList.remove('open-menu')
    }

    const OpenLogoutModal = () => {
        setshow(true)
        document.body.classList.add('open-modal')
    }


    const NavData = {
        Link: [
            {
                text: i18n.t('Header.menu.Home'),
                url: '/'
            },
            {
                text: i18n.t('Header.menu.Events'),
                // url: `/events/${params?.category   ? params?.category : 'sponsored-event'}`,
                url: `${"/events/" }`,
                activeUrl : `${params?.id
                        ? `/events/${params?.category}/${params?.id}/`
                        : params?.category
                        ? `/events/${params?.category}/`
                        : pathname === '/events/payment/' ? '/events/payment/'
                        :pathname === '/events/organizer-profile/' ? '/events/organizer-profile/'
                        : pathname === '/e-ticket/' ? '/e-ticket/'
                        : pathname === "/events/event-attendees/" ? "/events/event-attendees/" : '/events/sponsored'
                }`
            },
            {
                text: i18n.t('Header.menu.AboutUs'),
                url: '/about-us/'
            },
            {
                text: i18n.t('Header.menu.ContactUs'),
                url: '/contact-us/'
            }
        ],
        SignUp: i18n.t('Header.menu.SignUp'),
        SignIn: i18n.t('Header.menu.SignIn')
    }

    const CancelModal = () => {
        setshow(false)
        document.body.classList.remove('open-modal')
    }

    const logOutSuccessFunction = () => {
        //   alert('')
        dispatch(
            logOutUser('', () => {
                setshow(false)
                router.push('/')
            })
        )
        document.body.classList.remove('open-modal')
        // localStorage.removeItem('userData')
    }
/// view profile api calling for image start H ////
    useEffect(() => {
        if(userData?.data?.userId){
            dispatch(asyncUserProfile({
                userId: userData?.data?.userId,
            }))
        }
    }, [])
/// view profile api calling for image end H ////
    return (
        <>
            <header className="site-header">
                <div className="container">
                    <div className="header-inner">
                        <div className="logo-group">
                            <div
                                className="mobile-toggle"
                                onClick={OpenMenuClick}
                            >
                                <i></i>
                            </div>
                            <Link href={'/'} title="logo" className="logo">
                                <Image
                                    src="/assets/images/footer-logo.svg"
                                    width={104}
                                    height={104}
                                    alt="logo"
                                />
                            </Link>
                            {/* <Link href={"/"} className="logo" title="logo">
                <Image
                  src="/assets/images/header-logo.svg"
                  width={64}
                  height={64}
                  alt="logo"
                />
              </Link> */}
                            <div
                                className={`menu-group ${
                                    openMenu === true ? 'show' : ''
                                }`}
                            >
                                <div
                                    className="menu-close"
                                    onClick={CloseMenuClick}
                                ></div>
                                <ul className="menu">
                                    {NavData.Link?.map((list, i) => {
                                        return (
                                            <li key={i} className="menu-item">
                                                <Link
                                                    href={list?.url}
                                                    className={`menu-link ${
                                                        cinzel.className
                                                    } ${
                                                        (list.url === activeURL || list.activeUrl === activeURL)
                                                            ? 'active'
                                                            : ''
                                                    }`}
                                                    onClick={CloseMenuClick}
                                                    title={list.text}
                                                >
                                                    {list.text}
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                            <div className="mobile-launguage-select">
                                {
                                    active ? (
                                        <>
                                            <Controller
                                                name="launguage"
                                                control={control}
                                                render={({
                                                    field: { onChange, value }
                                                }) => (
                                                    <>
                                                        <ReactSelectcmp
                                                            className="header-ln-select"
                                                            value={value}
                                                            openMenuOnFocus={
                                                                true
                                                            }
                                                            onChange={(e) => {
                                                                if (
                                                                    e?.id ===
                                                                    'en'
                                                                ) {
                                                                    onChange(e)
                                                                    localStorage.setItem(
                                                                        'language',
                                                                        'en'
                                                                    )
                                                                    document.cookie =
                                                                        'language=en;  path=/'
                                                                    changeLanguage(
                                                                        'en'
                                                                    )
                                                                    // if (
                                                                    //     pathname !==
                                                                    //     '/'
                                                                    // ) {
                                                                        window.location.reload(
                                                                            true
                                                                        )
                                                                    // }
                                                                    // window.location.reload(true)
                                                                    // dispatch(langChangeSlice('en'))
                                                                } else {
                                                                    onChange(e)
                                                                    localStorage.setItem(
                                                                        'language',
                                                                        'de'
                                                                    )
                                                                    document.cookie =
                                                                        'language=de; path=/'
                                                                    changeLanguage(
                                                                        'de'
                                                                    )
                                                                    // if (
                                                                    //     pathname !==
                                                                    //     '/'
                                                                    // ) {
                                                                        window.location.reload(
                                                                            true
                                                                        )
                                                                    // }
                                                                    // dispatch(langChangeSlice('de'))
                                                                }
                                                            }}
                                                            isSearchable={false}
                                                            getOptionLabel={(
                                                                e
                                                            ) => {
                                                                return e?.name
                                                            }}
                                                            getOptionValue={(
                                                                e
                                                            ) => {
                                                                return e?.id
                                                            }}
                                                            options={
                                                                LanguageList
                                                            }
                                                        />
                                                    </>
                                                )}
                                            />
                                        </>
                                    ) : (
                                        ''
                                    )
                                    // <main className='flex items-center justify-center w-full h-screen page-load'>
                                    //     <div class="loader">
                                    //         <div class="flex items-center justify-center loader-circle"></div>
                                    //         <h1 class="loader-text">Loading...</h1>
                                    //     </div>
                                    // </main>
                                }
                            </div>
                        </div>

                        <nav className="nav-group">
                            {
                                active ? (
                                    <>
                                        {/* <div
                      className={`menu-group ${
                        openMenu === true ? "show" : ""
                      }`}
                    >
                      <div
                        className="menu-close"
                        onClick={CloseMenuClick}
                      ></div>
                      <ul className="menu">
                        {NavData.Link?.map((list, i) => {
                          return (
                            <li key={i} className="menu-item">
                              <Link
                                href={list.url}
                                className={`menu-link ${cinzel.className} ${
                                  list.url === activeURL ? "active" : ""
                                }`}
                                onClick={CloseMenuClick}
                                title={list.text}
                              >
                                {list.text}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div> */}

                                        <UserProfileLayout
                                            OpenMenu2={OpenMenu2}
                                            OpenMenu={OpenMenu}
                                            Toggle={Toggle}
                                            setToggle={setToggle}
                                            Toggle2={Toggle2}
                                            setToggle2={setToggle2}
                                            userData={userData ?? null}
                                            OpenLogoutModal={OpenLogoutModal}
                                            NavData={NavData}
                                        />
                                        <div className="desktop-launguage-select">
                                            <Controller
                                                name="launguage"
                                                control={control}
                                                render={({
                                                    field: { onChange, value }
                                                }) => (
                                                    <>
                                                        <ReactSelectcmp
                                                            className="header-ln-select"
                                                            value={value}
                                                            openMenuOnFocus={
                                                                true
                                                            }
                                                            onChange={(e) => {
                                                                if (
                                                                    e?.id ===
                                                                    'en'
                                                                ) {
                                                                    onChange(e)
                                                                    localStorage.setItem(
                                                                        'language',
                                                                        'en'
                                                                    )
                                                                    document.cookie =
                                                                        'language=en;  path=/'
                                                                    changeLanguage(
                                                                        'en'
                                                                    )
                                                                    // if (
                                                                    //     pathname !==
                                                                    //     '/'
                                                                    // ) {
                                                                        window.location.reload(
                                                                            true
                                                                        )
                                                                    // }
                                                                    // window.location.reload(true)
                                                                    // dispatch(langChangeSlice('en'))
                                                                } else {
                                                                    onChange(e)
                                                                    localStorage.setItem(
                                                                        'language',
                                                                        'de'
                                                                    )
                                                                    document.cookie =
                                                                        'language=de; path=/'
                                                                    changeLanguage(
                                                                        'de'
                                                                    )
                                                                    // if (
                                                                    //     pathname !==
                                                                    //     '/'
                                                                    // ) {
                                                                        window.location.reload(
                                                                            true
                                                                        )
                                                                    // }
                                                                    // dispatch(langChangeSlice('de'))
                                                                }
                                                            }}
                                                            isSearchable={false}
                                                            getOptionLabel={(
                                                                e
                                                            ) => {
                                                                return e?.name
                                                            }}
                                                            getOptionValue={(
                                                                e
                                                            ) => {
                                                                return e?.id
                                                            }}
                                                            options={
                                                                LanguageList
                                                            }
                                                        />
                                                    </>
                                                )}
                                            />
                                        </div>
                                    </>
                                ) : (
                                    ''
                                )
                                // <main className='flex items-center justify-center w-full h-screen page-load'>
                                //     <div class="loader">
                                //         <div class="flex items-center justify-center loader-circle"></div>
                                //         <h1 class="loader-text">Loading...</h1>
                                //     </div>
                                // </main>
                            }
                        </nav>
                    </div>
                </div>
                {/* <DeleteLogoutModal
                    show={show}
                    setshow={setshow}
                    title={<>are you sure you want <br /> Log out?</>}
                    IconClass={'icon-logout'}
                    SolidBTNText={'Log Out'}
                    onClickCancle={() => CancelModal()}
                    onClickOK={() => logOutSuccessFunction()}
                /> */}
                <DeleteLogoutModal
                    show={show}
                    setshow={setshow}
                    title={i18n.t(`logout.title`)}
                    // title={<>are you sure you want <br /> Log out?</>}
                    IconClass={'icon-logout'}
                    SolidBTNText={i18n.t(`logout.logoutBtn`)}
                    onClickCancle={() => CancelModal()}
                    onClickOK={() => logOutSuccessFunction()}
                />
            </header>
        </>
    )
}

export default Header
