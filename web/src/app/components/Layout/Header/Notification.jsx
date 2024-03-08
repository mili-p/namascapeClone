"use client";
import React, { useEffect, useState } from "react";
import {
  eventNotificationThunk,
  eventNotificationViewThunk,
  eventNotificationReadThunk,
} from "../../../../../redux/Thunks/Organizer/Notification/notification.thunk";
import { getHumanReadableTime } from "@/utils/commonfn";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Skeleton from "../../Skeleton/Skeleton";
import { EventCardTitle } from "../../common/Common";
import { useTranslation } from "react-i18next";

const Notification = ({ Toggle, setToggle, OpenMenu }) => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const { AllNoification, ViewCount, isLoading, TotalCount } = useSelector(
    (e) => e.NotificationSlice
  );
  const router = useRouter();
  // console.log('isLoading',isLoading)
  // console.log('Toggle',Toggle)
  const [page, setPage] = useState(1);
  // console.log('page',page)
  // console.log('TotalCount',TotalCount)
  useEffect(() => {
    dispatch(
      eventNotificationThunk(
        {
          page,
          limit: 10,
        },
        page
      )
    );
  }, [page]);

  const MINUTE_MS = 60000;
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(
        eventNotificationThunk({
          page: 1,
          limit: 10,
        })
      );
      setPage(1);
    }, MINUTE_MS);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (Toggle) {
      dispatch(
        eventNotificationViewThunk("_", () => {
          dispatch(
            eventNotificationThunk({
              page,
              limit: 10,
            })
          );
        })
      );
    }
  }, [Toggle]);

  const handleScroll = (event) => {
    const element = event.target;
    const isAtBottom =
      element.scrollHeight - element.scrollTop === element.clientHeight;
    if (isAtBottom) {
      if (TotalCount > AllNoification.length) {
        setPage((pre) => pre + 1);
      }
      // setPage((pre) => pre + 1);
    }
  };

  // const Title =
  // {
  //     1: 'gatherings-event',
  //     2: 'retreats-event',
  //     3: 'treats-event',
  //     4: 'classes-event',
  //     7: 'coaching-event',
  //     8: 'training-event'
  // }

  const SingleNotification = (list) => {
    const NotiId = { notificationId: list?.notificationId };
    dispatch(
      eventNotificationReadThunk(NotiId, () => {
        dispatch(
          eventNotificationThunk({
            page: 1,
            limit: 10,
          })
        );
      })
    );
    if (list?.notificationType === 8 || list?.notificationType === 9) {
      router.push(
        `/events/${EventCardTitle[list?.notification?.category]}/${
          list?.notification?.eventId
        }/`
      );
      setToggle(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center notification-main"
      onMouseLeave={() => setToggle(false)}
    >
      <div
        className="flex items-center justify-center notification-btn"
        onClick={OpenMenu}
      >
        <i className="icon-ball"></i>
        {ViewCount > 0 && (
          <span className="ball-count">{ViewCount > 9 ? "9+" : ViewCount}</span>
        )}
      </div>
      {Toggle && (
        <div
          onScroll={handleScroll}
          className={`notification-body ${Toggle == true ? "show" : ""}`}
        >
          <ul>
            {
              <>
                {AllNoification?.map((list) => {
                  // console.log('list',list)
                  return (
                    <li
                      key={list?._id}
                      className={list?.isRead ? "read" : ""}
                      onClick={() => SingleNotification(list)}
                    >
                      <h4>{list?.title}</h4>
                      <p>{list?.body}</p>
                      <span className="flex items-center time">
                        <i className="icon-clock"></i>
                        {getHumanReadableTime(list?.createdAt)}
                      </span>
                      {/* {list?.notificationType === 7 ? (
                        <>
                          <p>{list?.body}</p>
                          <p>
                            <b>{`${list?.notification?.code}`}</b>{" "}
                            {i18n.t(`organizer.notificationList.promoCode`)}
                          </p>
                        </>
                      ) : (
                        <p>{list?.body}</p>
                      )} */}
                      {/* <span className="flex items-center time">
                        <i className="icon-clock"></i>
                        {getHumanReadableTime(list?.createdAt)}
                      </span> */}
                    </li>
                  );
                })}
                {!isLoading && AllNoification?.length <= 0 && (
                  <li className={"read empty-notification"}>
                    <div className="flex-col items-center justify-center">
                      <i className="icon-ball"></i>
                      <h2 className="title">
                        {i18n.t(`organizer.notificationList.noNotification`)}
                      </h2>
                      <p>{i18n.t(`organizer.notificationList.subTitle`)}</p>
                    </div>
                  </li>
                )}
              </>
            }
          </ul>
        </div>
      )}
    </div>
  );
};

export default Notification;
