import { createSlice } from '@reduxjs/toolkit'

const editprofileSlice = createSlice({
    name: 'editprofile',
    initialState: { isLoading: true, userDetail: null },
    reducers: {
        requesteditprofillist: (state) => {
            return { ...state, isLoading: true }
        },
        responseeditprofillist: (state, action) => {
            return { ...state, isLoading: false, userDetail: action.payload }
        },
        erroreditprofillist: (state) => {
            return { ...state, isLoading: false, userDetail: null }
        }
    }
})

export default editprofileSlice.reducer
export const {
    erroreditprofillist,
    requesteditprofillist,
    responseeditprofillist
} = editprofileSlice.actions
