import React from "react";
import SiteBreadcrumb from "../SiteBreadcrumb/SiteBreadcrumb";

const CMSHeader = () => {
  const BreadcrumbData = [
    {
      title: "Home",
      url: "/",
    },
    {
      title: "Content Management",
      // url: '/myaccount'
    },
  ]
  return (
    <>
    <SiteBreadcrumb BreadcrumbData={BreadcrumbData}
    className="protected-breadcrumb" />
    <div className="protected-head flex items-center justify-between flex-wrap">
      <h2>Content management</h2>
    </div>
    </>
  );
};

export default CMSHeader;
