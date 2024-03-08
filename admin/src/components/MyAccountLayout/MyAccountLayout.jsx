import React from "react";
import { Outlet } from "react-router";


const MyAccountHeader = React.lazy(()=>import('./MyAccountHeader'))
const MyAccountSidebar = React.lazy(()=>import('./MyAccountSidebar'))

const MyAccountLayout = () => {
  return (
    <div className="my-account-wrapper">
      <MyAccountHeader />
      <div className="my-account xl:flex xl:items-stretch mt-32">
        <MyAccountSidebar />
        <div className="account-details bg-white w-full mt-32 xl:mt-0">
        <Outlet />
        </div>
      </div>
    </div>
  );
};

export default React.memo(MyAccountLayout)
