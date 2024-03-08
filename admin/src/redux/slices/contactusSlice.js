import { createSlice } from '@reduxjs/toolkit'

const contactusSlice = createSlice({
    name: 'contactus',
    initialState: {
        contactus: null,
        isLoading: true,
        isUpdateLoading: false,
        country: null
    },
    reducers: {
        //View contactus
        requestcontatusView: (state) => {
            return { ...state, isLoading: true }
        },
        responcecontatusView: (state, action) => {
            return { ...state, isLoading: false, contactus: action.payload }
        },
        errorcontatusView: (state) => {
            return { ...state, isLoading: false, cms: null }
        },

        // update contactus
        requestcontatusUpdate: (state) => {
            return { ...state, isLoading: true }
        },
        responcecontatusUpdate: (state, action) => {
            return { ...state, isLoading: false, contactus: action.payload }
        },
        errorcontatusUpdate: (state) => {
            return { ...state, isLoading: false }
        },

        //GET countryCode
        requestCountryCodeGet: (state) => {
            return { ...state, isLoading: true }
        },
        responceCountryCodeGet: (state, action) => {
            return { ...state, isLoading: false, country: action.payload }
        },
        errorCountryCodeGet: (state) => {
            return { ...state, isLoading: false }
        }
    }
})

export default contactusSlice.reducer

export const {
    requestcontatusView,
    responcecontatusView,
    errorcontatusView,
    requestcontatusUpdate,
    responcecontatusUpdate,
    errorcontatusUpdate,
    requestCountryCodeGet,
    responceCountryCodeGet,
    errorCountryCodeGet
} = contactusSlice.actions
