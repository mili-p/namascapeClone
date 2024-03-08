import requestApi from "@/utils/request";
import {
    requestContactUs,
    responseContactUs,
    errorContactUs
} from '../../slices/User/contactus'
import { sweetalert } from "@/app/components/common/Common";

///////  ContactUs Form Api calling  ///////
export const asyncContactUs = (payload, Callback) => async (dispatch) => {
    try {
        dispatch(requestContactUs())
        const res = await requestApi.post('/contact-us/add', payload)
        sweetalert({
            message:res?.meta?.message,
            type:"success"
        })
        dispatch(responseContactUs(res))
        if (typeof Callback === 'function') {
            Callback()
        }
    } catch (error) {
        sweetalert({
            message:error.message,
            type:"error"
        })
        // console.log(error,"action")
        dispatch(errorContactUs())
    }
}