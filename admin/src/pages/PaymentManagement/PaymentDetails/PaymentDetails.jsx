import React, { useEffect } from 'react'
import { eventdetails, home, paymentmanagement } from '../../../config/routeConsts'
import SiteBreadcrumb from '../../../components/SiteBreadcrumb/SiteBreadcrumb'
import MyAccountUser from '../../../assets/images//myaccount-user-image.png'
import QRCode from '../../../assets/images//QR-code.png'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { asyncpaymentViewThunk } from '../../../redux/thunk/paymentThunk/payment.thunk'
import { Currency, EVENTTYPE, PAYMENTMETHODS } from '../../../common/constsforCodes'
import { priceFormator, timeDifference2, timeDifference3 } from '../../../functions/functions'
import PaymentDetail from '../../UserManagement/UserDetails/components/PaymentDetail'
import './PaymentDetails.scss'

const PaymentDetails = () => {
    const { eventPaymentId } = useParams()
    const dispatch = useDispatch()

    const { payment, isLoading } = useSelector((e) => e.payments)

    useEffect(() => {
        if (!eventPaymentId) {
            navigate(paymentmanagement)
        }
    }, [])

    useEffect(() => {
        dispatch(
            asyncpaymentViewThunk({ eventPaymentId: eventPaymentId }, () =>
                navigate(paymentmanagement)
            )
        )
    }, [])

    const paymentMethod = PAYMENTMETHODS.find(
        (e) => e?.id === payment?.data?.paymentMethod
    )
    const Paymentcurrency = Currency.find(
        (e) => e?.id === payment?.data?.currency
    )
    const eventtype = EVENTTYPE.find(
        (e) => e?.id === payment?.data?.eventDetails?.eventType
    )

    const Eventcurrency = Currency.find(
        (e) => e?.id === payment?.data?.currency
    )
    

    const BreadcrumbData = [
        {
            title: 'Home',
            url: home
        },
        {
            title: 'Payment Management',
            url: paymentmanagement
        },
        {
            title: 'Payment Details'
        }
    ]

    const PymentObj = [
        {
            title: <>Payment ID</>,
            subTitle: (
                <>{payment?.data?.paymentId ? payment?.data?.paymentId : '-'}</>
            )
        },
        {
            title: <>User ID</>,
            subTitle: (
                <>{payment?.data?.userDetails?.userUniqueId ? payment?.data?.userDetails?.userUniqueId : '-'}</>
            )
        },
        {
            title: <>Payment Method</>,
            subTitle: (
                <>{payment?.data?.paymentMethod ? paymentMethod?.title : '-'}</>
            )
        },
        {
            title: <>Payment date and time</>,
            subTitle: (
                <>
                    {payment?.data?.paymentTime
                        ? timeDifference3(payment?.data?.paymentTime)
                        : '-'}
                </>
            )
        },
        {
            title: <>Experience Price</>,
            subTitle: (
                <>
                    {Eventcurrency?.name=="CHF" ?"": Eventcurrency?.title}{priceFormator(payment?.data?.eventPrice)} {Eventcurrency?.name}
                </>
            )
        },
        {
            title: <>Discount Amount</>,

            subTitle: (
                <>
                    { payment?.data?.discountType == 2 ? (
                        <>{`${payment?.data?.discountAmount} %`}</>
                    ) : payment?.data?.discountAmount ? (
                       Paymentcurrency?.name=="CHF" ? " ": Paymentcurrency?.title +
                        '' +
                        payment?.data?.discountAmount
                    ) : (
                        '-'
                    )}
                </>
            )
        },
        {
            title: <>Amount Paid</>,
            subTitle: (
                <>
                    {payment?.data?.amountPaid == 0
                        ? '-'
                        : (Paymentcurrency?.name=="CHF" ? "" : Paymentcurrency?.title) +
                          '' +
                          priceFormator(payment?.data?.amountPaid) +
                          ' ' +
                          Paymentcurrency?.name}
                </>
            )
        },
        {
            title: <>Experience Title</>,
            url:`${eventdetails}/${payment?.data?.eventDetails?.eventId}`,
            subTitle: (
                <>
                    {payment?.data?.eventDetails?.title ? payment?.data?.eventDetails?.title :"-"}
                </>
            )
        },
    ]

    return (
        <>
            <div className="payment-details">
                <SiteBreadcrumb
                    BreadcrumbData={BreadcrumbData}
                    className="protected-breadcrumb"
                />
                <div className="protected-head">
                    <h2>Payment Details</h2>
                </div>
                <div className="bg-white user-details-card mt-32">
                    <div className="booking-details-inner">
                        <div className="flex items-center justify-between booking-user-head">
                            <div>
                                <div className="users-image flex items-start justify-center">
                                    <img
                                        src={
                                            payment?.data?.userDetails
                                                ?.profileImage
                                        }
                                        width={160}
                                        height={160}
                                        alt="Picture of the User"
                                    />
                                </div>
                                <h3>
                                    {payment?.data?.userDetails?.firstName}{' '}
                                    {payment?.data?.userDetails?.lastName}
                                </h3>
                                <p>{payment?.data?.userDetails?.email}</p>
                            </div>
                            <div className="qr-code">
                                <img
                                    src={payment?.data?.qrcode}
                                    width={153}
                                    height={153}
                                />
                            </div>
                        </div>
                        <PaymentDetail
                            DiscountDetails={PymentObj}
                            isLoading={isLoading}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentDetails
