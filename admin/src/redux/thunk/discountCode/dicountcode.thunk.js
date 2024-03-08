import requestApi from '../../../common/request'
import Swal from 'sweetalert2'
import {
    requestdiscountcodeList,
    responcediscountcodeList,
    errordiscountcodeList,
    requestdiscountcodeView,
    responcediscountcodeView,
    errordiscountcodeView,
    requestdiscountcodeUpdate,
    responcediscountcodeUpdate,
    errordiscountcodeUpdate,
    requestdiscountcodeDelete,
    responcediscountcodeDelete,
    errordiscountcodeDelete,
    requestdiscountcodeStatus,
    responcediscountcodeStatus,
    errordiscountcodeStatus
} from '../../slices/discountCodeSlice'


//discountcode -List
export const asyncdiscountcodeListThunk = (payload) => async (dispatch) => {
    try {
        dispatch(requestdiscountcodeList())
        const response = await requestApi.post('discount/list-discount', payload)
        dispatch(responcediscountcodeList(response))
    } catch (error) {
        Swal.fire({
            text: error?.message,
            icon: 'error'
        })
        dispatch(errordiscountcodeList(error))
    }
}

// View- discountcode
export const asyncdiscountcodeViewThunk = (payload) => async (dispatch) => {
    try {
        dispatch(requestdiscountcodeView())
        const response = await requestApi.post('/discount/view-discount', payload)
        dispatch(responcediscountcodeView(response))
    } catch (error) {
        Swal.fire({
            text: error?.message,
            icon: 'error'
        })
        dispatch(errordiscountcodeView(error))
    }
}

//Update- discountcode
export const asyncdiscountcodeUpdateThunk = (payload, callback) => async (dispatch) => {
    try {
        dispatch(requestdiscountcodeUpdate())
        const response = await requestApi.post('/discount/add-edit-discount', payload)

        if (typeof callback === 'function') {
            callback()
        }
        Swal.fire({
            text: response?.meta?.message,
            icon: 'success'
        })
        // dispatch(asyncSizeListThunk())
        dispatch(responcediscountcodeUpdate(response))
    } catch (error) {
        Swal.fire({
            text: error?.message,
            icon: 'error'
        })
        dispatch(errordiscountcodeUpdate(error))
    }
}

//Update- discountcode- Status
export const asyncdiscountcodeStatusUpdateThunk = (payload, callback) => async (dispatch) => {
    try {
        dispatch(requestdiscountcodeStatus())
        const response = await requestApi.post('/discount/change-discount-status', payload)

        if (typeof callback === 'function') {
            callback()
        }
        Swal.fire({
            text: response?.meta?.message,
            icon: 'success'
        })
        dispatch(responcediscountcodeStatus(response))
    } catch (error) {
        Swal.fire({
            text: error?.message,
            icon: 'error'
        })
        dispatch(errordiscountcodeStatus(error))
    }
}

//discountcode-Delete
export const asyncdiscountcodeDeleteThunk = (payload, callback) => async (dispatch) => {
    try {
        dispatch(requestdiscountcodeDelete())
        const response = await requestApi.post('/discount/delete-discount', payload)
        dispatch(responcediscountcodeDelete(response))
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
        dispatch(errordiscountcodeDelete(error))
    }
}