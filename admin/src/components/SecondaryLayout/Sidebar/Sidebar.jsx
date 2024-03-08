import React, { useEffect } from "react";
import "./Sidebar.scss";
import { NavLink, useLocation } from "react-router-dom";
import {
  aboutus,
  bookingsmanagement,
  discountcodemanagement,
  eventmanagement,
  eventorganizermanagement,
  home,
  paymentmanagement,
  usermanagement,
  contactmanagement,
  testimonial,
  eventcategorymanagement,
} from "../../../config/routeConsts";
import { PARTNER } from "../../../common/constsforCodes";

const Sidebar = ({
  mobileToggle,
  setmobileToggle,
  setSideCollapse,
  SideCollapse,
}) => {
  const location = useLocation();
  const pathName = location?.pathname
    console.log(location?.pathname,"location")
  const contentPages = [
    "/aboutus",
    "/contact-us",
    "/app-homescreen",
    "/privacy-policy",
    "/terms-and-condition",
    "/payment-fees-view",
    "/Web-links-setting",
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
          <li onClick={closeMobileMenu}>
            <NavLink className="flex items-center" to={home} onClick={()=> localStorage.removeItem("currentPage")}>
              <i className="icon-dashboard"></i> Dashboard
            </NavLink>
          </li>
          <li onClick={closeMobileMenu}>
            {" "}
            <NavLink
              data-toggle="tooltip"
              data-placement="top"
              title="Users Mgmt."
              className="flex items-center"
              to={usermanagement}
              onClick={()=> localStorage.removeItem("currentPage")}
            >
              <i className="icon-users"></i> Users Mgmt.
            </NavLink>{" "}
          </li>
          <li onClick={closeMobileMenu}>
            {" "}
            <NavLink
              data-toggle="tooltip"
              data-placement="top"
              title={`${PARTNER} Mgmt.`}
              className="flex items-center"
              to={eventorganizermanagement}
              onClick={()=> localStorage.removeItem("currentPage")}
            >
              <i className="icon-event-organizer"></i> {`${PARTNER} Mgmt.`}
            </NavLink>
          </li>
          {/* <li onClick={closeMobileMenu}>
                        <NavLink
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Event Category Mgmt"
                            className="flex items-center"
                            to={eventcategorymanagement}
                        >
                            <i className="icon-discount-code"></i>Event Category Mgmt.
                        </NavLink>{' '}
                    </li> */}
          <li onClick={closeMobileMenu}>
            {" "}
            <NavLink
              data-toggle="tooltip"
              data-placement="top"
              title="Experience Mgmt."
              className="flex items-center"
              to={eventmanagement}
              onClick={()=> localStorage.removeItem("currentPage")}
            >
              <i className="icon-event-management"></i> Experience Mgmt.
            </NavLink>{" "}
          </li>
          <li onClick={closeMobileMenu}>
            <NavLink
              data-toggle="tooltip"
              data-placement="top"
              title="Bookings Mgmt."
              className="flex items-center"
              to={bookingsmanagement}
              onClick={()=> localStorage.removeItem("currentPage")}
            >
              <i className="icon-event-bookings"></i> Bookings Mgmt.
            </NavLink>{" "}
          </li>
          <li onClick={closeMobileMenu}>
            <NavLink
              data-toggle="tooltip"
              data-placement="top"
              title="Payment Mgmt."
              className="flex items-center"
              to={paymentmanagement}
              onClick={()=> localStorage.removeItem("currentPage")}
            >
              <i className="icon-payments"></i> Payment Mgmt.
            </NavLink>{" "}
          </li>
          <li onClick={closeMobileMenu}>
            <NavLink
              data-toggle="tooltip"
              data-placement="top"
              title="Discount Code Mgmt."
              className="flex items-center"
              to={discountcodemanagement}
              onClick={()=> localStorage.removeItem("currentPage")}
            >
              <i className="icon-discount-code"></i> Discount Code Mgmt.
            </NavLink>{" "}
          </li>
          {/* <li>
                        <NavLink
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Testimonial Mgmt"
                            className="flex items-center"
                            to={testimonial}
                        >
                            <i className="icon-discount-code"></i>Testimonial Mgmt.
                        </NavLink>{' '}
                    </li> */}
          <li onClick={closeMobileMenu}>
            <NavLink
              data-toggle="tooltip"
              data-placement="top"
              title="Contact Mgmt."
              className="flex items-center"
              to={contactmanagement}
              onClick={()=> localStorage.removeItem("currentPage")}
            >
              <i className="icon-call"></i> Contact Mgmt.
            </NavLink>{" "}
          </li>
          <li onClick={closeMobileMenu}>
            <NavLink
              data-toggle="tooltip"
              data-placement="top"
              title="Content Mgmt."
              className={`flex items-center ${
                contentPages.includes(location.pathname) ? "active" : ""
              } `}
              to={aboutus}
              onClick={()=> localStorage.removeItem("currentPage")}
            >
              <i className="icon-content"></i> Content Mgmt.
            </NavLink>{" "}
          </li>
        </ul>
      </aside>
    </>
  );
};

export default React.memo(Sidebar);
