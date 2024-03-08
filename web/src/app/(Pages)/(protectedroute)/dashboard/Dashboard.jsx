"use client";
import React, { useRef } from "react";
import "./dashboard.scss";
import Link from "next/link";
import H3 from "@/app/components/common/h3";
import H2 from "@/app/components/common/h2";
import ProtectedEventCard from "@/app/components/ProtectedEventCard/ProtectedEventCard";
import ProtectedEventCardSkeleton from "@/app/components/ProtectedEventCard/ProtectedEventCardSkeleton";
import ProtectedHostedEventCard from "@/app/components/ProtectedHostedEventCard/ProtectedHostedEventCard";
import ProtectedHostedEventCardSkeleton from "@/app/components/ProtectedHostedEventCard/ProtectedHostedEventCardSkeleton";
import ProtectedEventImage from "../../../../../public/assets/images/protected-event-image.png";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { dashBoardThunk } from "../../../../../redux/Thunks/Organizer/Dashboard/dashboard.thunk";
import { useEffect } from "react";
import Skeleton from "../../../components/Skeleton/Skeleton";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { OrgGetDate, OrgGetTime } from "@/utils/commonfn/Date_TimeTS/index";

const Dashboard = ({ languageName }) => {
  const ref = useRef(null);
  const { dashboardData, isloading } = useSelector((m) => m.DashboardSlice);
  const search = useSearchParams();
  const { t, i18n } = useTranslation();
  const globalSearchValue = search.get("search");
  const dispatch = useDispatch();

  useEffect(() => {
      // ref.current.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      window.scrollTo(0,0);
  }, []);

  useEffect(() => {
    dispatch(dashBoardThunk());
  }, []);

  const getDate = (data) => {
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

  const getTime = (data) => {
    const timeObject = new Date(+data);
    // Format time
    const hours = timeObject.getHours();
    const minutes = timeObject.getMinutes();
    const formattedTime = `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
    return formattedTime;
  };

  const CounterList = [
    {
      count: dashboardData?.totalEventCounts,
      title: i18n.t(`organizer.dashboard.eventCount.totalevent`),
      URL: "",
    },
    {
      count: dashboardData?.completedEventCounts,
      title: i18n.t(`organizer.dashboard.eventCount.totalcompletedevents`),
      URL: "",
    },
    {
      count: dashboardData?.upcomingEventCounts,
      title: i18n.t(`organizer.dashboard.eventCount.totalupcomingevents`),
      URL: "",
    },
    {
      count: dashboardData?.ongoingEventCounts,
      title: i18n.t(`organizer.dashboard.eventCount.totalongoingevents`),
      URL: "",
    },
    {
      count: dashboardData?.totalEventBookingCounts,
      title: i18n.t(`organizer.dashboard.eventCount.totalbookingcount`),
      URL: "",
    },
  ];

  // const Eventdata = [
  //   {
  //     badge: 'Retreat',
  //     date: 'Fri, Nov 03',
  //     time: '10:00 - 11:00 AM',
  //     title: 'Develop a Unique and Compelling...',
  //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.',
  //     location: 'New Jersey 45463.',
  //     peoplejoined: '97/100',
  //     eventImage: ProtectedEventImage

  //   },
  //   {
  //     badge: 'Retreat',
  //     date: 'Fri, Nov 03',
  //     time: '10:00 - 11:00 AM',
  //     title: 'Develop a Unique and Compelling...',
  //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.',
  //     location: 'New Jersey 45463.',
  //     peoplejoined: '97/100',
  //     eventImage: ProtectedEventImage
  //   },
  //   {
  //     badge: 'Retreat',
  //     date: 'Fri, Nov 03',
  //     time: '10:00 - 11:00 AM',
  //     title: 'Develop a Unique and Compelling...',
  //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.',
  //     location: 'New Jersey 45463.',
  //     peoplejoined: '97/100',
  //     eventImage: ProtectedEventImage
  //   }
  // ]

  return (
    <>
      <div className="protected-dashboard" ref={ref}>
        <ul className="flex items-stretch flex-wrap protected-counter">
          {isloading ? (
            <>
              {Array.from({ length: 4 }).map((_, j) => {
                return (
                  <React.Fragment key={j}>
                    <li className="sm:w-1/2 xl:w-3/12">
                      <div className="link">
                        <Skeleton width={40} height={40} className="mb-3" />
                        <Skeleton width="100%" height={20} />
                      </div>
                    </li>
                  </React.Fragment>
                );
              })}
            </>
          ) : (
            <>
              {CounterList?.map((list, i) => {
                return (
                  <li key={i} className="sm:w-1/2 xl:w-1/5">
                    <span className="link">
                      <H3>{list.count}</H3>
                      <p>{list.title}</p>
                    </span>
                  </li>
                );
              })}
            </>
          )}
        </ul>
        {(dashboardData?.upcomingEventsData?.length > 0 ||
          dashboardData?.hostedEventsData?.length > 0) && (
          <div className="bg-white mt-32 upcoming-events gross-revenue">
            <div className="flex items-center justify-between flex-wrap head">
              <H2>{i18n.t(`organizer.dashboard.grossRevenue.heading`)}</H2>
            </div>
            <ul className="flex items-stretch flex-wrap protected-counter">
              {isloading ? (
                <>
                  {Array.from({ length: 3 }).map((_, j) => {
                    return (
                      <React.Fragment key={j}>
                        <li className="w-1/2 sm:w-1/3">
                          <div className="link">
                            <Skeleton width={40} height={40} className="mb-3" />
                            <Skeleton width="100%" height={20} />
                          </div>
                        </li>
                      </React.Fragment>
                    );
                  })}
                </>
              ) : (
                <>
                  <li className="w-1/2 sm:w-1/3">
                    <span className="link">
                      <H3>{dashboardData?.revenueInCHF?.grossRevenue}</H3>
                      <p>CHF</p>
                    </span>
                  </li>
                  <li className="w-1/2 sm:w-1/3">
                    <span className="link">
                      <H3>{dashboardData?.revenueInEUR?.grossRevenue}</H3>
                      <p>EUR</p>
                    </span>
                  </li>
                  <li className="w-1/2 sm:w-1/3">
                    <span className="link">
                      {/* <i className="icon-USD"></i> */}
                      <H3>{dashboardData?.revenueInUSD?.grossRevenue}</H3>
                      <p>USD</p>
                    </span>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
        {dashboardData?.upcomingEventsData?.length <= 0 &&
        dashboardData?.hostedEventsData?.length <= 0 ? (
          <>
            <div className="welcome-message bg-white mt-32">
              <H3 className="title">
                {i18n.t(`organizer.dashboard.welcomeMessage.heading`)}
              </H3>
              <div>
                <p>
                  {i18n.t(`organizer.dashboard.welcomeMessage.description`)}
                </p>
                <Link href="/create-event/">
                  <button className="solid-btn">
                    {i18n.t(`organizer.dashboard.welcomeMessage.button`)}
                  </button>
                </Link>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="bg-white mt-32 upcoming-events">
              <div className="flex items-center justify-between flex-wrap head">
                <H2>{i18n.t(`organizer.dashboard.upcomingevent.title`)}</H2>
                {dashboardData?.upcomingEventsData?.length > 0 ? (
                  <Link href="/event-management/?activeTab=1&ct=1">
                    {i18n.t(`organizer.dashboard.upcomingevent.seeall`)}
                  </Link>
                ) : (
                  ""
                )}
              </div>
              <div className="flex items-stretch flex-wrap upcoming-events-list">
                {/* {Eventdata?.map((item, i) => {
                        return (
                          <div className='w-full xl:w-1/2 3xl:w-4/12 item' key={i}>
                            <ProtectedEventCard 
                              badge={item.badge}
                              date={item.date}
                              time={item.time}
                              title={item.title}
                              description={item.description}
                              location={item.location}
                              peoplejoined={item.peoplejoined}
                              dashboard={true}
                              eventImage={item.eventImage}
                              viewDetailsLink="/"
                            />
                          </div>
                        )
                      })} */}
                {isloading ? (
                  <>
                    {Array.from({ length: 3 }).map((_, j) => {
                      return (
                        <>
                          <div className="w-full xl:w-1/2 3xl:w-4/12 item">
                            <ProtectedEventCardSkeleton />
                          </div>
                        </>
                      );
                    })}
                  </>
                ) : (
                  <>
                    {dashboardData?.upcomingEventsData?.length > 0 ? (
                      dashboardData?.upcomingEventsData?.map((item, i) => {
                        return (
                          <div
                            className="w-full xl:w-1/2 3xl:w-4/12 item"
                            key={i}
                          >
                            <ProtectedEventCard
                              // EventCategory = {EventCategory}
                              category={item.category}
                              startDate={
                                item?.startTime
                                  ? OrgGetDate(item?.startTime, languageName)
                                  : ""
                              }
                              city={item?.city?.name}
                              startTime={
                                item?.startTime
                                  ? OrgGetTime(item?.startTime)
                                  : ""
                              }
                              endDate={
                                item?.endTime
                                  ? OrgGetDate(item?.endTime, languageName)
                                  : ""
                              }
                              endTime={
                                item?.endTime ? OrgGetTime(item?.endTime) : ""
                              }
                              // date={item.date}
                              // time={item.time}
                              title={item.title}
                              description={item.description}
                              descriptionDe={item.descriptionDe}
                              location={item.venue}
                              peoplejoined={`${item?.seats?.sold}/${item?.seats?.total}`}
                              dashboard={true}
                              eventImage={item.media?.[0]?.imageUrl}
                              viewDetailsLink={`/create-event/${item?.eventId}`}
                              uniqueId={item?.eventId}
                              // viewDetailsLink={item?.eventId}
                            />
                          </div>
                        );
                      })
                    ) : (
                      <div className="data-not-found">
                        {i18n.t(`organizer.dashboard.upcomingevent.nodata`)}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="bg-white mt-32 upcoming-events">
              <div className="flex items-center justify-between flex-wrap head">
                <H2>{i18n.t(`organizer.dashboard.hostedEvent.title`)}</H2>
                {dashboardData?.hostedEventsData?.length > 0 ? (
                  <Link href="/event-management/?activeTab=2&ct=1">
                    {i18n.t(`organizer.dashboard.hostedEvent.seeall`)}
                  </Link>
                ) : (
                  ""
                )}
              </div>
              <div className="flex items-stretch flex-wrap upcoming-events-list">
                {isloading ? (
                  <>
                    {Array.from({ length: 5 }).map((_, j) => {
                      return (
                        <>
                          <div className="w-full sm:w-1/2 md:w-1/3 2xl:w-1/4 3xl:w-1/5 item">
                            <ProtectedHostedEventCardSkeleton />
                          </div>
                        </>
                      );
                    })}
                  </>
                ) : (
                  <>
                    {dashboardData?.hostedEventsData?.length > 0 ? (
                      dashboardData?.hostedEventsData?.map((item, i) => {
                        return (
                          <div
                            className="w-full sm:w-1/2 md:w-1/3 2xl:w-1/4 3xl:w-1/5 item"
                            key={i}
                          >
                            <ProtectedHostedEventCard
                              title={item?.title}
                              startDate={
                                item?.startTime
                                  ? OrgGetDate(item?.startTime, languageName)
                                  : ""
                              }
                              startTime={
                                item?.startTime
                                  ? OrgGetTime(item?.startTime)
                                  : ""
                              }
                              endDate={
                                item?.endTime
                                  ? OrgGetDate(item?.endTime, languageName)
                                  : ""
                              }
                              endTime={
                                item?.endTime ? OrgGetTime(item?.endTime) : ""
                              }
                              category={item.category}
                              images={item?.media}
                              venue={item?.venue ? item?.venue : ""}
                              viewDetailsLink={`/create-event/${item?.eventId}`}
                            />
                          </div>
                        );
                      })
                    ) : (
                      <div className="data-not-found">
                        {i18n.t(`organizer.dashboard.hostedEvent.nodata`)}
                      </div>
                    )}
                  </>
                )}

                {/* {dashboardData?.hostedEventsData?.length === 0 &&   <div className="data-not-found">
                        There is no Hosted Events
                      </div>
                      } */}
                {/* <div className='w-full sm:w-1/2 md:w-1/3 2xl:w-1/4 3xl:w-1/5 item'>
                        <ProtectedHostedEventCard />
                      </div>
                      <div className='w-full sm:w-1/2 md:w-1/3 2xl:w-1/4 3xl:w-1/5 item'>
                        <ProtectedHostedEventCard />
                      </div>
                      <div className='w-full sm:w-1/2 md:w-1/3 2xl:w-1/4 3xl:w-1/5 item'>
                        <ProtectedHostedEventCard />
                      </div>
                      <div className='w-full sm:w-1/2 md:w-1/3 2xl:w-1/4 3xl:w-1/5 item'>
                        <ProtectedHostedEventCard />
                      </div> */}
              </div>
            </div>
          </>
        )}

        {/* Empty Event Card */}
        {/* <div className='bg-white empty-card'>
            <Link href='/create-event' className='w-full text-center add-event-link'>
              <i className='icon-plus'></i>
              <p>Create Event</p>
            </Link>
        </div> */}
        {/* End Empty Event Card */}
      </div>
    </>
  );
};

export default Dashboard;
