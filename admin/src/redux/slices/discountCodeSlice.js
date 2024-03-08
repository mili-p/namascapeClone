import { createSlice } from '@reduxjs/toolkit'

const discountcodeSlice = createSlice({
    name: 'discountcode',
    initialState: {
        discountcode: null,
        discountcodeList: null,
        isLoading: true,
        isDeleteLoading: false,
        isUpdateLoading: false
    },
    reducers: {
        //Listing discountcodes
        requestdiscountcodeList: (state) => {
            return { ...state, isLoading: true }
        },
        responcediscountcodeList: (state, action) => {
            return { ...state, isLoading: false, discountcodeList: action.payload }
        },
        errordiscountcodeList: (state) => {
            return { ...state, isLoading: false, discountcodeList: null }
        },

        //View discountcode
        requestdiscountcodeView: (state) => {
            return { ...state, isLoading: true }
        },
        responcediscountcodeView: (state, action) => {
            return { ...state, isLoading: false, discountcode: action.payload }
        },
        errordiscountcodeView: (state) => {
            return { ...state, isLoading: false, discountcode: null }
        },

        //delete discountcode
        requestdiscountcodeDelete: (state) => {
            return { ...state, isDeleteLoading: true }
        },
        responcediscountcodeDelete: (state) => {
            return { ...state, isDeleteLoading: false }
        },
        errordiscountcodeDelete: (state) => {
            return { ...state, isDeleteLoading: false }
        },

        // update discountcode

        requestdiscountcodeUpdate: (state) => {
            return { ...state, isUpdateLoading: true }
        },
        responcediscountcodeUpdate: (state) => {
            return { ...state, isUpdateLoading: false }
        },
        errordiscountcodeUpdate: (state) => {
            return { ...state, isUpdateLoading: false }
        },

        //Status Update

        requestdiscountcodeStatus: (state) => {
            return { ...state, isLoading: true }
        },
        responcediscountcodeStatus: (state, action) => {
            return { ...state, isLoading: false}
        },
        errordiscountcodeStatus: (state) => {
            return { ...state, isLoading: false }
        }
    }
})

export default discountcodeSlice.reducer

export const {
    requestdiscountcodeList,
    responcediscountcodeList,
    errordiscountcodeList,
    requestdiscountcodeView,
    responcediscountcodeView,
    errordiscountcodeView,
    requestdiscountcodeDelete,
    responcediscountcodeDelete,
    errordiscountcodeDelete,
    errordiscountcodeUpdate,
    requestdiscountcodeUpdate,
    responcediscountcodeUpdate,
    requestdiscountcodeStatus,
    responcediscountcodeStatus,
    errordiscountcodeStatus
} = discountcodeSlice.actions
