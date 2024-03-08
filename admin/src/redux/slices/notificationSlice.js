import { createSlice, current } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        notification: null,
        notificationList: null,
        isLoading: true,
        isDeleteLoading: false,
        isUpdateLoading: false,
        notificationId :null,
        AllNoification:[],
        TotalCount: null,
        viewCount:null
    },
    reducers: {
        //Listing notifications
        requestnotificationList: (state) => {
            return { ...state, isLoading: true }
        },
        responcenotificationList: (state, action) => {
            return {
                ...state,
                isLoading: false,
                notificationList: action?.payload?.data,
                TotalCount : action?.payload?.meta?.totalCount,
                viewCount : action?.payload?.meta?.viewCounts
            }
        },
        AllNoificationData : (state, action) => {
            return {
                ...state,
                AllNoification: action?.payload?.page === 1 ? action?.payload?.data?.notificationData : [...current(state.AllNoification),...action?.payload?.data.notificationData],
              };
        },
        errornotificationList: (state) => {
            return { ...state, isLoading: false, notificationList: null }
        },

        //View notification
        requestnotificationView: (state) => {
            return { ...state, isLoading: true }
        },
        responcenotificationView: (state, action) => {
            return { ...state, isLoading: false, notification: action.payload}
        },
        errornotificationView: (state) => {
            return { ...state, isLoading: false, notification: null }
        },

        //read notification
        requestnotificationRead: (state) => {
            return { ...state, isLoading: true }
        },
        responcenotificationRead: (state, action) => {
            return { ...state, isLoading: false, notification: action.payload }
        },
        errornotificationRead: (state) => {
            return { ...state, isLoading: false, notification: null }
        },

       notificationSetId: (state,action) => {
            return { ...state, notificationId: action.payload }
        },

        // dispatch(asyncnotificationReadThunk({notificationId:notification?.notificationId}))
    }
})

export default notificationSlice.reducer

export const {
    requestnotificationList,
    responcenotificationList,
    errornotificationList,
    requestnotificationView,
    responcenotificationView,
    errornotificationView,
    requestnotificationRead,
responcenotificationRead,
errornotificationRead,
notificationSetId,
AllNoificationData
} = notificationSlice.actions
