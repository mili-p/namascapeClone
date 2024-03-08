import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { editAccount } from '../../config/routeConsts'
import userIMage from "../../assets/images/myaccount-user-image.png"
import SiteBreadcrumb from "../../components/SiteBreadcrumb/SiteBreadcrumb"
import './MyAccount.scss'
const MyAccount = () => {
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

    <div className='my-account-wrapper'>
      <SiteBreadcrumb BreadcrumbData={BreadcrumbData}
        className="protected-breadcrumb" />
      <div className="protected-head flex items-center justify-between flex-wrap">
        <h2>my account</h2>
      </div>
      <div className="my-account-content">
        <div className="bg-white md:flex md:items-start user-info mt-32">
          <div className="users-image flex items-start justify-center">
            <img
              src={userIMage}
              width={160}
              height={160}
              alt="Picture of the author"
            />
          </div>
          <div className="users-content">
            <h3>Leslie Alexander</h3>
            <div className="email">lesliealexander@example.com</div>
            <div className="birthdate flex items-center">
              <i className="icon-calendar"></i>
              <span>10/11/1994</span>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <ul className="social-links flex items-center flex-wrap">
              <li>
                <a href="javascript:;" className="flex items-center">
                  <i className="icon-instagram-bg"></i>
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a href="javascript:;"  className="flex items-center">
                  <i className="icon-website-bg"></i>
                  <span>Website</span>
                </a>
              </li>
            </ul>
          </div>
          <Link to={editAccount}>
          <button type="button" className="border-btn account-edit-btn">
            <i className="icon-edit"></i>Edit Profile
          </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MyAccount