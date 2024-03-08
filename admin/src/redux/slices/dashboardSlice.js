import { createSlice } from '@reduxjs/toolkit'


const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        dashboard:null,
        isLoading: true,
        isUpdateLoading:false
    },
    reducers: {

        //View dashboard
        requestdashboardView: (state) => {
            return { ...state, isLoading: true}
        },
        responcedashboardView: (state,action) => {
            return { ...state, isLoading: false, dashboard: action.payload}
        },
        errordashboardView: (state) => {
            return { ...state, isLoading: false,cms:null }
        },

        // update dashboard
        requestdashboardUpdate: (state) => {
            return { ...state, isLoading: true}
        },
        responcedashboardUpdate: (state) => {
            return { ...state, isLoading: false}
        },
        errordashboardUpdate: (state) => {
            return { ...state, isLoading: false }
        }
        
    }
})

export default dashboardSlice.reducer

export const {
    requestdashboardView,
    responcedashboardView,
    errordashboardView
} = dashboardSlice.actions
