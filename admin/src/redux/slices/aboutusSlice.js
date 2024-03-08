import { createSlice } from '@reduxjs/toolkit'

const aboutusSlice = createSlice({
    name: 'aboutus',
    initialState: {
        aboutus: null,
        isLoading: true,
        isUpdateLoading:false
    },
    reducers: {

        //View Aboutus
        requestaboutusView: (state) => {
            return { ...state, isLoading: true }
        },
        responceaboutusView: (state,action) => {
            return { ...state, isLoading: false, aboutus: action.payload }
        },
        erroraboutusView: (state) => {
            return { ...state, isLoading: false,cms:null }
        },

        // update aboutus
        requestaboutusUpdate: (state) => {
            return { ...state, isLoading: true }
        },
        responceaboutusUpdate: (state) => {
            return { ...state, isLoading: false }
        },
        erroraboutusUpdate: (state) => {
            return { ...state, isLoading: false }
        }
        
    }
})

export default aboutusSlice.reducer

export const {
    requestaboutusView,
    responceaboutusView,
    erroraboutusView,
    requestaboutusUpdate,
    responceaboutusUpdate,
    erroraboutusUpdate
    
} = aboutusSlice.actions
