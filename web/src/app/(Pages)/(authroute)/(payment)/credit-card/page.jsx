import H2 from '@/app/components/common/h2'
import React from 'react'
import './credit-card.scss'
import CreditCardForm from './CreditCardForm/CreditCardForm'
import CreditCardBox from './CreditCardBox/CreditCardBox'

const CreditCard = () => {
  return (
    <>
    <div className='flex items-start card-details'>
      <div className='w-full lg:w-1/2 3xl:w-3/5'><CreditCardForm/></div>
      <div className='w-full lg:w-1/2 3xl:w-2/5'><CreditCardBox/></div>
    </div>
    </>
  )
}

export default CreditCard