import { createSlice } from "@reduxjs/toolkit";

const viewbookingticket = createSlice ({
    name: 'viewbookingticket',
    initialState: {
        isLoading: true,
        viewBookingTicketData: null
    },
    reducers: {
        requestViewBookingTicket: (state) => {
            return { ...state, isLoading: true }
        },
        responseViewBookingTicket: (state, action) => {
            return { ...state, isLoading: false, viewBookingTicketData: action.payload}
        },
        errorViewBookingTicket: (state) => {
            return { ...state, isLoading: false, viewBookingTicketData: null }
        }
    }
})

export default viewbookingticket.reducer
export const {
    requestViewBookingTicket,
    responseViewBookingTicket,
    errorViewBookingTicket
} = viewbookingticket.actions