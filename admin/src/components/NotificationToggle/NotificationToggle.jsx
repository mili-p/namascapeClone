import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    asyncNotificationListThunk,
    asyncnotificationReadThunk,
    asyncnotificationViewThunk
} from '../../redux/thunk/notificationThunk/notification.thunk'
import { getHumanReadableTime } from '../../functions/functions'
import { useNavigate } from 'react-router-dom'
import {
    eventdetails,
    userdetails,
    vieworganizerprofile
} from '../../config/routeConsts'
import { notificationSetId } from '../../redux/slices/notificationSlice'

const NotificationToggle = ({ Toggle, setToggle, OpenMenu }) => {
    const [page, setPage] = useState(1)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { notificationList, notification, isLoading, AllNoification,TotalCount,viewCount } =
        useSelector((e) => e.notification)
  
    //#region HandleScroll Notification Div 
        const handleScroll = (event) => {
        const element = event.target
        const isAtBottom =
            element.scrollHeight - element.scrollTop === element.clientHeight
        if (isAtBottom) {
            
            if (TotalCount > AllNoification?.length) {
                setPage((pre) => pre + 1)
            }
            // setPage((pre) => pre + 1)
        }
    }
    //#endregion

    useEffect(() => {
        if (page) {
            dispatch(
                asyncNotificationListThunk(
                    {
                        page,
                        limit: 10
                    },
                    (e) => {
                        // if(page !== 1){
                        //   dispatch(AllNotificationData(e))
                        // }
                    },
                    page
                )
            )
        }
    }, [page])

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(
                asyncNotificationListThunk(
                    {
                        page,
                        limit: 10
                    },
                    '',
                    page
                )
            )
        }, 25000)
        return () => clearInterval(interval)
    }, [])

    async function viewNotification() {
        const res = dispatch(asyncnotificationViewThunk())
        return res
    }

    return (
        <div
            className="flex items-center justify-center notification-main"
            onMouseLeave={() => setToggle(false)}
        >
            <div
                className="flex items-center justify-center notification-btn"
                onClick={() => {
                    OpenMenu(),
                        viewNotification(),
                        dispatch(
                            asyncNotificationListThunk(
                                {
                                    page,
                                    limit: 10
                                },
                                '',
                                page
                            )
                        )
                }}
            >
                <i className="icon-ball"></i>
                {viewCount > 0 && (
                    <span className="ball-count">
                        {viewCount >= 10
                            ? ' 9+'
                            : viewCount}
                    </span>
                )}
            </div>
            {
                Toggle && 
                (
                    <div
                    className={`notification-body ${Toggle == true ? 'show' : ''}`}
                    onScroll={handleScroll}
                >
                    <ul>
                            {AllNoification?.length > 0 ? (
                                AllNoification?.map((notification, i) => {
                                    return (
                                        <li
                                            className={`${
                                                notification?.isRead ? 'read' : ''
                                            }`}
                                            key={notification?.notificationId}
                                            onClick={() => {
                                                if (
                                                    notification?.notificationType == 6
                                                ) {
                                                    navigate(
                                                        `${eventdetails}/${notification?.notification?.eventId}`
                                                    )
                                                    dispatch(
                                                        notificationSetId(
                                                            notification?.notificationId
                                                        )
                                                    )
                                                } else if (
                                                    notification?.notificationType == 4
                                                ) {
                                                    navigate(
                                                        `${userdetails}/${notification?.notification?.userId}`
                                                    )
                                                    dispatch(
                                                        notificationSetId(
                                                            notification?.notificationId
                                                        )
                                                    )
                                                } else if (
                                                    notification?.notificationType == 5
                                                ) {
                                                    navigate(
                                                        `${vieworganizerprofile}/${notification?.notification?.userId}`
                                                    )
                                                    dispatch(
                                                        notificationSetId(
                                                            notification?.notificationId
                                                        )
                                                    )
                                                }
                                            }}
                                        >
                                            <h4>{notification?.title}</h4>
                                            <p> {notification.body}</p>
                                            <span className="flex items-center">
                                                <i className="icon-clock"></i>
                                                {getHumanReadableTime(
                                                    notification?.createdAt
                                                )}
                                            </span>
                                        </li>
                                    )
                                })
                            ) : (
                                <li
                                    className='read empty-notification'
                                >
                                    <div className='flex-col items-center justify-center'>
                                        <i className='icon-ball'></i>
                                        <h2 className='title'>No Notification</h2>
                                        <p>You do not have a notification at the moment.</p>
                                    </div>
                                </li>
                            )}
                        
                        
                    </ul>
                </div>
                )
            }
           
        </div>
    )
}

export default NotificationToggle
