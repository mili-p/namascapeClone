import { createSlice } from "@reduxjs/toolkit";

const eventslist = createSlice ({
    name: 'eventslist',
    initialState: {
        isLoading: true,
        eventsData: null
    },
    reducers: {
        requestEventsList: (state) => {
            return { ...state, isLoading: true }
        },
        responseEventsList: (state, action) => {
            return { ...state, isLoading: false, eventsData: action.payload}
        },
        errorEventsList: (state) => {
            return { ...state, isLoading: false, eventsData: null }
        }
    }
})

export default eventslist.reducer
export const {
    requestEventsList,
    responseEventsList,
    errorEventsList,
} = eventslist.actions