import React, { useEffect } from 'react'
import SiteBreadcrumb from '../../../components/SiteBreadcrumb/SiteBreadcrumb';
import { contactmanagement, home } from '../../../config/routeConsts';
import './contact-details.scss'
import { useParams } from 'react-router-dom';
import { asynccontactmasterViewThunk } from '../../../redux/thunk/contactmaster/contactmaster.thunk';
import { useDispatch, useSelector } from 'react-redux';

const ContactDetails = () => {

    const{contactUsId}=useParams()
    const dispatch = useDispatch()
    const { contactmaster, isLoading } = useSelector((e) => e.contactmaster)

    useEffect(() => {
        dispatch(asynccontactmasterViewThunk({ contactUsId: contactUsId }))
    }, [])

  const BreadcrumbData = [
    {
        title: "Home",
        url: home,
    },
    {
        title: "Contact Management",
        url: contactmanagement,
    },
    {
        title: "Contact Detail",
    }
  ];

  return (
    <>
      <div className='contact-details'>
        <SiteBreadcrumb
            BreadcrumbData={BreadcrumbData}
            className="protected-breadcrumb"
        />
        <div className='protected-head'>
            <h2>Contact Details</h2>
        </div>
        <div className="bg-white user-details-card mt-32">
            <ul className='user-content-list'>
                <li>
                    <div className='label-name'>First Name</div>
                    <h4>{contactmaster?.data?.firstName}</h4>
                </li>
                <li>
                    <div className='label-name'>Last Name</div>
                    <h4>{contactmaster?.data?.lastName}</h4>
                </li>
                <li>
                    <div className='label-name'>Email Address</div>
                    <p>{contactmaster?.data?.email}</p>
                </li>
                <li>
                    <div className='label-name'>Mobile Number</div>
                    <h4>{contactmaster?.data?.mobileNumber}</h4>
                </li>
            </ul>
        </div>
        <div div className="bg-white user-details-card mt-32">
              <ul className='user-content-list full-list'>
                <li>
                    <div className='label-name'>Message</div>
                    <p>{contactmaster?.data?.message}</p>
                </li>
            </ul>
        </div>
      </div>
    </>
  )
}

export default ContactDetails