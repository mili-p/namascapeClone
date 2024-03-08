import { createSlice } from "@reduxjs/toolkit";

const EventManagementSlice = createSlice({
  name: "eventManagement",
  initialState: {
    isLoading: true,
    eventList: [],
    totalCount: 0,
    eventData: null,
    error : null,
    globalSearchEventData: []
  },
  reducers: {
    requestEventList: (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    successEventList: (state, action) => {
      console.log(action?.payload,"successEventList");
      return {
        ...state,
        isLoading: false,
        eventList: action?.payload,
      };
    },
    failureEventList: (state, action) => {
      return {
        ...state,
        isLoading: false,
      };
    },
    requestViewEvent: (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    successViewEvent: (state, action) => {
      return {
        ...state,
        eventData: action.payload,
        isLoading: false,
      };
    },
    failureViewEvent: (state, action) => {
      return {
        ...state,
        isLoading: false,
        error : action?.payload
      };
    },
    removeEventData: (state, action) => {
        return {
          ...state,
          eventData: null,
        };
      },
    getTotalCountEventList: (state, action) => {
      return {
        ...state,
        isLoading: false,
        totalCount: action?.payload?.totalCount,
      };
    },
    globalSearchDataList : (state,action) =>{
      console.log(action?.payload,"globalSearchDataList");
      return {...state,isLoading:false,globalSearchEventData:action?.payload}
    }
  },
});

export const {
  failureEventList,
  requestEventList,
  successEventList,
  failureViewEvent,
  requestViewEvent,
  successViewEvent,
  removeEventData,
  getTotalCountEventList,
  globalSearchDataList
} = EventManagementSlice.actions;
export default EventManagementSlice.reducer;
