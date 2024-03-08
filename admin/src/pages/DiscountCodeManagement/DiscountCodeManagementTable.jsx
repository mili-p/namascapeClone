import React, { useEffect, useRef, useState } from 'react'
import Pagination from '../../components/Pagination'
import ReactTableList from '../../components/Table'
import { createColumnHelper } from '@tanstack/react-table'
import { Link } from 'react-router-dom'
import { adddiscountcode, discountcodedetails } from '../../config/routeConsts'
import DeleteLogoutModal from '../../components/SiteModal/DeleteLogoutModal/DeleteLogoutModal'
import {
    asyncdiscountcodeDeleteThunk,
    asyncdiscountcodeListThunk,
    asyncdiscountcodeStatusUpdateThunk
} from '../../redux/thunk/discountCode/dicountcode.thunk'
import { useDispatch, useSelector } from 'react-redux'
import { formatDateToMonthShortwithFormate2 } from '../../functions/functions'

import {
    Currency,
    EVENTCATEGORY,
    DISCOUNTTYPE,
    DISCOUNTTYPENEW
} from '../../common/constsforCodes'
import TableSkeleton from '../../components/TableSkeleton'
const DiscountCodeManagementTable = ({search, setSearch,page,setPage}) => {
    // const [page, setPage] = useState(1)
    const [filter, setFilter] = useState(null)
    // const [search, setSearch] = useState('')
    const dispatch = useDispatch()
    const [statusChange, setstatusChange] = useState({
        value: 1,
        label: 'Active'
    })

    const { discountcodeList, isLoading } = useSelector((e) => e.discountcode)
    const discountCodeId = useRef(null)

    useEffect(() => {
        if (filter) {
            dispatch(
                asyncdiscountcodeListThunk({
                    page,
                    limit: 10,
                    status: statusChange.value,
                    search,
                    ...filter
                })
            )
        } else {
            dispatch(
                asyncdiscountcodeListThunk({
                    page,
                    limit: 10,
                    status: statusChange.value,
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

    const columnHelper = createColumnHelper()
    const columns = [
        columnHelper.accessor((row) => row?.title, {
            id: 'title',
            header: () => <>Offer Title</>,
            cell: (info) => {
                return info.getValue()
            }
        }),
        columnHelper.accessor((row) => row?.eventCategory, {
            id: 'eventCategory',
            header: () => <>Experience Category</>,
            cell: (row) => {
                const Ecategory = EVENTCATEGORY.filter((e) =>
                    row?.row?.original?.eventCategory.includes(e?.id)
                )
                return (
                    <span>{Ecategory.map((ev) => ev?.title).join(', ')}</span>
                )
            }
        }),
        columnHelper.accessor((row) => row?.code, {
            id: 'code',
            header: () => <>Disc. Code</>,
            cell: (info) => {
                return info.getValue() ? info.getValue() : "-"
            }
        }),
        columnHelper.accessor((row) => row?.type, {
            id: 'type',
            header: () => <>Disc. Type</>,
            cell: (row) => {
                const disctype = DISCOUNTTYPENEW.find(
                    (e) => e?.id === row?.row?.original?.type
                )
                return <span>{disctype.title}</span>
            }
        }),
        columnHelper.accessor((row) => row?.discount, {
            id: 'discount',
            header: () => <>Discount</>,
            cell: (info) => {
                return info.getValue()
            }
        }),
        columnHelper.accessor((row) => row?.minOrderAmount, {
            id: 'minOrderAmount',
            header: () => <>Min. Price</>,
            cell: (info) => {
                return info.getValue()
            }
        }),
        columnHelper.accessor((row) => row?.startDate, {
            id: 'startDate',
            header: () => <>Start Date</>,
            cell: (row) => {
                return (
                    <span>
                        {row?.row?.original?.startDate
                            ? formatDateToMonthShortwithFormate2(
                                  row?.row?.original?.startDate
                              )
                            : '-'}
                    </span>
                )
            }
        }),
        columnHelper.accessor((row) => row?.endDate, {
            id: 'endDate',
            header: () => <>End Date</>,
            cell: (row) => {
                return (
                    <span>
                        {row?.row?.original?.endDate
                            ? formatDateToMonthShortwithFormate2(
                                  row?.row?.original?.endDate
                              )
                            : '-'}
                    </span>
                )
            }
        }),
        columnHelper.accessor((row) => row?.status, {
            id: 'status',
            header: () => <>Status</>,
            cell: (row) => {
                return (
                    <>
                        <div className="switch-toggle">
                            <input
                                title={
                                    row?.row?.original?.status == 1
                                        ? 'Active'
                                        : 'Expired'
                                }
                                type="checkbox"
                                id={row?.row?.original?.discountId}
                                checked={
                                    row?.row?.original?.status === 1
                                        ? true
                                        : false
                                }
                                onChange={() => {
                                    dispatch(
                                        asyncdiscountcodeStatusUpdateThunk(
                                            {
                                                discountId:
                                                    row?.row?.original
                                                        ?.discountId,
                                                status:
                                                    row?.row?.original
                                                        ?.status === 1
                                                        ? 2
                                                        : 1
                                            },
                                            () =>
                                                dispatch(
                                                    asyncdiscountcodeListThunk({
                                                        page,
                                                        limit: 10,
                                                        // sortBy: 1,
                                                        // sortKey: '',
                                                        status: statusChange.value,
                                                        search,
                                                        ...filter
                                                    })
                                                )
                                        )
                                    )
                                }}
                            />
                            <label
                                htmlFor={row?.row?.original?.discountId}
                            ></label>
                        </div>
                    </>
                )
                // switch (row?.row?.original?.status) {
                //     case 1:
                //         return (
                //             <div className="status-label active-card">
                //                 <span className="text">Active</span>
                //             </div>
                //         )
                //     case 2:
                //         return (
                //             <div className="status-label rejected-card">
                //                 <span className="text">Expired</span>
                //             </div>
                //         )
                // }
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
                                    row?.row?.original?.discountId === Dropdown
                                        ? 'active'
                                        : ''
                                }`}
                                onClick={() =>
                                    OpenDropdown(row?.row?.original?.discountId)
                                }
                            >
                                <i className="icon-dots"></i>
                            </button>
                            <ul
                                className={`dropdown-body ${
                                    row?.row?.original?.discountId === Dropdown
                                        ? 'show'
                                        : ''
                                }`}
                            >
                                <li>
                                    <Link
                                        to={`${discountcodedetails}/${row?.row?.original?.discountId}`}
                                        className="flex items-center link"
                                    >
                                        <i className="icon-eye-open"></i> View
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={`${adddiscountcode}/${row?.row?.original?.discountId}`}
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
                                            discountCodeId.current =
                                                row?.row?.original?.discountId
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
    return (
        <>
        
                <>
                    <ReactTableList
                        columns={columns}
                        data={discountcodeList?.data}
                        isLink
                        isLoading={isLoading}
                        parentLink={discountcodedetails}
                        keyValue="discountId"
                        getfilter={(e) => {
                            setFilter(e)
                        }}
                        rowclick={['actions', 'status']}
                        excludes={['actions', 'status']}
                    />

                    {discountcodeList?.meta?.totalCount > 10 && (
                        <Pagination
                            totalCount={discountcodeList?.meta?.totalCount}
                            activePage={page}
                            pageCount={Math.ceil(
                                discountcodeList?.meta?.totalCount / 10
                            )}
                            onPageChange={(e) => {
                                localStorage.setItem("currentPage",e)
                                setPage(e)
                            }}
                        />
                    )}
                </>
          
            <DeleteLogoutModal
                payload={{ discountId: discountCodeId.current }}
                deleteItem={asyncdiscountcodeDeleteThunk}
                invalidate={() => {
                    dispatch(
                        asyncdiscountcodeListThunk({
                            page,
                            limit: 10,
                            status: statusChange.value,
                            search
                        })
                    )
                }}
                show={show}
                setshow={setshow}
                title={<>are you sure you want to delete this Discount Code?</>}
                IconClass={'icon-delete'}
                SolidBTNText={'Delete'}
                Delete
            />
        </>
    )
}

export default DiscountCodeManagementTable
