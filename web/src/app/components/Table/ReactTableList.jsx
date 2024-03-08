"use client";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import "./ReactTableList.scss";
import Skeleton from "../Skeleton/Skeleton";
// import LoaderPage from '../Loader/LoaderPage/LoaderPage'
// import LoaderTable from '../Loader/LoaderTable/LoaderTable'
// import { useNavigate } from 'react-router-dom'
// import NotFound from '../NotFound/NotFound'

function ReactTableList({
  columns,
  data,
  excludes = [],
  getfilter,
  isLoading,
  isLink,
  parentLink,
  keyValue,
  rowclick,
  noData,
  innerClass,
}) {
  // Use the state and functions returned from useTable to build your UI
  const [filter, setFilter] = useState({
    sortBy: "",
    sortKey: "",
  });
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  // const navigate = useNavigate()
  // Render the UI for your table
  return (
    <div className="custom-table table-responsive">
      <table>
        <thead
          style={{
            pointerEvents: `${data?.length ? "initial" : "none"}`,
          }}
        >
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  className={`text-left ${
                    excludes.includes(header.id) ? ["nofilter"] : ""
                  }`}
                  key={header.id}
                  // onClick={() => {
                  //     if (!excludes.includes(header.id)) {
                  //         setFilter((pre) => {
                  //             if (
                  //                 pre.sortKey ===
                  //                 header.id
                  //             ) {
                  //                 return {
                  //                     ...pre,
                  //                     sortBy:
                  //                         pre.sortBy === 1
                  //                             ? -1
                  //                             : 1
                  //                 }
                  //             }
                  //             return {
                  //                 ...pre,
                  //                 sortKey: header.id,
                  //                 sortBy: 1
                  //             }
                  //         })
                  //         if (
                  //             typeof getfilter ===
                  //             'function'
                  //         ) {
                  //             getfilter(
                  //                 filter.sortKey ===
                  //                     header.id
                  //                     ? {
                  //                             ...filter,
                  //                             sortBy:
                  //                                 filter.sortBy ===
                  //                                 1
                  //                                     ? -1
                  //                                     : 1
                  //                         }
                  //                     : {
                  //                             ...filter,
                  //                             sortKey:
                  //                                 header.id,
                  //                             sortBy: 1
                  //                         }
                  //             )
                  //         }
                  //     }
                  // }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  <span className="sort-body">
                    {filter.sortBy !== "" &&
                    filter.sortKey !== "" &&
                    filter.sortKey === header.id ? (
                      filter.sortBy === 1 ? (
                        <>
                          <i className="icon-short-up active"></i>
                          <i className="icon-short-down"></i>
                        </>
                      ) : (
                        <>
                          <i className="icon-short-up"></i>
                          <i className="icon-short-down active"></i>
                        </>
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {isLoading ? (
          <tbody>
            {Array.from({ length: 10 }).map((row, i) => (
              <tr key={i}>
                <td>
                  <Skeleton width="100%" height={20} />
                </td>
                <td>
                  <Skeleton className="circle" width={50} height={50} />
                </td>
                {Array.from({ length: 8 }).map((row, i) => (
                  <td key={i}>
                    <Skeleton width="100%" height={20} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        ) : (
          <>
            {data?.length > 0 ? (
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td
                        onClick={() => {
                          if (isLink && !rowclick?.includes(cell.column?.id)) {
                            navigate(
                              `${parentLink}/${row.original?.[keyValue]}`
                            );
                          }
                        }}
                        className={`text-left ${
                          isLink ? "cursor-pointer" : ""
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
            ) : (
                <tbody>
                    <tr>
                        <td colSpan={12}>
                            <div className="data-not-found">{noData}</div>
                        </td>
                    </tr>
                </tbody>
            )}
          </>
        )}
      </table>
    </div>
  );
}

export default ReactTableList;
