import React from 'react'
import { NavLink } from 'react-router-dom';
import { changepassword, editAccount } from '../../config/routeConsts';

const MyAccountSidebar = () => {
  // const pathname = usePathname()
    // console.log(pathname,"000");
    const sideBarDataList = [
        {
            text : "Personal Details",
            url  : editAccount
        },
        {
            text : "Change password",
            url  : changepassword
        }
    ]
  return (
    <ul className='my-account-sidebar bg-white'>
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

export default React.memo(MyAccountSidebar)