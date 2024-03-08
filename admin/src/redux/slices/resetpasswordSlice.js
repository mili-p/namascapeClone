import { createSlice } from '@reduxjs/toolkit'

const resetpasswordSlice = createSlice({
    name: 'resetpassword',
    initialState: { isLoading: false,isResetLoading:false },
    reducers: {
        requestresetpassword: (state) => {
            return { ...state, isLoading: true }
        },
        responseresetpassword: (state) => {
            return { ...state, isLoading: false }
        },
        errorresetpassword: (state) => {
            return { ...state, isLoading: false }
        },

        requestresendotp: (state) => {
            return { ...state, isResetLoading: true }
        },
        responseresendotp: (state) => {
            return { ...state, isResetLoading: false }
        },
        errorresendotp: (state) => {
            return { ...state, isResetLoading: false }
        }
    }
})

export default resetpasswordSlice.reducer
export const {
    errorresetpassword,
    requestresetpassword,
    responseresetpassword,
    errorresendotp,
    requestresendotp,
    responseresendotp
} = resetpasswordSlice.actions
