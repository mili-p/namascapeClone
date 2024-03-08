import React from 'react'
import SiteBreadcrumb from '../../../components/SiteBreadcrumb/SiteBreadcrumb'
import ProfileImage from '../../../assets/images/user.png'
import { addediteventcategory, addtestimonial, eventcategorymanagement, home, testimonial } from '../../../config/routeConsts';
import '../EventCategory.scss'
import { Link, useParams } from 'react-router-dom';

const ViewEventCategory = () => {

    const {eventcategoryId} = useParams()

    const BreadcrumbData = [
        {
            title: "Home",
            url: home,
        },
        {
            title: "Event Category Management",
            url: eventcategorymanagement,
        },
        {
            title: "View Event Category",
        }
    ];
    return (
        <div className="view-testimonial">
            <SiteBreadcrumb
                BreadcrumbData={BreadcrumbData}
                className="protected-breadcrumb"
            />
            <div className="protected-head">
                <h2>View Event Category</h2>
            </div>
            <div className="testimonial-profile-content">
                <div className="bg-white md:flex md:items-start user-info mt-32">

                    <div className="users-content">
                        <h3>Anna.W</h3>
                    </div>
                    <Link to={`${addediteventcategory}/${eventcategoryId}`}  className="border-btn account-edit-btn">
                            <i className="icon-edit"></i>Edit Category
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ViewEventCategory
