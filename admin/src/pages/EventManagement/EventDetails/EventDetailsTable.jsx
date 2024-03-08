import React, { useEffect, useState } from 'react'
import ReactTableList from '../../../components/Table/ReactTableList'
import Pagination from '../../../components/Pagination'
import { createColumnHelper } from '@tanstack/react-table'
import { Link, useParams } from 'react-router-dom'
import { eventuserdetails } from '../../../config/routeConsts'
import { useDispatch, useSelector } from 'react-redux'
import { asyncbookingListThunk } from '../../../redux/thunk/bookingThunk/booking.thunk'
import { PAYMENTMETHODS } from '../../../common/constsforCodes'
import { timeDifference2, timeDifference3 } from '../../../functions/functions'
import requestApi from '../../../common/request'

const EventDetailsTable = () => {
  const {eventId} = useParams()
  const [filter, setFilter] = useState(null)
  const[page, setPage]=useState(1)
  const dispatch = useDispatch()
  const {bookingList,isLoading}= useSelector((e)=>e.booking)

  useEffect(()=>{
    if (filter) {
      dispatch(asyncbookingListThunk(
        {
          page,
          limit: 10,
          eventId:eventId,
          ...filter
        }
      ))
    }else{
      dispatch(
        asyncbookingListThunk({
            page,
            limit: 10,
            eventId:eventId
        })
    )
    }
            
  },[page, filter])

      //#region Table Columns
      const columnHelper = createColumnHelper()
      const columns = [
        columnHelper.accessor((row) => row?.bookingId, {
            id: 'bookingId',
            header: () => <>Booking ID</>,
            cell: (info) => {
              return info.getValue()
            }
          }),
        columnHelper.accessor((row) => row?.userDetails?.firstName, {
          id: 'firstName',
          header: () => <>First Name</>,
          cell: (info) => {
            return info.getValue()
          }
        }),
        columnHelper.accessor((row) => row?.userDetails?.lastName, {
          id: 'lastName',
          header: () => <>Last Name</>,
          cell: (info) => {
            return info.getValue()
          }
        }),
        columnHelper.accessor((row) => row?.userDetails?.email, {
          id: 'email',
          header: () => <>Email Address</>,
          cell: (info) => {
            return info.getValue()
          }
        }),
        columnHelper.accessor((row) => row?.PaymentMethod, {
            id: 'PaymentMethod',
            header: () => <>Payment Method</>,
            cell: (row) => {
              const paymentMethod = PAYMENTMETHODS.find(
                (e) => e?.id === row?.row?.original?.paymentMethod
            )
              return (
                <> {paymentMethod?.title}</>
              )
            }
        }),
        columnHelper.accessor((row) => row?.bookingTime, {
            id: 'bookingTime',
            header: () => <>Booking Date and Time</>,
            cell: (row) => {
                return <>{row?.row?.original?.bookingTime ? timeDifference3(row?.row?.original?.bookingTime):"-"}</>
            }
        }),
        columnHelper.accessor((row) => row?.actions,{
          id: 'actions',
          header: () => <>Action</>,
          cell: (row) => {
            return (
              <>
                <Link state={row?.row?.original?.eventId}
                 to={`${eventuserdetails}/${row?.row?.original?.eventBookingId}`}
                 className='solid-btn dashboard-form-btn'>View</Link>
              </>
            )
          }
        })
    ]
//#endregion


//#region  Download users by Events
const downloadEvents = async() => {
  try{

const response = await requestApi.post("/event-booking/export-data",{eventId:eventId})

   const fileURL = response.data.url;
     if(fileURL){
         const link = document.createElement('a');
         link.href = fileURL;
         link.setAttribute('download', 'filename.ext'); 
         document.body.appendChild(link);
         
         link.click();
         
         document.body.removeChild(link);
     }else{
         console.log("no data available")
     }

  }catch(error){
        throw new Error(error.message)
  }
}
//#endregion 
  return (
      <>
          <div className="protected-head">
              <h2></h2>
              {bookingList?.data?.length > 0 && (
              <div className="flex items-center download-link"  onClick={()=>downloadEvents()}>
                  <i className="icon-download"></i>Download Data
              </div>
              )} 
          </div>
          <div>

          <ReactTableList
              columns={columns}
              data={bookingList?.data}
              isLink
              isLoading={isLoading}
              parentLink={eventuserdetails}
              getfilter={(e) => {
                  setFilter(e)
              }}
              keyValue="eventBookingId"
              rowclick={['actions']}
              excludes={['actions','firstName','lastName', 'bookingTime','bookingId','PaymentMethod','email']}
          />

              {bookingList?.meta?.totalCount > 10 && (
                  <Pagination
                      totalCount={bookingList?.meta?.totalCount}
                      activePage={page}
                      pageCount={Math.ceil(bookingList?.meta?.totalCount / 10)}
                  onPageChange={(e) => {
                      setPage(e)
                  }}
                  />
              )}
          </div>
      </>
  )
}

export default EventDetailsTable