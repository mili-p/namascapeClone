'use client'
import React, { useState } from 'react'
import './event-details.scss'
import SiteBreadcrumb from '@/app/components/SiteBreadcrumb/SiteBreadcrumb';
import H2 from '@/app/components/common/h2';
import H4 from '@/app/components/common/h4';
import H5 from '@/app/components/common/h5';
import H3 from '@/app/components/common/h3';
import EventProviderList from '@/app/components/EventProviderList/EventProviderList';
import Image from 'next/image';
import Link from 'next/link';
import DeleteLogoutModal from '@/app/components/SiteModal/DeleteLogoutModal/DeleteLogoutModal';
import SliderImage from '@/public/assets/images/slider-image.png'

const EventDetails = () => {
  const [show, setshow] = useState(false)
    const BreadcrumbData = [
        {
          title: "Home",
          url: "/dashboard/",
        },
        {
          title: "Event Management",
          url: '/event-management/'
        },
        {
          title: "Event Details",
        },
    ];
    
    const StockList =[
      {
        count:'240',
        title:'Total',
      },
      {
        count:'40',
        title:'Available',
      },
      {
        count:'200',
        title:'Sold',
      },
      {
        count:'170',
        title:'Scanned',
      },
    ]
    
    const EventListWrapper =[
      {
        icon:<><i className='icon-calendar'></i></>,
        title:'Friday, November 03, 2023',
        subTitle:'18.00 - 23.00 PM',
      },
      {
        icon:<><i className='icon-location'></i></>,
        title:'New York City, US',
        subTitle:'2464 Royal Ln, New Jersey 45463...',
      },
      {
        icon:<><i className='icon-ticket'></i></>,
        title:'$25.00',
        subTitle:'Price per ticket',
      },
      {
        icon:<><i className='icon-percentage'></i></>,
        title:'35% Off',
        subTitle:'Discount',
      },
      {
        icon:<><i className='icon-language-square'></i></>,
        title:'English | German',
        subTitle:'Event Language',
      }
    ]
  return (
    <>
        <div className='protected-event-details'>
          <SiteBreadcrumb
              BreadcrumbData={BreadcrumbData}
              className="protected-breadcrumb"
          />
          <div className='protected-head'>
              <H2>Event Details</H2>
              <div className="flex items-center flex-wrap card-action">
                <Link href='/create-event' className='flex items-center link edit'><i className="icon-edit"></i>Edit</Link>
                <div className='flex items-center link delete' onClick={()=>setshow(true)}><i className="icon-delete"></i>Delete</div>
              </div>
          </div>
          <div className='flex items-start flex-wrap bg-white mt-32 event-details-wrapper'>
              <div className='w-full md:w-1/2 xl:w-2/5 3xl:w-2/6 slider-wrapper'>
                  <div className="static-image">
                    <Image src={SliderImage} alt='slider-image' width={452} height={396}/>
                  </div>
                  <div className='flex items-stretch slider-thumbnail'>
                      <div className='thumbnail-image'><Image src={SliderImage} alt='slider-image' width={452} height={396}/></div>
                      <div className='thumbnail-image'><Image src={SliderImage} alt='slider-image' width={452} height={396}/></div>
                      <div className='thumbnail-image'><Image src={SliderImage} alt='slider-image' width={452} height={396}/></div>
                      <div className='thumbnail-image '>
                        <div className='count'>
                          <Image src={SliderImage} alt='slider-image' width={452} height={396}/>
                          <H5 className='flex items-center justify-center count-text'>+4</H5>
                        </div>
                      </div>
                  </div>
              </div>
              <div className='w-full md:w-1/2 xl:w-3/5 3xl:w-4/6 event-details-body'>
                  <ul className='flex items-center flex-wrap stock-list'>
                    {StockList?.map((list,i)=>{
                      return(
                        <>
                          <li className='w-1/2 xl:w-1/4'>
                            <div className='inner'>
                              <H2 className='count'>{list.count}</H2>
                              <p>{list.title}</p>
                            </div>
                          </li>
                        </>
                      )
                    })}
                  </ul>
                  <div className='flex items-center flex-wrap card-action status-label active-card'>
                      <div className='link'>Offline</div>
                      <H4 className='text'>Active</H4> 
                  </div>
                  <H3 className='title'>Develop a Unique and Compelling Theme</H3>
                  <span className='event-caption'>Description</span>
                  <p className='description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                  <EventProviderList
                    EventListWrapper={EventListWrapper} 
                  />
              </div>
          </div>
          <DeleteLogoutModal 
            show={show}
            setshow={setshow}
            title={<>are you sure you want to <br /> delete this event?</>}
            IconclassName={'icon-delete'}
            SolidBTNText={'Delete'}
            Delete
          />
        </div>
    </>
  )
}

export default EventDetails