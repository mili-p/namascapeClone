"use client";
import SiteBreadcrumb from "@/app/components/SiteBreadcrumb/SiteBreadcrumb";
import EventTable from "./EventTable";
import React, { useEffect, useState } from "react";
import H2 from "@/app/components/common/h2";
import "./event-booking.scss";
import DatePicker from "react-datepicker";
import DatePikerLang from "@/app/components/DatePikerLang/DatePikerLang";
import de from "date-fns/locale/de";
import { useDispatch, useSelector } from "react-redux";
import {
  EventBookingExportDataThunk,
  EventBookingListThunk,
} from "../../../../../redux/Thunks/Organizer/EventBooking/eventBooking.thunk";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "next/navigation";

const EventBooking = ({ languageName }) => {
  const { i18n } = useTranslation();
  const search = useSearchParams();
  const pageCount = search.get("ct");
  const validationSchema = yup.object().shape({
    start_date: yup
      .string()
      .required(
        i18n.t("organizer.eventBooking.filterBookingDate.validation.startDate")
      ),
    end_date: yup
      .string()
      .required(
        i18n.t("organizer.eventBooking.filterBookingDate.validation.EndDate")
      ),
    // .test(
    //   "Custom Type",
    //   i18n.t("organizer.eventBooking.filterBookingDate.validation.validDate"),
    //   function (e) {
    //     return this.parent.start_date <= e;
    //   }
    // ),
  });

  const {
    watch,
    handleSubmit,
    register,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(validationSchema),
  });

  const dispatch = useDispatch();

  const { bookingList, totalCount, exportLink, isLoading } = useSelector(
    (e) => e.EventBookingSlice
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [date, setDate] = useState({
    startDate: "",
    endDate: "",
  });

  const TotalLimit = 10;

  const BreadcrumbData = [
    {
      title: i18n.t(`organizer.eventBooking.breadCrumb.home`),
      url: "/dashboard/",
    },
    {
      title: i18n.t(`organizer.eventBooking.breadCrumb.eventBookings`),
    },
  ];

  const downloadEvents = async () => {
    dispatch(
      EventBookingExportDataThunk(
        {
          startDate: new Date(date.startDate).getTime() || "",
          endDate: new Date(date.endDate).getTime() || "",
        },
        (res) => {
          if (res) {
            const link = document.createElement("a");
            link.href = res;
            link.setAttribute("download", "filename.ext");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } else {
            console.log("no data available");
          }
        }
      )
    );
  };

  useEffect(() => {
    dispatch(
      EventBookingListThunk({
        // search: getSearch || "",
        sortBy: "createdAt:-1",
        limit: TotalLimit,
        page: pageCount,
        startDate: new Date(date.startDate).getTime() || "",
        endDate: new Date(date.endDate).getTime() || "",
      })
    );
  }, [pageCount, date]);

  // const onSubmit = (data) => {
  //   if (data?.start_date) {
  //     setDate((pre) => ({
  //       ...pre,
  //       startDate: data?.start_date,
  //     }));
  //   }
  //   if (data?.end_date) {
  //     setDate((pre) => ({
  //       ...pre,
  //       endDate: data?.end_date,
  //     }));
  //   }
  // };

  const onSubmit = (data) => {
    if (data?.start_date) {
      const startDate = new Date(data.start_date);
      startDate.setHours(0, 0, 0, 0); // Set time to 12:00 AM
      setDate((prevDate) => ({
        ...prevDate,
        startDate: startDate.getTime(), // Set start date in milliseconds
      }));
    }
    if (data?.end_date) {
      const endDate = new Date(data.end_date);
      endDate.setHours(23, 59, 59, 999); // Set time to 11:59 PM
      setDate((prevDate) => ({
        ...prevDate,
        endDate: endDate.getTime(), // Set end date in milliseconds
      }));
    }
    // setCurrentPage('')
  };

  return (
    <div className="event-booking">
      <SiteBreadcrumb
        BreadcrumbData={BreadcrumbData}
        className="protected-breadcrumb"
      />
      <div className="protected-head">
        <H2 className="h2">
          {i18n.t(`organizer.eventBooking.breadCrumb.eventBookings`)}
        </H2>
      </div>
      <div className="protected-head filtering-events date-filter-head mt-32">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center flex-wrap filtering-events-bar date-filter-bar"
        >
          <div className="flex items-center input-group">
            <label>
              {i18n.t("organizer.eventBooking.filterData.startDate")}
            </label>
            <Controller
              name="start_date"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <DatePicker
                  onChange={(e) => {
                    onChange(e);
                    setValue("end_date", "");
                  }}
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  selected={value || ""}
                  // inputFormat="dd-MM-yyyy"
                  dateFormat="dd-MM-yyyy"
                  locale={languageName === "de" && de}
                  customInput={
                    <DatePikerLang
                      value={value || ""}
                      formateDate={
                        i18n?.language === "en" ? "dd-mm-yyyy" : "tt-mm-jjjj"
                      }
                      ref={ref}
                    />
                  }
                  // minDate={new Date().toISOString().split("T")[0]}
                  // minDate={new Date()}
                  maxDate={new Date(9999, 12, 31)}
                />
                // <input
                //   type="date"
                //   id="start-date"
                //   name="start_date"
                //   // onChange={onChange}
                //   onChange={(e) => {
                //     onChange(e)
                //     setValue(
                //         'end_date',
                //         ''
                //     )
                // }}
                //   max="9999-12-31"
                //   //   min={new Date().toISOString().split("T")[0]}
                //   //   {...register("start_date")}
                //   //   onChange={()=>setValue("end_date","")}
                // />
              )}
            />
            {errors?.start_date?.message && (
              <span className="error-msg">{errors?.start_date?.message}</span>
            )}
          </div>
          <div className="flex items-center input-group">
            <label>{i18n.t("organizer.eventBooking.filterData.endDate")}</label>
            <Controller
              name="end_date"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <DatePicker
                  onChange={(e) => onChange(e)}
                  selected={value || ""}
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  // inputFormat="dd-MM-yyyy"
                  dateFormat="dd-MM-yyyy"
                  locale={languageName === "de" && de}
                  customInput={
                    <DatePikerLang
                      value={value || ""}
                      formateDate={
                        i18n?.language === "en" ? "dd-mm-yyyy" : "tt-mm-jjjj"
                      }
                      ref={ref}
                    />
                  }
                  // minDate={new Date().toISOString().split("T")[0]}
                  minDate={watch("start_date")}
                  maxDate={new Date(9999, 12, 31)}
                />
              )}
            />
            {/* <input
              type="date"
              id="end-date"
              name="end_date"
              min={watch("start_date") ? watch("start_date") : ""}
              max="9999-12-31"
              {...register("end_date")}
            /> */}
            {errors?.end_date?.message && (
              <span className="error-msg">{errors?.end_date?.message}</span>
            )}
          </div>
          <button
            type="submit"
            className="static solid-btn dashboard-form-btn min-w-fit"
          >
            {i18n.t("organizer.eventBooking.filterData.submitBtn")}
          </button>
        </form>
        <div className="flex items-center card-action">
          <div
            className="flex items-center link"
            onClick={() => downloadEvents()}
          >
            <i className="icon-download"></i>
            {i18n.t("organizer.eventBooking.filterData.DownloadBTN")}
          </div>
        </div>
      </div>
      <EventTable
        languageName={languageName}
        isLoading={isLoading}
        data={bookingList}
        totalCount={totalCount}
        setCurrentPage={setCurrentPage}
        currentPage={pageCount}
        TotalLimit={TotalLimit}
      />
    </div>
  );
};

export default EventBooking;
