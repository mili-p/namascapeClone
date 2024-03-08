import { createSlice } from '@reduxjs/toolkit'

const paymentSlice = createSlice({
    name: 'payment',
    initialState: {
        payment: null,
        paymentList: null,
        paymentBookingList:null,
        paymentBooking:null,
        isLoading: true,
        isDeleteLoading: false,
        isUpdateLoading: false,
        paymentfees:null,
        isPaymentFeeLoading: false
    },
    reducers: {
        //Listing payments
        requestpaymentList: (state) => {
            return { ...state, isLoading: true }
        },
        responcepaymentList: (state, action) => {
            return { ...state, isLoading: false, paymentList: action.payload }
        },
        errorpaymentList: (state) => {
            return { ...state, isLoading: false, paymentList: null }
        },

        //View payment
        requestpaymentView: (state) => {
            return { ...state, isLoading: true }
        },
        responcepaymentView: (state, action) => {
            return { ...state, isLoading: false, payment: action.payload }
        },
        errorpaymentView: (state) => {
            return { ...state, isLoading: false, payment: null }
        },

        //delete payment
        requestpaymentDelete: (state) => {
            return { ...state, isDeleteLoading: true }
        },
        responcepaymentDelete: (state) => {
            return { ...state, isDeleteLoading: false }
        },
        errorpaymentDelete: (state) => {
            return { ...state, isDeleteLoading: false }
        },

        //Status Update

        requestpaymentStatus: (state) => {
            return { ...state, isLoading: true }
        },
        responcepaymentStatus: (state, action) => {
            return { ...state, isLoading: false }
        },
        errorpaymentStatus: (state) => {
            return { ...state, isLoading: false }
        },

        requestpaymentBookingList: (state) => {
            return { ...state, isLoading: true }
        },
        responcepaymentBookingList: (state, action) => {
            return { ...state, isLoading: false, paymentBookingList:action.payload}
        },
        errorpaymentBookingList: (state) => {
            return { ...state, isLoading: false }
        },

        //paymentFees View
        requestpaymentFeesView: (state) => {
            return { ...state, isPaymentFeeLoading: true }
        },
        responcepaymentFeesView: (state, action) => {
            return { ...state, isPaymentFeeLoading: false, paymentfees:action.payload}
        },
        errorpaymentFeesView: (state) => {
            return { ...state, isPaymentFeeLoading: false }
        },

         //paymentFees Edit/Update
         requestpaymentFeesUpdate: (state) => {
            return { ...state, isPaymentFeeLoading: true }
        },
        responcepaymentFeesUpdate: (state, action) => {
            return { ...state, isPaymentFeeLoading: false, paymentfees:action.payload}
        },
        errorpaymentFeesUpdate: (state) => {
            return { ...state, isPaymentFeeLoading: false }
        },
    }
})

export default paymentSlice.reducer

export const {
    requestpaymentList,
    responcepaymentList,
    errorpaymentList,
    requestpaymentView,
    responcepaymentView,
    errorpaymentView,
    requestpaymentDelete,
    responcepaymentDelete,
    errorpaymentDelete,
    errorpaymentUpdate,
    responcepaymentStatus,
    errorpaymentStatus,
    requestpaymentStatus,
    requestpaymentFeesView,
    responcepaymentFeesView,
    errorpaymentFeesView,
    requestpaymentFeesUpdate,
responcepaymentFeesUpdate,
errorpaymentFeesUpdate
} = paymentSlice.actions
