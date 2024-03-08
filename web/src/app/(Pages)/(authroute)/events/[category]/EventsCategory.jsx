"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import EventCardWeb from "@/app/components/EventCardWeb/EventCardWeb";
import H1 from "@/app/components/common/h1";
import H2 from "@/app/components/common/h2";
import Link from "next/link";
import { asyncEventsListCategory } from "../../../../../../redux/Thunks/User/eventslistcategory.thunk";
import { useDispatch, useSelector } from "react-redux";
import UserBreadCrumb from "@/app/components/UserBreadCrumb/UserBreadCrumb";
import { getCityThunk } from "../../../../../../redux/Thunks/Organizer/EventForm/event.thunk";
import CalendarView from "@/app/components/CalendarView/CalendarView";
import ReactSelectcmp from "@/app/components/ReactSelectcmp/ReactSelectcmp";
import EventFilterModal from "@/app/components/SiteModal/EventFilterModal/EventFilterModal";
import EventFilterForm from "./EventFilterForm";
import EventCardWebSkeleton from "@/app/components/EventCardWeb/EventCardWebSkeleton";
import Pagination from "@/app/components/Pagination/Pagination";
import { asyncSponsoredEventsList } from "../../../../../../redux/Thunks/User/sponsoredevents.thunk";
import { TabDataTypeFn, EventCategoryTitleFn, paramsCategoryFn, EventRecurrenceFn } from "@/i18n/i18nCM/i18CM";
import { useTranslation } from "react-i18next";
import Skeleton from "@/app/components/Skeleton/Skeleton";

import {
  eventdetailsformatDate,
  formatDate,
  // EventCategoryTitle,
  Category,
  // TabData
} from "@/app/components/common/Common";
import EventList from "../EventList";
import { sponsoredDataListCategory } from "../../../../../../redux/Thunks/User/categorySponsored.thunk";
import { useForm } from "react-hook-form";

function checkkeyExist(obj) {
  return Object.values(obj).filter((e) => !!e).length > 0;
}

const EventsCategory = ({ params,languageName }) => {
  let timer;
  const { i18n } = useTranslation();
  const params1 = paramsCategoryFn(i18n)
  const {register,handleSubmit,watch,getValues} = useForm()
  const EventRecurrence = EventRecurrenceFn(i18n);
  const breadcrumbItems = [
    { name: i18n.t(`userBreadcrumb.home`), url: "/" },
    // { name: `${params?.category === "event" ? "events" : params?.category}`, url: `/events/${params?.category}/` },
    { name: `${params?.category === "event" ? "events" : params1[params?.category]}`, url: `/events/${params?.category}/` },
  ];
  
  const dispatch = useDispatch();
  const TabData = TabDataTypeFn(i18n);
  const EventCategoryTitle = EventCategoryTitleFn(i18n);
  const [currentSponsoredPage, setCurrentSponsoredPage] = useState(1);
  const { sponsoredEventsData, isSponsoredLoading, totalSponsoredCount } =
    useSelector((m) => m.sponsoredevents);
  const { isLoadingSponsored } = useSelector((m) => m.categorySponsoredSlice);
  const { eventsListCategoryData, isLoading, totalCount } = useSelector(
    (m) => m.eventslistcategory
  );
  const [searchData, setSearchData] = useState("");
  const [filterData, setFilterData] = useState(null);
  const [CalenderData, setCalenderData] = useState(null);
  const [calendarShow, setCalendarShow] = useState("list");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterModalShow, setFilterModalShow] = useState(false);
 
  const parmsArray = [
    { category: "treats" },
    { category: "training" },
    { category: "coachings" },
  ];
  const calenderBTNhIde = parmsArray.find(
    (p) => p.category === params?.category
  );

  // function formatDate(timestamp) {
  //     const months = [
  //         'January', 'February', 'March', 'April',
  //         'May', 'June', 'July', 'August',
  //         'September', 'October', 'November', 'December'
  //     ];

  //     const date = new Date(timestamp);
  //     const month = months[date.getMonth()];
  //     const day = date.getDate();
  //     const year = date.getFullYear();

  //     return `${month} ${day}, ${year}`;
  // }

  // const Title =
  // {
  //     'sponsored-event': 'Sponsored',
  //     'classes-event': 'Classes',
  //     'retreats-event': 'Retreats',
  //     // 'gatherings-event': 'Gatherings',
  //     'event': 'Events',
  //     'treats-event': 'Treats',
  //     'all-event': 'All',
  //     'coaching-event' : 'Coaching',
  //     'training-event' : 'Training'
  // }

  // const Category = {
  //     // 'gatherings-event': 1,
  //     'event': 1,
  //     'retreats-event': 2,
  //     'treats-event': 3,
  //     'classes-event': 4,
  //     'all-event': 5,
  //     'coaching-event' : 7,
  //     'training-event' : 8
  // }

  // const TabData = [
  //     {
  //         name: 'All',
  //         url: '/events/all-event'
  //     },
  //     {
  //         name: 'Events',
  //         url: '/events/event'
  //     },
  //     // {
  //     //     name: 'Gatherings',
  //     //     url: '/events/gatherings-event'
  //     // },
  //     // {
  //     //     name: 'Sponsored',
  //     //     url: '/events/sponsored-event'
  //     // },
  //     {
  //         name: 'Retreats',
  //         url: '/events/retreats-event'
  //     },
  //     {
  //         name: 'Treats',
  //         url: '/events/treats-event'
  //     },
  //     {
  //         name: 'Classes',
  //         url: '/events/classes-event'
  //     },
  //     {
  //         name: 'Coaching',
  //         url: '/events/coaching-event'
  //     },
  //     {
  //         name: 'Training',
  //         url: '/events/training-event'
  //     }
  // ]

  const SponsoredTotalLimit = 12;
  // useEffect(() => {
  //     dispatch(
  //         asyncSponsoredEventsList({
  //             limit: SponsoredTotalLimit,
  //             page: currentSponsoredPage,
  //             search: searchData,
  //             category: Category?.[params?.category]
  //         })
  //     )
  // }, [searchData, currentSponsoredPage])

  let searchCount;
  const searchValue = useCallback((e) => {
    if (searchCount) {
      clearTimeout(searchCount);
    }
    searchCount = setTimeout(() => {
      setSearchData(e?.trim());
      setCurrentPage(1);
    }, 500);
  }, []);

  const TotalLimit = 12;
  /////////// for filter start date and end date ///////

  // const startDate1 = new Date(filterData?.start_date);
  // startDate1.setHours(0, 0, 0, 0); // Set time to 12:00 AM
  // let qq = startDate1.getTime()

  // const startDate2 = new Date(filterData?.start_date);
  // startDate2.setHours(23, 59, 59, 999); // Set time to 12:00 AM
  // let qqEnd = startDate2.getTime()

  ///////////////////////////// end filter start date and end date //////////
  
  useEffect(() => {
    if (params?.category !== "sponsored" || calendarShow === "calendar") {
      let obj = {};
      obj.web = true
       obj.search = searchData;
       if(calendarShow !== "calendar"){
         (obj.limit = TotalLimit), (obj.page = currentPage);
       }
      if (params?.category === "sponsored") {
        obj.isSponsored = true;
      } else {
        obj.category = Category?.[params?.category];
      }
      if(calendarShow === "calendar"){
        obj.calender = true
      }
      if (filterData) {
        let obj2 = {};
        (obj2.startDate = filterData?.start_date
          ? new Date(filterData?.start_date).setHours(0, 0, 0, 0)
          : ""),
          (obj2.endDate = filterData?.end_date
            ? new Date(filterData?.end_date).setHours(23, 59, 59, 59)
            : ""),
          (obj2.location = filterData?.city ? filterData?.city?.cityId : "");

        if (filterData?.eventType?.id === 2) {
          obj2.isOnline = true;
        }
        if (filterData?.eventType?.id === 3) {
          obj2.isOffline = true;
        }
        if (filterData?.isPaid?.id === 2) {
          obj2.isPaid = true;
        }
        if (filterData?.isPaid?.id === 3) {
          obj2.isFree = true;
        }
        if (filterData?.sortbyprice?.id === 1) {
          obj2.sortBy = "price:1";
        }
        if (filterData?.sortbyprice?.id === 2) {
          obj2.sortBy = "price:-1";
        }
        if (filterData?.sortbydate?.id === 1) {
          obj2.sortBy = "startTime:1";
        }
        if (filterData?.sortbydate?.id === 2) {
          obj2.sortBy = "startTime:-1";
        }
        obj = { ...obj, ...obj2 };
      }
      if (CalenderData) {
        obj = { ...obj, ...CalenderData };
      }
      dispatch(asyncEventsListCategory(obj));
    }
  }, [searchData, filterData, CalenderData, currentPage]);

useEffect(() => {
}, [getValues("search")])

  useEffect(() => {
    if (params?.category === "sponsored" && calendarShow === "list") {
      let obj2 = {};
      obj2.web = true
       if(searchData){
        obj2.search = searchData
      }
      (obj2.startDate = filterData?.start_date
        ? new Date(filterData?.start_date).setHours(0, 0, 0, 0)
        : ""),
        (obj2.endDate = filterData?.end_date
          ? new Date(filterData?.end_date).setHours(23, 59, 59, 59)
          : ""),
        (obj2.location = filterData?.city ? filterData?.city?.cityId : "");

      if (filterData?.eventType?.id === 2) {
        obj2.isOnline = true;
      }
      if (filterData?.eventType?.id === 3) {
        obj2.isOffline = true;
      }
      if (filterData?.isPaid?.id === 2) {
        obj2.isPaid = true;
      }
      if (filterData?.isPaid?.id === 3) {
        obj2.isFree = true;
      }
      if (filterData?.sortbyprice?.id === 1) {
        obj2.sortBy = "price:1";
      }
      if (filterData?.sortbyprice?.id === 2) {
        obj2.sortBy = "price:-1";
      }
      if (filterData?.sortbydate?.id === 1) {
        obj2.sortBy = "startTime:1";
      }
      if (filterData?.sortbydate?.id === 2) {
        obj2.sortBy = "startTime:-1";
      }
      dispatch(
        sponsoredDataListCategory(
          obj2,searchData,
        )
      );
    }
  }, [filterData, calendarShow,searchData]);

  function handleclose(key) {
    let data = { ...filterData };
    for (let index = 0; index < key.length; index++) {
      delete data?.[key[index]];
    }
    let { price, ...a } = data;
    setFilterData(a);
  }
console.log(calendarShow === "calendar","calendarShow")
  useEffect(() => {
    return () => {
      setFilterData(null);
    };
  }, [calendarShow]);

  useEffect(() => {
    if (currentPage) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [currentPage]);

  const handleSearch = (e) => {
    setSearchData(e?.search?.trim());
  }
  return (
    <>
      <section className="event-search-bar sticky-bar">
        <div className="container">
          <div className="events-tab-wrap flex items-center lg:justify-between flex-col-reverse lg:flex-row">
            <ul className="events-tab flex items-center justify-center lg:justify-end flex-wrap w-full lg:w-auto lg:flex-nowrap mb-0">
              {TabData?.map((item, i) => {
                return (
                  <li key={i}>
                    <Link
                      href={item?.url}
                      className={`flex items-center flex-col events-tab-link ${
                        item?.name === EventCategoryTitle?.[params?.category]
                          ? "active"
                          : ""
                      }`}
                    >
                      <span className="flex items-center justify-center">
                        {item?.icon}
                      </span>
                      {item?.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
            {/* <form action="" className="w-full lg:w-auto">
                            <input
                                type="search"
                                placeholder={i18n.t(
                                    `useEvent.headerTitle.detailsPage.search.placeholder`
                                )}
                                className="search-event"
                                onChange={searchValue}
                            />
                        </form> */}
          </div>
        </div>
      </section>
      <section className="user-bread-crumb-wrapper">
        <div className="container">
          <UserBreadCrumb items={breadcrumbItems} />
        </div>
      </section>
      {/* {sponsoredEventsData?.data?.length > 1 && <section className="events-wraps pt-120 organizer-events-wrap">
                <div className="container">
                    <div className="event-title-wrapper flex  items-center justify-between flex-wrap">
                        <H1 className="h2">{i18n.t(`useEvent.headerTitle.detailsPage.eventHeading.sponsoredevents`)}</H1>
                        // <a href="javascript:;">45 Events</a>
                        <p className='link m-0'>{sponsoredEventsData?.meta?.totalCount} {i18n.t(`useEvent.headerTitle.detailsPage.events`)}</p>
                    </div>
                    {sponsoredEventsData?.data?.length < 1 && <div className='flex items-center justify-center flex-col data-not-found mb-32'>
                        <i className='icon-event-management'></i>
                    //    {i18n.t(`useEvent.detailsPage.noSponseredData`)}
                    </div>}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 3xl:gap-8">
                        {isSponsoredLoading ?
                            <>
                                {Array.from({ length: 4 }).map((_, j) => {
                                    return (
                                        <React.Fragment key={j}>
                                            <EventCardWebSkeleton />
                                        </React.Fragment>

                                    );
                                })}
                            </>
                            :
                            <>
                                {sponsoredEventsData?.data?.map((item, i) => {
                                    return (
                                        <React.Fragment key={i}>
                                            <EventCardWeb
                                                item={item}
                                            />
                                        </React.Fragment>
                                    )
                                })}
                            </>
                        }
                    </div>
                    {totalSponsoredCount > 12 && (
                        <Pagination
                            totalCount={totalSponsoredCount}
                            setCurrentPage={(e) => setCurrentPage(e)}
                            activePage={currentSponsoredPage}
                            className='mt-32'
                            TotalLimit={SponsoredTotalLimit}
                            pageCount={Math?.ceil(totalSponsoredCount / SponsoredTotalLimit)}
                        />
                    )}
                </div>
            </section>
            } */}
      {
        <section className="events-wraps pt-120 pb-120 organizer-events-wrap">
          <div className="container">
            <div className="event-title-wrapper flex  items-center justify-between flex-wrap">
              <H1 className="h2">
                {" "}
                {params?.category === "event"
                  ? i18n.t(
                      `useEvent.headerTitle.detailsPage.eventHeading.events`
                    )
                  : params?.category === "sponsored"
                  ? `${EventCategoryTitle?.[params?.category]}`
                  : EventCategoryTitle?.[params?.category]}
              </H1>
              {/* <p className="link m-0">
                                {eventsListCategoryData?.meta?.totalCount}{' '}
                                {i18n.t(
                                    `useEvent.headerTitle.detailsPage.events`
                                )}
                            </p> */}
            </div>
            <div className="flex items-start justify-between filter-events-wrapper">
              <div className="calender-wrap flex items-center gap-3 3xl:gap-5">
                <button
                  className={`list-btn ${
                    calendarShow === "list" ? "active" : ""
                  }`}
                  title="List"
                  onClick={() => setCalendarShow("list")}
                >
                  {" "}
                  <i className="icon-dashboard"></i>
                </button>
                {!calenderBTNhIde && (
                  <button
                    className={`list-btn ${
                      calendarShow === "calendar" ? "active" : ""
                    }`}
                    title="Calendar"
                    onClick={() => setCalendarShow("calendar")}
                  >
                    {" "}
                    <i className="icon-calendar"></i>
                  </button>
                )}
              </div>
              <div className="flex items-center gap-3 3xl:gap-5 search-filter-group">
                <form action="" className="w-full lg:w-auto" onSubmit={handleSubmit(handleSearch)}>
                  <input
                    type="search"
                    placeholder={i18n.t(
                      `useEvent.headerTitle.detailsPage.search.placeholder`
                    )}
                    className="search-event"
                    {...register("search",{
                      onChange : (e)=> {
                        if(!e?.target?.value){
                          setSearchData("")
                          // let obj2 = {};
                          // obj2.web = true
                          // dispatch(
                          //   sponsoredDataListCategory(
                          //     obj2,
                          //   )
                          // );
                        }
                      }
                    })}
                    // onChange={searchValue}
                  />
                </form>
                {calendarShow === "list" && (
                  <button
                    className="filter-btn list-btn"
                    title="Filter"
                    onClick={() => setFilterModalShow(true)}
                  >
                    <i className="icon-filter"></i>
                  </button>
                )}
              </div>
            </div>
            {filterData && checkkeyExist(filterData) && (
              <div className="filter-content-list">
                <ul className="flex items-start flex-wrap gap-3 lg:gap-4">
                  {filterData?.start_date && filterData?.end_date && (
                    <li className="flex items-center">
                      {i18n.t(`useEvent.filterEvents.startDate`)} : <p>
                        {eventdetailsformatDate(filterData?.start_date,languageName)}
                      </p>{" "}
                      -{" "}
                      {i18n.t(`useEvent.filterEvents.endDate`)} : <p>
                        {eventdetailsformatDate(filterData?.end_date,languageName)}
                      </p>
                      <i
                        className="icon-reject"
                        onClick={() => handleclose(["end_date", "start_date"])}
                      ></i>
                    </li>
                  )}
                  {filterData?.city?.name && (
                    <li className="flex items-center">
                      <p>{i18n.t(`useEvent.filterEvents.Location`)} : {filterData?.city?.name}</p>
                      <i
                        className="icon-reject"
                        onClick={() => handleclose(["city"])}
                      ></i>
                    </li>
                  )}
                  {filterData?.eventType && (
                    <li className="flex items-center">
                      <p>{i18n.t(`useEvent.filterEvents.EventType`)} : {filterData?.eventType?.title}</p>
                      <i
                        className="icon-reject"
                        onClick={() => handleclose(["eventType"])}
                      ></i>
                    </li>
                  )}
                  {filterData?.isPaid && (
                    <li className="flex items-center">
                      <p>{filterData?.isPaid?.title}</p>
                      <i
                        className="icon-reject"
                        onClick={() => handleclose(["isPaid"])}
                      ></i>
                    </li>
                  )}
                  {filterData?.sortbyprice && (
                    <li className="flex items-center">
                      <p> {i18n.t(`useEvent.filterEvents.sortfilterlabelPrice`)} : {filterData?.sortbyprice?.title}</p>
                      <i
                        className="icon-reject"
                        onClick={() => handleclose(["sortbyprice"])}
                      ></i>
                    </li>
                  )}
                  {filterData?.sortbydate && (
                    <li className="flex items-center">
                      <p>{i18n.t(`useEvent.filterEvents.sortfilterLabel`)} : {filterData?.sortbydate?.title}</p>
                      <i
                        className="icon-reject"
                        onClick={() => handleclose(["sortbydate"])}
                      ></i>
                    </li>
                  )}
                </ul>
              </div>
            )}
            
            {/* {calendarShow !== 'calendar' && isLoading ? (
                                <>
                                <div className="web-events-wrapper pb-120">
                                    <div className="event-title-wrapper flex items-center justify-between flex-wrap">
                                        <Skeleton width="30%" height={50} />
                                        <Skeleton width={100} height={30} />
                                    </div>
                                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 3xl:gap-8">
                                        {Array.from({ length: 4 }).map((_, j) => {
                                        return (
                                            <React.Fragment key={j}>
                                            <EventCardWebSkeleton />
                                            </React.Fragment>
                                        );
                                        })}
                                    </div>
                                </div>
                                </>
                            ) : (
                                <>
                                {eventsListCategoryData?.data?.length > 0 &&
                                    calendarShow === 'list' &&
                                      && (
                                        <EventList searchfilter={searchData} dataFilter={filterData}/>
                                    )}
                                </>
                            )
                            
                        } */}
            {isLoadingSponsored && params?.category === "sponsored" ? (
              <div className="web-events-wrapper pb-120">
                <div className="event-title-wrapper flex items-center justify-between flex-wrap">
                  <Skeleton width="30%" height={50} />
                  <Skeleton width={100} height={30} />
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 3xl:gap-8">
                  {Array.from({ length: 4 }).map((_, j) => {
                    return (
                      <React.Fragment key={j}>
                        <EventCardWebSkeleton />
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            ) : (
              <>
                {calendarShow === "list" &&
                  params?.category === "sponsored" && (
                    <EventList
                    languageName={languageName}
                      searchfilter={searchData}
                      dataFilter={filterData}
                    />
                  )}
              </>
            )}
            {/* {calendarShow !== "calendar" &&
              eventsListCategoryData?.data &&
              Object?.entries(eventsListCategoryData?.data)
                ?.filter((e) => e?.[0] !== "blogs")
                ?.every((e) => e?.[1]?.length < 1) && (
                <div className="flex items-center justify-center flex-col data-not-found mb-32">
                  <i className="icon-event-management"></i>
                  {i18n.t(`useEvent.calanderFilter.noData`)}
                </div>
              )} */}
            {calendarShow === "list" && params?.category !== "sponsored" && (
              <>
                {/* <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 3xl:gap-8"> */}
                  {isLoading ? (
                    <>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 3xl:gap-8">
                      {Array.from({ length: 4 }).map((_, j) => {
                        return (
                          <React.Fragment key={j}>
                            <EventCardWebSkeleton />
                          </React.Fragment>
                        );
                      })}
                      </div>
                    </>
                  ) : (
                    <>
                      {eventsListCategoryData?.data?.length > 0 ? (
                        <>
                          <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 3xl:gap-8">
                            {eventsListCategoryData?.data?.map(
                              (item, index) => {
                                const duration = EventRecurrence?.find((e)=>e?.id === item?.duration)
                                return (
                                  <React.Fragment key={index}>
                                    <EventCardWeb item={item} category={params?.category} duration={duration}/>
                                  </React.Fragment>
                                );
                              }
                            )}
                          </div>
                        </>
                      ) : (
                        <>
                        <div className="flex items-center justify-center flex-col data-not-found mb-32">
                          <i className="icon-event-management"></i>
                          {i18n.t(`useEvent.calanderFilter.noData`)}
                        </div>
                        </>
                      )}
                    </>
                  )}
                {/* </div> */}
                {totalCount > 12 && (
                  <Pagination
                    totalCount={totalCount}
                    setCurrentPage={(e) => setCurrentPage(e)}
                    activePage={currentPage}
                    TotalLimit={TotalLimit}
                    className="mt-32"
                    pageCount={Math?.ceil(totalCount / TotalLimit)}
                  />
                )}
              </>
            )}
            {calendarShow === "calendar" && (
              <CalendarView
                eventData={eventsListCategoryData?.data}
                setCalenderData={setCalenderData}
              />
            )}
          </div>
          <EventFilterModal show={filterModalShow} className={"filter-modal"}>
            {filterModalShow && (
              <EventFilterForm
              languageName={languageName}
                setFilterModalShow={setFilterModalShow}
                filterData={filterData}
                getValue={(value) => {
                  setFilterData(value);
                  setCurrentPage(1);
                }}
              />
            )}
          </EventFilterModal>
        </section>
      }
    </>
  );
};

export default EventsCategory;
