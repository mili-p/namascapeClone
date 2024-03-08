import React, { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import ReactTableList from "../../components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import TableImage from "../../assets/images/user.png";
import { Link } from "react-router-dom";
import { bookingdetails } from "../../config/routeConsts";
import { asyncbookingListThunk } from "../../redux/thunk/bookingThunk/booking.thunk";
import { useDispatch, useSelector } from "react-redux";
import {
  formatDatewihnewdate,
  getTimeFromTimestamp,
  timeDifference2,
  timeDifference3,
} from "../../functions/functions";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { EVENTCATEGORY, PARTNER } from "../../common/constsforCodes";

//#region Booking FIlter Data Validation
const bookingFilterValidationSchema = yup
  .object()
  .shape(
    {
      start_date: yup.string().when("end_date", {
        is: (e) => !!e,
        then: () => yup.string().required("Start date is required"),
        otherwise: () => yup.string(),
      }),
      end_date: yup.string().when("start_date", {
        is: (e) => !!e,
        then: () => yup.string().required("End date is required"),
        otherwise: () => yup.string(),
      }),
    },
    ["start_date", "end_date"]
  )
  .test(
    "custome-message",
    "Start date should  be less than end date",
    function (value) {
      if (Boolean(value?.start_date) && Boolean(value?.end_date)) {
        return new Date(value?.end_date).getTime() >=
          new Date(value?.start_date).getTime()
          ? true
          : false;
      } else {
        return true;
      }
    }
  );
//#endregion

const BookingsManagementTable = ({
  search,
  setSearch,
  page,
  setPage,
  // ,filterData,setFilterData
}) => {
  const [filter, setFilter] = useState(null);
  const dispatch = useDispatch();
  const [filterData, setFilterData] = useState(null);
  const { bookingList, isLoading } = useSelector((e) => e.booking);
  const millisecondsToAdd = 86400000;

  const {
    watch,
    register,
    control,
    setValue,
    getValues,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(bookingFilterValidationSchema),
    // ,
    // mode: 'onSubmit',
    // defaultValues: filterData
  });

  useEffect(() => {
    if (filter) {
      let data = {};
      console.log(filter, "filter");
      if (filter?.sortKey === "bookingTime") {
        data.sortBy = `${filter?.sortKey}:${filter?.sortBy}`;
      } else {
        data.sortBy = filter?.sortBy;
        data.sortKey = filter?.sortKey;
      }

      dispatch(
        asyncbookingListThunk({
          page,
          limit: 10,
          search,

          startDate: filterData?.start_date
            ? new Date(filterData?.start_date).getTime()
            : "",
          endDate: filterData?.end_date
            ? new Date(filterData?.end_date).getTime() + millisecondsToAdd
            : // new Date(filterData?.end_date).getTime()
              "",
          ...data,
        })
      );
    } else {
      dispatch(
        asyncbookingListThunk({
          page,
          limit: 10,
          search,
          startDate: filterData?.start_date
            ? new Date(filterData?.start_date).getTime()
            : "",
          endDate: filterData?.end_date
            ? new Date(filterData?.end_date).getTime().valueOf() +
              millisecondsToAdd
            : // new Date(filterData?.end_date).getTime().valueOf()
              "",
        })
      );
    }
  }, [page, filter, search, filterData]);

  //#region Booking Master Table Colunms
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor((row) => row?.bookingId, {
      id: "bookingId",
      header: () => <>Booking ID</>,
      cell: (info) => {
        return info.getValue();
      },
    }),
    columnHelper.accessor((row) => row?.eventDetails?.title, {
      id: "title",
      header: () => <>Experience Title</>,
      cell: (row) => {
        return <span>{row?.row?.original?.eventDetails?.title}</span>;
      },
    }),
    columnHelper.accessor((row) => row?.eventDetails?.category, {
      id: "category",
      header: () => <>Experience Category</>,
      cell: (row) => {
        const eventcateogry = EVENTCATEGORY.find(
          (e) => e?.id === row?.row?.original?.eventDetails?.category
        );
        return <span>{eventcateogry?.title}</span>;
      },
    }),
    columnHelper.accessor((row) => row?.userDetails?.firstName, {
      id: "userDetails",
      header: () => <>User Name</>,
      cell: (row) => {
        return (
          <span>
            {row?.row?.original?.userDetails?.firstName}{" "}
            {row?.row?.original?.userDetails?.lastName}
          </span>
        );
      },
    }),
    columnHelper.accessor((row) => row?.organizerDetails?.firstName, {
      id: "organizerDetails",
      header: () => <>{`${PARTNER} Name`}</>,
      cell: (row) => {
        return (
          <span>
            {row?.row?.original?.organizerDetails?.firstName}{" "}
            {row?.row?.original?.organizerDetails?.lastName}
          </span>
        );
      },
    }),
    columnHelper.accessor((row) => row?.asAGift, {
      id: "asAGift",
      header: () => <>Buy as a Gift</>,
      cell: (row) => {
        return (
          <span>{row?.row?.original?.asAGift === true ? "Yes" : "No"}</span>
        );
      },
    }),
    columnHelper.accessor((row) => row?.bookingTime, {
      id: "bookingTime",
      header: () => <>Booking Date and Time</>,
      cell: (row) => {
        return <span>{timeDifference3(row?.row?.original?.bookingTime)}</span>;
      },
    }),
    columnHelper.accessor((row) => row?.actions, {
      id: "actions",
      header: () => <>Action</>,
      cell: (row) => {
        return (
          <>
            <Link
              to={`${bookingdetails}/${row?.row?.original?.eventBookingId}`}
              className="solid-btn dashboard-form-btn"
            >
              View
            </Link>
          </>
        );
      },
    }),
  ];
  //#endregion

  const handleBookingFilter = (data) => {
    if (data?.start_date) {
      setFilterData(data);
    }
  };

  return (
    <>
      <div className="protected-head filtering-events date-filter-head mt-32">
        <form
          onSubmit={handleSubmit(handleBookingFilter)}
          className="flex items-center flex-wrap filtering-events-bar  date-filter-bar"
        >
          <div className="flex items-center flex-wrap gap-4 2xl:gap-5">
            <div className="input-group flex items-center">
              <label htmlFor="start_date">Start Date</label>
              <input
                {...register("start_date")}
                type="date"
                id="start_date"
                name="start_date"
                pattern="(0[1-9]|1[0-2])/(0[1-9]|[12][0-9]|3[01])/[0-9]{4}"
                // min={
                //     new Date()
                //         .toISOString()
                //         .split('T')[0]
                // }
                max="2099-12-31"
              />
              {errors?.start_date?.message && (
                <span className="error-msg">{errors?.start_date?.message}</span>
              )}
              {errors?.[""]?.message && (
                <span className="error-msg">{errors?.[""]?.message}</span>
              )}
            </div>
            <div className="input-group flex items-center">
              <label htmlFor="end_date">End Date</label>
              <input
                disabled={!watch("start_date")}
                {...register("end_date")}
                type="date"
                id="end_date"
                name="end_date"
                pattern="(0[1-9]|1[0-2])/(0[1-9]|[12][0-9]|3[01])/[0-9]{4}"
                // min={
                //     new Date()
                //         .toISOString()
                //         .split('T')[0]
                // }
                max="2099-12-31"
                error={errors?.end_date?.message}
              />
              {errors?.end_date?.message && (
                <span className="error-msg">{errors?.end_date?.message}</span>
              )}
            </div>
            <button className="static solid-btn dashboard-form-btn min-w-fit">
              Submit
            </button>
          </div>
        </form>
      </div>
      <ReactTableList
        columns={columns}
        data={bookingList?.data}
        isLink
        isLoading={isLoading}
        parentLink={bookingdetails}
        getfilter={(e) => {
          setFilter(e);
        }}
        keyValue="eventBookingId"
        rowclick={["actions", "status"]}
        excludes={[
          "actions",
          "status",
          "asAGift",
          "bookingId",
          "title",
          "category",
          "userDetails",
          "organizerDetails",
        ]}
      />
      {bookingList?.meta?.totalCount > 10 && (
        <Pagination
          totalCount={bookingList?.meta?.totalCount}
          activePage={page}
          pageCount={Math.ceil(bookingList?.meta?.totalCount / 10)}
          onPageChange={(e) => {
            localStorage.setItem("currentPage", e);
            setPage(e);
          }}
        />
      )}
    </>
  );
};

export default BookingsManagementTable;
