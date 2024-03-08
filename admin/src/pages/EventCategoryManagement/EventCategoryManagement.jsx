import React from 'react'
import { addediteventcategory, addtestimonial, home } from '../../config/routeConsts';
import SiteBreadcrumb from '../../components/SiteBreadcrumb/SiteBreadcrumb';
import EventCategoryTable from './EventCategoryTable';
import { Link } from 'react-router-dom';

const EventCategoryManagement = () => {
    const BreadcrumbData = [
        {
            title: "Home",
            url: home,
        },
        {
            title: "Event Category Management",
        }
    ];

  return (
    <>
        <div className='testimonial'>
            <SiteBreadcrumb
            BreadcrumbData={BreadcrumbData}
            className="protected-breadcrumb"
            />
            <div className='protected-head'>
            <h2>Event Category Management</h2>
            <div className='flex items-center wrap-boxs flex-wrap gap-4 sm:gap-5 3xl:gap-8'>
                <div className='flex items-center flex-wrap header-action'>
                    <Link to={addediteventcategory} className='solid-btn dashboard-form-btn'>+ Add Event Category</Link>
                    <button className="flex items-center download-link"><i className="icon-download"></i>Download Data</button>
                </div>
                </div>
            </div>
            <div className='mt-32'>
                <EventCategoryTable />
            </div>
        </div>
    </>
  )
}

export default EventCategoryManagement