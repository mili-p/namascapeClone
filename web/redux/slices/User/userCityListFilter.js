import {createSlice} from '@reduxjs/toolkit'

const userCityListFilter = createSlice ({
    name: 'userCityListFilter',
    initialState: {
        isLoading: true,
        cityFilterData : []
    },
    reducers: {
        requestCityFilter : (state,action) =>{
            return {...state,isLoading:true}
        },
        successCityFilter : (state,action) =>{
            return {...state,isLoading:false,cityFilterData:action?.payload}
        },
        failureCityFilter : (state,action) =>{
            return {...state,isLoading:false}
        }
    }
})

export default userCityListFilter.reducer
export const {
    requestCityFilter,failureCityFilter,successCityFilter
} = userCityListFilter.actions