import SiteBreadcrumb from '@/app/components/SiteBreadcrumb/SiteBreadcrumb';
import H2 from '@/app/components/common/h2';
import H4 from '@/app/components/common/h4';
import React from 'react'
import './user-details.scss'
import Image from 'next/image';
import H3 from '@/app/components/common/h3';
import MyaccountUserImage from '@/public/assets/images/myaccount-user-image.png'
import QRCode from '@/public/assets/images/QR-code.png'

const page = () => {
    const BreadcrumbData = [
        {
            title: "Home",
            url: "/dashboard",
        },
        {
          title: "User Details",
      }
    ];
  return (
    <>
        <div className='user-details-page'>
            <SiteBreadcrumb
                BreadcrumbData={BreadcrumbData}
                className="protected-breadcrumb"
            />
            <div className='protected-head'><H2>Booking Details</H2></div>
            <div className="bg-white booking-details-card mt-32">
                <div className='booking-details-inner'>
                <div className='flex items-center justify-between booking-user-head'>
                    <div>
                    <div className='users-image flex items-start justify-center'>
                        <Image src={MyaccountUserImage} width={100} height={100}/>
                    </div>
                    <H3>Jane Cooper</H3>
                    <p>lesliealexander@example.com</p>
                    </div>
                    <div className='qr-code'>
                    <Image src={QRCode} width={153} height={153}/>
                    </div>
                </div>
                <ul className='user-content-list'>
                    <li>
                        <div className='label-name'>Booking ID</div>
                        <H4>#bid000012</H4>
                    </li>
                    <li>
                        <div className='label-name'>Payment Method</div>
                        <H4>Credit Card</H4>
                    </li>
                    <li>
                        <div className='label-name'>Booking Date and Time</div>
                        <H4>Oct 30, 2023, 05:02 AM</H4>
                    </li>
                    <li>
                        <div className='label-name'>Event Price</div>
                        <H4>$25.00</H4>
                    </li>
                    <li>
                        <div className='label-name'>Discount Amount</div>
                        <H4>$5.00</H4>
                    </li>
                    <li>
                        <div className='label-name'>Amount Paid</div>
                        <H4>$20.00</H4>
                    </li>
                </ul>
                <ul className='user-content-list'>
                    <li>
                        <div className='label-name'>Event</div>
                        <H4>Develop a Unique and Compelling Theme</H4>
                    </li>
                    <li>
                        <div className='label-name'>Event Location</div>
                        <H4>New Jersey 45463.</H4>
                    </li>
                    <li>
                        <div className='label-name'>Event Date and Time</div>
                        <H4>Nov 03, 2023, 10 - 11 AM</H4>
                    </li>
                    <li>
                        <div className='label-name'>Event Category</div>
                        <H4>Classes</H4>
                    </li>
                </ul>
                </div>
            </div>
        </div>
    </>
  )
}

export default page