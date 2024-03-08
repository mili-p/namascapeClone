import requestApi from '../../../common/request'
import Swal from 'sweetalert2'
import {
    requestcontactmasterList,
    responcecontactmasterList,
    errorcontactmasterList,
    requestcontactmasterView,
    responcecontactmasterView,
    errorcontactmasterView,
    requestcontactmasterDelete,
    responcecontactmasterDelete,
    errorcontactmasterDelete,
} from '../../slices/contactmasterSlice'


//contactmaster -List
export const asynccontactmasterListThunk = (payload) => async (dispatch) => {
    try {
        dispatch(requestcontactmasterList())
        const response = await requestApi.post('/contact-us/list-contact-us', payload)
        dispatch(responcecontactmasterList(response))
    } catch (error) {
        Swal.fire({
            text: error?.meta?.message,
            icon: 'error'
        })
        dispatch(errorcontactmasterList(error))
    }
}

// View- contactmaster
export const asynccontactmasterViewThunk = (payload) => async (dispatch) => {
    try {
        dispatch(requestcontactmasterView())
        const response = await requestApi.post('/contact-us/view-contact-us', payload)
        dispatch(responcecontactmasterView(response))
    } catch (error) {
        Swal.fire({
            text: error?.meta?.message,
            icon: 'error'
        })
        dispatch(errorcontactmasterView(error))
    }
}

//contactmaster-Delete
export const asynccontactmasterDeleteThunk = (payload, callback) => async (dispatch) => {
    try {
        dispatch(requestcontactmasterDelete())
        const response = await requestApi.post('/contact-us/delete-contact-us', payload)
        dispatch(responcecontactmasterDelete(response))
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
        dispatch(errorcontactmasterDelete(error))
    }
}