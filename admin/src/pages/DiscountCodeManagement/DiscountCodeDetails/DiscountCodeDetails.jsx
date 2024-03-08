    import React, { useEffect, useRef, useState } from 'react'
import '../DiscountCodeManagement.scss'
import {
    adddiscountcode,
    discountcodemanagement,
    home
} from '../../../config/routeConsts'
import SiteBreadcrumb from '../../../components/SiteBreadcrumb/SiteBreadcrumb'
import { Link, useNavigate, useParams } from 'react-router-dom'
import DeleteLogoutModal from '../../../components/SiteModal/DeleteLogoutModal/DeleteLogoutModal'
import {
    asyncdiscountcodeDeleteThunk,
    asyncdiscountcodeViewThunk
} from '../../../redux/thunk/discountCode/dicountcode.thunk'
import { useDispatch, useSelector } from 'react-redux'

import { formatDateToMonthShortwithFormate2 } from '../../../functions/functions'
import {
    EVENTCATEGORY,
    DISCOUNTTYPENEW
} from '../../../common/constsforCodes'

const DiscountCodeDetails = () => {
    const { discountId } = useParams()
    const { discountcode, isLoading } = useSelector((e) => e.discountcode)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(asyncdiscountcodeViewThunk({ discountId: discountId }))
    }, [])

    const [show, setshow] = useState(false)
    const openMobileMenu = () => {
        setshow(true)
        document.body.classList.add('open-menu')
    }
    const BreadcrumbData = [
        {
            title: 'Home',
            url: home
        },
        {
            title: 'Discount Code Management',
            url: discountcodemanagement
        },
        {
            title: 'Discount Code details'
        }
    ]

    const disctype = DISCOUNTTYPENEW.find(
        (e) => e?.id === discountcode?.data?.type
    )
    const Ecategory = EVENTCATEGORY.filter((e) =>
        discountcode?.data?.eventCategory.includes(e?.id)
    )

    return (
        <>
            <div className="discount-code-details">
                <SiteBreadcrumb
                    BreadcrumbData={BreadcrumbData}
                    className="protected-breadcrumb"
                />
                <div className="protected-head">
                    <h2>Discount Code details</h2>
                    <div className="flex items-center flex-wrap header-action">
                        {/* <Link
                            to={adddiscountcode}
                            className="solid-btn dashboard-form-btn"
                        >
                            + Add Discount Code
                        </Link> */}
                        <Link
                            to={`${adddiscountcode}/${discountId}`}
                            className="flex items-center download-link"
                        >
                            <i className="icon-edit"></i>Edit
                        </Link>
                        <div
                            className="flex items-center download-link delete"
                            onClick={openMobileMenu}
                        >
                            <i className="icon-delete"></i>Delete
                        </div>
                    </div>
                </div>
                <div className="bg-white p-5 mt-32">
                    <ul className="user-content-list">
                        <li>
                            <div className="label-name">Offer Title</div>
                            <h4 className="__className_338bf7">
                                {discountcode?.data?.title}
                            </h4>
                        </li>
                        <li>
                            <div className="label-name">Disc. Code</div>
                            {/* <h4 className="__className_338bf7"> */}
                                {discountcode?.data?.code ? discountcode?.data?.code :"-"}
                            {/* </h4> */}
                        </li>
                        <li>
                            <div className="label-name">Experience Category</div>
                            <h4 className="__className_338bf7">
                                {Ecategory.map((ev) => ev?.title).join(' , ')}
                            </h4>
                        </li>
                        <li>
                            <div className="label-name">Disc. Type</div>
                            <h4 className="__className_338bf7">
                                {disctype?.title}
                            </h4>
                        </li>
                        <li>
                            <div className="label-name">Min. Order Amount</div>
                            <h4 className="__className_338bf7">
                                {discountcode?.data?.minOrderAmount}
                            </h4>
                        </li>
                        <li>
                            <div className="label-name">Discount</div>
                            <h4 className="__className_338bf7">
                                {discountcode?.data?.discount}
                            </h4>
                        </li>
                        <li>
                            <div className="label-name">Start Date</div>
                            <h4 className="__className_338bf7">
                                {formatDateToMonthShortwithFormate2(
                                    discountcode?.data?.startDate
                                )}
                            </h4>
                        </li>
                        <li>
                            <div className="label-name">End Date</div>
                            <h4 className="__className_338bf7">
                                {formatDateToMonthShortwithFormate2(
                                    discountcode?.data?.endDate
                                )}
                            </h4>
                        </li>
                    </ul>
                </div>
                <div className="bg-white p-5 mt-32">
                    <div className="description-name">
                        Description in English
                    </div>
                    <p className="description" dangerouslySetInnerHTML={{__html:discountcode?.data?.description}} />
                        {/* {discountcode?.data?.description}
                    </p> */}
                </div>
                <div className="bg-white p-5 mt-32">
                    <div className="description-name">
                        Description in German
                    </div>
                    {/* <p className="description">
                        {discountcode?.data?.descriptionDe}
                    </p> */}
                      <p className="description" dangerouslySetInnerHTML={{__html:discountcode?.data?.descriptionDe}} />
                </div>
            </div>
            <DeleteLogoutModal
                payload={{ discountId: discountId}}
                deleteItem={asyncdiscountcodeDeleteThunk}
                invalidate={() => {
                    navigate(discountcodemanagement)
                }}
                show={show}
                setshow={setshow}
                title={<>are you sure you want to delete this Discount Code?</>}
                IconclassName={'icon-delete'}
                SolidBTNText={'Delete'}
                Delete
            />
        </>
    )
}

export default DiscountCodeDetails
