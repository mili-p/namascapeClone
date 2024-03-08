import { sweetalert } from "@/app/components/common/Common";
import { createSlice } from "@reduxjs/toolkit";

const EventFormSlice = createSlice({
  name: "event",
  initialState: {
    isLoading: false,
    cityData: [],
    cityLoader : false
    // eventData: null,
  },
  reducers: {
    requestAddEvent: (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    SuccessAddEvent: (state, action) => {
      return {
        ...state,
        isLoading: false,
      };
    },
    FailureAddEvent: (state, action) => {
      return {
        ...state,
        isLoading: false,
      };
    },
    requestGetCity: (state, action) => {
      return {
        ...state,
        cityLoader: true,
      };
    },
    SuccessGetCity: (state, action) => {
      return {
        ...state,
        cityData: action.payload,
        cityLoader: false,
      };
    },
    FailureGetCity: (state, action) => {
      return {
        ...state,
        cityLoader: false,
      };
    },
    requestDeleteEvent: (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    successDeleteEvent: (state, action) => {
      return {
        ...state,
        isLoading: false,
      };
    },
    failureDeleteEvent: (state, action) => {
      return {
        ...state,
        isLoading: false,
      };
    },
    requestDuplicateEvent: (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    successDuplicateEvent: (state, action) => {
      return {
        ...state,
        isLoading: false,
      };
    },
    failureDuplicateEvent: (state, action) => {
      return {
        ...state,
        isLoading: false,
      };
    },
  },
});

export const {
  requestAddEvent,
  FailureAddEvent,
  SuccessAddEvent,
  FailureGetCity,
  SuccessGetCity,
  requestGetCity,
  failureDeleteEvent,
  requestDeleteEvent,
  successDeleteEvent,
  failureDuplicateEvent,
  requestDuplicateEvent,
  successDuplicateEvent,
} = EventFormSlice.actions;
export default EventFormSlice.reducer;
