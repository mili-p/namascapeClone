import { failureAttendessAcceptDecline, requestAttendessAcceptDecline, successAttendessAcceptDecline } from "../../../slices/User/AttendessAcceptDeclineSlice/AttendessAcceptDeclineSlice";
import requestApi from "@/utils/request";
import { sweetalert } from "@/app/components/common/Common";

export const AttendessAcceptDeclineThunk = (params,callback) => async (dispatch) => {
    try {
      dispatch(requestAttendessAcceptDecline());
      const { data, meta } = await requestApi.post("/enduser/events/change-user-view-status",params);
      dispatch(successAttendessAcceptDecline(data));
      if(typeof callback === "function"){
        callback()
      }
    } catch (e) {
      sweetalert({
        message: e?.message,
        type: "error",
      });
      dispatch(failureAttendessAcceptDecline(e));
    }
  };
  