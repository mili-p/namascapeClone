import React from 'react'
import {Outlet} from 'react-router-dom'
import './LRFLayout.scss'
import AuthenticationImage from '../../assets/images/authentication-image.webp';

const LRFLayout = () => {
    // const GetURL = usePathname();
    
    return (
        <>
            <main className='flex items-center justify-center relative md:h-screen auth-wrapper'>
                <section className='flex justify-end relative auth-card'>
                <div className='image-box w-full'>
                    <img src={AuthenticationImage} alt='authentication-image' loading='eager' />
                </div>
                <div className={`auth-form-wrapper md:flex md:items-center md:relative`}>
                    <Outlet />
                </div>
                </section>
            </main>
        </>
    )
}

export default React.memo(LRFLayout)