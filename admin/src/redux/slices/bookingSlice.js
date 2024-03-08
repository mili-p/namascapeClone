import { createSlice } from '@reduxjs/toolkit'

const bookingSlice = createSlice({
    name: 'booking',
    initialState: {
        booking: null,
        bookingList: null,
        isLoading: true,
        isDeleteLoading: false,
        isUpdateLoading: false
    },
    reducers: {
        //Listing bookings
        requestbookingList: (state) => {
            return { ...state, isLoading: true }
        },
        responcebookingList: (state, action) => {
            return { ...state, isLoading: false, bookingList: action.payload }
        },
        errorbookingList: (state) => {
            return { ...state, isLoading: false, bookingList: null }
        },

        //View booking
        requestbookingView: (state) => {
            return { ...state, isLoading: true }
        },
        responcebookingView: (state, action) => {
            return { ...state, isLoading: false, booking: action.payload }
        },
        errorbookingView: (state) => {
            return { ...state, isLoading: false, booking: null }
        },

        //delete booking
        requestbookingDelete: (state) => {
            return { ...state, isDeleteLoading: true }
        },
        responcebookingDelete: (state) => {
            return { ...state, isDeleteLoading: false }
        },
        errorbookingDelete: (state) => {
            return { ...state, isDeleteLoading: false }
        },

        // update booking

        requestbookingUpdate: (state) => {
            return { ...state, isUpdateLoading: true }
        },
        responcebookingUpdate: (state) => {
            return { ...state, isUpdateLoading: false }
        },
        errorbookingUpdate: (state) => {
            return { ...state, isUpdateLoading: false }
        },

        //Status Update

        requestbookingStatus: (state) => {
            return { ...state, isLoading: true }
        },
        responcebookingStatus: (state, action) => {
            return { ...state, isLoading: false}
        },
        errorbookingStatus: (state) => {
            return { ...state, isLoading: false }
        }
    }
})

export default bookingSlice.reducer

export const {
    requestbookingList,
    responcebookingList,
    errorbookingList,
    requestbookingView,
    responcebookingView,
    errorbookingView,
    requestbookingDelete,
    responcebookingDelete,
    errorbookingDelete,
    errorbookingUpdate,
    requestbookingUpdate,
    responcebookingUpdate,
    requestbookingStatus,
    responcebookingStatus,
    errorbookingStatus
} = bookingSlice.actions
