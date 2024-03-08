import React from 'react'
import SiteBreadcrumb from '../../../components/SiteBreadcrumb/SiteBreadcrumb'
import ProfileImage from '../../../assets/images/user.png'
import { addtestimonial, home, testimonial } from '../../../config/routeConsts';
import '../Testimonial.scss'
import { Link } from 'react-router-dom';

const ViewTestimonial = () => {

    const BreadcrumbData = [
        {
            title: "Home",
            url: home,
        },
        {
            title: "Testimonial Management",
            url: testimonial,
        },
        {
            title: "View Testimonial",
        }
    ];
    return (
        <div className="view-testimonial">
            <SiteBreadcrumb
                BreadcrumbData={BreadcrumbData}
                className="protected-breadcrumb"
            />
            <div className="protected-head">
                <h2>View Testimonial</h2>
            </div>
            <div className="testimonial-profile-content">
                <div className="bg-white md:flex md:items-start user-info mt-32">
                    <div className="users-image flex items-start justify-center">
                        <img
                            src={ProfileImage}
                            width={160}
                            height={160}
                            alt="Picture of the author"
                        />
                    </div>
                    <div className="users-content">
                        <h3>Anna.W</h3>
                        <p className='type'>Event Organizer</p>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    </div>
                    <Link to={addtestimonial}  className="border-btn account-edit-btn">
                            <i className="icon-edit"></i>Edit Testimonial
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ViewTestimonial
