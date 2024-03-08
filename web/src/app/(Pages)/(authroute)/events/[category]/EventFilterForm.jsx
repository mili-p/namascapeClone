"use client";
import React, { useCallback, useEffect, useState } from "react";
import H2 from "@/app/components/common/h2";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ReactSelectcmp from "@/app/components/ReactSelectcmp/ReactSelectcmp";
import { useDispatch, useSelector } from "react-redux";
// import { getCityThunk } from '../../../../../../redux/Thunks/Organizer/EventForm/event.thunk'
import { cityFilterDataThunk } from "../../../../../../redux/Thunks/User/userCityListFilter.thunk";
import DatePicker from "react-datepicker";
import DatePikerLang from "@/app/components/DatePikerLang/DatePikerLang";
import de from "date-fns/locale/de";
import // FilterEventType,
// EventPaid,
// SortingByPrice,
// SortingByDate
"@/app/components/common/Common";
import { useTranslation } from "react-i18next";
import {
  EventPaidFn,
  FilterEventTypeFn,
  SortingByPriceFn,
  SortingByDateFn,
} from "@/i18n/i18nCM/i18CM";

let timer;

const EventFilterForm = ({
  getValue,
  filterData,
  setFilterModalShow,
  languageName,
}) => {
  const { i18n } = useTranslation();

  //  Validation for Filter Form Start//
  const validationSchema = yup.object().shape(
    {
      // start_date: yup.string().when('end_date', {
      //     is: (e) => !e,
      //     then: () => yup
      //         .string().required("Start date is required"),
      //     otherwise: () => yup
      //         .string()
      // }),
      // start_date: yup.string().required(i18n.t(`useEvent.filterEvents.validation.start_date.required`)),
      end_date: yup.string().when("start_date", {
        is: (e) => !!e,
        then: () =>
          yup
            .string()
            .required(
              i18n.t(`useEvent.filterEvents.validation.end_date.required`)
            ),
        otherwise: () => yup.string(),
      }),
    },
    ["start_date", "end_date"]
  );
  // .test(
  //   "custom-message",
  //   i18n.t(`useEvent.filterEvents.validation.start_date.test`),
  //   function (value) {
  //     if (Boolean(value?.start_date) && Boolean(value?.end_date)) {
  //       return new Date(value?.end_date).getTime() >=
  //         new Date(value?.start_date).getTime()
  //         ? true
  //         : false;
  //     } else {
  //       return true;
  //     }
  //   }
  // );
  //  Validation for Filter Form Ends//

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
    resolver: yupResolver(validationSchema),
    mode: "onSubmit",
    // shouldUnregister:true,
    defaultValues: filterData ? filterData : { sorting: "Price" },
  });

  const SortingByPrice = SortingByPriceFn(i18n);

  const EventPaid = EventPaidFn(i18n);
  const SortingByDate = SortingByDateFn(i18n);
  const FilterEventType = FilterEventTypeFn(i18n);
  const [city, setCity] = useState(false);
  const { cityData } = useSelector((e) => e.EventFormSlice);
  const { cityFilterData } = useSelector((w) => w.userCityListFilter);

  const dispatch = useDispatch();
  const handleCityChange = (e) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      // onChange(e)
      dispatch(
        cityFilterDataThunk({
          search: e,
        })
      );
    }, 500);
  };

  function onSubmit(data) {
    setFilterModalShow(false);
    getValue(data);
    // filterData.startDate = data?.start_date ? new Date(data?.start_date).getTime() : ''
    // filterData.endDate = data?.end_date ? new Date(data?.end_date).getTime() : ''
    // filterData.location = data?.city?.cityId

    // filterData.data={name:"test"}
  }

  // const EventType = [
  //     {
  //         title: 'All',
  //         id: 1
  //     },
  //     {
  //         title: 'Online',
  //         id: 2
  //     },
  //     {
  //         title: 'Offline',
  //         id: 3
  //     }
  // ]

  // const EventPaid = [
  //     {
  //         title: 'All',
  //         id: 1
  //     },
  //     {
  //         title: 'Paid',
  //         id: 2
  //     },
  //     {
  //         title: 'Free',
  //         id: 3
  //     }
  // ]

  // const SortingByPrice = [
  //     {
  //         title: 'Low to High',
  //         id: 1
  //     },
  //     {
  //         title: 'High to Low',
  //         id: 2
  //     },
  // ]

  // const SortingByTime = [
  //     {
  //         title: 'Earliest to Latest',
  //         id: 1
  //     },
  //     {
  //         title: 'Latest to Earliest',
  //         id: 2
  //     },
  // ]

  return (
    <>
      <div>
        <H2 className="h2">{i18n.t(`useEvent.filterEvents.heading`)}</H2>
        <i className="icon-cross" onClick={() => setFilterModalShow(false)}></i>
      </div>
      <form className="filter-events-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="filter-events-data">
          <div className="xl:flex xl:items-center xl:gap-4 2xl:gap-5">
            <div className="input-group w-full">
              <label htmlFor="start-date">
                {i18n.t(`useEvent.filterEvents.startDate`)}
              </label>
              <Controller
                name="start_date"
                control={control}
                render={({ field: { onChange, value, ref } }) => (
                  <>
                    <DatePicker
                      onChange={(e) => {
                        onChange(e);
                        if (e > watch("end_date")) {
                          setValue("end_date", null);
                        }

                        // setValue("end_date","");
                      }}
                      selected={
                        typeof value === "string"
                          ? new Date(value)
                          : value || ""
                      }
                      // inputFormat="dd-MM-yyyy"
                      // showMonthDropdown
                      // showYearDropdown
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      dateFormat="dd-MM-yyyy"
                      locale={languageName === "de" && de}
                      show
                      customInput={
                        <DatePikerLang
                          value={value || ""}
                          formateDate={
                            i18n?.language === "en"
                              ? "dd-mm-yyyy"
                              : "tt-mm-jjjj"
                          }
                          ref={ref}
                        />
                      }
                      // minDate={new Date().toISOString().split("T")[0]}
                      // minDate={new Date()}
                      maxDate={new Date(9999, 12, 31)}
                    />
                  </>
                )}
              />
              {/* <input
                {...register("start_date")}
                type="date"
                labelid="startdate"
                name="start_date"
                max="9999-12-31"
              /> */}
              {/* {errors?.start_date?.message && (
                                <span className="error-msg">{errors?.start_date?.message}</span>
                            )} */}
              {errors?.[""]?.message && (
                <span className="error-msg">{errors?.[""]?.message}</span>
              )}
            </div>
            <div className="input-group w-full">
              <label htmlFor="end-date">
                {i18n.t(`useEvent.filterEvents.endDate`)}
              </label>
              <Controller
                name="end_date"
                control={control}
                render={({ field: { onChange, value, ref } }) => (
                  <>
                    <DatePicker
                      onChange={(e) => {
                        onChange(e);
                        //   setValue("end_date", "");
                      }}
                      selected={
                        typeof value === "string"
                          ? new Date(value)
                          : value || ""
                      }
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
                            i18n?.language === "en"
                              ? "dd-mm-yyyy"
                              : "tt-mm-jjjj"
                          }
                          ref={ref}
                        />
                      }
                      // minDate={new Date().toISOString().split("T")[0]}
                      minDate={watch("start_date")}
                      maxDate={new Date(9999, 12, 31)}
                    />
                  </>
                )}
              />
              {/* <input
                disabled={!watch("start_date")}
                {...register("end_date")}
                type="date"
                labelid="enddate"
                name="end_date"
                // min={watch('start_date')}
                max="9999-12-31"
              /> */}
              {errors?.end_date?.message && (
                <span className="error-msg">{errors?.end_date?.message}</span>
              )}
            </div>
          </div>
          <div className="xl:flex xl:items-center xl:gap-4 2xl:gap-5">
            <div className="input-group w-full">
              <label htmlFor="location">
                {i18n.t(`useEvent.filterEvents.Location`)}
              </label>
              <div className={`custom-select ${city === true ? "active" : ""}`}>
                <Controller
                  control={control}
                  name="city"
                  render={({ field: { onChange, value } }) => (
                    <ReactSelectcmp
                      openMenuOnFocus={true}
                      value={value}
                      onChange={onChange}
                      className={"location-select"}
                      onInputChange={(e) => {
                        handleCityChange(e);
                      }}
                      getOptionLabel={(e) => {
                        return e.name;
                      }}
                      getOptionValue={(e) => {
                        return e.cityId;
                      }}
                      options={cityFilterData}
                      isSearchable={true}
                      placeholder={i18n.t(
                        `useEvent.filterEvents.placeHolderCity`
                      )}
                      isClearable
                    />
                  )}
                />
              </div>
            </div>
            <div className="input-group w-full">
              <label>{i18n.t(`useEvent.filterEvents.EventType`)}</label>
              <div className={`custom-select ${city === true ? "active" : ""}`}>
                <Controller
                  control={control}
                  name="eventType"
                  render={({ field: { onChange, value } }) => (
                    <ReactSelectcmp
                      defaultValue={{
                        title: i18n.t(`useEvent.EventPaid.all`),
                        id: 1,
                      }}
                      openMenuOnFocus={true}
                      value={
                        value ?? {
                          title: i18n.t(`useEvent.EventPaid.all`),
                          id: 1,
                        }
                      }
                      className={"event-type-select"}
                      onChange={(e) => {
                        if (e?.id === 1) {
                          onChange(null);
                        } else {
                          onChange(e);
                        }
                      }}
                      getOptionLabel={(e) => {
                        return e.title;
                      }}
                      getOptionValue={(e) => {
                        return e.id;
                      }}
                      options={FilterEventType}
                      isSearchable={false}
                    />
                  )}
                />
              </div>
            </div>
          </div>
          {/* new event type */}
          {/* <div className='xl:flex xl:items-center xl:gap-4 2xl:gap-5'>
                    <div className='input-group w-full'>
                        <label>{i18n.t(`useEvent.filterEvents.EventType`)}</label>
                        <div className='flex items-center gap-4 2xl:gap-5'>
                            <div className='custom-radio flex items-center w-1/2'>
                                            <Controller
                                                name='eventType'
                                                control={control}
                                                render={({ field: { onChange, value } }) => (
                                                    <>
                                                        <input
                                                        checked={value==="Online" && {id:2}
                                                            // console.log(value==="Online" && {id:2},"CHCHCHCHCHCHCCHCHCHCH")
                                                            // value==="Online" && {id:2}
                                                        }
                                                            id='Online'
                                                            type='radio'
                                                            value='Online'
                                                            onChange={(e) => {
                                                                console.log(e.target.value,"pppppppp");
                                                                onChange(e.target.value)
                                                                // setValue("sortbyprice","")
                                                            }}
                                                        />
                                                        <label htmlFor='Online'>Online</label>
                                                    </>
                                                )}
                                            />
                            </div>

                            <div className='custom-radio flex items-center w-1/2'>
                                            <Controller
                                                name='eventType'
                                                control={control}
                                                render={({ field: { onChange, value } }) => (
                                                    <>
                                                        <input
                                                        checked={value==="Offline" && {id:3}}
                                                            id='Offline'
                                                            type='radio'
                                                            value='Offline'
                                                            onChange={(e) => {
                                                                onChange(e.target.value)
                                                                // setValue("sortbyprice","")
                                                            }}
                                                        />
                                                        <label htmlFor='Offline'>Offline</label>
                                                    </>
                                                )}
                                            />
                            </div>

                        </div>
                    </div>
                    </div> */}
          {/* end new event type */}

          {/* <div className="input-group w-full">
                        <label>{i18n.t(`useEvent.filterEvents.EventPrice`)}</label>
                        <div
                            className={`custom-select ${city === true ? 'active' : ''}`}
                        >
                            <Controller
                                control={control}
                                name="isPaid"
                                render={({ field: { onChange, value } }) => (
                                    <ReactSelectcmp
                                        defaultValue={{
                                            title: i18n.t(`useEvent.EventPaid.all`),
                                            id: 1
                                        }}
                                        openMenuOnFocus={true}
                                        value={value}
                                        className={"event-type-select"}
                                        onChange={onChange}
                                        getOptionLabel={(e) => { return e.title }}
                                        getOptionValue={(e) => { return e.id }}
                                        options={EventPaid}
                                        isSearchable={false}
                                    />
                                )}
                            />
                        </div>
                    </div> */}

          <div className="xl:flex xl:items-center xl:gap-4 2xl:gap-5">
            <div className="input-group w-full">
              <label>{i18n.t(`useEvent.filterEvents.SortingBy`)}</label>
              <div className="flex items-center gap-4 2xl:gap-5">
                <div className="custom-radio flex items-center w-1/2">
                  <Controller
                    name="sorting"
                    control={control}
                    // defaultValue='price'
                    render={({ field: { onChange, value } }) => (
                      <>
                        <input
                          checked={value === "Price"}
                          id="Price"
                          type="radio"
                          value="Price"
                          onChange={(e) => {
                            onChange(e.target.value);
                            setValue("sortbydate", "");
                          }}
                        />
                        <label htmlFor="Price">
                          {i18n.t(`useEvent.filterEvents.price`)}
                        </label>
                      </>
                    )}
                  />
                </div>
                <div className="custom-radio flex items-center w-1/2">
                  <Controller
                    name="sorting"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <>
                        <input
                          checked={value === "Date"}
                          id="Date"
                          type="radio"
                          value="Date"
                          onChange={(e) => {
                            onChange(e.target.value);
                            setValue("sortbyprice", "");
                          }}
                        />
                        <label htmlFor="Date">
                          {i18n.t(`useEvent.filterEvents.date`)}
                        </label>
                      </>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
          {}
          <div className="xl:flex xl:items-center xl:gap-4 2xl:gap-5">
            {watch("sorting") === "Price" && (
              <div className="input-group w-full">
                <label>{i18n.t(`useEvent.filterEvents.SortingByPrice`)}</label>
                <div
                  className={`custom-select ${city === true ? "active" : ""}`}
                >
                  <Controller
                    control={control}
                    name="sortbyprice"
                    render={({ field: { onChange, value } }) => (
                      <ReactSelectcmp
                        // defaultValue={{
                        //     title: 'All',
                        //     id: 1
                        // }}
                        openMenuOnFocus={true}
                        placeholder={i18n.t(
                          `useEvent.filterEvents.placeHolder`
                        )}
                        value={value}
                        className={"event-type-select"}
                        onChange={(e) => {
                          onChange(e);
                        }}
                        getOptionLabel={(e) => {
                          return e.title;
                        }}
                        getOptionValue={(e) => {
                          return e.id;
                        }}
                        options={SortingByPrice}
                        isSearchable={false}
                      />
                    )}
                  />
                </div>
              </div>
            )}
            {watch("sorting") === "Date" && (
              <div className="input-group w-full">
                <label>{i18n.t(`useEvent.filterEvents.SortingByDate`)}</label>
                <div
                  className={`custom-select ${city === true ? "active" : ""}`}
                >
                  <Controller
                    control={control}
                    name="sortbydate"
                    render={({ field: { onChange, value } }) => (
                      <ReactSelectcmp
                        // defaultValue={{
                        //     title: 'All',
                        //     id: 1
                        // }}
                        openMenuOnFocus={true}
                        value={value}
                        placeholder={i18n.t(
                          `useEvent.filterEvents.placeholderDate`
                        )}
                        className={"event-type-select"}
                        onChange={(e) => {
                          onChange(e);
                        }}
                        getOptionLabel={(e) => {
                          return e.title;
                        }}
                        getOptionValue={(e) => {
                          return e.id;
                        }}
                        options={SortingByDate}
                        isSearchable={false}
                      />
                    )}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center justify-center modal-btn-group">
            <button
              type="button"
              className="border-btn action-btn"
              onClick={() => {
                setFilterModalShow(false);
              }}
            >
              {i18n.t(`useEvent.filterEvents.cancleBtn`)}
            </button>
            <button type="submit" className="solid-btn action-btn">
              {i18n.t(`useEvent.filterEvents.ApplyBtn`)}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default EventFilterForm;
