import React, { useEffect, useRef, useState } from 'react'
import Pagination from '../../components/Pagination'
import ReactTableList from '../../components/Table'
import { createColumnHelper } from '@tanstack/react-table'
import { Link } from 'react-router-dom'
import { paymentdetails } from '../../config/routeConsts'
import { useDispatch, useSelector } from 'react-redux'
import { asyncpaymentListThunk } from '../../redux/thunk/paymentThunk/payment.thunk'
import { Currency, PAYMENTMETHODS } from '../../common/constsforCodes'
import { priceFormator, timeDifference2, timeDifference3 } from '../../functions/functions'

const PaymentManagementTable = () => {
    const [filter, setFilter] = useState(null)
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(JSON.parse(localStorage.getItem("currentPage")) || 1)
    const dispatch = useDispatch()
    const [statusChange, setstatusChange] = useState({
        value: 1,
        label: 'Active'
    })

    const { paymentList, isLoading } = useSelector((e) => e.payments)
    const payment = useRef(null)

    useEffect(() => {
        if (filter) {
            let data = {}

            if (filter?.sortKey === 'paymentTime') {
                data.sortBy = `${filter?.sortKey}:${filter?.sortBy}`
            } else {
                data.sortBy = filter?.sortBy
                data.sortKey = filter?.sortKey
            }

            dispatch(
                asyncpaymentListThunk({
                    page,
                    limit: 10,
                    // sortBy: 1,
                    // sortKey: '',
                    status: statusChange.value,
                    search,
                    ...data
                })
            )
        } else {
            dispatch(
                asyncpaymentListThunk({
                    page,
                    limit: 10,
                    // sortBy: 1,
                    // sortKey: '',
                    status: statusChange.value,
                    search
                })
            )
        }
    }, [page, filter, statusChange, search])

    const columnHelper = createColumnHelper()
    const columns = [
        columnHelper.accessor((row) => row?.paymentId, {
            id: 'paymentId',
            header: () => <>Payment ID</>,
            cell: (info) => {
                return info.getValue()
            }
        }),
        columnHelper.accessor((row) => row?.userDetails?.userUniqueId, {
            id: 'userUniqueId',
            header: () => <>User ID</>,
            cell: (info) => {
                return info.getValue()
            }
        }),
        columnHelper.accessor((row) => row?.paymentMethod, {
            id: 'paymentMethod',
            header: () => <>Payment Method</>,
            cell: (row) => {
                const paymentMethod = PAYMENTMETHODS.find(
                    (e) => e?.id === row?.row?.original?.paymentMethod
                )
                return <span>{paymentMethod?.title}</span>
            }
        }),

        columnHelper.accessor((row) => row?.eventPrice, {
            id: 'eventPrice',
            header: () => <>Experience Price</>,
            cell: (row) => {
                const currency = Currency.find(
                    (e) => e?.id === row?.row?.original?.currency
                )
                return (
                    <span>
                        {currency?.name !== "CHF" ? currency?.title : ""}
                        {priceFormator(row?.row?.original?.eventPrice)} {currency?.name}
                    </span>
                )
            }
        }),
        columnHelper.accessor((row) => row?.transactionFeesInPercentage, {
            id: 'transactionFeesInPercentage',
            header: () => <>Transation Fees (%)</>,
            cell: (row) => {
                return (
                    <span>
                        {row?.row?.original?.transactionFeesInPercentage}
                    </span>
                )
            }
        }),

        columnHelper.accessor((row) => row?.amountPaid, {
            id: 'amountPaid',
            header: () => <>Total Price</>,
            cell: (row) => {
                const currency = Currency.find(
                    (e) => e?.id === row?.row?.original?.currency
                )
                return (
                    <span>
                        {currency?.name !== "CHF" ? currency?.title : ""}
                        {priceFormator(row?.row?.original?.amountPaid)} {" "}
                        { currency?.name}
                    </span>
                )
            }
        }),
        columnHelper.accessor((row) => row?.userDetails?.firstName, {
            id: 'firstName',
            header: () => <>Username</>,
            cell: (info) => {
                return info.getValue()
            } 
        }),
        columnHelper.accessor((row) => row?.eventDetails?.title, {
            id: 'title',
            header: () => <>Title</>,
            cell: (info) => {
                return info.getValue()
            }
        }),
        columnHelper.accessor((row) => row?.paymentTime, {
            id: 'paymentTime',
            header: () => <>Payment Date and Time</>,
            cell: (row) => {
                return (
                    <span>
                        {timeDifference3(row?.row?.original?.paymentTime)}
                    </span>
                )
            }
        }),
        columnHelper.accessor((row) => row?.actions, {
            id: 'actions',
            header: () => <>Action</>,
            cell: (row) => {
                return (
                    <>
                        <Link
                            to={`${paymentdetails}/${row?.row?.original?.eventPaymentId}`}
                            className="solid-btn dashboard-form-btn"
                        >
                            View
                        </Link>
                    </>
                )
            }
        })
    ]
    return (
        <>
            <ReactTableList
                columns={columns}
                data={paymentList?.data}
                isLink
                parentLink={paymentdetails}
                isLoading={isLoading}
                keyValue="eventPaymentId"
                getfilter={(e) => {
                    setFilter(e)
                }}
                rowclick={['actions', 'status']}
                excludes={[
                    'actions',
                    'status',
                    'paymentId',
                    'userUniqueId',
                    'paymentMethod',
                    'eventPrice',
                    'transactionFeesInPercentage',
                    'amountPaid',
                    'firstName',
                    'title'
                ]}
            />

            {paymentList?.meta?.totalCount > 10 && (
                <Pagination
                    totalCount={paymentList?.meta?.totalCount}
                    activePage={page}
                    pageCount={Math.ceil(paymentList?.meta?.totalCount / 10)}
                    onPageChange={(e) => {
                        localStorage.setItem("currentPage",e)
                        setPage(e)
                    }}
                />
            )}
        </>
    )
}

export default PaymentManagementTable
