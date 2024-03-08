'use client'
import React from 'react'
import Image from 'next/image'
import H1 from '@/app/components/common/h1'
import H2 from '@/app/components/common/h2'
import Link from 'next/link'
import PageNotFound from '@/public/assets/images/page-not-found.png'

class MyErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true }
    }

    componentDidCatch(error, errorInfo) {
        // You can log the error to an error reporting service here
        console.error(error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return (
              <>
                <section className="page-not-found">
                    <Image
                        src={PageNotFound}
                        alt="page-not-found"
                        width={1920}
                        height={900}
                        sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                    />
                    <div className="content">
                        <H1>Oops!</H1>
                        <H2>Something Went Wrong</H2>
                        {/* <p>
                            The page you are looking for might have been removed
                            had it is name changed or is temporarily unavalable.
                        </p> */}
                    </div>
                </section>
                </>
            )
        }

        return this.props.children
    }
}

export default MyErrorBoundary
