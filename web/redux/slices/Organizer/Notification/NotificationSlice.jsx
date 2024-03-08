import { createSlice, current } from "@reduxjs/toolkit";

const NotificationSlice = createSlice({
  name: "notification",
  initialState: {
    isLoading: false,
    TotalCount: 0,
    ViewCount: 0,
    notiData: [],
    AllNoification: [],
    newNotiData : []
  },
  reducers: {
    requestNotificationList: (state, action) => {
      return { ...state, isLoading: true };
    },
    successNotificationList: (state, action) => {
     
      return {
        ...state,
        isLoading: false,
        notiData: action?.payload,
        newNotiData : action?.payload?.notificationData,
      };
    },
    AllNotificationData: (state, action) => {
      return {
        ...state,
        AllNoification: action?.payload?.page === 1 ? action?.payload?.data?.notificationData : [...current(state.AllNoification),...action?.payload?.data.notificationData],
      };
    },
    failureNotificationList: (state, action) => {
      return { ...state, isLoading: false };
    },
    requestNotificationRead: (state, action) => {
      return { ...state, isLoading: true };
    },
    successNotificationRead: (state, action) => {
      return { ...state, isLoading: false };
    },
    failureNotificationRead: (state, action) => {
      return { ...state, isLoading: false };
    },
    requestNotificationView: (state, action) => {
      return { ...state, isLoading: true };
    },
    successNotificationView: (state, action) => {
      return { ...state, isLoading: false };
    },
    failureNotificationView: (state, action) => {
      return { ...state, isLoading: false };
    },
    getTotalCountNotificationList: (state, action) => {
      return {
        ...state,
        isLoading: false,
        TotalCount: action?.payload?.totalCount,
        ViewCount: action?.payload?.viewCounts,
      };
    },
  },
});

export const {
  requestNotificationList,
  successNotificationList,
  failureNotificationList,
  failureNotificationRead,
  requestNotificationRead,
  successNotificationRead,
  failureNotificationView,
  requestNotificationView,
  successNotificationView,
  AllNotificationData,
  getTotalCountNotificationList,
} = NotificationSlice.actions;

export default NotificationSlice.reducer;
