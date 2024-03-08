import {
    flexRender,
    getCoreRowModel,
    useReactTable
} from '@tanstack/react-table'
import { useState,memo } from 'react'
import { useNavigate } from 'react-router-dom'
import "./ReactTableList.scss"
import Skeleton from '../Skeleton'


function ReactTableList({
    columns,
    data,
    excludes = [],
    getfilter,
    isLoading,
    isLink,
    parentLink="/",
    keyValue,
    rowclick,
    innerClass
}) {

    const navigate = useNavigate()

    // Use the state and functions returned from useTable to build your UI
    const [filter, setFilter] = useState({
        sortBy: '',
        sortKey: ''
    })
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    })

    return (
        <div className='custom-table table-responsive'>
            <table>

                <thead
                    style={{
                        pointerEvents: `${
                            data?.length ? 'initial' : 'none'
                        }`
                    }}
                >
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    className={`text-left ${
                                        excludes.includes(header.id)
                                            ? ['nofilter']
                                            : ''
                                    }`}
                                    key={header.id}
                                    onClick={() => {
                                        if (!excludes.includes(header.id)) {
                                            setFilter((pre) => {
                                                if (
                                                    pre.sortKey ===
                                                    header.id
                                                ) {
                                                    return {
                                                        ...pre,
                                                        sortBy:
                                                            pre.sortBy === 1
                                                                ? -1
                                                                : 1
                                                    }
                                                }
                                                return {
                                                    ...pre,
                                                    sortKey: header.id,
                                                    sortBy: 1
                                                }
                                            })
                                            if (
                                                typeof getfilter ===
                                                'function'
                                            ) {
                                                getfilter(
                                                    filter.sortKey ===
                                                        header.id
                                                        ? {
                                                                ...filter,
                                                                sortBy:
                                                                    filter.sortBy ===
                                                                    1
                                                                        ? -1
                                                                        : 1
                                                            }
                                                        : {
                                                                ...filter,
                                                                sortKey:
                                                                    header.id,
                                                                sortBy: 1
                                                            }
                                                )
                                            }
                                        }
                                    }}
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                                header.column.columnDef
                                                    .header,
                                                header.getContext()
                                            )}
                                    <span className='sort-body'>
                                        {filter.sortBy !== '' &&
                                        filter.sortKey !== '' &&
                                        filter.sortKey === header.id ? (
                                            filter.sortBy === 1 ? (
                                                <><i className='icon-short-up active'></i><i className='icon-short-down'></i></>
                                            ) : (
                                                <><i className='icon-short-up'></i><i className='icon-short-down active'></i></>
                                            )
                                        ) : (
                                            ''
                                        )}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                {isLoading?
                    <>
                        {data?.length > 0 ? (
                            <>
                                <tbody>
                                    {table.getRowModel().rows.map((row) => (
                                        <tr key={row.id}>
                                            <td><Skeleton className='circle' width={50} height={50} /></td>
                                            {row.getVisibleCells().splice(1).map((cell) => (
                                                <td
                                                    className={`text-left ${
                                                        isLink
                                                            ? 'cursor-pointer'
                                                            : ''
                                                    }`}
                                                    key={cell.id}
                                                >
                                                    <Skeleton width='100%' height={30}/>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </>
                        )
                        :
                        <>
                        <tbody>
                            <tr>
                                <td colSpan={100}>
                                    <div className='data-not-found'>
                                        No Experiences Available
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        </>
                        }
                    </>
                :
                    <>
                        {data?.length > 0 ? (
                            <>
                                <tbody>
                                    {table.getRowModel().rows.map((row) => (
                                        <tr key={row.id}>
                                            {row.getVisibleCells().map((cell) => (
                                                <td
                                                    onClick={() => {
                                                        if (
                                                            isLink &&
                                                            !rowclick?.includes(
                                                                cell.column?.id
                                                            )
                                                        ) {
                                                            navigate(
                                                                `${parentLink}/${row.original?.[keyValue]}`
                                                            )
                                                        }
                                                    }}
                                                    className={`text-left ${
                                                        isLink
                                                            ? 'cursor-pointer'
                                                            : ''
                                                    }`}
                                                    key={cell.id}
                                                >
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </>
                        )
                        :
                        <>
                            <tbody>
                                <tr>
                                    <td colSpan={100}>
                                        <div className='data-not-found'>
                                            No Experiences Available
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </>
                        }
                    </>
                }
            </table>
        </div>
    )
}

export default memo(ReactTableList)
