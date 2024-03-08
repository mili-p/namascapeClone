import {
    requesteditprofillist,
    responseeditprofillist,
    erroreditprofillist
} from '../../slices/editprofileSlice'
import requestApi from '../../../common/request'
import { responseEditProfile } from '../../slices/signinSlices'
import Swal from 'sweetalert2'

export const asynceditprofile = (payload, callback) => async(dispatch) => {

    try {
        dispatch(requesteditprofillist())
        const res = await requestApi.post('/view-profile')
        dispatch(responseeditprofillist(res?.data))
        dispatch(responseEditProfile(res))
        
        if (typeof callback === 'function') {
            callback()
        }
    } catch (error) {
        Swal.fire({
            text: error?.message,
            icon: 'error'
        })
        dispatch(erroreditprofillist())
    }
}
