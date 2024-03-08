"use client";
import Link from "next/link";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import React from "react";
import { useTranslation } from "react-i18next";
import "./Sidebar.scss";

const Sidebar = ({
  mobileToggle,
  setmobileToggle,
  setSideCollapse,
  SideCollapse,
}) => {
  const pathname = usePathname();
  const { id, eventBookingId } = useParams();
  const { t, i18n } = useTranslation();
  const search = useSearchParams();
  // const data = new URLSearchParams()
  const globalSearchValue = search.get("search");
  const DataList = [
    {
      icon: (
        <>
          <i className="icon-dashboard"></i>
        </>
      ),
      text: i18n.t(`organizer.sidebar.dashboard`),
      url: "/dashboard/",
    },
    {
      icon: (
        <>
          <i className="icon-event-management"></i>
        </>
      ),
      text: i18n.t(`organizer.sidebar.eventmanagement`),
      // url : "/event-management/?activeTab=1",
      url: globalSearchValue
        ? `/event-management/?activeTab=1&search=${globalSearchValue}`
        : `/event-management/?activeTab=1&ct=1`,

      activeParentTab: "/create-event/",
      activeParentTab2: `/create-event/${id}/`,
    },
    {
      icon: (
        <>
          <i className="icon-event-bookings"></i>
        </>
      ),
      text: i18n.t(`organizer.sidebar.eventbooking`),
      url: "/event-booking/",
      activeTab: `/event-booking/${eventBookingId}/`,
    },
    {
      icon: (
        <>
          <i className="icon-terms-condition"></i>
        </>
      ),
      text: i18n.t(`organizer.sidebar.termsandconditions`),
      url: "/termsandconditions/",
      activeTab: `/termsandconditions/`,
    },
  ];

  const closeMobileMenu = () => {
    setmobileToggle(false);
    document.body.classList.remove("open-menu");
  };
  const SidebarCollapse = () => {
    setSideCollapse(!SideCollapse);
  };
  return (
    <>
      <aside
        className={`protected-sidebar ${
          mobileToggle === true
            ? "show"
            : SideCollapse === true
            ? "sidebar-collapse"
            : ""
        }`}
      >
        <div
          className={`flex items-center justify-center sidebar-collapse-btn ${
            SideCollapse === true ? "active" : ""
          }`}
          onClick={SidebarCollapse}
        >
          <i className="icon-back"></i>
        </div>
        <div className="protected-mobile-close" onClick={closeMobileMenu}></div>
        <ul className="protected-menu">
          {DataList?.map((list, i) => {
            const activeTabs =
              pathname === list?.url ||
              pathname === list?.activeParentTab ||
              pathname === list?.activeParentTab2 ||
              `${pathname}?activeTab=1&ct=1` === list?.url ||
              `${pathname}?activeTab=1&search=${globalSearchValue}` ===
                list?.url ||
              pathname === list?.activeTab
                ? "active"
                : "";
            // console.log(pathname, list?.url, "pathname === list?.url");
            return (
              <li key={i}>
                <Link
                  href={list?.url}
                  className={`flex items-center ${activeTabs}`}
                  onClick={closeMobileMenu}
                  title={list?.text}
                >
                  {list?.icon}
                  {list?.text}
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
