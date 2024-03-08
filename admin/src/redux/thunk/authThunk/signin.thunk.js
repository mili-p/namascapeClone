import requestApi from '../../../common/request'
import {
    requestSignin,
    responseSignin,
    errorSignin,
    requestLogout,
    responseLogout,
    errorLogout
} from '../../slices/signinSlices'
import Swal from 'sweetalert2'

export const asyncSignin = (payload) => async (dispatch) => {
    try {
        dispatch(requestSignin())
        const res = await requestApi.post('/login', payload)
        dispatch(responseSignin(res))
    } catch (error) {
        Swal.fire({
            text: error?.message,
            icon: 'error'
        })
        dispatch(errorSignin())
    }
}

export const asynclogoutUser = (payload, callback) => async (dispatch) => {
    try {
        dispatch(requestLogout())
        if (!payload?.noapi) {
            
            const res = await requestApi.post('/log-out', payload)
        }
        dispatch(responseLogout())
        if (typeof callback === 'function') {
            callback()
        }
    } catch (error) {
        if (typeof callback === 'function') {
            callback()
        }
        Swal.fire({
            text: error?.message,
            icon: 'error'
        })
        dispatch(errorLogout())
    }
}
