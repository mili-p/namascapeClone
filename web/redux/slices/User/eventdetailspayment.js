import { createSlice } from "@reduxjs/toolkit";

const eventdetailspayment = createSlice ({
    name: 'eventDetailsPayment',
    initialState: {
        isLoading: true,
        eventDetailsPayment: null
    },
    reducers: {
        requestEventDetailsPayment: (state) => {
            return { ...state, isLoading: true }
        },
        responseEventDetailsPayment: (state, action) => {
            return { ...state, isLoading: false, eventDetailsPayment: action.payload}
        },
        errorEventDetailsPayment: (state) => {
            return { ...state, isLoading: false, eventDetailsPayment: null }
        }
    }
})

export default eventdetailspayment.reducer
export const {
    requestEventDetailsPayment,
    responseEventDetailsPayment,
    errorEventDetailsPayment
} = eventdetailspayment.actions