import requestApi from "@/utils/request";
import {
    requestSponsoredEventsList,
    responseSponsoredEventsList,
    errorSponsoredEventsList,
    getTotalCountSponsoredEventsList
} from '../../slices/User/sponsoredevents'
import { sweetalert } from "@/app/components/common/Common";

///////  SponsoredEvents Form Api calling  ///////
export const asyncSponsoredEventsList = (payload, Callback) => async (dispatch) => {
    try {
        dispatch(requestSponsoredEventsList())
        const res = await requestApi.post('/endUser/web/events/sponsored-list', payload)
        dispatch(responseSponsoredEventsList(res))
        dispatch(getTotalCountSponsoredEventsList(res.meta))
        if (typeof Callback === 'function') {
            Callback()
        }
    } catch (error) {
        sweetalert({
            message:error.message,
            type:"error"
        })
        // console.log(error,"action")
        dispatch(errorSponsoredEventsList())
    }
}