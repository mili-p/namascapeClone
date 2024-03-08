'use client'
import SuccessfullyModal from '@/app/components/SiteModal/SuccessfullyModal/SuccessfullyModal'
import H2 from '@/app/components/common/h2'
import React, { useState } from 'react'

const CreditCardForm = () => {
    const [show, setshow] = useState(false)
    const OpenSuccessModal = () => {
        setshow(true)
        document.body.classList.add('open-modal')
    }
  return (
    <>
        <form className='card-details-form'>
            <H2>Card details</H2>
            <div className="input-group card-number">
                <label>Card Number</label>
                <input type="text" value='⁕⁕⁕⁕ ⁕⁕⁕⁕ ⁕⁕⁕⁕ 5430' />
            </div>
            <div className="input-group">
                <label>Card Holder Name</label>
                <input type="text" value='Gáspár Gréta' />
            </div>
            <div className="input-group">
                <label>Expiry Date</label>
                <input type="text" value='10/2024' />
            </div>
            <div className="input-group">
                <label>CVV</label>
                <input type="password" value='123'/>
            </div>
            <button type='button' className='solid-btn' onClick={OpenSuccessModal}>Proceed to Confirm</button>
        </form>
        <SuccessfullyModal
            show={show}
            setshow={setshow}
            title={<>payment successful</>}
            description={<>Thank you for your booking. we are looking to welcome you.</>}
            SolidBTNText={'View E-ticket'}
            url={'/e-ticket'}
        />
    </>
  )
}

export default CreditCardForm