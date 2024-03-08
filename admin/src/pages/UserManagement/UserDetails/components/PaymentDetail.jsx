import React from 'react'
import { useNavigate } from 'react-router-dom'

const PaymentDetail = ({DiscountDetails,isLoading}) => {

  const navigate = useNavigate()

  return (
 <div className="payments-details-wrap sm:w-3/4">
    <ul className="user-content-list">
    {DiscountDetails.map(
        (dcd, i) => {
            if(!!dcd?.subTitle){
                return (
                    <li key={i} onClick={()=>navigate(dcd?.url)} style={{cursor:"pointer"}}>
                        <div className="label-name">
                            {
                                dcd?.title
                            }
                        </div>
                        <h4 className="__className_338bf7">
                            {
                                dcd?.subTitle
                            }
                        </h4>
                    </li>
                )
            }
        }
    )}
</ul>
  </div>
  )
}

export default PaymentDetail