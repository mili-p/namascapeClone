import { createSlice } from '@reduxjs/toolkit'

const updateProfile = createSlice({
    name: 'updateprofile',
    initialState: { isLoading: false },
    reducers: {
        requestupdateprofil: (state) => {
            return { ...state, isLoading: true }
        },
        responseupdateprofil: (state) => {
            return { ...state, isLoading: false }
        },
        errorupdateprofil: (state) => {
            return { ...state, isLoading: false }
        }
    }
})

export default updateProfile.reducer
export const { errorupdateprofil, requestupdateprofil, responseupdateprofil } =
    updateProfile.actions
