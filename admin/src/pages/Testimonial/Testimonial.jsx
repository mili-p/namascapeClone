import React from 'react'
import { addtestimonial, home } from '../../config/routeConsts';
import SiteBreadcrumb from '../../components/SiteBreadcrumb/SiteBreadcrumb';
import TestimonialTable from './TestimonialTable';
import { Link } from 'react-router-dom';

const Testimonial = () => {
    const BreadcrumbData = [
        {
            title: "Home",
            url: home,
        },
        {
            title: "Testimonial Management",
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
            <h2>Testimonial Management</h2>
            <div className='flex items-center wrap-boxs flex-wrap gap-4 sm:gap-5 3xl:gap-8'>
                <div className='flex items-center flex-wrap header-action'>
                    <Link to={addtestimonial} className='solid-btn dashboard-form-btn'>+ Add Testimonial</Link>
                    <button className="flex items-center download-link"><i className="icon-download"></i>Download Data</button>
                </div>
                </div>
            </div>
            <div className='mt-32'>
                <TestimonialTable />
            </div>
        </div>
    </>
  )
}

export default Testimonial