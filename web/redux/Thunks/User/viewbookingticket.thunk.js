import requestApi from "@/utils/request";
import {
    requestViewBookingTicket,
    responseViewBookingTicket,
    errorViewBookingTicket
} from '../../slices/User/viewbookingticket'
import { sweetalert } from "@/app/components/common/Common";

/////// ViewBookingTicket Form Api calling  ///////
export const asyncViewBookingTicket = (payload, Callback) => async (dispatch) => {
    try {
        dispatch(requestViewBookingTicket())
        const res = await requestApi.post('/enduser/events/view-booking-ticket', payload)
        dispatch(responseViewBookingTicket(res))
        if (typeof Callback === 'function') {
            Callback({
                eventBookingId : res?.data?.eventBookingId,
                eventId : res?.data?.eventDetails?.eventId
            })
        }
    } catch (error) {
        sweetalert({
            message:error.message,
            type:"error"
        })
        // console.log(error,"action")
        dispatch(errorViewBookingTicket())
    }
}