import { createSlice } from '@reduxjs/toolkit'

const contactus = createSlice ({
    name: 'contactus',
    initialState: {
        isLoading: true,
        contactUsData: null
    },
    reducers: {
        requestContactUs: (state) => {
            return { ...state, isLoading: true }
        },
        responseContactUs: (state, action) => {
            return { ...state, isLoading: false, contactUsData: action.payload }
        },
        errorContactUs: (state) => {
            return { ...state, isLoading: false, contactUsData: null }
        }
    }
})

export default contactus.reducer
export const {
    requestContactUs,
    responseContactUs,
    errorContactUs
} = contactus.actions