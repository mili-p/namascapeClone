import { createSlice } from "@reduxjs/toolkit"

const AttendessAcceptDeclineSlice = createSlice({
   name : "AttendessAcceptDecline",
   initialState : {
        attendessadLoader : false
   }, 
   reducers : {
    requestAttendessAcceptDecline : (state,action) => {
        return {
            ...state, attendessadLoader : true
        }
    },
    successAttendessAcceptDecline : (state,action) => {
        return {
            ...state, attendessadLoader : false
        }
    },
    failureAttendessAcceptDecline : (state,action) => {
        return {
            ...state, attendessadLoader : false
        }
    }
   }
})

export const {requestAttendessAcceptDecline,failureAttendessAcceptDecline,successAttendessAcceptDecline} = AttendessAcceptDeclineSlice.actions
export default AttendessAcceptDeclineSlice.reducer