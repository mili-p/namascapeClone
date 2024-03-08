import { createSlice } from "@reduxjs/toolkit";

const countrySlice = createSlice({
    name : "country",
    initialState : {
        countryLoader : false,
        countryData : []
    },
    reducers : {
        countryDataRequest : (state,action) => {
            return {
                ...state, countryLoader : true
            }
        },
        countryDataSuccess : (state,action) => {
            return {
                ...state, countryLoader : false, countryData : action?.payload
            }
        },
        countryDataFailure : (state,action) => {
            return {
                ...state, countryLoader : false
            }
        }
    }
})

export const {countryDataFailure,countryDataRequest,countryDataSuccess} = countrySlice.actions
export default countrySlice.reducer