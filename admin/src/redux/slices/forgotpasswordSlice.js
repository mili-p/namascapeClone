import { createSlice } from '@reduxjs/toolkit'

const forgotpasswordSlice = createSlice({
    name: 'forgotpassword',
    initialState: { isLoading: false },
    reducers: {
        requestforgotpassword: (state) => {
            return { ...state, isLoading: true }
        },
        responseforgotpassword: (state) => {
            return { ...state, isLoading: false }
        },
        errorforgotpassword: (state) => {
            return { ...state, isLoading: false }
        }
    }
})

export default forgotpasswordSlice.reducer
export const {
    errorforgotpassword,
    requestforgotpassword,
    responseforgotpassword
} = forgotpasswordSlice.actions
