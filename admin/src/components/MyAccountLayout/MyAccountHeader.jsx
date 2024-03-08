import React from "react";
import SiteBreadcrumb from "../SiteBreadcrumb/SiteBreadcrumb";

const MyAccountHeader = () => {
  const BreadcrumbData = [
    {
      title: "Home",
      url: "/",
    },
    {
      title: "My Account",
      // url: '/myaccount'
    },
  ]
  return (
    <>
    <SiteBreadcrumb BreadcrumbData={BreadcrumbData}
    className="protected-breadcrumb" />
    <div className="protected-head flex items-center justify-between flex-wrap">
      <h2>my account</h2>
    </div>
    </>
  );
};

export default React.memo(MyAccountHeader)
