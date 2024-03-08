import requestApi from "@/utils/request";
import {
    requestEventAttendees,
    responseEventAttendees,
    errorEventAttendees,
    getTotalCountEventAttendees
} from '../../slices/User/eventattendees'
import { sweetalert } from "@/app/components/common/Common";

///////  EventAttendees Api calling  ///////
export const asyncEventAttendees = (payload, Callback) => async (dispatch) => {
    try {
        dispatch(requestEventAttendees())
        const res = await requestApi.post('/endUser/event-attendees/list', payload)
        dispatch(responseEventAttendees(res))
        dispatch(getTotalCountEventAttendees(res?.meta))
        if (typeof Callback === 'function') {
            Callback()
        }
    } catch (error) {
        sweetalert({
            message:error.message,
            type:"error"
        })
        // console.log(error,"action")
        dispatch(errorEventAttendees(error))
    }
}