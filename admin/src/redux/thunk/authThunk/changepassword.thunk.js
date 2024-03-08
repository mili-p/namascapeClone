import requestApi from '../../../common/request'
import {
    requestchangepassword,
    responsechangepassword,
    errorchangepassword,
} from '../../slices/changepasswordSlice'
import Swal from 'sweetalert2'
export const asyncChangepassword = (payload,callback) => async (dispatch) => {
    try {
        dispatch(requestchangepassword())
        const res = await requestApi.post('/change-password', payload)
        Swal.fire({
            text: res?.meta?.message,
            icon: 'success'
        })
        dispatch(responsechangepassword(res))
        if(typeof callback ==="function"){
            callback()
        }
    } catch (error) {
        Swal.fire({
            text: error?.message,
            icon: 'error'
        })
        dispatch(errorchangepassword())
    }
}

