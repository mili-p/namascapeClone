import { createSlice } from "@reduxjs/toolkit";

const otheruserprofile = createSlice ({
    name: 'otheruserprofile',
    initialState: {
        isLoading: true,
        userOtherProfileData: null,
        totalCount: 0,
    },
    reducers: {
        requestOtherUserProfile: (state) => {
            return { ...state, isLoading: true }
        },
        responseOtherUserProfile: (state, action) => {
            return { ...state, isLoading: false, userOtherProfileData: action.payload}
        },
        errorOtherUserProfile: (state) => {
            return { ...state, isLoading: false, userOtherProfileData: null }
        },
        getTotalCountOtherUserProfile: (state, action) => {
            return {
              ...state,
              isLoading: false,
              totalCount: action?.payload?.totalCount,
            };
        },
    }
})

export default otheruserprofile.reducer
export const {
    requestOtherUserProfile,
    responseOtherUserProfile,
    errorOtherUserProfile,
    getTotalCountOtherUserProfile
} = otheruserprofile.actions