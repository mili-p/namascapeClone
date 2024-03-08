import requestApi from "@/utils/request";
import { failureEventBookingExportData, failureEventBookingList, failureEventBookingView, getTotalCountEventBookingList, requestEventBookingExportData, requestEventBookingList, requestEventBookingView, successEventBookingExportData, successEventBookingList, successEventBookingView } from "../../../slices/Organizer/EventBooking/EventBookingSlice";
import { sweetalert } from "@/app/components/common/Common";


export const EventBookingListThunk = (params) => async(dispatch) => {
    try {
        dispatch(requestEventBookingList())
        const {data,meta} = await requestApi.post("/organizer/web/event-booking/list",params);
        dispatch(successEventBookingList(data))
        dispatch(getTotalCountEventBookingList(meta));
      } catch (e) {
        sweetalert({
          message:e?.message,
          type: "error"
      })
        dispatch(failureEventBookingList(e))
      }
  }


  export const EventBookingViewThunk = (params) => async(dispatch) => {
    try {
        dispatch(requestEventBookingView())
        const {data} = await requestApi.post("/organizer/web/event-booking/view",params);
        dispatch(successEventBookingView(data))
      } catch (e) {
        sweetalert({
          message:e?.message,
          type: "error"
      })
        dispatch(failureEventBookingView(e))
      }
  }

  export const EventBookingExportDataThunk = (params,callback) => async(dispatch) => {
    try {
        dispatch(requestEventBookingExportData())
        const {data} = await requestApi.post("/organizer/web/event-booking/export-data",params);
        dispatch(successEventBookingExportData(data))
        if(typeof callback === "function"){
          callback(data.url)
        }
      } catch (e) {
        sweetalert({
          message:e?.message,
          type: "error"
      })
        dispatch(failureEventBookingExportData(e))
      }
  }

