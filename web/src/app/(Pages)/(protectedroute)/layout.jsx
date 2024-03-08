"use client";
import React, { useState } from "react";
import "./layout.scss";
import DashBoardHeader from "@/app/components/Layout/DashBoardLayout/DashBoardHeader";
import Sidebar from "@/app/components/Layout/DashBoardLayout/Sidebar";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
const ProtectedLayout = ({ children }) => {
  const {i18n} = useTranslation()
  const { logoutLoader } = useSelector((e) => e.authentication);
  const [mobileToggle, setmobileToggle] = useState(false);
  const [SideCollapse, setSideCollapse] = useState(false);

  return (
    <>
      {logoutLoader && (
        <div className="h-screen page-load logout-loader">
          <div className="h-screen justify-center loader">
            <span className="loader-circle "></span>
            <span className="loader-text">
            {i18n.t(`payment.Loading`)}...
            </span>
          </div>
        </div>
      )}
      <DashBoardHeader
        mobileToggle={mobileToggle}
        setmobileToggle={setmobileToggle}
      />
      <main className="protected-main">
        <Sidebar
          mobileToggle={mobileToggle}
          setmobileToggle={setmobileToggle}
          setSideCollapse={setSideCollapse}
          SideCollapse={SideCollapse}
        />
        <div
          className={`protected-content ${
            SideCollapse === true ? "content-collapse" : ""
          }`}
        >
          {children}
        </div>
      </main>
    </>
  );
};

export default ProtectedLayout;
