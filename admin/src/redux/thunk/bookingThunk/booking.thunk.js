import requestApi from '../../../common/request'
import Swal from 'sweetalert2'
import {
    requestbookingList,
    responcebookingList,
    errorbookingList,
    requestbookingView,
    responcebookingView,
    errorbookingView,
    requestbookingUpdate,
    responcebookingUpdate,
    errorbookingUpdate,
    requestbookingDelete,
    responcebookingDelete,
    errorbookingDelete,
    requestbookingStatus,
    responcebookingStatus,
    errorbookingStatus
} from '../../slices/bookingSlice'


//booking -List
export const asyncbookingListThunk = (payload) => async (dispatch) => {
    try {
        dispatch(requestbookingList())
        const response = await requestApi.post('/event-booking/list', payload)
        dispatch(responcebookingList(response))
    } catch (error) {
        Swal.fire({
            text: error?.message,
            icon: 'error'
        })
        dispatch(errorbookingList(error))
    }
}

// View- booking
export const asyncbookingViewThunk = (payload) => async (dispatch) => {
    try {
        dispatch(requestbookingView())
        const response = await requestApi.post('event-booking/view', payload)
        dispatch(responcebookingView(response))
    } catch (error) {
        Swal.fire({
            text: error?.message,
            icon: 'error'
        })
        dispatch(errorbookingView(error))
    }
}

//Update- booking
export const asyncbookingUpdateThunk = (payload, callback) => async (dispatch) => {
    try {
        dispatch(requestbookingUpdate())
        const response = await requestApi.post('/discount/add-edit-discount', payload)

        if (typeof callback === 'function') {
            callback()
        }
        Swal.fire({
            text: response?.meta?.message,
            icon: 'success'
        })
        // dispatch(asyncSizeListThunk())
        dispatch(responcebookingUpdate(response))
    } catch (error) {
        Swal.fire({
            text: error?.message,
            icon: 'error'
        })
        dispatch(errorbookingUpdate(error))
    }
}

//Update- booking- Status
export const asyncbookingStatusUpdateThunk = (payload, callback) => async (dispatch) => {
    try {
        dispatch(requestbookingStatus())
        const response = await requestApi.post('/discount/change-discount-status', payload)

        if (typeof callback === 'function') {
            callback()
        }
        Swal.fire({
            text: response?.meta?.message,
            icon: 'success'
        })
        dispatch(responcebookingStatus(response))
    } catch (error) {
        Swal.fire({
            text: error?.message,
            icon: 'error'
        })
        dispatch(errorbookingStatus(error))
    }
}

//booking-Delete
export const asyncbookingDeleteThunk = (payload, callback) => async (dispatch) => {
    try {
        dispatch(requestbookingDelete())
        const response = await requestApi.post('/discount/delete-discount', payload)
        dispatch(responcebookingDelete(response))
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
        dispatch(errorbookingDelete(error))
    }
}