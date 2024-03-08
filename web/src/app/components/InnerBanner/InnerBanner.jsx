import React from 'react';
import './InnerBanner';
import './InnerBanner.scss'
import H1 from '../common/h1';
import SiteBreadcrumb from '../SiteBreadcrumb/SiteBreadcrumb';

const InnerBanner = ({ BreadcrumbData,heading , className }) => {

  return (
    <>
        <section className={`inner-banner flex items-center justify-center ${className}`}>
           <div className="container">
                <SiteBreadcrumb 
              BreadcrumbData={BreadcrumbData}
            />
                <H1>{heading}</H1>
           </div>
        </section>
    </>
  )
}

export default InnerBanner