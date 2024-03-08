import { createSlice } from "@reduxjs/toolkit";

const organizerprofile = createSlice({
    name: 'organizerprofile',
    initialState: {
        isLoading: true,
        organizerProfileData: null,
        ActiveTab: 1,
        error : null
    },
    reducers: {
        resquestOrganizerProfile: (state) => {
            return { ...state, isLoading: true }
        },
        responseOrganizerProfile: (state, action) => {
            return { ...state, isLoading: false, organizerProfileData: action.payload}
        },
        responseOrganizerProfileTab: (state, action) => {
            console.log('action',action)
            return { ...state, ActiveTab: action.payload}
        },
        errorOrganizerProfile: (state,action) => {
            console.log(action?.payload,"gfdgfdfgdgdg")
            return { ...state, isLoading: false, organizerProfileData: null ,error : action?.payload}
        }
    }
})

export default organizerprofile.reducer
export const {
    resquestOrganizerProfile,
    responseOrganizerProfile,   
    errorOrganizerProfile,
    responseOrganizerProfileTab
} = organizerprofile.actions