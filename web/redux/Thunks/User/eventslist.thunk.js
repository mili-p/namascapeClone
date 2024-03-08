import requestApi from "@/utils/request";
import {
    requestEventsList,
    responseEventsList,
    errorEventsList,
} from '../../slices/User/eventslist'
import { sweetalert } from "@/app/components/common/Common";

///////  EventsList Form Api calling  ///////
export const asyncEventsList = (payload, Callback) => async (dispatch) => {
    try {
        dispatch(requestEventsList())
        const res = await requestApi.post('/endUser/events/home', payload)
        dispatch(responseEventsList(res))
        if (typeof Callback === 'function') {
            Callback()
        }
    } catch (error) {
        sweetalert({
            message:error.message,
            type:"error"
        })
        // console.log(error,"action")
        dispatch(errorEventsList())
    }
}