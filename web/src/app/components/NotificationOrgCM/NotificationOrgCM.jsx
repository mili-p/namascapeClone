'use client'
import React, { useState } from "react";
import { useEffect } from "react";
import {
  eventNotificationReadThunk,
  eventNotificationThunk,
  eventNotificationViewThunk,
} from "../../../../redux/Thunks/Organizer/Notification/notification.thunk";
import { useDispatch, useSelector } from "react-redux";
import { getHumanReadableTime } from "@/utils/commonfn";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { AllNotificationData } from "../../../../redux/slices/Organizer/Notification/NotificationSlice";
import { useTranslation } from 'react-i18next'



const NotificationOrgCM = ({ setToggle, setToggle2, Toggle }) => {
  const {i18n} = useTranslation()
  const { ViewCount,AllNoification,TotalCount } = useSelector((e) => e.NotificationSlice);
  const ref = useRef();
  const router = useRouter();
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const OpenMenu = () => {
    setToggle(!Toggle);
    setToggle2(false);
  };

  useEffect(() => {
      dispatch(
        eventNotificationThunk({
          page,
          limit: 10,
        },page)
      );
  }, [page]);

  

  // useEffect(() => {
  //   dispatch(
  //     eventNotificationThunk({
  //       page,
  //       limit: 10,
  //     })
  //   );
  // }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(
        eventNotificationThunk({
          page,
          limit: 10,
        },"",page)
      );
      setPage(1)
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleScroll = (event) => {
    const element = event.target;
    const isAtBottom = element.scrollHeight - element.scrollTop === element.clientHeight;
    if (isAtBottom) {
        if(TotalCount > AllNoification.length ){
            setPage((pre) => pre + 1)
        }
    }
  };


  return (
    <div
      className="flex items-center justify-center notification-main"
      onMouseLeave={() => setToggle(false)}
    >
      <div
        className="flex items-center justify-center notification-btn"
        onClick={() => {
          OpenMenu();
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
        }}
      >
        <i className="icon-ball"></i>
        {ViewCount > 0 && <span className="ball-count">{ViewCount}</span>}
      </div>
      {Toggle && 
      <div
        className={`notification-body ${Toggle == true ? "show" : ""}`}
        onScroll={handleScroll}
      >
        
        <ul>
          {AllNoification?.length > 0 ? (
            AllNoification?.map((list) => {
              return (
                <li
                  key={list?.notificationId}
                  className={list?.isRead ? "read" : ""}
                  onClick={() => {
                    dispatch(
                      eventNotificationReadThunk(
                        { notificationId: list?.notificationId },
                        () => {
                          dispatch(
                            eventNotificationThunk({
                              page: 1,
                              limit: 10,
                            })
                          );
                        }
                      )
                    );
                    router.push(`/create-event/${list?.notification?.eventId}`);
                  }}
                >
                  <h4>{list?.title}</h4>
                  <p> {list.body}</p>
                  <span className="flex items-center">
                    <i className="icon-clock"></i>
                    {getHumanReadableTime(list?.createdAt)}
                  </span>
                </li>
              );
            })
          ) : (
          <li className="read empty-notification">
              <div className='flex-col items-center justify-center'>
                <i className='icon-ball'></i>
                <h2 className='title'>{i18n.t(`organizer.notificationList.noNotification`)}</h2>
                <p>{i18n.t(`organizer.notificationList.subTitle`)}</p>
            </div>
          </li>
          )}
        </ul>
      </div>}
      </div>
  );
};

export default NotificationOrgCM;
