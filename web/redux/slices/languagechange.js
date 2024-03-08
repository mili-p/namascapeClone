'use client'
import { createSlice } from "@reduxjs/toolkit";

const languagechange = createSlice({
    name: 'language',
    initialState: {
        isLoading: true,
        languageData: null,
        userData:typeof window !=="undefined" ? JSON.parse(localStorage.getItem('userData')) ?? null :null,
    },
    reducers: {

        // start for laguage change api //
        requestLanguageChange: (state) => {
            return { ...state, isLoading: true }
        },
        responseLanguageChange: (state, action) => {
            const userData = JSON.stringify(action?.payload)
            localStorage.setItem('userData', userData)
            return { ...state, isLoading: false, languageData: action.payload }
        },
        errorLanguageChange: (state) => {
            return { ...state, isLoading: false, languageData: null }
        },
        // End for laguage change api //

        // start for delete api calling //
        deleteAccountRequest :(state,action) =>{
            return { ...state, isLoading: true }
        },
        deleteAccountSuccess : (state,action) =>{
            document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;';
            document.cookie = 'userType=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
            localStorage.removeItem("userData");
            return { ...state, isLoading: false ,userData:null}
        },
        deleteAccountFailure : (state,action) =>{
            return { ...state, isLoading: false }
        }
        // End for delete api calling //

    }
})

export default languagechange.reducer
export const {
    requestLanguageChange,
    responseLanguageChange,
    errorLanguageChange,
    deleteAccountRequest,
    deleteAccountSuccess,
    deleteAccountFailure
} = languagechange.actions