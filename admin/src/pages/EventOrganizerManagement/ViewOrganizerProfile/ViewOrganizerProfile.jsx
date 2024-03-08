import React, { useEffect } from 'react'
import '../EventOrganizerManagement.scss'
import {
    addorganizerprofile,
    eventorganizermanagement,
    home
} from '../../../config/routeConsts'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { asyncUserViewThunk } from '../../../redux/thunk/userThunk/user.thunk'
import { formatDateToMonthShortwithFormate2 } from '../../../functions/functions'
import SiteBreadcrumb from '../../../components/SiteBreadcrumb/SiteBreadcrumb'
import { PARTNER } from '../../../common/constsforCodes'

const ViewOrganizerProfile = () => {
    const { userId } = useParams()
    const { user, isLoading } = useSelector((e) => e.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    useEffect(() => {
        if(!userId){
          navigate(eventorganizermanagement)
        }else{
            dispatch(asyncUserViewThunk({ userId: userId }))
        }
    }, [])

    const BreadcrumbData = [
        {
            title: 'Home',
            url: home
        },
        {
            title: `${PARTNER} Management`,
            url: eventorganizermanagement
        },
        {
            title: `View ${PARTNER} Profile`
        }
    ]
    return (
        <div className="view-organizer-profile">
            <SiteBreadcrumb
                BreadcrumbData={BreadcrumbData}
                className="protected-breadcrumb"
            />
            <div className="protected-head">
                <h2>{`View ${PARTNER} Profile`}</h2>
            </div>
            <div className="organizer-profile-content">
                <div className="bg-white md:flex md:items-start user-info mt-32">
                    <div className="users-image flex items-start justify-center">
                        <img
                            src={user?.data?.profileImage}
                            width={160}
                            height={160}
                            alt="Picture of the author"
                        />
                    </div>
                    <div className="users-content">
                        <h3>
                            {user?.data?.firstName + ' ' + user?.data?.lastName}
                        </h3>
                        <div className="email">{user?.data?.email}</div>
                        {user?.data?.dob != '' && (
                            <div className="birthdate flex items-center">
                                <i className="icon-calendar"></i>
                                <span>
                                    {formatDateToMonthShortwithFormate2(
                                        user?.data?.dob
                                    )}
                                </span>
                            </div>
                        )}
                        {user?.data?.bio != '' && <p>{user?.data?.bio}</p>}
                        <ul className="social-links flex items-center flex-wrap">
                            {user?.data?.instagramLink != '' && (
                                <li>
                                    <a
                                        target="_blank"
                                        href={user?.data?.instagramLink}
                                        rel="noopener noreferrer"
                                        className="flex items-center"
                                    >
                                        <i className="icon-instagram-bg"></i>
                                        <span>Instagram</span>
                                    </a>
                                </li>
                            )}
                            {user?.data?.websiteLink != '' && (
                                <li>
                                    <a
                                        target="_blank"
                                        href={user?.data?.websiteLink}
                                        rel="noopener noreferrer"
                                        className="flex items-center"
                                    >
                                        <i className="icon-website-bg"></i>
                                        <span>Website</span>
                                    </a>
                                </li>
                            )}
                        </ul>
                    </div>
                    <Link to={`${addorganizerprofile}/${user?.data?.userId}`} className="border-btn account-edit-btn">
                            <i className="icon-edit"></i>Edit Profile
                    </Link>
                </div>
                {user?.data?.bankAccountDetails && (
                    <div className="bg-white common-content bank-details mt-32">
                        <div className="wrap-title flex items-center justify-between flex-wrap">
                            <h3 className="content-title">Bank Details</h3>
                        </div>
                        <ul className="user-content-list">
                            <li>
                                <div className="label-name">Bank name</div>
                                {user?.data?.bankAccountDetails?.bankName ? (
                                    <h4>
                                        {
                                            user?.data?.bankAccountDetails
                                                ?.bankName
                                        }
                                    </h4>
                                ) : (
                                    '-'
                                )}
                            </li>
                            <li>
                                <div className="label-name">
                                    Bank holder’s name
                                </div>
                                {user?.data?.bankAccountDetails
                                    ?.bankHolderName ? (
                                    <h4>
                                        {
                                            user?.data?.bankAccountDetails
                                                ?.bankHolderName
                                        }
                                    </h4>
                                ) : (
                                    '-'
                                )}
                            </li>
                            <li>
                                <div className="label-name">
                                Account Holder Address
                                </div>
                                {user?.data?.bankAccountDetails?.branchName ? (
                                    <h4>
                                        {
                                            user?.data?.bankAccountDetails
                                                ?.branchName
                                        }
                                    </h4>
                                ) : (
                                    '-'
                                )}
                            </li>
                            <li>
                                <div className="label-name">
                                PLZ and City
                                </div>
                                {user?.data?.bankAccountDetails?.plz && user?.data?.bankAccountDetails?.city ? (
                                    <h4>
                                        {user?.data?.bankAccountDetails?.plz} - {user?.data?.bankAccountDetails?.city}
                                    </h4>
                                ) : (
                                    '-'
                                )}
                            </li>
                            <li>
                                <div className="label-name">IBAN Number</div>
                                {user?.data?.bankAccountDetails?.IBANNumber ? (
                                    <h4>
                                        {
                                            user?.data?.bankAccountDetails
                                                ?.IBANNumber
                                        }
                                    </h4>
                                ) : (
                                    '-'
                                )}
                            </li>
                            <li>
                                <div className="label-name">Swift/BIC Number</div>
                                {user?.data?.bankAccountDetails?.swiftBIC ? (
                                    <h4>
                                        {
                                            user?.data?.bankAccountDetails
                                                ?.swiftBIC
                                        }
                                    </h4>
                                ) : (
                                    '-'
                                )}
                            </li>
                            <li>
                                <div className="label-name">Country</div>
                                {user?.data?.bankAccountDetails?.country?.name ? (
                                    <h4>
                                        {
                                            user?.data?.bankAccountDetails
                                                ?.country?.name
                                        }
                                    </h4>
                                ) : (
                                    '-'
                                )}
                            </li>
                            {/* <li>
                                <div className="label-name">Offer Link</div>
                                {user?.data?.bankAccountDetails?.offerLink
                                    .length > 0 ? (
                                    <h4>
                                        {
                                            user?.data?.bankAccountDetails
                                                ?.offerLink[0]
                                        }
                                    </h4>
                                ) : (
                                    '-'
                                )}
                            </li> */}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ViewOrganizerProfile
