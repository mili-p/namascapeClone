import requestApi from '../../../common/request'
import Swal from 'sweetalert2'
import {
    requestpaymentList,
    responcepaymentList,
    errorpaymentList,
    requestpaymentView,
    responcepaymentView,
    errorpaymentView,
    requestpaymentDelete,
    responcepaymentDelete,
    errorpaymentDelete,
    requestpaymentStatus,
    responcepaymentStatus,
    errorpaymentStatus,
    requestpaymentFeesView,
    responcepaymentFeesView,
    errorpaymentFeesView,
    requestpaymentFeesUpdate,
responcepaymentFeesUpdate,
errorpaymentFeesUpdate
} from '../../slices/paymentSlice'


//payment -List
export const asyncpaymentListThunk = (payload) => async (dispatch) => {
    try {
        dispatch(requestpaymentList())
        const response = await requestApi.post('/payment-management/list', payload)
        dispatch(responcepaymentList(response))
    } catch (error) {
        Swal.fire({
            text: error?.message,
            icon: 'error'
        })
        dispatch(errorpaymentList(error))
    }
}

// View- payment
export const asyncpaymentViewThunk = (payload,callback) => async (dispatch) => {
    try {
        dispatch(requestpaymentView())
        const response = await requestApi.post('/payment-management/view', payload)
        dispatch(responcepaymentView(response))
    } catch (error) {
        Swal.fire({
            text: error?.message,
            icon: 'error'
        })
        dispatch(errorpaymentView(error))
        callback()
    }
}


//Update- payment- Status
export const asyncpaymentStatusUpdateThunk = (payload, callback) => async (dispatch) => {
    try {
        dispatch(requestpaymentStatus())
        const response = await requestApi.post('/payment/change-status', payload)

        if (typeof callback === 'function') {
            callback()
        }
        Swal.fire({
            text: response?.meta?.message,
            icon: 'success'
        })
        dispatch(responcepaymentStatus(response))
    } catch (error) {
        Swal.fire({
            text: error?.message,
            icon: 'error'
        })
        dispatch(errorpaymentStatus(error))
    }
}

//payment-Delete
export const asyncpaymentDeleteThunk = (payload, callback) => async (dispatch) => {
    try {
        dispatch(requestpaymentDelete())
        const response = await requestApi.post('/delete-payment', payload)
        dispatch(responcepaymentDelete(response))
        if (typeof callback === 'function') {
            callback()
        }
        Swal.fire({
            text: response?.meta?.message,
            icon: 'success'
        })
    } catch (error) {
        Swal.fire({
            text: error?.message,
            icon: 'error'
        })
        if (typeof callback === 'function') {
            callback(true)
        }
        dispatch(errorpaymentDelete(error))
    }
}


// View- payment-Fees
export const asyncpaymentFeesViewThunk = (payload,callback) => async (dispatch) => {
    try {
        dispatch(requestpaymentFeesView())
        const response = await requestApi.post('/contact-us/view-config', payload)
        dispatch(responcepaymentFeesView(response))
    } catch (error) {
        Swal.fire({
            text: error?.message,
            icon: 'error'
        })
        dispatch(errorpaymentFeesView(error))
        callback()
    }
}
// Update- payment-Fees 
export const asyncpaymentFeesUpdateThunk = (payload,callback) => async (dispatch) => {
    try {
        dispatch(requestpaymentFeesUpdate())
        const response = await requestApi.post('/contact-us/edit-config', payload)

        Swal.fire({
            text: response?.meta?.message,
            icon: 'success'
        })
        dispatch(responcepaymentFeesUpdate(response))
    } catch (error) {
        Swal.fire({
            text: error?.message,
            icon: 'error'
        })
        dispatch(errorpaymentFeesUpdate(error))
        callback()
    }
}
