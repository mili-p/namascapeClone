import { createSlice } from "@reduxjs/toolkit";

const userprofile = createSlice ({
    name: 'userprofile',
    initialState: {
        isLoading: true,
        userProfileData: null,
        totalCount: 0,
    },
    reducers: {
        requestUserProfile: (state) => {
            return { ...state, isLoading: true }
        },
        responseUserProfile: (state, action) => {
            return { ...state, isLoading: false, userProfileData: action.payload}
        },
        errorUserProfile: (state) => {
            return { ...state, isLoading: false, userProfileData: null }
        },
        getTotalCountUserprofile: (state, action) => {
            return {
              ...state,
              isLoading: false,
              totalCount: action?.payload?.totalCount,
            };
        },
    }
})

export default userprofile.reducer
export const {
    requestUserProfile,
    responseUserProfile,
    errorUserProfile,
    getTotalCountUserprofile
} = userprofile.actions