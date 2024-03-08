import requestApi from '../../../common/request'
import {
    errorforgotpassword,
    requestforgotpassword,
    responseforgotpassword
} from '../../slices/forgotpasswordSlice'
import Swal from 'sweetalert2'
export const asyncforgotpassword = (payload,callback) => async (dispatch) => {
    try {
        dispatch(requestforgotpassword())
        const res = await requestApi.post('/forgot-password', payload)
        // Swal.fire({
        //     text: res?.meta?.message,
        //     icon: 'success'
        // })
        dispatch(responseforgotpassword(res))
        callback()
    } catch (error) {
        Swal.fire({
            text: error?.message,
            icon: 'error'
        })
        dispatch(errorforgotpassword())
    }
}
