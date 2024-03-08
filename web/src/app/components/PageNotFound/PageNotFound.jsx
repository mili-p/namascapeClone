import Image from 'next/image'
import React from 'react'
import H1 from '../common/h1'
import H2 from '../common/h2'
import Link from 'next/link'
import PageNotFoundImage from '@/public/assets/images/page-not-found.png'
const PageNotFound = ({errorMessage,backLink}) => {
    return (
        <>
            <section className='page-not-found'>
                <Image src={PageNotFoundImage} alt='page-not-found' width={1920} height={900} />
                <div className="content">
                    <H1>Oops!</H1>
                    <H2>400 - PAGE NOT FOUND</H2>
                    <p>The page you are looking for might have been removed had it is name changed or is temporarily unavalable.</p>
                    <Link href={backLink} className='solid-btn'>Go Back</Link>
                </div>
            </section>
        </>
    )
}

export default PageNotFound
