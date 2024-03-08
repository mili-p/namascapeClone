import { createSlice } from "@reduxjs/toolkit";
const DashboardSlice = createSlice({
    name : "dashboardSlice",
    initialState : {
        isloading : true,
        dashboardData : null
    },
    reducers : {

        ///// dashboard data getting start ////////
        dashboardDataRequest : (state,action)=>{
            return {...state,isloading:true}
        },
        dashboardDataSuccess : (state,action)=>{
            console.log(action?.payload,"action?.payload");
            return {...state,isloading:false,dashboardData:action?.payload}
        },
        dashboardDataFailure : (state,action)=>{
            return {...state,isloading:false,dashboardData : null}
        },
        ///// dashboard data getting end ////////
    }
})



export const {dashboardDataRequest,dashboardDataSuccess,dashboardDataFailure} =  DashboardSlice.actions
export default DashboardSlice.reducer