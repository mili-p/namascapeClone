import React from "react";
import CMSHeader from "./CMSHeader";
import CMSSidebar from "./CMSSidebar";
import { Outlet } from "react-router";
import "./CMSLayout.scss";

const CMSLayout = () => {
  return (
    <div className="cms-wrapper">
      <CMSHeader />
      <div className="content-managements xl:flex xl:items-stretch mt-32">
        <CMSSidebar />
        <div className="content-management-details bg-white w-full mt-32 xl:mt-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default CMSLayout;
