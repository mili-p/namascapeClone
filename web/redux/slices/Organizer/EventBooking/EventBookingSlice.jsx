const { createSlice } = require("@reduxjs/toolkit");

const EventBookingSlice = createSlice({
  name: "eventBooking",
  initialState: {
    isLoading: true,
    bookingList: [],
    totalCount: 0,
    eventBookingView : null,
    exportLink:""
  },
  reducers: {
    requestEventBookingList: (state, action) => {
      return { ...state, isLoading: true };
    },
    successEventBookingList: (state, action) => {
      return { ...state, isLoading: false, bookingList: action?.payload };
    },
    failureEventBookingList: (state, action) => {
      return { ...state, isLoading: false };
    },
    requestEventBookingView: (state, action) => {
      return { ...state, isLoading: true };
    },
    successEventBookingView: (state, action) => {
      return { ...state, isLoading: false, eventBookingView: action?.payload };
    },
    failureEventBookingView: (state, action) => {
      return { ...state, isLoading: false };
    },
    requestEventBookingExportData: (state, action) => {
      return { ...state, isLoading: true };
    },
    successEventBookingExportData: (state, action) => {
      return { ...state, isLoading: false, exportLink: action?.payload?.url };
    },
    failureEventBookingExportData: (state, action) => {
      return { ...state, isLoading: false };
    },
    getTotalCountEventBookingList: (state, action) => {
      return {
        ...state,
        isLoading: false,
        totalCount: action?.payload?.totalCount,
      };
    },
  },
});

export const {
  requestEventBookingList,
  failureEventBookingList,
  successEventBookingList,
  failureEventBookingView,
  requestEventBookingView,
  successEventBookingView,
  failureEventBookingExportData,
  requestEventBookingExportData,
  successEventBookingExportData,
  getTotalCountEventBookingList,
} = EventBookingSlice.actions;

export default EventBookingSlice.reducer;
