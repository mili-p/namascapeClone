"use client";
import React, { useEffect, useState } from "react";
import EventCardWeb from "@/app/components/EventCardWeb/EventCardWeb";
import EventCardWebSkeleton from "@/app/components/EventCardWeb/EventCardWebSkeleton";
import H2 from "@/app/components/common/h2";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { asyncEventsList } from "../../../../../redux/Thunks/User/eventslist.thunk";
import { asyncSponsoredEventsList } from "../../../../../redux/Thunks/User/sponsoredevents.thunk";
import Skeleton from "@/app/components/Skeleton/Skeleton";
import Pagination from "@/app/components/Pagination/Pagination";
import { useTranslation } from "react-i18next";
import { sponsoredDataListCategory } from "../../../../../redux/Thunks/User/categorySponsored.thunk";
import { EventRecurrenceFn } from "@/i18n/i18nCM/i18CM";

const EventList = ({ searchfilter, dataFilter, languageName }) => {
  const { i18n } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const EventRecurrence = EventRecurrenceFn(i18n);
  const { eventsData } = useSelector((m) => m.eventslist);
  const { sponsoredList, isLoadingSponsored } = useSelector(
    (m) => m.categorySponsoredSlice
  );
  // const { sponsoredEventsData, isSponsoredLoading, totalSponsoredCount } = useSelector((m) => m.sponsoredevents)

  const TotalLimit = 12;
  console.log(EventRecurrence, "EventRecurrenceEventRecurrence", sponsoredList);
  // useEffect(() => {
  //     dispatch(asyncEventsList())
  // }, [])
  // useEffect(() => {

  //   let obj2 = {};
  //   if(searchfilter){
  //     obj2.search = searchfilter
  //   }
  //   (obj2.startDate = dataFilter?.start_date
  //       ? new Date(dataFilter?.start_date).setHours(0,0,0,0)
  //       : ''),
  //       (obj2.endDate = dataFilter?.end_date
  //           ? new Date(dataFilter?.end_date).setHours(23,59,59,59)
  //           : ''),
  //       (obj2.location = dataFilter?.city
  //           ? dataFilter?.city?.cityId
  //           : '')

  //   if (dataFilter?.eventType?.id === 2) {
  //       obj2.isOnline = true
  //   }
  //   if (dataFilter?.eventType?.id === 3) {
  //       obj2.isOffline = true
  //   }
  //   if (dataFilter?.isPaid?.id === 2) {
  //       obj2.isPaid = true
  //   }
  //   if (dataFilter?.isPaid?.id === 3) {
  //       obj2.isFree = true
  //   }
  //   if (dataFilter?.sortbyprice?.id === 1) {
  //       obj2.price = '1'
  //   }
  //   if (dataFilter?.sortbyprice?.id === 2) {
  //       obj2.price = '-1'
  //   }
  //   if (dataFilter?.sortbydate?.id === 1) {
  //       obj2.startTime = '1'
  //   }
  //   if (dataFilter?.sortbydate?.id === 2) {
  //       obj2.startTime = '-1'
  //   }

  //   dispatch(
  //     sponsoredDataListCategory(
  //       obj2
  //       // search: searchfilter,
  //       // limit:''
  //     )
  //   );
  // }, [dataFilter]);

  // useEffect(() => {
  //     dispatch(asyncSponsoredEventsList({
  //         limit: TotalLimit,
  //         page: currentPage
  //     }))
  // },[])

  let NoDataHeading = sponsoredList && Object.values(sponsoredList).flat();

  return (
    <>
      {/* <section className="event-search-bar text-end">
                <div className="container">
                    <form action="">
                        <input
                            type="search"
                            placeholder="Search here"
                            className="search-event"
                        />
                    </form>
                </div>
            </section> */}
      {NoDataHeading?.length <= 0 && (
        <>
          <div className="data-not-found">
            {i18n.t(`sponsoredEperience.noData`)}
          </div>
        </>
      )}

      {/* {eventsData?.data &&
        Object?.entries(eventsData?.data)
          ?.filter((e) => e?.[0] !== "blogs")
          ?.every((e) => e?.[1]?.length < 1) && (
          <div className="pb-120">
     
              <div className="flex items-center justify-center flex-col data-not-found">
                <i className="icon-event-management"></i>
                There is no events.
              </div>
          </div>
        )} */}

      {/* {isLoading ? (
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
        <> */}
      {sponsoredList?.experienceEvents?.length > 0 && (
        <div className="web-events-wrapper">
          {/* <div className="container"> */}
          <div className="event-title-wrapper flex items-center justify-between flex-wrap">
            <H2>{i18n.t(`sponsoredEperience.experiences`)}</H2>
            <Link href="/events/event/">
              {i18n.t(`sponsoredEperience.seeAll`)}
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 3xl:gap-8">
            {sponsoredList?.experienceEvents?.map((item, index) => {
             const duration = EventRecurrence?.find((e)=>e?.id === item?.duration)
              return (
                <React.Fragment key={index}>
                  <EventCardWeb
                    item={item}
                    languageName={languageName}
                    category={item?.category}
                    duration={duration}
                  />
                </React.Fragment>
              );
            })}
          </div>
          {/* </div> */}
        </div>
      )}
      {sponsoredList?.classesEvents?.length > 0 && (
        <div className="web-events-wrapper pb-120">
          {/* <div className="container"> */}
          <div className="event-title-wrapper flex items-center justify-between flex-wrap">
            <H2>{i18n.t(`sponsoredEperience.classes`)}</H2>
            <Link href="/events/classes/">
              {i18n.t(`sponsoredEperience.seeAll`)}
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 3xl:gap-8">
            {sponsoredList?.classesEvents?.map((item, index) => {
              const duration = EventRecurrence?.find((e)=>e?.id === item?.duration)
              return (
                <React.Fragment key={index}>
                  <EventCardWeb item={item} category={item?.category} duration={duration} />
                </React.Fragment>
              );
            })}
          </div>
          {/* </div> */}
        </div>
      )}
      {sponsoredList?.treatsEvents?.length > 0 && (
        <div className="web-events-wrapper pb-120">
          {/* <div className="container"> */}
          <div className="event-title-wrapper flex items-center justify-between flex-wrap">
            <H2>{i18n.t(`sponsoredEperience.treats`)}</H2>
            <Link href="/events/treats/">
              {i18n.t(`sponsoredEperience.seeAll`)}
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 3xl:gap-8">
            {sponsoredList?.treatsEvents?.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <EventCardWeb item={item} category={item?.category} />
                </React.Fragment>
              );
            })}
          </div>
          {/* </div> */}
        </div>
      )}
      {sponsoredList?.retreatsEvents?.length > 0 && (
        <div className="web-events-wrapper pb-120">
          {/* <div className="container"> */}
          <div className="event-title-wrapper flex items-center justify-between flex-wrap">
            <H2>{i18n.t(`sponsoredEperience.retreats`)}</H2>
            <Link href="/events/retreats">
              {i18n.t(`sponsoredEperience.seeAll`)}
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 3xl:gap-8">
            {sponsoredList?.retreatsEvents?.map((item, index) => {
              const duration = EventRecurrence?.find((e)=>e?.id === item?.duration)
              return (
                <React.Fragment key={index}>
                  <EventCardWeb item={item} category={item?.category} duration={duration} />
                </React.Fragment>
              );
            })}
          </div>
          {/* </div> */}
        </div>
      )}
      {sponsoredList?.coachingsEvents?.length > 0 && (
        <div className="web-events-wrapper pb-120">
          {/* <div className="container"> */}
          <div className="event-title-wrapper flex items-center justify-between flex-wrap">
            <H2>{i18n.t(`sponsoredEperience.coaching`)}</H2>
            <Link href="/events/coachings/">
              {i18n.t(`sponsoredEperience.seeAll`)}
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 3xl:gap-8">
            {sponsoredList?.coachingsEvents?.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <EventCardWeb item={item} category={item?.category} />
                </React.Fragment>
              );
            })}
          </div>
          {/* </div> */}
        </div>
      )}
      {sponsoredList?.trainingsEvents?.length > 0 && (
        <div className="web-events-wrapper pb-120">
          {/* <div className="container"> */}
          <div className="event-title-wrapper flex items-center justify-between flex-wrap">
            <H2>{i18n.t(`sponsoredEperience.Training`)}</H2>
            <Link href="/events/training">
              {i18n.t(`sponsoredEperience.seeAll`)}
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 3xl:gap-8">
            {sponsoredList?.trainingsEvents?.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <EventCardWeb item={item} category={item?.category} />
                </React.Fragment>
              );
            })}
          </div>
          {/* </div> */}
        </div>
      )}
      {/* {eventsData?.data?.retreatEvents?.length > 0 &&
                        <section className="web-events-wrapper pb-120">
                            <div className="container">
                                <div className="event-title-wrapper flex items-center justify-between flex-wrap">
                                    <H2>Retreats</H2>
                                    <Link href="/events/retreats-event">See All</Link>
                                </div>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 3xl:gap-8">
                                    {eventsData?.data?.retreatEvents?.map((item, index) => {
                                        return (
                                            <React.Fragment key={index}>
                                                <EventCardWeb
                                                    item={item}
                                                />
                                            </React.Fragment>
                                        )
                                    })}
                                </div>
                            </div>
                        </section>} */}
      {/* {eventsData?.data?.gatheringEvents?.length > 0 &&
                        <section className="web-events-wrapper pb-120">
                            <div className="container">
                                <div className="event-title-wrapper flex items-center justify-between flex-wrap">
                                    <H2>Gatherings</H2>
                                    <Link href="/events/gatherings-event">See All</Link>
                                </div>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 3xl:gap-8">
                                    {eventsData?.data?.gatheringEvents?.map((item, index) => {
                                        return (
                                            <React.Fragment key={index}>
                                                <EventCardWeb
                                                    item={item}
                                                />
                                            </React.Fragment>
                                        )
                                    })}
                                </div>
                            </div>
                        </section>} */}
      {/* {eventsData?.data?.treatEvents?.length > 0 &&
                        <section className="web-events-wrapper pb-120 pb-120">
                            <div className="container">
                                <div className="event-title-wrapper flex items-center justify-between flex-wrap">
                                    <H2>Treats</H2>
                                    <Link href="/events/treats-event">See All</Link>
                                </div>
                                <div className="grid sm:grid-cols-2  lg:grid-cols-3 2xl:grid-cols-4 gap-6 3xl:gap-8">
                                    {eventsData?.data?.treatEvents?.map((item, index) => {
                                        return (
                                            <React.Fragment key={index}>
                                                <EventCardWeb
                                                    item={item}
                                                />
                                            </React.Fragment>
                                        )
                                    })}
                                </div>
                            </div>
                        </section>}  */}
      {/* </>
      )} */}
      {/* <>
            {!isSponsoredLoading && !sponsoredEventsData?.data &&
                <section className='pb-120'>
                    <div className="container">
                        <div className='flex items-center justify-center flex-col data-not-found'>
                            <i className='icon-event-management'></i>
                            {i18n.t(`useEvent.headerTitle.noEvent`)}
                        </div>
                    </div>
                </section>}
                {isSponsoredLoading ?
                <>
                    <section className="web-events-wrapper pb-120">
                        <div className="container">
                            <div className="event-title-wrapper flex items-center justify-between flex-wrap">
                                <Skeleton width='30%' height={50} />
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
                    </section>
                </>
                :

                <>
                    {sponsoredEventsData?.data?.length > 0 &&
                        <section className="web-events-wrapper pb-120 pb-120">
                            <div className="container">
                                <div className="event-title-wrapper flex items-center justify-between flex-wrap">
                                    <H2>{i18n.t(`useEvent.SponsoredEvents.h2Header`)}</H2>
                                    <Link href="/events/all-event">{i18n.t(`useEvent.SponsoredEvents.seeAllBTN`)}</Link>
                                </div>
                                <div className="grid sm:grid-cols-2  lg:grid-cols-3 2xl:grid-cols-4 gap-6 3xl:gap-8">
                                    {sponsoredEventsData?.data?.map((item, index) => {
                                        return (
                                            <React.Fragment key={index}>
                                                <EventCardWeb
                                                    item={item}
                                                />
                                            </React.Fragment>
                                        )
                                    })}
                                </div>
                            </div>
                            {totalSponsoredCount > 12 && (
                                <Pagination
                                    totalCount={totalCount}
                                    setCurrentPage={(e) => setCurrentPage(e)}
                                    activePage={currentPage}
                                    className='mt-32'
                                    TotalLimit={TotalLimit}
                                    pageCount={Math?.ceil(totalSponsoredCount / TotalLimit)}
                                />
                            )}
                        </section>}
                </>

            }
            </> */}
    </>
  );
};

export default EventList;
