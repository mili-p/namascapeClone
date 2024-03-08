"use client"
import React, { useEffect } from 'react'
import H3 from '@/app/components/common/h3'
import "../../../../components/Layout/MyAccountLayout/SettingSideBar/SettingSideBar"
import { useDispatch } from 'react-redux'
import { eventPaymentAdyanCreditCardThunk } from '../../../../../../redux/Thunks/User/payment.adyan.thunk'

const PaymentSideBar = ({heading, setPaymentMode, paymentMode}) => {
    const dispatch = useDispatch()

 

    const paymentSidebarDataList = [
        {
            icon: (
                <>
                    <i className="icon-card"></i>
                </>
            ),
            title: 'Credit Card',
        },
        // {
        //     icon: (
        //         <>
        //             <i className="icon-twint"></i>
        //         </>
        //     ),
        //     title: 'Twint',
        // },
        // {
        //     icon: (
        //         <>
        //             <i className="icon-twint"></i>
        //         </>
        //     ),
        //     title: 'Paypal',
        // }
    ]

    return (
        <aside className="web-setting-sidebar">
            <div className='sticky-inner'>
                {/* <H3 className="title">{heading}</H3> */}
                <ul className='flex items-center md:block web-setting-menu'>
                    {paymentSidebarDataList?.map((listdata, i) => {
                        return (
                            <li key={i} className='w-1/2 sm:w-1/3 md:w-full'>
                                <button
                                    href=''
                                    className={`flex items-center w-full link ${listdata?.title === paymentMode
                                            ? 'active'
                                            : ''
                                        }`}
                                    onClick={() => setPaymentMode(listdata?.title)}
                                >
                                    {listdata.icon} {listdata?.title}
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </aside>
    )
}

export default PaymentSideBar