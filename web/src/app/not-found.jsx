import Image from 'next/image'
import React from 'react'
import H1 from './components/common/h1'
import H2 from './components/common/h2'
import Link from 'next/link'
import PageNotFound from '@/public/assets/images/page-not-found.png'
const NotFound = () => {
    return (
        <>
            <section className='page-not-found'>
                <Image src={PageNotFound} alt='page-not-found' width={1920} height={900} sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"/>
                <div className="content">
                    <H1>Oops!</H1>
                    <H2>404 - PAGE NOT FOUND</H2>
                    <p>The page you are looking for might have been removed had it is name changed or is temporarily unavailable.</p>
                    <Link href={'/'} className='solid-btn'>Go Back</Link>
                </div>
            </section>
        </>
    )
}

export default NotFound
