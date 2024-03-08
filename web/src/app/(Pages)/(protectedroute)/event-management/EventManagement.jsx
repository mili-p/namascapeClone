"use client";
import React, { useCallback, useEffect, useState } from "react";
import ProtectedEventCard from "@/app/components/ProtectedEventCard/ProtectedEventCard";
import SiteBreadcrumb from "@/app/components/SiteBreadcrumb/SiteBreadcrumb";
import Tabs from "@/app/components/Tabs/Tabs";
import ProtectedEventImage from "../../../../../public/assets/images/protected-event-image.png";
import { useDispatch, useSelector } from "react-redux";
import { eventManagementThunk } from "../../../../../redux/Thunks/Organizer/EventManagement/eventmanagement.thunk";
import ProtectedEventCardSkeleton from "@/app/components/ProtectedEventCard/ProtectedEventCardSkeleton";
import Pagination from "@/app/components/Pagination/Pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import {
  EventCategoryFn,
  EventRecurrenceFn,
  CreateEventTypeFn,
  CurrencyFn,
  DiscountTypeListFn,
} from "@/i18n/i18nCM/i18CM";
import {OrgGetDate,OrgGetTime} from '../../../../utils/commonfn/Date_TimeTS/index'

let timer;

  const EventManagement = ({languageName}) => {
  const { i18n } = useTranslation();
  const pathName = usePathname();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const pageCount = searchParams.get("ct") || 1;
  // const [currentPage, setCurrentPage] = useState(pageCount || 1);
  const { isLoading, eventList, totalCount } = useSelector(
    (e) => e.EventManagementSlice
  );

  /////////////////////////////////
  const EventRecurrence = EventRecurrenceFn(i18n);
  const CreateEventType = CreateEventTypeFn(i18n);
  const Currency = CurrencyFn(i18n);
  const DiscountTypeList = DiscountTypeListFn(i18n);
  const EventCategory = EventCategoryFn(i18n);
  ///////////////////////////////////////////

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const router = useRouter();
  const hostedActiveTab = searchParams.get("activeTab") || "1";

  const [activeTab, setActiveTab] = useState(hostedActiveTab || "1");
  const globalSearchValue = searchParams.get("search");
  const [getSearch, setGetSearch] = useState("");

  const BreadcrumbData = [
    {
      title: i18n.t(`organizer.event.eventmanagement.breadcrumb.home`),
      url: "/",
    },
    {
      title: i18n.t(
        `organizer.event.eventmanagement.breadcrumb.eventmanagement`
      ),
      url: "/event-management/?activeTab=1&ct=1",
    },
    {
      title:
        activeTab === "1"
          ? i18n.t(`organizer.event.eventmanagement.breadcrumb.upcomingevent`)
          : i18n.t(`organizer.event.eventmanagement.breadcrumb.hostedevent`),
    },
  ];


  // const Eventdata = [
  //   {
  //     badge: { title: "Gathering", id: 1 },
  //     date: "Fri, Nov 03",
  //     time: "10:00 - 11:00 AM",
  //     title: "Develop a Unique and Compelling...",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.",
  //     location: "New Jersey 45463.",
  //     price: "$75.00",
  //     available: "240",
  //     sold: "00",
  //     peoplejoined: "97/100",
  //     status: 1,
  //     eventImage: ProtectedEventImage,
  //     price: "75",
  //     available: "100",
  //     sold: "00",
  //   },
  //   {
  //     badge: { title: "Retreats", id: 2 },
  //     date: "Fri, Nov 03",
  //     time: "10:00 - 11:00 AM",
  //     title: "Develop a Unique and Compelling...",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.",
  //     location: "New Jersey 45463.",
  //     price: "$75.00",
  //     available: "240",
  //     sold: "00",
  //     peoplejoined: "97/100",
  //     status: 2,
  //     eventImage: ProtectedEventImage,
  //     price: "80",
  //     available: "40",
  //     sold: "30",
  //   },
  //   {
  //     badge: { title: "Treats", id: 3 },
  //     date: "Fri, Nov 03",
  //     time: "10:00 - 11:00 AM",
  //     title: "Develop a Unique and Compelling...",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.",
  //     location: "New Jersey 45463.",
  //     price: "$75.00",
  //     available: "240",
  //     sold: "00",
  //     peoplejoined: "97/100",
  //     status: 3,
  //     eventImage: ProtectedEventImage,
  //     price: "65",
  //     available: "35",
  //     sold: "10",
  //   },
  // ];

  // useEffect(() => {
  //   if (timer) {
  //     clearTimeout(timer);
  //   }
  //   timer = setTimeout(() => {
  //     if (globalSearchValue) {
  //       setGetSearch(globalSearchValue);
  //     } else {
  //       setGetSearch("");
  //     }
  //   }, 500);
  // }, [globalSearchValue]);

  // console.log(globalSearchValue, "GETTETTETETTETE", getSearch);

  const TabsArray = [
    {
      key: "1",
      title: i18n.t(`organizer.event.eventmanagement.breadcrumb.upcomingevent`),
    },
    {
      key: "2",
      title: i18n.t(`organizer.event.eventmanagement.breadcrumb.hostedevent`),
    },
  ];

  const TotalLimit = 6;

  // useEffect(() => {
  //   if (activeTab) {
     
  //     // setCurrentPage(1);
     
  //     // router.push(
  //     //   `/event-management/?activeTab=${activeTab}&ct=${pageCount}`
  //     // );
  //   }
  // }, [activeTab]);

  useEffect(() => {
    dispatch(
      eventManagementThunk({
        // search: getSearch || "",
        search: "",
        // sortBy: "createdAt:-1",
        limit: TotalLimit,
        page: pageCount,
        upcoming: activeTab === "1",
        hosted: activeTab === "2",
        // web : true
      })
    );
    // if(totalCount > 6 && eventList?.length > 0 && activeTab){
    //   router.push(`/event-management/?activeTab=${activeTab}&ct=1`)
    // }
    // router.push(`/event-management/?activeTab=${activeTab}&ct=${currentPage || 1}`)
    if (activeTab) {
      // router.push(`/event-management/?activeTab=${activeTab}&ct=${currentPage || 1}`)
      if (getSearch) {
        // router.push(`${pathName}?activeTab=${activeTab}&search=${getSearch}`);
      } else {
        // router.push(`${pathName}?activeTab=${activeTab}&ct=${pageCount || 1}`);
        // router.push(
        //   `/event-management/?activeTab=${activeTab}&ct=${currentPage || 1}`
        // );
      }
      // if (pageCount>1) {
        
      //   router.push(
      //     `/event-management/?activeTab=${activeTab}&ct=${currentPage || 1}`
      //   );
      // }else{
      //   router.push(
      //     `/event-management/?activeTab=${activeTab}`
      //   );
      // }
    }
    // if(activeTab && getSearch ){
    //   router.push(`${pathName}?activeTab${activeTab}&search=${getSearch}`);
    // }
    // if(activeTab){
    //   router.push(
    //     `/event-management?activeTab=${activeTab}&search=${search}`
    //   );
    // }
  }, [activeTab, pageCount]);
  // useEffect(()=>{
  //   if(activeTab){
  //     alert()
  //     router.push(`/event-management/?activeTab=${activeTab}&ct=1`)
  //   }
  // },[activeTab])

  const getStartDate = (data) => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const monthsOfYear = [
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
    // const dateObject = new Date(+data);
    // const formattedDate = dateObject.toLocaleString("en-US", {
    //   weekday: "short",
    //   month: "short",
    //   day: "numeric",
    // });
    // return formattedDate;
    // const dateObject = new Date(+data);
    // const day = dateObject.getDate().toString().padStart(2, '0');
    // const month = dateObject.toLocaleString("en-US", { month: "numeric" });
    // const year = dateObject.getFullYear();
    // const formattedDate = `${day}/${month}/${year}`;
    // return formattedDate;
    const date = new Date(+data);
    const dayOfWeek = daysOfWeek[date.getUTCDay()];
    const day = date.getUTCDate();
    const month = monthsOfYear[date.getUTCMonth()]?.substring(0, 3);
    const year = date.getUTCFullYear().toString()?.substring(2, 4);

    const formattedDate = `${dayOfWeek?.substring(
      0,
      3
    )}, ${day}. ${month} ${year}`;
    return formattedDate;
  };

  const getStartTime = (data) => {
    const timeObject = new Date(+data);
    // Format time
    const hours = timeObject.getHours();
    const minutes = timeObject.getMinutes();
    const formattedTime = `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
    return formattedTime;
  };

  const getEndDate = (data) => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const monthsOfYear = [
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
    // const dateObject = new Date(+data);
    // const formattedDate = dateObject.toLocaleString("en-US", {
    //   weekday: "short",
    //   month: "short",
    //   day: "numeric",
    // });
    // return formattedDate;
    // const dateObject = new Date(+data);
    // const day = dateObject.getDate().toString().padStart(2, '0');
    // const month = dateObject.toLocaleString("en-US", { month: "numeric" });
    // const year = dateObject.getFullYear();
    // const formattedDate = `${day}/${month}/${year}`;
    // return formattedDate;
    const date = new Date(+data);
    const dayOfWeek = daysOfWeek[date.getUTCDay()];
    const day = date.getUTCDate();
    const month = monthsOfYear[date.getUTCMonth()]?.substring(0, 3);
    const year = date.getUTCFullYear().toString()?.substring(2, 4);

    const formattedDate = `${dayOfWeek?.substring(
      0,
      3
    )}, ${day}. ${month} ${year}`;
    return formattedDate;
  };
  const getEndTime = (data) => {
    const timeObject = new Date(+data);
    // Format time
    const hours = timeObject.getHours();
    const minutes = timeObject.getMinutes();
    const formattedTime = `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
    return formattedTime;
  };
  

  return (
    <div className="protected-event-management">
      <SiteBreadcrumb
        BreadcrumbData={BreadcrumbData}
        className="protected-breadcrumb flex-wrap"
      />
      <ul className="flex items-center flex-wrap bg-white event-tab-list">
        <Tabs
          data={TabsArray}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
        />
      </ul>
      <div className="bg-white mt-32 upcoming-events">
        <div className="flex items-stretch flex-wrap upcoming-events-list">
          {isLoading &&
            Array.from({ length: 4 }).map((_, j) => {
              return (
                <div className="w-full 2xl:w-1/2 item" key={j}>
                  <ProtectedEventCardSkeleton />
                </div>
              );
            })}
          {eventList?.length === 0 && !isLoading && (
            <div className="data-not-found">
              {/* There is no {activeTab === "1" ? "Upcoming" : "Hosted"} Events{" "} */}
              {activeTab === "1"
                ? i18n.t(`organizer.dashboard.upcomingevent.nodata`)
                : i18n.t(`organizer.dashboard.hostedEvent.nodata`)}
            </div>
          )}
          {eventList?.length > 0 &&
            eventList?.map((list, i) => {
              const duration = EventRecurrence.find(
                (e) => e.id === list?.duration
              );
              const title = duration
                ? i18n.t(
                    `organizer.event.commonArray.EventRecurrence.option.${duration.id}`
                  )
                : "";
              return (
                <div className="w-full 2xl:w-1/2 item" key={i}>
                  <ProtectedEventCard
                    duration={title}
                    event
                    isSponsored={list?.isSponsored}
                    uniqueId={list?.eventId}
                    // EventCategory={EventCategory}
                    currency={list?.currency}
                    canBeDeleted={list?.canBeDeleted}
                    activeTab={activeTab}
                    category={list?.category}
                    // badge={list?.badge?.title}
                    startDate={
                      list?.startTime ? OrgGetDate(list?.startTime,languageName) : ""
                    }
                    isOngoing={list?.isOngoing}
                    startTime={
                      list?.startTime ? OrgGetTime(list?.startTime) : ""
                    }
                    city={list?.city?.name ? list?.city?.name : ""}
                    endDate={list?.endTime ? OrgGetDate(list?.endTime,languageName) : ""}
                    endTime={list?.endTime ? OrgGetTime(list?.endTime) : ""}
                    title={list?.title}
                    description={list?.description}
                    descriptionDe={list?.descriptionDe}
                    location={list?.venue}
                    price={list?.price}
                    available={list?.seats?.available}
                    sold={list?.seats?.sold}
                    // peoplejoined={list?.peoplejoined}
                    peoplejoined={`${list?.seats?.sold}/${list?.seats?.total}`}
                    status={list?.status}
                    thumbnail={list?.thumbnail}
                    eventImage={list?.images?.[0]}
                    viewDetailsLink={`/create-event/${list?.eventId}`}
                  />
                </div>
              );
            })}
          {/* {isLoading ? (
            Array.from({ length: 4 }).map((_, j) => {
              return (
                <div className="w-full 2xl:w-1/2 item" key={j}>
                  <ProtectedEventCardSkeleton/>
                </div>
              )
            })
          )
          :
          (
            <>
              {eventList?.map((list, i) => {
                return (
                  <>
                  <div className="w-full 2xl:w-1/2 item" key={i}>
                    <ProtectedEventCard
                    uniqueId = {list?._id}
                      EventCategory={EventCategory}
                      event
                      activeTab={activeTab}
                      category={list?.category}
                      badge={list?.badge?.title}
                      startDate={getStartDate(list?.startTime)}
                      startTime={getStartTime(list?.startTime)}
                      endDate={list?.endTime ? getEndDate(list?.endTime) : ""}
                      endTime={list?.endTime ? getEndTime(list?.endTime) : ""}
                      title={list?.title}
                      description={list?.description}
                      descriptionDe={list?.descriptionDe}
                      location={list?.venue}
                      price={list?.price}
                      available={list?.seats?.available}
                      sold={list?.seats?.sold}
                      peoplejoined={list?.peoplejoined}
                      status={list?.status}
                      eventImage={list?.images?.[0]}
                      viewDetailsLink="/"
                    />
                  </div>
                </>
                );
              })}
            </>
          )} */}

          {/* <div className='w-full xl:w-1/2 item'>
              <ProtectedEventCard event activeTab={activeTab} />
            </div>
            <div className='w-full xl:w-1/2 item'>
              <ProtectedEventCard event activeTab={activeTab} />
            </div>
            <div className='w-full xl:w-1/2 item'>
              <ProtectedEventCard event activeTab={activeTab} />
            </div>
            <div className='w-full xl:w-1/2 item'>
              <ProtectedEventCard event activeTab={activeTab} />
            </div>
            <div className='w-full xl:w-1/2 item'>
              <ProtectedEventCard event activeTab={activeTab} />
            </div> */}
        </div>
      </div>

      {totalCount > 6 && eventList?.length > 0 && (
        <Pagination
          totalCount={totalCount}
          setCurrentPage={(e) => {
            // setCurrentPage(e)
          const a= createQueryString('ct',e)
          router.push(
                 `/event-management?${a}`
              );
          }}
          activePage={pageCount}
          TotalLimit={TotalLimit}
          pageCount={Math?.ceil(totalCount / TotalLimit)}
        />
      )}
    </div>
  );
};

export default EventManagement;
