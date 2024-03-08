import React from 'react'
import { NavLink } from 'react-router-dom';
import { aboutus, apphomescreen, contactus, paymentfeesview, privacypolicy, socialconfirmation, termsandcondition } from '../../config/routeConsts';

const CMSHeader = () => {
  // const pathname = usePathname()
    // console.log(pathname,"000");
    const sideBarDataList = [
        {
            text : "About Us",
            url  : aboutus
        },
        {
            text : "Contact Us",
            url  : contactus
        },
        {
            text : "App Home Screen",
            url  : apphomescreen
        },
        {
            text : "Privacy Policy",
            url  : privacypolicy
        },
        {
            text : "Terms and Conditions",
            url  : termsandcondition
        },
        {
            text : "Transaction Fees",
            url  : paymentfeesview
        },
        {
            text : "Web Links Setting",
            url  : socialconfirmation
        },
    ]
  return (
    <ul className='cms-sidebar bg-white'>
            {sideBarDataList?.map((listdata,i)=>{
                return (
                    <li key={i}>
                        <NavLink
                        data-toggle="tooltip"
                        data-placement="top"
                        title={listdata?.text}
                         to={listdata?.url} className = {`flex items-center`}>{listdata?.text}</NavLink>
                    </li>
                )
            })}
        </ul>
  )
}

export default CMSHeader