import { createSlice } from '@reduxjs/toolkit'
const changepasswordSlices = createSlice({
    name: 'changepassword',
    initialState: { isLoading: false },
    reducers: {
        requestchangepassword: (state) => {
            return { ...state, isLoading: true }
        },
        responsechangepassword: (state) => {
            return { ...state, isLoading: false }
        },
        errorchangepassword: (state) => {
            return { ...state, isLoading: false }
        }
    }
})

export default changepasswordSlices.reducer
export const { errorchangepassword,requestchangepassword,responsechangepassword } = changepasswordSlices.actions
