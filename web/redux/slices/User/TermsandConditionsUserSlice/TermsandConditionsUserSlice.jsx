import { createSlice } from "@reduxjs/toolkit";

const TermsandConditionsUserSlice = createSlice({
    name : "termsandconditions",
    initialState : {
        viewLoader : false,
        viewDataTandC : null
    },
    reducers : {
        requestTermsAndConditionsUserView : (state,action) => {
            return {
                ...state, viewLoader : true
            }
        },
        successTermsAndConditionsUserView : (state,action) => {
            return {
                ...state, viewLoader : false, viewDataTandC : action?.payload
            }
        },
        failureTermsAndConditionsUserView : (state,action) => {
            return {
                ...state, viewLoader : false
            }
        }
    }
})

export const {failureTermsAndConditionsUserView,requestTermsAndConditionsUserView,successTermsAndConditionsUserView} = TermsandConditionsUserSlice.actions
export default TermsandConditionsUserSlice.reducer