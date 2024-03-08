import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  formatDateToMonthShortwithFormate2,
  formatDatewihnewdate,
  timeDifference2,
  getTime,
  timeDifference3,
  priceFormator,
} from "../../../functions/functions";
import {
  asyncUserBookingListThunk,
  asyncUserBookingViewThunk,
  asyncUserStatusUpdateThunk,
  asyncUserViewThunk,
} from "../../../redux/thunk/userThunk/user.thunk";
import {
  eventdetails,
  home,
  userdetails,
  usermanagement,
} from "../../../config/routeConsts";
import DeleteLogoutModal from "../../../components/SiteModal/DeleteLogoutModal/DeleteLogoutModal";
import EventDetailsImage from "../../../assets/images/about-us-image3.png";
import SiteBreadcrumb from "../../../components/SiteBreadcrumb/SiteBreadcrumb";
import Pagination from "../../../components/Pagination";
import {
  Currency,
  DISCOUNTTYPENEW,
  EVENTCATEGORY,
  EVENTSTATUS,
  EVENTTYPE,
  EventRecurrence,
  PAYMENTMETHODS,
  languageList,
} from "../../../common/constsforCodes";
import EventProviderList from "../../../components/EventProviderList/EventProviderList";
import PaymentDetail from "./components/PaymentDetail";
import "../UserManagement.scss";

const UserDetails = () => {
  const { userId } = useParams();
  const [page, setPage] = useState(1);
  const { user, isLoading, userBookingList, userBooking } = useSelector(
    (e) => e.user
  );
  const [activeBooking, setActiveBooking] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //#region Consts for Objects
  const currency = Currency.find((e) => e?.id === userBooking?.data?.currency);
  const eventstatus = EVENTSTATUS.find(
    (e) => e?.id === userBooking?.data?.eventDetails?.status
  );
  const eventtype = EVENTTYPE.find(
    (e) => e?.id === userBooking?.data?.eventDetails?.eventType
  );
  const eventcateogry = EVENTCATEGORY.find(
    (e) => e?.id === userBooking?.data?.category
  );
  const duration = EventRecurrence.find(
    (e) => e?.id === userBooking?.data?.duration
  );
  const paymentMethod = PAYMENTMETHODS.find(
    (e) => e?.id === userBooking?.data?.paymentDetails?.paymentMethod
  );
  const Paymentcurrency = Currency.find(
    (e) => e?.id === userBooking?.data?.paymentDetails?.currency
  );

  //#endregion

  //#region UseEffets
  useEffect(() => {
    if (!userId) {
      navigate(usermanagement);
    }
  }, []);

  useEffect(() => {
    dispatch(
      asyncUserViewThunk({ userId: userId }, () => navigate(usermanagement))
    );
  }, []);

  useEffect(() => {
    dispatch(
      asyncUserBookingListThunk({ userId: userId, page, limit: 10 }, (e) => {
        setActiveBooking(e);
      })
    );
  }, [page]);

  useEffect(() => {
    if (activeBooking) {
      dispatch(asyncUserBookingViewThunk({ eventBookingId: activeBooking }));
    }
  }, [activeBooking]);
  //#endregion

  const [show, setshow] = useState(false);
  const openMobileMenu = () => {
    setshow(true);
    document.body.classList.add("open-menu");
  };

  //#region  BreadcrumbData
  const BreadcrumbData = [
    {
      title: "Home",
      url: home,
    },
    {
      title: "Users Management",
      url: usermanagement,
    },
    {
      title: "User Detail",
    },
  ];
  //#endregion

  const EventWrapper = [
    {
      icon: <i className="icon-calendar"></i>,
      title: (
        <>
          {`${
            userBooking?.data?.eventDetails?.startTime
              ? formatDatewihnewdate(
                  +userBooking?.data?.eventDetails?.startTime
                )
              : "-"
          }`}
        </>
      ),
      subTitle: (
        <>
          {`${
            userBooking?.data?.eventDetails?.startTime
              ? getTime(userBooking?.data?.eventDetails?.startTime)
              : ""
          }`}{" "}
          {userBooking?.data?.eventDetails?.endTime &&
            ` - ${getTime(userBooking?.data?.eventDetails?.endTime)}`}
        </>
      ),
    },
    {
      icon: <i className="icon-location"></i>,
      title:
        userBooking?.data?.eventDetails?.onlineMeetingLink ||
        userBooking?.data?.eventDetails?.googleMapsLink
          ? userBooking?.data?.eventDetails?.city?.name
            ? `Location`
            : "Online Meet Link"
          : "",
      // userBooking?.data?.eventDetails?.city?.name
      //   ? `${userBooking?.data?.eventDetails?.venue}, ${userBooking?.data?.eventDetails?.city?.name}`
      //   : "Online Meet Link",
      subTitle:
        userBooking?.data?.eventDetails?.eventType !== 3
          ? //   <a
            //     href={
            //       userBooking?.data?.eventDetails?.googleMapsLink
            //         ? userBooking?.data?.eventDetails?.googleMapsLink?.toLocaleString() ||
            //           ""
            //         : userBooking?.data?.eventDetails?.onlineMeetingLink?.toLocaleString() ||
            //           ""
            //     }
            //     target="_blank"
            //   >
            userBooking?.data?.eventDetails?.googleMapsLink &&
            userBooking?.data?.eventDetails?.city?.name
            ? `${userBooking?.data?.eventDetails?.venue}, ${userBooking?.data?.eventDetails?.city?.name}`
            : userBooking?.data?.eventDetails?.onlineMeetingLink
            ? userBooking?.data?.eventDetails?.onlineMeetingLink
            : ""
          : //   </a>
            "",
    },

    {
      icon: (
        <>
          <i className="icon-ticket"></i>
        </>
      ),
      title: `${
        userBooking?.data?.eventDetails?.price
          ? `${currency?.title}${priceFormator(
              userBooking?.data?.eventDetails?.price
            )} ${currency?.name}`
          : `Free`
      }`,
      subTitle: "Price per ticket",
      // `${
      //     userBooking?.data?.eventDetails?.price && 'Price per ticket'
      // }`
    },
    {
      icon: (
        <>
          <i className="icon-language-square"></i>
        </>
      ),
      title: `${userBooking?.data?.eventDetails?.language
        ?.map((e) => languageList?.[e])
        .join(" | ")}`,
      subTitle: "Experience language",
    },
    // {
    //     icon: <i className="icon-calendar"></i>,
    //     title: duration?.title,
    //     subTitle: 'Experience recurrence'
    // }
  ];

  const PymentObj = [
    {
      title: "Payement ID",
      subTitle: userBooking?.data?.paymentDetails?.paymentId
        ? userBooking?.data?.paymentDetails?.paymentId
        : "",
    },
    {
      title: `Payment Method`,
      subTitle: userBooking?.data?.paymentDetails?.paymentMethod
        ? paymentMethod?.title
        : "",
    },
    {
      title: "Date and Time",
      subTitle: userBooking?.data?.paymentDetails?.paymentTime
        ? timeDifference3(userBooking?.data?.paymentDetails?.paymentTime)
        : "",
    },
    {
      title: "Experience Price",
      subTitle: userBooking?.data?.paymentDetails?.eventPrice
        ? `${
            Paymentcurrency?.name === "CHF" ? "" : Paymentcurrency?.title
          }${priceFormator(userBooking?.data?.paymentDetails?.eventPrice)} ${
            Paymentcurrency?.name
          }`
        : "",
    },
    {
      title: "Discount Amount",
      subTitle:
        userBooking?.data?.paymentDetails?.isFree == true
          ? 0
          : userBooking?.data?.paymentDetails?.discountType == 2
          ? `${userBooking?.data?.paymentDetails?.discountAmount} %`
          : userBooking?.data?.paymentDetails?.discountAmount
          ? `${Paymentcurrency?.title} ${priceFormator(
              userBooking?.data?.paymentDetails?.discountAmount
            )}`
          : "",
    },
    {
      title: "Amount Paid",
      subTitle:
        userBooking?.data?.paymentDetails?.amountPaid == 0
          ? ""
          : `${Paymentcurrency?.name === "CHF" ? "" : Paymentcurrency?.title}` +
            "" +
            priceFormator(userBooking?.data?.paymentDetails?.amountPaid) +
            " " +
            Paymentcurrency?.name,
    },
  ];

  return (
    <>
      <div className="user-details">
        <SiteBreadcrumb
          BreadcrumbData={BreadcrumbData}
          className="protected-breadcrumb"
        />
        <div className="protected-head">
          <h2>User detail</h2>
        </div>
        <div className="user-management-details">
          <div className="bg-white md:flex md:items-start user-info mt-32">
            <div className="users-image flex items-start justify-center">
              <img
                src={user?.data?.profileImage}
                width={160}
                height={160}
                alt="Picture of the author"
              />
            </div>
            <div className="users-content">
              <h3>{user?.data?.firstName + " " + user?.data?.lastName}</h3>
              <div className="email">{user?.data?.email}</div>
              <div className=""></div>
              <ul className="users-details-list flex items-center flex-wrap">
                {user?.data?.cityName && user?.data?.cityName != "" && (
                  <li className="location flex items-center">
                    <i className="icon-location"></i>
                    <span>{user?.data?.cityName}</span>
                  </li>
                )}
                {user?.data?.dob != "" && (
                  <li className="birthdate flex items-center">
                    <i className="icon-calendar"></i>
                    <span>
                      {formatDateToMonthShortwithFormate2(user?.data?.dob)}
                    </span>
                  </li>
                )}
                {user?.data?.instagramLink && (
                  <li className="instagram flex items-center">
                    <a className="flex items-center">
                      <i className="icon-instagram-bg"></i>
                      <span>
                        <a
                          target="_blank"
                          href={user?.data?.instagramLink}
                          rel="noopener noreferrer"
                        >
                          Instagram Link
                        </a>
                      </span>
                    </a>
                  </li>
                )}
                {user?.data?.socialMediaLink && (
                  <li className="instagram flex items-center">
                    <a className="flex items-center">
                      <i className="icon-website-bg"></i>
                      <span>
                        <a
                          target="_blank"
                          href={user?.data?.socialMediaLink}
                          rel="noopener noreferrer"
                        >
                          Social Media Link
                        </a>
                      </span>
                    </a>
                  </li>
                )}
                {user?.data?.websiteLink && (
                  <li className="instagram flex items-center">
                    <a className="flex items-center">
                      <i className="icon-website-bg"></i>
                      <span>
                        <a
                          target="_blank"
                          href={user?.data?.websiteLink}
                          rel="noopener noreferrer"
                        >
                          Website Link
                        </a>
                      </span>
                    </a>
                  </li>
                )}
              </ul>
              {user?.data?.bio && <p className="mb-0">{user?.data?.bio}</p>}
            </div>
            <div
              className="flex items-center download-link delete account-edit-btn"
              onClick={openMobileMenu}
            >
              <i className="icon-delete"></i>Delete
            </div>
          </div>
          {userBookingList?.data?.length == 0 ? (
            <div className="user-info bg-white mt-32">
              <div className="data-not-found">
                No Experience Booking Available
              </div>
            </div>
          ) : (
            <div className="content-events-wrap xl:flex xl:items-stretch mt-32 xl:gap-5 3xl:gap-8">
              <div className="bg-white event-history-box w-full xl:w-2/5">
                <div className="event-title">
                  <h3>Experience history</h3>
                </div>
                <div className="event-history-box-content">
                  {userBookingList?.data?.length > 0 ? (
                    <ul>
                      {userBookingList?.data?.map((evl, i) => {
                        return (
                          <li
                            className={`event-history-list flex gap-4 items-center justify-between ${
                              activeBooking == evl.eventBookingId
                                ? "active"
                                : ""
                            }`}
                            key={evl?.userId}
                            onClick={() =>
                              setActiveBooking(evl?.eventBookingId)
                            }
                          >
                            <div>
                              <div className="label-name">Booking ID</div>
                              <h4>{evl.bookingId}</h4>
                            </div>
                            <div>
                              <div className="label-name">
                                Booking Date and Time
                              </div>
                              <h4>{timeDifference3(evl?.bookingTime)}</h4>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <div className="data-not-found">
                      No Experience Booking Available
                    </div>
                  )}
                  {userBookingList?.meta?.totalCount > 10 && (
                    <Pagination
                      totalCount={userBookingList?.meta?.totalCount}
                      activePage={page}
                      pageCount={Math.ceil(
                        userBookingList?.meta?.totalCount / 10
                      )}
                      onPageChange={(e) => {
                        setPage(e);
                      }}
                    />
                  )}
                </div>
              </div>

              {/* Detail Section */}
              <div className="bg-white event-detail-box w-full mt-32 xl:mt-0 xl:w-3/5">
                <div className="event-title">
                  <h3>Experience Detail</h3>
                </div>
                {!activeBooking ? (
                  <div className="data-not-found">
                    No Experience Booking Detail Available
                  </div>
                ) : (
                  <>
                    <div className="box-evnts sm:flex sm:items-start sm:gap-5">
                      <div className="event-image-box">
                        <img
                          src={
                            userBooking?.data?.eventDetails?.media?.[0]
                              ?.imageUrl ?? EventDetailsImage
                          }
                          alt="EventDetailsImage"
                          width={140}
                          height={125}
                        />
                      </div>
                      <div className="evnts-content mt-5 sm:mt-0">
                        <div className="flex items-center gap-4 btn-wrap">
                          {[1, 2]?.includes(eventtype?.id) && (
                            <div className="event-badge offline-btn">
                              {/* Offline */}
                              {eventtype?.title}
                            </div>
                          )}

                          <div
                            className={`status-label ${
                              userBooking?.data?.eventDetails?.status == 2
                                ? "active-card"
                                : userBooking?.data?.eventDetails?.status == 1
                                ? "in-review-card"
                                : "rejected-card"
                            } `}
                          >
                            <span className="text h5">
                              {eventstatus?.title}
                            </span>
                          </div>
                        </div>
                        <h3
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            navigate(
                              `${eventdetails}/${userBooking?.data?.eventDetails?.eventId}`
                            )
                          }
                        >
                          {userBooking?.data?.eventDetails?.title}
                        </h3>
                      </div>
                    </div>
                    <EventProviderList
                      EventListWrapper={EventWrapper}
                      isLoading={isLoading}
                      userBooking={userBooking}
                    />
                    {/* Component */}
                    <div className="payment-details mt-32">
                      <div className="event-title">
                        <h3>Payment Detail</h3>
                      </div>
                      <div className="sm:flex sm:items-start sm:justify-between sm:gap-5">
                        <PaymentDetail
                          DiscountDetails={PymentObj}
                          isLoading={isLoading}
                        />
                        {/* Component */}
                        <div className="sm:w-1/4 mt-5 sm:mt-0">
                          <div className="event-qr-code">
                            <img
                              src={userBooking?.data?.paymentDetails?.qrcode}
                              alt="QRCodeImage"
                              width={202}
                              height={202}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              {/* Detail Section End */}
            </div>
          )}
        </div>
      </div>
      <DeleteLogoutModal
        payload={{ userId: userId, status: 3 }}
        deleteItem={asyncUserStatusUpdateThunk}
        invalidate={() => {
          navigate(usermanagement);
        }}
        show={show}
        setshow={setshow}
        title={<>are you sure you want to delete this User?</>}
        IconClass={"icon-delete"}
        SolidBTNText={"Delete"}
        Delete
      />
    </>
  );
};

export default UserDetails;
