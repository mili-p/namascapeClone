import { createSlice } from '@reduxjs/toolkit'

const viewprofile = createSlice({
    name: 'viewprofile',
    initialState: {
        isLoading: true,
        userDetail: null
    },
    reducers: {
        requestViewprofile: (state) => {
            return { ...state, isLoading: true }
        },
        responseViewprofile: (state, action) => {
            return { ...state, isLoading: false, userDetail: action.payload }
        },
        errorViewprofile: (state) => {
            return { ...state, isLoading: false, userDetail: null }
        }
    }
})

export default viewprofile.reducer
export const {
    requestViewprofile,
    responseViewprofile,
    errorViewprofile
} = viewprofile.actions