import React, { useEffect, useRef, useState } from "react";
import Pagination from "../../components/Pagination";
import ReactTableList from "../../components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { eventdetails, home } from "../../config/routeConsts";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  asyncEventAcceptDeclineThunk,
  asyncEventSponserThunk,
  asynceventDeleteThunk,
  asynceventListThunk,
} from "../../redux/thunk/eventThunk/event.thunk";
import {
  formatDateToMonthShortwithFormate2,
  languageList,
  priceFormator,
  timeDifference2,
  timeDifference3,
} from "../../functions/functions";

import DeleteLogoutModal from "../../components/SiteModal/DeleteLogoutModal/DeleteLogoutModal";
import {
  Currency,
  EVENTCATEGORY,
  EVENTSTATUS,
  EVENTTYPE,
  EventRecurrence,
  PARTNER,
} from "../../common/constsforCodes";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import EventStatusModal from "../../components/SiteModal/EventStatusModal/EventStatusModal";

function checkkeyExist(obj) {
  return Object.values(obj).filter((e) => !!e)?.length > 0;
}

//#region YUP schema
const validationSchema = yup
  .object()
  .shape(
    {
      startDate: yup.string().when("endDate", {
        is: (e) => !!e,
        then: () => yup.string().required("required"),
        otherwise: () => yup.string(),
      }),
      endDate: yup.string().when("startDate", {
        is: (e) => !!e,
        then: () => yup.string().required("required"),
        otherwise: () => yup.string(),
      }),
    },
    ["startDate", "endDate"]
  )
  .test(
    "custome-message",
    "End date should  be greater than start date",
    function (value) {
      if (Boolean(value?.startDate) && Boolean(value?.endDate)) {
        return new Date(value?.endDate).getTime() >
          new Date(value?.startDate).getTime()
          ? true
          : false;
      } else {
        return true;
      }
    }
  );
//#endregion

const EventManagementTable = ({
  search,
  setSearch,
  page,
  setPage,
  filterData,
  setFilterData,
}) => {
  function formatDate(timestamp) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const date = new Date(timestamp);
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
  }

  // const [page, setPage] = useState(1)
  const [filter, setFilter] = useState(null);
  // const [search, setSearch] = useState('')
  const [eventDate, setEventDate] = useState(null);
  const dispatch = useDispatch();
  const [statusChange, setstatusChange] = useState(null);

  const [eventStatusUpdateModal, setEventStatusUpdateModal] = useState(false);

  const { eventList, isLoading } = useSelector((e) => e.event);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onSubmit",
  });

  const event = useRef(null);
  const ARstatus = useRef(null);
  const eventDeleteId = useRef(null);
  const [show, setshow] = useState(false);
  const openMobileMenu = () => {
    setshow(true);
    document.body.classList.add("open-menu");
  };

  const [showDeletePopup, setshowDeletePopup] = useState(false);
  const openMobileMenuForDelete = () => {
    setshowDeletePopup(true);
    document.body.classList.add("open-menu");
  };

  const [Dropdown, setDropdown] = useState(null);

  const OpenDropdown = (id) => {
    setDropdown(Dropdown === id ? null : id);
  };

  console.log(filterData?.start_date, "ggggggggggggggggg");
  useEffect(() => {
    const payload = {
      isPaid: false,
      isFree: false,
    };
    if (filterData?.isPaid?.title == "Paid") {
      payload.isPaid = true;
    } else if (filterData?.isPaid?.title == "Free") {
      payload.isFree = true;
    } else if (filterData?.sortbyprice?.title === "Low - High") {
      payload.sortBy = "price:1";
      // payload.price = '1'
    } else if (filterData?.sortbyprice?.title === "High - Low") {
      // payload.price = '-1'
      payload.sortBy = "price:-1";
    } else if (filterData?.sortbytime?.title === "Earliest to Latest") {
      payload.sortBy = "startTime:1";
    } else if (filterData?.sortbytime?.title === "Latest to Earliest") {
      // payload.time = '-1'
      payload.sortBy = "startTime:-1";
    }
    // ///// Changes Done  by Mili for filter payload /////
    if (filterData?.sortbydate?.id === 2) {
      payload.sortBy = "updatedAt:-1";
    }
    if (filterData?.sortbydate?.id === 1) {
      payload.sortBy = "createdAt:-1";
    }
    if (filterData?.organizerIds?.length > 0) {
      payload.organizerIds = filterData?.organizerIds.map((e) => e.userId);
    }
    // ///// Changes Done  ENd by Mili for filter payload /////
    if (filter) {
      let data = {};

      if (filter?.sortKey === "startTime") {
        data.sortBy = `${filter?.sortKey}:${filter?.sortBy}`;
      } else if (filter?.sortKey === "title") {
        data.sortBy = `${filter?.sortKey}:${filter?.sortBy}`;
      } else if (filter?.sortKey === "updatedAt") {
        data.sortBy = `${filter?.sortKey}:${filter?.sortBy}`;
      } else {
        data.sortBy = filter?.sortBy;
        data.sortKey = filter?.sortKey;
      }

      dispatch(
        asynceventListThunk({
          page,
          limit: 10,
          status: EVENTSTATUS.find(
            (e) => e.title === filterData?.EventStatus?.title
          )?.id,
          eventType: EVENTTYPE.find(
            (e) => e.title === filterData?.eventType?.title
          )?.id,
          location: filterData?.city?.cityId,
          ...payload,
          search,
          startDate: filterData?.start_date
            ? new Date(filterData?.start_date).setHours(0, 0, 0)
            : "",
          endDate: filterData?.end_date
            ? new Date(filterData?.end_date).setHours(23, 59, 59)
            : // new Date(filterData?.end_date).getTime()
              "",
          ...data,
        })
      );
    } else {
      dispatch(
        asynceventListThunk({
          page,
          limit: 10,
          status: EVENTSTATUS.find(
            (e) => e.title === filterData?.EventStatus?.title
          )?.id,
          eventType: EVENTTYPE.find(
            (e) => e.title === filterData?.eventType?.title
          )?.id,
          location: filterData?.city?.cityId,
          ...payload,
          search,
          startDate: filterData?.start_date
            ? new Date(filterData?.start_date).setHours(0, 0, 0)
            : "",
          endDate: filterData?.end_date
            ? new Date(filterData?.end_date).setHours(23, 59, 59)
            : // new Date(filterData?.end_date).getTime()
              "",
        })
      );
    }
  }, [page, filter, search, filterData]);

  //#region Event Data Colunms
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor((row) => row?.images, {
      id: "images",
      header: () => <>Image</>,
      cell: (row) => {
        return (
          <>
            <img
              src={row?.row?.original?.media[0]?.imageUrl}
              alt="event-image"
            />
          </>
        );
      },
    }),
    columnHelper.accessor((row) => row?.title, {
      id: "title",
      header: () => <>Title</>,
      cell: (info) => {
        return info.getValue();
      },
    }),
    columnHelper.accessor((row) => row?.category, {
      id: "category",
      header: () => <>Category</>,
      cell: (row) => {
        const EventCategory = EVENTCATEGORY.find(
          (e) => e.id === row?.row?.original?.category
        );
        return <span>{EventCategory.title}</span>;
      },
    }),
    columnHelper.accessor((row) => row?.language, {
      id: "language",
      header: () => <>Language</>,
      cell: (row) => {
        return (
          <span>
            {row?.row?.original?.language
              ? row?.row?.original?.language
                  ?.map((e) => languageList?.[e])
                  .join(" , ")
              : "-"}
          </span>
        );
      },
    }),

    columnHelper.accessor((row) => row?.city, {
      id: "city",
      header: () => <>City</>,
      cell: (row) => {
        return (
          <span>
            {row?.row?.original?.city?.name
              ? row?.row?.original?.city?.name
              : "-"}
          </span>
        );
      },
    }),
    columnHelper.accessor((row) => row?.startTime, {
      id: "startTime",
      header: () => <>Experience Date and Time</>,
      cell: (row) => {
        return (
          <span>
            {row?.row?.original?.startTime
              ? timeDifference3(row?.row?.original?.startTime)
              : "-"}
          </span>
        );
      },
    }),
    columnHelper.accessor((row) => row?.duration, {
      id: "duration",
      header: () => <>Recurrence</>,
      cell: (row) => {
        const EventDuration = EventRecurrence.find(
          (e) => e.id === row?.row?.original?.duration
        );
        return <span>{EventDuration?.title}</span>;
      },
    }),
    columnHelper.accessor((row) => row?.price, {
      id: "price",
      header: () => <>Price</>,
      cell: (row) => {
        const currency = Currency.find(
          (e) => e?.id === row?.row?.original?.currency
        );

        return (
          <span>
            {row?.row?.original?.price != ""
              ? `
                         ${currency?.name !== "CHF" ? currency?.title : ""}
                            ${priceFormator(row?.row?.original?.price)} ${
                  currency?.name
                } `
              : "Free"}
          </span>
        );
      },
    }),

    columnHelper.accessor((row) => row?.organizerDetails?.firstName, {
      id: "organizerDetails",
      header: () => `${PARTNER}`,
      cell: (row) => {
        return (
          <span>
            {row?.row?.original?.organizerDetails?.firstName
              ? row?.row?.original?.organizerDetails?.firstName +
                " " +
                row?.row?.original?.organizerDetails?.lastName
              : "-"}
          </span>
        );
      },
    }),
    columnHelper.accessor((row) => row?.createdAt, {
      id: "createdAt",
      header: () => <>Created Date</>,
      cell: (row) => {
        return (
          <span>
            {row?.row?.original?.createdAt
              ? formatDateToMonthShortwithFormate2(
                  row?.row?.original?.createdAt
                )
              : "-"}
          </span>
        );
      },
    }),
    columnHelper.accessor((row) => row?.updatedAt, {
      id: "updatedAt",
      header: () => <>Updated Date</>,
      cell: (row) => {
        return (
          <span>
            {row?.row?.original?.updatedAt
              ? formatDateToMonthShortwithFormate2(
                  row?.row?.original?.updatedAt
                )
              : "-"}
          </span>
        );
      },
    }),
    columnHelper.accessor((row) => row?.status, {
      id: "status",
      header: () => <>Status</>,
      cell: (row) => {
        switch (row?.row?.original?.status) {
          case 1:
            return (
              <div className="flex items-center approve-action-group">
                <span
                  className="inline-flex items-center justify-center approve"
                  onClick={() => {
                    openMobileMenu();
                    (event.current = row?.row?.original?.eventId),
                      (ARstatus.current = 2);
                  }}
                >
                  <i className="icon-check"></i>
                </span>
                <span
                  className="inline-flex items-center justify-center reject"
                  onClick={() => {
                    openMobileMenu();
                    (event.current = row?.row?.original?.eventId),
                      (ARstatus.current = 3);
                  }}
                >
                  <i className="icon-reject"></i>
                </span>
              </div>
            );
          case 2:
            return (
              <div className="status-label active-card">
                <span className="text">Active</span>
              </div>
            );
          case 3:
            return (
              <div className="status-label rejected-card">
                <span className="text">Rejected</span>
              </div>
            );
        }
      },
    }),
    columnHelper.accessor((row) => row?.isSponsored, {
      id: "isSponsored",
      header: () => <>Add as Sponsor</>,
      cell: (row) => {
        return (
          <>
            <div className="switch-toggle">
              <input
                title={
                  row?.row?.original?.isSponsored == true
                    ? "Active"
                    : " In-Active"
                }
                type="checkbox"
                id={row?.row?.original?.eventId}
                checked={row?.row?.original?.isSponsored == true ? true : false}
                onChange={(e) => {
                  dispatch(
                    asyncEventSponserThunk(
                      {
                        eventId: row?.row?.original?.eventId,
                        isSponsored:
                          row?.row?.original?.isSponsored == true
                            ? false
                            : true,
                      },
                      () =>
                        dispatch(
                          asynceventListThunk({
                            page,
                            limit: 10,
                            status: EVENTSTATUS.find(
                              (e) => e.title === filterData?.EventStatus?.title
                            )?.id,
                            search,
                            ...filter,
                          })
                        )
                    )
                  );
                }}
              />
              <label htmlFor={row?.row?.original?.eventId}></label>
            </div>
          </>
        );
      },
    }),
    // columnHelper.accessor((row) => row?.actions, {
    //     id: 'actions',
    //     header: () => <>Action</>,
    //     cell: (row) => {
    //         return (
    //             <>
    //                 <Link
    //                     to={`${eventdetails}/${row?.row?.original?.eventId}`}
    //                     className="solid-btn dashboard-form-btn"
    //                 >
    //                     View
    //                 </Link>
    //             </>
    //         )
    //     }
    // })

    columnHelper.accessor((row) => row?.actions, {
      id: "actions",
      header: () => <>Action</>,
      cell: (row) => {
        return (
          <>
            <div
              className="custom-table-dropdown"
              onMouseLeave={() => OpenDropdown("")}
            >
              <button
                type="button"
                className={`text-center btn-toggle ${
                  row?.row?.original?.eventId === Dropdown ? "active" : ""
                }`}
                onClick={() => OpenDropdown(row?.row?.original?.eventId)}
              >
                <i className="icon-dots"></i>
              </button>
              <ul
                className={`dropdown-body ${
                  row?.row?.original?.eventId === Dropdown ? "show" : ""
                }`}
              >
                <li>
                  <Link
                    to={`${eventdetails}/${row?.row?.original?.eventId}`}
                    className="flex items-center link"
                  >
                    <i className="icon-eye-open"></i> View
                  </Link>
                </li>
                <li>
                  <div
                    className="flex items-center link"
                    onClick={() => {
                      // openMobileMenuForDelete()
                      setEventStatusUpdateModal(true);
                      eventDeleteId.current = row?.row?.original?.eventId;

                      ARstatus.current = row?.row?.original?.status;
                    }}
                  >
                    <i className="icon-edit"></i> Edit
                  </div>
                </li>
                <li>
                  <div
                    className="flex items-center link"
                    onClick={() => {
                      openMobileMenuForDelete();
                      eventDeleteId.current = row?.row?.original?.eventId;
                    }}
                  >
                    <i className="icon-delete"></i> Delete
                  </div>
                </li>
              </ul>
            </div>
          </>
        );
      },
    }),
  ];
  //#endregion

  function handleclose(key, Id) {
    console.log("key", key[0], Id);
    let data = { ...filterData };
    let Arry = [];
    if (key[0] === "organizerIds") {
      Arry = filterData?.organizerIds?.filter((item) => item?.userId !== Id);
      data.organizerIds = Arry;
    } else {
      for (let index = 0; index < key?.length; index++) {
        delete data?.[key[index]];
      }
    }
    console.log("Arry", Arry);
    console.log("data", data);
    setFilterData(data);
  }

  console.log("filterDatafilterDatafilterData", filter);

  return (
    <>
      {filterData && checkkeyExist(filterData) && (
        <div className="protected-head date-filter-head filtering-events">
          <div className="filter-content-list">
            <ul className="flex items-start flex-wrap gap-3 lg:gap-4">
              {filterData?.start_date && filterData?.end_date && (
                <li className="flex items-center">
                  <p>Start Date: </p>
                  <p>
                    {formatDate(new Date(filterData?.start_date).getTime())}
                  </p>{" "}
                  - <p>End Date: </p>
                  <p>{formatDate(new Date(filterData?.end_date).getTime())}</p>
                  <i
                    className="icon-reject"
                    onClick={() => handleclose(["end_date", "start_date"])}
                  ></i>
                </li>
              )}
              {filterData?.EventStatus && (
                <li className="flex items-center">
                  <p>Experience Status: </p>
                  <p>{filterData?.EventStatus?.title}</p>
                  <i
                    className="icon-reject"
                    onClick={() => handleclose(["EventStatus"])}
                  ></i>
                </li>
              )}
              {filterData?.city?.name && (
                <li className="flex items-center">
                  <p>City: </p>
                  <p>{filterData?.city?.name}</p>
                  <i
                    className="icon-reject"
                    onClick={() => handleclose(["city"])}
                  ></i>
                </li>
              )}
              {filterData?.eventType && (
                <li className="flex items-center">
                  <p>Experience Type: </p>
                  <p>{filterData?.eventType?.title}</p>
                  <i
                    className="icon-reject"
                    onClick={() => handleclose(["eventType"])}
                  ></i>
                </li>
              )}
              {filterData?.isPaid && (
                <li className="flex items-center">
                  <p>Experience Price: </p>
                  <p>{filterData?.isPaid?.title}</p>
                  <i
                    className="icon-reject"
                    onClick={() => handleclose(["isPaid"])}
                  ></i>
                </li>
              )}
              {filterData?.sortbyprice && (
                <li className="flex items-center">
                  <p>Sort By Price: </p>
                  <p>{filterData?.sortbyprice?.title}</p>
                  <i
                    className="icon-reject"
                    onClick={() => handleclose(["sortbyprice"])}
                  ></i>
                </li>
              )}
              {/* {filterData?.isDate && (
                                <li className="flex items-center">
                                    <p>Event Date: </p>
                                    <p>{filterData?.isPaid?.title}</p>
                                    <i
                                        className="icon-reject"
                                        onClick={() => handleclose(['isDate'])}
                                    ></i>
                                </li>
                            )} */}
              {console.log(filterData, "PPPPPPPPPPPPPPPPPPPPPPPPPp")}
              {filterData?.sortbydate && (
                <li className="flex items-center">
                  <p>Sort By Date: </p>
                  <p>{filterData?.sortbydate?.title}</p>
                  <i
                    className="icon-reject"
                    onClick={() => handleclose(["sortbydate"])}
                  ></i>
                </li>
              )}
              {filterData?.organizerIds?.length > 0 &&
                filterData?.organizerIds?.map((item, i) => {
                  return (
                    <>
                      <li className="flex items-center" key={i}>
                        <p>Partner Name: </p>
                        <p>{item?.userName}</p>
                        <i
                          className="icon-reject"
                          onClick={() =>
                            handleclose(["organizerIds"], item?.userId)
                          }
                        ></i>
                      </li>
                    </>
                  );
                })}
            </ul>
          </div>
        </div>
      )}

      <ReactTableList
        columns={columns}
        data={eventList?.data}
        isLink
        isLoading={isLoading}
        parentLink={eventdetails}
        getfilter={(e) => {
          setFilter(e);
        }}
        keyValue="eventId"
        rowclick={["actions", "images", "status", "isSponsored"]}
        excludes={[
          "images",
          "title",
          "category",
          "language",
          "city",
          "startTime",
          "duration",
          "price",
          "organizerDetails",
          "createdAt",
        //   "updatedAt",   
          "status",
          "isSponsored",
          "actions",
        ]}
      />
      {eventList?.meta?.totalCount > 10 && (
        <Pagination
          totalCount={eventList?.meta?.totalCount}
          activePage={page}
          pageCount={Math.ceil(eventList?.meta?.totalCount / 10)}
          onPageChange={(e) => {
            localStorage.setItem("currentPage", e);
            setPage(e);
          }}
        />
      )}

      <DeleteLogoutModal
        payload={{
          eventId: event.current,
          status: ARstatus.current,
        }}
        deleteItem={asyncEventAcceptDeclineThunk}
        invalidate={() => {
          dispatch(
            asynceventListThunk({
              page,
              limit: 10,
              status: EVENTSTATUS.find(
                (e) => e.title === eventDate?.EventStatus?.title
              )?.id,
              search,
              ...filter,
            })
          );
        }}
        show={show}
        setshow={setshow}
        title={
          <>
            are you sure you want to{" "}
            {ARstatus.current == 2 ? "Accept" : "Reject"} this event?
          </>
        }
        IconClass={ARstatus.current == 2 ? "icon-check" : "icon-reject"}
        SolidBTNText={ARstatus.current == 2 ? "Accept" : "Reject"}
        Delete={ARstatus.current == 2 ? false : true}
      />

      {eventStatusUpdateModal && (
        <EventStatusModal
          setEventStatusUpdateModal={setEventStatusUpdateModal}
          eventStatusUpdateModal={eventStatusUpdateModal}
          payload={{
            eventId: eventDeleteId.current,
          }}
          defaultValue={{
            eventstatus: EVENTSTATUS.find((e) => e.id === ARstatus.current),
          }}
          invalidate={() => {
            dispatch(
              asynceventListThunk({
                page,
                limit: 10,
                status: EVENTSTATUS.find(
                  (e) => e.title === eventDate?.EventStatus?.title
                )?.id,
                search,
                ...filter,
              })
            );
            setEventStatusUpdateModal(false);
          }}
        />
      )}
      <DeleteLogoutModal
        payload={{
          eventId: eventDeleteId.current,
        }}
        deleteItem={asynceventDeleteThunk}
        invalidate={() => {
          dispatch(
            asynceventListThunk({
              page,
              limit: 10,
              status: EVENTSTATUS.find(
                (e) => e.title === eventDate?.EventStatus?.title
              )?.id,
              search,
              ...filter,
            })
          );
        }}
        show={showDeletePopup}
        setshow={setshowDeletePopup}
        title={<>are you sure you want to delete this Experience?</>}
        IconClass={"icon-delete"}
        SolidBTNText={"Delete"}
        Delete
      />
    </>
  );
};

export default EventManagementTable;
