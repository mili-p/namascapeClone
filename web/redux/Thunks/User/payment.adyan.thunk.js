import { sweetalert } from "@/app/components/common/Common";
import { failureBookedEvent, failureSessionList, failureStatusList, requestSessionList, requestStatusList, successSessionList, successStatusList } from "../../slices/User/creditCardSlice";
import requestApi from "@/utils/request";

export const eventPaymentAdyanCreditCardThunk = (params) => async(dispatch) => {
    try {
        dispatch(requestSessionList())
        const {data,meta} = await requestApi.post("/endUser/events/sessions/create",params);
        dispatch(successSessionList(data))
        dispatch(failureBookedEvent(meta))
      } catch (e) {
        sweetalert({
          message:e?.message,
          type: "error"
      })
        dispatch(failureSessionList(e))
      }
  }


  export const eventPaymentStatusThunk = (params) => async(dispatch) => {
    try {
        dispatch(requestStatusList())
        const {data,meta} = await requestApi.post("/endUser/events/payments/details",params);
        dispatch(successStatusList(data))
        // dispatch(failureStatusList(meta))
      } catch (e) {
        sweetalert({
          message:e?.message,
          type: "error"
      })
      dispatch(failureStatusList(e))
      }
  }