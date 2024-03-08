import requestApi from "@/utils/request";
import {
    requestEventDetailsPayment,
    responseEventDetailsPayment,
    errorEventDetailsPayment
} from '../../slices/User/eventdetailspayment'
import { sweetalert } from "@/app/components/common/Common";

///////  EventDetailsPayment Form Api calling  ///////
export const asyncEventDetailsPayment = (payload, Callback) => async (dispatch) => {
    try {
        dispatch(requestEventDetailsPayment())
        const res = await requestApi.post('/enduser/web/events/view', payload)
        dispatch(responseEventDetailsPayment(res))
        if (typeof Callback === 'function') {
            Callback()
        }
    } catch (error) {
        sweetalert({
            message:error.message,
            type:"error"
        })
        // console.log(error,"action")
        dispatch(errorEventDetailsPayment())
    }
}