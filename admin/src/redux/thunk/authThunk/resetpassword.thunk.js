import requestApi from '../../../common/request'
import {
    errorresetpassword,
    requestresetpassword,
    responseresetpassword,
    errorresendotp,
    requestresendotp,
    responseresendotp
} from '../../slices/resetpasswordSlice'

import Swal from 'sweetalert2'

export const asyncresetpassword = (payload, callback) => async (dispatch) => {
    try {
        dispatch(requestresetpassword())
        const res = await requestApi.post('/reset-password', payload)
        Swal.fire({
            text: res?.meta?.message,
            icon: 'success'
        })
        dispatch(responseresetpassword(res))
        callback()
    } catch (error) {
        Swal.fire({
            text: error?.message,
            icon: 'error'
        })
        dispatch(errorresetpassword())
    }
}

export const asyncresendotp = (payload,callback) => async (dispatch) => {
    try {
        dispatch(requestresendotp())
        const res = await requestApi.post('/resend-otp', payload)
        Swal.fire({
            text: res?.meta?.message,
            icon: 'success'
        })
        if (typeof callback==="function") {
            callback()
        }
        dispatch(responseresendotp(res))
    } catch (error) {
        Swal.fire({
            text: error?.message,
            icon: 'error'
        })
        dispatch(errorresendotp())
    }
}
