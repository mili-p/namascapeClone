import H3 from '@/app/components/common/h3'
import H4 from '@/app/components/common/h4'
import React from 'react'

const CreditCardBox = () => {
  return (
    <div className='credit-card-box'>
        <div className="top">
            <p className='date'>Monday, December 24, 2022</p>
            <p className='time'>10:00 - 11:00 AM</p>
            <H3 className='title'>Austin Limits Events.</H3>
            <p className='description'>Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna...</p>
            <p className='flex items-center location'><i className="icon-location"></i>New Jersey 45463.</p>
        </div>
        <div className="bottom">
            <H3 className='title'>payment details</H3>
            <ul className='payment-list'>
                <li className='flex items-center justify-between'>Sub Total <span>$75.00</span></li>
                <li className='flex items-center justify-between'>Transaction Fees <span>$5.00</span></li>
                <li className='flex items-center justify-between totle'><H4 className='totle-title'>total price</H4> <H4 className='totle-title totle-amount'>$70.00</H4></li>
            </ul>
        </div>
    </div>
  )
}

export default CreditCardBox