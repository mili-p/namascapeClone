import requestApi from "@/utils/request";
import {
    requestBookEvent,
    responseBookEvent,
    errorBookEvent
} from '../../slices/User/bookevent'
import { sweetalert } from "@/app/components/common/Common";

///////  Book Event Form Api calling  ///////
export const asyncBookEvent = (payload, Callback) => async (dispatch) => {
    try {
        dispatch(requestBookEvent())
        const res = await requestApi.post('/enduser/events/book-event', payload)
        dispatch(responseBookEvent(res))
        if (typeof Callback === 'function') {
            Callback()
        }
    } catch (error) {
        sweetalert({
            message:error.message,
            type:"error"
        })
        // console.log(error,"action")
        dispatch(errorBookEvent())
    }
}