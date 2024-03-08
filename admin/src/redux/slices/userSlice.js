import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        userList: null,
        userBookingList:null,
        userBooking:null,
        isLoading: true,
        isDeleteLoading: false,
        isUpdateLoading: false,
        socialconfirmation:null,
        isSocialConfirmationLoading: false
    },
    reducers: {
        //Listing users
        requestuserList: (state) => {
            return { ...state, isLoading: true }
        },
        responceuserList: (state, action) => {
            return { ...state, isLoading: false, userList: action.payload }
        },
        erroruserList: (state) => {
            return { ...state, isLoading: false, userList: null }
        },

        //View user
        requestuserView: (state) => {
            return { ...state, isLoading: true }
        },
        responceuserView: (state, action) => {
            return { ...state, isLoading: false, user: action.payload }
        },
        erroruserView: (state) => {
            return { ...state, isLoading: false, user: null }
        },

        //delete user
        requestuserDelete: (state) => {
            return { ...state, isDeleteLoading: true }
        },
        responceuserDelete: (state) => {
            return { ...state, isDeleteLoading: false }
        },
        erroruserDelete: (state) => {
            return { ...state, isDeleteLoading: false }
        },

        //Add new User
        requestuserAdd: (state) => {
            return { ...state, isUpdateLoading: true }
        },
        responceuserAdd: (state) => {
            return { ...state, isUpdateLoading: false }
        },
        erroruserAdd: (state) => {
            return { ...state, isUpdateLoading: false }
        },

        // update user

        requestuserUpdate: (state) => {
            return { ...state, isUpdateLoading: true }
        },
        responceuserUpdate: (state) => {
            return { ...state, isUpdateLoading: false }
        },
        erroruserUpdate: (state) => {
            return { ...state, isUpdateLoading: false }
        },

        //Status Update

        requestuserStatus: (state) => {
            return { ...state, isLoading: true }
        },
        responceuserStatus: (state, action) => {
            return { ...state, isLoading: false }
        },
        erroruserStatus: (state) => {
            return { ...state, isLoading: false }
        },

        requestuserBookingList: (state) => {
            return { ...state, isLoading: true }
        },
        responceuserBookingList: (state, action) => {
            return { ...state, isLoading: false, userBookingList:action.payload}
        },
        erroruserBookingList: (state) => {
            return { ...state, isLoading: false }
        },
     
        requestuserBookingView: (state) => {
            return { ...state, isLoading: true }
        },
        responceuserBookingView: (state, action) => {
            return { ...state, isLoading: false, userBooking:action.payload}
        },
        erroruserBookingView: (state) => {
            return { ...state, isLoading: false }
        },





          //social-confirmation View
          requestSocialConfirmationView: (state) => {
            return { ...state, isSocialConfirmationLoading: true }
        },
        responceSocialConfirmationView: (state, action) => {
            return { ...state, isSocialConfirmationLoading: false, socialconfirmation:action.payload}
        },
        errorSocialConfirmationView: (state) => {
            return { ...state, isSocialConfirmationLoading: false }
        },

         //social-confirmation Edit/Update
         requestSocialConfirmationUpdate: (state) => {
            return { ...state, isSocialConfirmationLoading: true }
        },
        responceSocialConfirmationUpdate: (state, action) => {
            return { ...state, isSocialConfirmationLoading: false, socialconfirmation:action.payload}
        },
        errorSocialConfirmationUpdate: (state) => {
            return { ...state, isSocialConfirmationLoading: false }
        },

    }
})

export default userSlice.reducer

export const {
    requestuserList,
    responceuserList,
    erroruserList,
    requestuserView,
    responceuserView,
    erroruserView,
    requestuserDelete,
    responceuserDelete,
    erroruserDelete,
    erroruserUpdate,
    requestuserUpdate,
    responceuserUpdate,
    requestuserStatus,
    responceuserStatus,
    erroruserStatus,
    requestuserAdd,
responceuserAdd,
erroruserAdd,
requestuserBookingList,
responceuserBookingList,
erroruserBookingList,
requestuserBookingView,
responceuserBookingView,
erroruserBookingView,

requestSocialConfirmationView,
responceSocialConfirmationView,
errorSocialConfirmationView,
requestSocialConfirmationUpdate,
responceSocialConfirmationUpdate,
errorSocialConfirmationUpdate,
} = userSlice.actions
