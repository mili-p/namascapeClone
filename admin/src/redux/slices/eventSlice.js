import { createSlice } from '@reduxjs/toolkit'

const eventSlice = createSlice({
    name: 'event',
    initialState: {
        event: null,
        eventList: null,
        isLoading: true,
        cityData:null,
        partnerData:null,
        isDeleteLoading: false,
        isUpdateLoading: false
    },
    reducers: {
        //Listing events
        requesteventList: (state) => {
            return { ...state, isLoading: true }
        },
        responceeventList: (state, action) => {
            return { ...state, isLoading: false, eventList: action.payload }
        },
        erroreventList: (state) => {
            return { ...state, isLoading: false, eventList: null }
        },

        //View event
        requesteventView: (state) => {
            return { ...state, isLoading: true }
        },
        responceeventView: (state, action) => {
            return { ...state, isLoading: false, event: action.payload }
        },
        erroreventView: (state) => {
            return { ...state, isLoading: false, event: null }
        },

        //delete event
        requesteventDelete: (state) => {
            return { ...state, isDeleteLoading: true }
        },
        responceeventDelete: (state) => {
            return { ...state, isDeleteLoading: false }
        },
        erroreventDelete: (state) => {
            return { ...state, isDeleteLoading: false }
        },

        // update event
        requesteventUpdate: (state) => {
            return { ...state, isUpdateLoading: true }
        },
        responceeventUpdate: (state) => {
            return { ...state, isUpdateLoading: false }
        },
        erroreventUpdate: (state) => {
            return { ...state, isUpdateLoading: false }
        },

        // update sponser
        requesteventsponser: (state) => {
            return { ...state, isUpdateLoading: true }
        },
        responceeventeventsponser: (state) => {
            return { ...state, isUpdateLoading: false }
        },
        erroreventeventsponser: (state) => {
            return { ...state, isUpdateLoading: false }
        },

        // acceptDecline
        requesteventAcceptDecline: (state) => {
            return { ...state, isUpdateLoading: true }
        },
        responceeventeventAcceptDecline: (state) => {
            return { ...state, isUpdateLoading: false }
        },
        erroreventeventAcceptDecline: (state) => {
            return { ...state, isUpdateLoading: false }
        },

        //download List of users
        requesteventListDownload: (state) => {
            return { ...state, isLoading: true }
        },
        responceeventListDownload: (state, action) => {
            return { ...state, isLoading: false, eventList: action.payload }
        },
        erroreventListDownload: (state) => {
            return { ...state, isLoading: false, eventList: null }
        },

         //city List
         requestGetCity: (state) => {
            return { ...state, isLoading: true }
        },
        SuccessGetCity: (state, action) => {
            return { ...state, isLoading: false, cityData: action.payload }
        },
        FailureGetCity: (state) => {
            return { ...state, isLoading: false, eventList: null }
        },

        //partnerData
        requestGetParner: (state) => {
            return { ...state, isLoading: true }
        },
        SuccessGetPartner: (state, action) => {
            return { ...state, isLoading: false, partnerData: action.payload }
        },
        FailureGetPartner: (state) => {
            return { ...state, isLoading: false, partnerData: null }
        }
        
    }
})

export default eventSlice.reducer

export const {
    requesteventList,
    responceeventList,
    erroreventList,
    requesteventView,
    responceeventView,
    erroreventView,
    requesteventDelete,
    responceeventDelete,
    erroreventDelete,
    erroreventUpdate,
    requesteventUpdate,
    responceeventUpdate,
    requesteventsponser,
    responceeventeventsponser,
    erroreventeventsponser,
    requesteventAcceptDecline,
responceeventeventAcceptDecline,
erroreventeventAcceptDecline,
requesteventListDownload,
responceeventListDownload,
erroreventListDownload,
requestGetCity,
SuccessGetCity,
FailureGetCity,
requestGetParner,
SuccessGetPartner,
FailureGetPartner
} = eventSlice.actions
