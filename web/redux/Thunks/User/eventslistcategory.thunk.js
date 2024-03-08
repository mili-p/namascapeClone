import requestApi from "@/utils/request";
import {
    requestEventsListCategory,
    responseEventsListCategory,
    errorEventsListCategory,
    getTotalCountEventsListCategory
} from '../../slices/User/eventslistcategory'
import { sweetalert } from "@/app/components/common/Common";

///////  EventsListCategory Form Api calling  ///////
export const asyncEventsListCategory = (payload, Callback) => async (dispatch) => {
    try {
        dispatch(requestEventsListCategory())
        const res = await requestApi.post('/endUser/web/events/list', payload)
        dispatch(responseEventsListCategory(res))
        dispatch(getTotalCountEventsListCategory(res?.meta))
        if (typeof Callback === 'function') {
            Callback()
        }
    } catch (error) {
        sweetalert({
            message:error.message,
            type:"error"
        })
        // console.log(error,"action")
        dispatch(errorEventsListCategory())
    }
}