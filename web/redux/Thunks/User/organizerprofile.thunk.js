import requestApi from "@/utils/request";
import {
    resquestOrganizerProfile,
    responseOrganizerProfile,   
    errorOrganizerProfile
} from '../../slices/User/organizerprofile'
import { sweetalert } from "@/app/components/common/Common";

///////  organizerprofile Form Api calling  ///////
export const asyncOrganizerprofile = (payload, Callback) => async (dispatch) => {
    try {
        dispatch(resquestOrganizerProfile())
        const res = await requestApi.post('/endUser/organizer-profile', payload)
        dispatch(responseOrganizerProfile(res))
        if (typeof Callback === 'function') {
            Callback()
        }
    } catch (error) {
        sweetalert({
            message:error.message,
            type:"error"
        })
        // console.log(error,"action")
        dispatch(errorOrganizerProfile(error))
    }
}