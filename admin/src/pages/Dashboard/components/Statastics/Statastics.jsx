import React from 'react'
import { Link } from 'react-router-dom'
import { bookingsmanagement, discountcodemanagement, eventmanagement, eventorganizermanagement, usermanagement } from '../../../../config/routeConsts'
import Skeleton from '../../../../components/Skeleton'
import { PARTNERS } from '../../../../common/constsforCodes'

const Statastics = ({data,isLoading}) => {

  return (
      <ul className="flex items-stretch flex-wrap protected-counter">
          <li className="sm:w-1/2 xl:w-1/4">
            {isLoading? 
              <>
                <div className='flex items-start justify-center flex-col bg-white p-4' style={{height: '130px'}}>
                  <Skeleton  width={40} height={40} className='mb-6' />
                  <Skeleton  width='80%' height={20}/>
                </div>
              </>
            :
              <>
                <Link to={usermanagement} className="link">
                    <h3>{data?.totalUser}</h3>
                    <p>Total Users</p>
                </Link>
              </>
            }
          </li>
          <li className="sm:w-1/2 xl:w-1/4">
            {isLoading? 
                <>
                  <div className='flex items-start justify-center flex-col bg-white p-4' style={{height: '130px'}}>
                  <Skeleton  width={40} height={40} className='mb-6' />
                  <Skeleton  width='80%' height={20}/>
                </div>
                </>
              :
                <>
                  <Link to={eventorganizermanagement} className="link"> 
                    <h3>{data?.totalOrganizer}</h3>
                    <p>{`Total ${PARTNERS}`}</p>
                  </Link>
                </>
            }
          </li>
          <li className="sm:w-1/2 xl:w-1/4">
            {isLoading? 
                  <>
                    <div className='flex items-start justify-center flex-col bg-white p-4' style={{height: '130px'}}>
                  <Skeleton  width={40} height={40} className='mb-6' />
                  <Skeleton  width='80%' height={20}/>
                </div>
                  </>
                :
                  <>
                    <Link to={eventmanagement} className="link"> 
                      <h3>{data?.totalEvents}</h3>
                      <p>Total Experiences</p>
                    </Link> 
                  </>
              }
          </li>
          <li className="sm:w-1/2 xl:w-1/4">
            {isLoading? 
                <>
                  <div className='flex items-start justify-center flex-col bg-white p-4' style={{height: '130px'}}>
                  <Skeleton  width={40} height={40} className='mb-6' />
                  <Skeleton  width='80%' height={20}/>
                </div>
                </>
              :
                <>
                  <Link to={bookingsmanagement} className="link">
                      <h3>{data?.totalBooking}</h3>
                      <p>Total Experience Bookings</p>
                  </Link>
                </>
            } 
          </li>
          {/* <li className="sm:w-1/2 xl:w-1/4">
            {isLoading? 
                <>
                  <div className='flex items-start justify-center flex-col bg-white p-4' style={{height: '130px'}}>
                  <Skeleton  width={40} height={40} className='mb-6' />
                  <Skeleton  width='80%' height={20}/>
                </div>
                </>
              :
                <>
                  <Link to={discountcodemanagement} className="link">
                    <h3>{data?.totalDiscountCode}</h3>
                    <p>Gross Revenue</p>
                  </Link>
                </>
            } 
          </li> */}
      </ul>
  )
}

export default React.memo(Statastics)