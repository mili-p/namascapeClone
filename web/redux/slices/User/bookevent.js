import { createSlice } from '@reduxjs/toolkit'

const bookevent = createSlice ({
    name: 'bookevent',
    initialState: {
        isLoading: true,
        bookEventData: null
    },
    reducers: {
        requestBookEvent: (state) => {
            return { ...state, isLoading: true }
        },
        responseBookEvent: (state, action) => {
            return { ...state, isLoading: false, bookEventData: action.payload }
        },
        errorBookEvent: (state) => {
            return { ...state, isLoading: false, bookEventData: null }
        }
    }
})

export default bookevent.reducer
export const {
    requestBookEvent,
    responseBookEvent,
    errorBookEvent
} = bookevent.actions