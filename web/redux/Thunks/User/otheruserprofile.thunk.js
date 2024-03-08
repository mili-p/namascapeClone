import requestApi from "@/utils/request";
import {
    requestOtherUserProfile,
    responseOtherUserProfile,
    errorOtherUserProfile,
    getTotalCountOtherUserProfile
} from '../../slices/User/otheruserprofile'
import { sweetalert } from "@/app/components/common/Common";

/////// UserProfile Api calling  ///////
export const asyncOtherUserProfile = (payload, Callback) => async (dispatch) => {
    try {
        dispatch(requestOtherUserProfile())
        const res = await requestApi.post('/endUser/other-user-profile', payload)
        dispatch(responseOtherUserProfile(res))
        dispatch(getTotalCountOtherUserProfile(res?.meta))
        if (typeof Callback === 'function') {
            Callback()
        }
    } catch (error) {
        sweetalert({
            message:error.message,
            type:"error"
        })
        // console.log(error,"action")
        dispatch(errorOtherUserProfile())
    }
}