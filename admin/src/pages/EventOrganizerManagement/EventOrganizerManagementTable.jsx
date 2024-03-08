import React, { useCallback, useEffect, useRef, useState } from 'react'
import Pagination from '../../components/Pagination'
import ReactTableList from '../../components/Table'
import { createColumnHelper } from '@tanstack/react-table'
import TableImage from '../../assets/images/user.png'
import { Link } from 'react-router-dom'
import {
    addorganizerprofile,
    eventdetails,
    userdetails,
    usermanagement,
    vieworganizerprofile
} from '../../config/routeConsts'
import DeleteLogoutModal from '../../components/SiteModal/DeleteLogoutModal/DeleteLogoutModal'
import { useDispatch, useSelector } from 'react-redux'
import {
    asyncUserListThunk,
    asyncUserStatusUpdateThunk
} from '../../redux/thunk/userThunk/user.thunk'
import { formatDateToMonthShortwithFormate2 } from '../../functions/functions'
import TableSkeleton from '../../components/TableSkeleton'
import { Controller,useForm } from 'react-hook-form'
import { PARTNER } from '../../common/constsforCodes'

const EventOrganizerManagementTable = ({search, setSearch,page,setPage}) => {

    const{register,handleSubmit, formState:{errors},watch,control} = useForm()

    const [userInfo, setUserInfo] = useState(null)
    // const [page, setPage] = useState(1)
    const [filter, setFilter] = useState(null)
    const dispatch = useDispatch()
    const [statusChange, setstatusChange] = useState({
        value: 1,
        label: 'Active'
    })


    const { userList, isLoading } = useSelector((e) => e.user)
    const user = useRef(null)

    useEffect(() => {
        if (filter) {
            dispatch(
                asyncUserListThunk({
                    page,
                    limit: 10,
                    status: statusChange.value,
                    userType: 1,
                    search,
                    ...filter
                })
            )
        } else {
            dispatch(
                asyncUserListThunk({
                    page,
                    limit: 10,
                    status: statusChange.value,
                    userType: 1,
                    search
                })
            )
        }
    }, [page, filter, statusChange, search])

    const [Dropdown, setDropdown] = useState(null)

    const OpenDropdown = (id) => {
        setDropdown(Dropdown === id ? null : id)
    }

    const [show, setshow] = useState(false)
    const openMobileMenu = () => {
        setshow(true)
        document.body.classList.add('open-menu')
    }

    //#region  User_master Colunms
    const columnHelper = createColumnHelper()
    const columns = [
        columnHelper.accessor((row) => row?.profileImage, {
            id: 'profileImage',
            header: () => <>Image</>,
            cell: (row) => {
                return (
                    <>
                        <img
                            src={row?.row?.original?.profileImage}
                            alt="event-image"
                        />
                    </>
                )
            }
        }),
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
        columnHelper.accessor((row) => row?.createdAt, {
            id: 'createdAt',
            header: () => <>Date of Joining</>,
            cell: (row) => {
                return (
                    <span>
                        {row?.row?.original?.createdAt
                            ? formatDateToMonthShortwithFormate2(
                                  row?.row?.original?.createdAt
                              )
                            : '-'}
                    </span>
                )
            }
        }),
        columnHelper.accessor((row) => row?.status, {
            id: 'status',
            header: () => <>Enable</>,
            cell: (row) => {
                return (
                    <>
                        <div className="switch-toggle">
                            <input
                                title={
                                    row?.row?.original?.status == 1
                                        ? 'Active'
                                        : ' In-Active'
                                }
                                type="checkbox"
                                id={row?.row?.original?.userId}
                                checked={
                                    row?.row?.original?.status === 1
                                        ? true
                                        : false
                                }
                                onChange={() => {
                                    dispatch(
                                        asyncUserStatusUpdateThunk(
                                            {
                                                userId: row?.row?.original
                                                    ?.userId,
                                                status:
                                                    row?.row?.original
                                                        ?.status === 1
                                                        ? 2
                                                        : 1
                                            },
                                            () =>
                                                dispatch(
                                                    asyncUserListThunk({
                                                        page,
                                                        limit: 10,
                                                        // sortBy: 1,
                                                        // sortKey: '',
                                                        status: statusChange.value,
                                                        userType: 1,
                                                        search,
                                                        ...filter
                                                    })
                                                )
                                        )
                                    )
                                }}
                            />
                            <label htmlFor={row?.row?.original?.userId}></label>
                        </div>
                    </>
                )
            }
        }),
        columnHelper.accessor((row) => row?.actions, {
            id: 'actions',
            header: () => <>Action</>,
            cell: (row) => {
                return (
                    <>
                        <div className="custom-table-dropdown" onMouseLeave={()=>OpenDropdown("")}>
                            <button
                                type="button"
                                className={`text-center btn-toggle ${
                                    row?.row?.original?.userId === Dropdown
                                        ? 'active'
                                        : ''
                                }`}
                                onClick={() =>
                                    OpenDropdown(row?.row?.original?.userId)
                                }

                            >
                                <i className="icon-dots"></i>
                            </button>
                            <ul
                                className={`dropdown-body ${
                                    row?.row?.original?.userId === Dropdown
                                        ? 'show'
                                        : ''
                                }`}
                            >
                                <li>
                                    <Link
                                        to={`${vieworganizerprofile}/${row?.row?.original?.userId}`}
                                        className="flex items-center link"
                                    >
                                        <i className="icon-eye-open"></i> View
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={`${addorganizerprofile}/${row?.row?.original?.userId}`}
                                        className="flex items-center link"
                                    >
                                        <i className="icon-edit"></i> Edit
                                    </Link>
                                </li>
                                <li>
                                    <div
                                        className="flex items-center link"
                                        onClick={() => {
                                            openMobileMenu()
                                            user.current =
                                                row?.row?.original?.userId
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
                        data={userList?.data}
                        isLink
                        isLoading={isLoading}
                        parentLink={vieworganizerprofile}
                        keyValue="userId"
                        getfilter={(e) => {
                            setFilter(e)
                        }}
                        rowclick={['actions', 'profileImage', 'status']}
                        excludes={['actions', 'profileImage', 'status']}
                    />

                    {userList?.meta?.totalCount > 10 && (
                        <Pagination
                            totalCount={userList?.meta?.totalCount}
                            activePage={page}
                            pageCount={Math.ceil(
                                userList?.meta?.totalCount / 10
                            )}
                            onPageChange={(e) => {
                                localStorage.setItem("currentPage",e)
                                setPage(e)
                            }}
                        />
                    )}


            <DeleteLogoutModal
                payload={{ userId: user.current, status: 3 }}
                deleteItem={asyncUserStatusUpdateThunk}
                invalidate={() => {
                    dispatch(
                        asyncUserListThunk({
                            page,
                            limit: 10,
                            status: statusChange.value,
                            userType: 1,
                            search,
                            ...filter
                        })
                    )
                }}
                show={show}
                setshow={setshow}
                title={`are you sure you want to delete this ${PARTNER}?`}
                IconClass={'icon-delete'}
                SolidBTNText={'Delete'}
                Delete
            />
        </>
    )
}

export default EventOrganizerManagementTable
