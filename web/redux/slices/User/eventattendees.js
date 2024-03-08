import { createSlice } from "@reduxjs/toolkit";

const eventattendees = createSlice ({
    name: 'eventattendees',
    initialState: {
        isLoading: true,
        totalCount: 0,
        eventAttendeesData: null,
        error : null
    },
    reducers: {
        requestEventAttendees: (state) => {
            return { ...state, isLoading: true }
        },
        responseEventAttendees: (state, action) => {
            return { ...state, isLoading: false, eventAttendeesData: action.payload}
        },
        errorEventAttendees: (state,action) => {
            return { ...state, isLoading: false, eventAttendeesData: null , error : action?.payload}
        },
        getTotalCountEventAttendees: (state, action) => {
            return {
              ...state,
              isLoading: false,
              totalCount: action?.payload?.totalCount,
            };
          },
    }
})

export default eventattendees.reducer
export const {
    requestEventAttendees,
    responseEventAttendees,
    errorEventAttendees,
    getTotalCountEventAttendees
} = eventattendees.actions