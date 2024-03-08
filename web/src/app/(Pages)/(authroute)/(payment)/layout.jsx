import React from 'react'
import SettingSideBar from '@/app/components/Layout/MyAccountLayout/SettingSideBar/SettingSideBar'

const layout = ({ children }) => {
    return (
        <>
            <section className="web-setting pt-120 pb-120">
                <div className="container">
                    <div className="flex items-stretch justify-between flex-col md:flex-row web-setting-wrapper">
                        <SettingSideBar payment  heading = 'Payment Method' />
                        <div className="web-setting-content">{children}</div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default layout
