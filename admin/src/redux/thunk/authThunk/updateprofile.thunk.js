import requestApi from '../../../common/request'
import { responseEditProfile } from '../../slices/signinSlices'
import {
    errorupdateprofil,
    requestupdateprofil,
    responseupdateprofil
} from '../../slices/updateprofileSlice'
import Swal from 'sweetalert2'
export const asyncupdateprofile = (payload, callback) => async (dispatch) => {
   
    try {
        dispatch(requestupdateprofil())
        const res = await requestApi.post('/edit-profile', payload)
        Swal.fire({
            text: res?.meta?.message,
            icon: 'success'
        })
        dispatch(responseupdateprofil())
        if (typeof payload.get('profilePicture') === 'object') {
            dispatch(
                responseEditProfile({
                    ...res,
                    localImg: URL.createObjectURL(
                        payload.get('profilePicture')
                    )
                })
            )
        } else {
            dispatch(responseEditProfile(res))
        }
        if (typeof callback === 'function') {
            callback()
        }
    } catch (error) {
        Swal.fire({
            text: error?.message,
            icon: 'error'
        })
        dispatch(errorupdateprofil())
    }
}
