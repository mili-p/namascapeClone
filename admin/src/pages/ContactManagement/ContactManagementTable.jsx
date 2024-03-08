import React, { useEffect, useRef, useState } from 'react'
import Pagination from '../../components/Pagination'
import ReactTableList from '../../components/Table'
import { createColumnHelper } from '@tanstack/react-table'
import { Link } from 'react-router-dom'
import { contactusdetail } from '../../config/routeConsts'
import { useDispatch, useSelector } from 'react-redux'
import { useForm,Controller } from 'react-hook-form'
import { asynccontactmasterDeleteThunk, asynccontactmasterListThunk } from '../../redux/thunk/contactmaster/contactmaster.thunk'
import DeleteLogoutModal from '../../components/SiteModal/DeleteLogoutModal/DeleteLogoutModal'
import { formatDateToMonthShortwithFormate2 } from '../../functions/functions'

const ContactManagementTable = ({ search, setSearch, page, setPage }) => {

    const [filter, setFilter] = useState(null)
    const dispatch = useDispatch()
    const [statusChange, setstatusChange] = useState(null)
    const newContactusId = useRef(null)

    const { contactmasterList,notification, isLoading } = useSelector((e) => e.contactmaster)

    console.log(notification?.data,"notification");

    const {
      register,
      handleSubmit,
      formState: { errors },
      control,
      watch
  } = useForm()

  const [show, setshow] = useState(false)
  const openMobileMenu = () => {
      setshow(true)
      document.body.classList.add('open-menu')
  }


  const [Dropdown, setDropdown] = useState(null)

  const OpenDropdown = (id) => {
      setDropdown(Dropdown === id ? null : id)
  }

  //#region API Call in Use-Effect
  useEffect(() => {
    if (filter) {
        dispatch(
          asynccontactmasterListThunk({
                page,
                limit: 10,
                 search,
                ...filter
            })
        )
    } else {
        dispatch(
          asynccontactmasterListThunk({
                page,
                limit: 10,
                search
            })
        )
    }
}, [page, filter, search])
//#endregion

//#region ContactUs Table Data
      const columnHelper = createColumnHelper()
      const columns = [
        columnHelper.accessor((row) => row?.firstName, {
            id: 'firstName',
            header: () => <>First Name</>,
            cell: (info) => {
              return info.getValue()
            }
        }),
        columnHelper.accessor((row) => row?.lastName, {
          id: 'lastName',
          header: () => <>Last Name</>,
          cell: (info) => {
            return info.getValue()
          }
      }),
        columnHelper.accessor((row) => row?.email, {
          id: 'email',
          header: () => <>Email Address</>,
          cell: (info) => {
            return info.getValue()
          }
        }),
     
        columnHelper.accessor((row) => row?.mobileNumber, {
          id: 'mobileNumber',
          header: () => <>Mobile Number</>,
          cell: (info) => {
              return info.getValue()
          }
        }),
        columnHelper.accessor((row) => row?.message, {
          id: 'message',
          header: () => <>Message</>,
          cell: (row) => {
            return <span className='description'>{row?.row?.original?.message}</span>
          }
        }),
        columnHelper.accessor((row) => row?.createdAt, {
          id: 'createdAt',
          header: () => <>Created Date</>,
          cell: (row) => {
            return <span>{formatDateToMonthShortwithFormate2(row?.row?.original?.createdAt)}</span>
          }
        }),
        columnHelper.display({
          id: 'actions',
          header: () => <>Action</>,
          cell: (row) => {
            return (
              <>
                {/* <Link to={`${contactusdetail}/${row?.row?.original?.contactUsId}`} className='solid-btn dashboard-form-btn'>View</Link>
                <button  className='solid-btn dashboard-form-btn'>View</button> */}


<div className="custom-table-dropdown" onMouseLeave={()=>OpenDropdown("")}>
                            <button
                                type="button"
                                className={`text-center btn-toggle ${
                                    row?.row?.original?.discountId === Dropdown
                                        ? 'active'
                                        : ''
                                }`}
                                onClick={() =>
                                    OpenDropdown(row?.row?.original?.contactUsId)
                                }
                            >
                                <i className="icon-dots"></i>
                            </button>
                            <ul
                                className={`dropdown-body ${
                                    row?.row?.original?.contactUsId === Dropdown
                                        ? 'show'
                                        : ''
                                }`}
                            >
                                <li>
                                    <Link
                                       to={`${contactusdetail}/${row?.row?.original?.contactUsId}`}
                                        className="flex items-center link"
                                    >
                                        <i className="icon-eye-open"></i> View
                                    </Link>
                                </li>
                                <li>
                                    <div
                                        className="flex items-center link"
                                        onClick={() => {
                                            openMobileMenu()
                                            newContactusId.current =
                                                row?.row?.original?.contactUsId
                                        }}
                                    >
                                        <i className="icon-delete"></i> Delete
                                    </div>
                                </li>
                            </ul>
                        </div>


              </>
            )
          }
        })
      ]
//#endregion

  return (
      <>
          <ReactTableList
              columns={columns}
              data={contactmasterList?.data}
              isLink
              isLoading={isLoading}
              parentLink={contactusdetail}
              getfilter={(e) => {
                  setFilter(e)
              }}
              keyValue="contactUsId"
              rowclick={['actions', 'status']}
              excludes={['actions', 'status']}
          />
          {contactmasterList?.meta?.totalCount > 10 && (
              <Pagination
                  totalCount={contactmasterList?.meta?.totalCount}
                  activePage={page}
                  pageCount={Math.ceil(
                      contactmasterList?.meta?.totalCount / 10
                  )}
                  onPageChange={(e) => {
                      localStorage.setItem("currentPage",e)
                      setPage(e)
                  }}
              />
          )}

          <DeleteLogoutModal
              payload={{ contactUsId: newContactusId.current }}
              deleteItem={asynccontactmasterDeleteThunk}
              invalidate={() => {
                dispatch(
                  asynccontactmasterListThunk({
                        page,
                        limit: 10,
                         search,
                        ...filter
                    })
                )
              }}
              show={show}
              setshow={setshow}
              title={<>are you sure you want to delete this contact?</>}
              IconClass={'icon-delete'}
              SolidBTNText={'Delete'}
              Delete
          />
      </>
  )
}

export default ContactManagementTable