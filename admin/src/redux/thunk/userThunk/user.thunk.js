import requestApi from '../../../common/request'
import Swal from 'sweetalert2'
import {
    requestuserList,
    responceuserList,
    erroruserList,
    requestuserView,
    responceuserView,
    erroruserView,
    requestuserUpdate,
    responceuserUpdate,
    erroruserUpdate,
    requestuserDelete,
    responceuserDelete,
    erroruserDelete,
    requestuserStatus,
    responceuserStatus,
    erroruserStatus,
    requestuserAdd,
responceuserAdd,
erroruserAdd,
requestuserBookingList,
responceuserBookingList,
erroruserBookingList,
requestuserBookingView,
responceuserBookingView,
erroruserBookingView,

requestSocialConfirmationView,
responceSocialConfirmationView,
errorSocialConfirmationView,
requestSocialConfirmationUpdate,
responceSocialConfirmationUpdate,
errorSocialConfirmationUpdate,
} from '../../slices/userSlice'


//User -List
export const asyncUserListThunk = (payload) => async (dispatch) => {
    try {
        dispatch(requestuserList())
        const response = await requestApi.post('/user/list', payload)
        dispatch(responceuserList(response))
    } catch (error) {
        Swal.fire({
            text: error?.message,
            icon: 'error'
        })
        dispatch(erroruserList(error))
    }
}

// View- User
export const asyncUserViewThunk = (payload,callback) => async (dispatch) => {
    try {
        dispatch(requestuserView())
        const response = await requestApi.post('/user/view-user', payload)
        dispatch(responceuserView(response))
    } catch (error) {
        Swal.fire({
            text: error?.message,
            icon: 'error'
        })
        dispatch(erroruserView(error))
        callback()
    }
}
//Add- User
export const asyncUserAddThunk = (payload, callback) => async (dispatch) => {
    try {
        dispatch(requestuserAdd())
        const response = await requestApi.post('/user/add', payload)

        if (typeof callback === 'function') {
            callback()
        }
        Swal.fire({
            text: response?.meta?.message,
            icon: 'success'
        })
        // dispatch(asyncSizeListThunk())
        dispatch(responceuserAdd(response))
    } catch (error) {
        Swal.fire({
            text: error?.message,
            icon: 'error'
        })
        dispatch(erroruserAdd(error))
    }
}
//Update- User
export const asyncUserUpdateThunk = (payload, callback) => async (dispatch) => {
    try {
        dispatch(requestuserUpdate())
        const response = await requestApi.post('/user/edit-user', payload)

        if (typeof callback === 'function') {
            callback()
        }
        Swal.fire({
            text: response?.meta?.message,
            icon: 'success'
        })
        // dispatch(asyncSizeListThunk())
        dispatch(responceuserUpdate(response))
    } catch (error) {
        Swal.fire({
            text: error?.message,
            icon: 'error'
        })
        dispatch(erroruserUpdate(error))
    }
}

//Update- User- Status
export const asyncUserStatusUpdateThunk = (payload, callback) => async (dispatch) => {
    try {
        dispatch(requestuserStatus())
        const response = await requestApi.post('/user/change-status', payload)

        if (typeof callback === 'function') {
            callback()
        }
        Swal.fire({
            text: response?.meta?.message,
            icon: 'success'
        })
        dispatch(responceuserStatus(response))
    } catch (error) {
        Swal.fire({
            text: error?.message,
            icon: 'error'
        })
        dispatch(erroruserStatus(error))
    }
}
//User-Delete
export const asyncUserDeleteThunk = (payload, callback) => async (dispatch) => {
    try {
        dispatch(requestuserDelete())
        const response = await requestApi.post('/delete-user', payload)
        dispatch(responceuserDelete(response))
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
        dispatch(erroruserDelete(error))
    }
}

//User -List
export const asyncUserBookingListThunk = (payload,callback) => async (dispatch) => {
    try {
        dispatch(requestuserBookingList())
        const response = await requestApi.post('/user/event-bookings/list', payload)
        dispatch(responceuserBookingList(response))
        callback(response?.data?.[0]?.eventBookingId)
    } catch (error) {
        Swal.fire({
            text: error?.message,
            icon: 'error'
        })
        dispatch(erroruserBookingList(error))
    }
}

// View- User
export const asyncUserBookingViewThunk = (payload,callback) => async (dispatch) => {
    try {
        dispatch(requestuserBookingView())
        const response = await requestApi.post('/user/event-bookings/view', payload)
        dispatch(responceuserBookingView(response))
    } catch (error) {
        Swal.fire({
            text: error?.message,
            icon: 'error'
        })
        dispatch(erroruserBookingView(error))
        callback()
    }
}




// View-Social-Confirmation
export const asyncSocialConfirmationViewThunk = (payload,callback) => async (dispatch) => {
    try {
        dispatch(requestSocialConfirmationView())
        const response = await requestApi.post('/contact-us/view-config', payload)
        dispatch(responceSocialConfirmationView(response))
    } catch (error) {
        Swal.fire({
            text: error?.message,
            icon: 'error'
        })
        dispatch(errorSocialConfirmationView(error))
        callback()
    }
}
// Update-Social-Confirmation 
export const asyncSocialConfirmationUpdateThunk = (payload,callback) => async (dispatch) => {
    try {
        dispatch(requestSocialConfirmationUpdate())
        const response = await requestApi.post('/contact-us/edit-config', payload)

        Swal.fire({
            text: response?.meta?.message,
            icon: 'success'
        })
        dispatch(responceSocialConfirmationUpdate(response))
    } catch (error) {
        Swal.fire({
            text: error?.message,
            icon: 'error'
        })
        dispatch(errorSocialConfirmationUpdate(error))
        callback()
    }
}
