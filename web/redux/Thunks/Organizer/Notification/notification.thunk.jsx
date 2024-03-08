import requestApi from "@/utils/request";
import {
  AllNotificationData,
  // AllNotificationData,
  failureNotificationList,
  failureNotificationRead,
  failureNotificationView,
  getTotalCountNotificationList,
  requestNotificationList,
  requestNotificationRead,
  requestNotificationView,
  successNotificationList,
  successNotificationRead,
  successNotificationView,
} from "../../../slices/Organizer/Notification/NotificationSlice";
import { sweetalert } from "@/app/components/common/Common";

export const eventNotificationThunk = (params,callback,page) => async (dispatch) => {
  console.log(params,'paramsparamsparams')
  try {
    dispatch(requestNotificationList());
    const { data, meta } = await requestApi.post(
      "/notifications/get-all-notifications",
      params
    );
    // dispatch(successNotificationList(data));
    dispatch(AllNotificationData({data: data,page:params?.page}))
    if(typeof callback === "function"){
      callback(data)
    }
    dispatch(getTotalCountNotificationList(meta));
  } catch (e) {
    sweetalert({
      message: e?.message,
      type: "error",
    });
    dispatch(failureNotificationList(e));
  }
};

export const eventNotificationReadThunk = (params,callback) => async (dispatch) => {
  try {
    dispatch(requestNotificationRead());
    const { data, meta } = await requestApi.post(
      "/notifications/read-single-notifications",
      params
    );
    dispatch(successNotificationRead(data));
    if(typeof callback === "function"){
      callback()
    }
    // dispatch(getTotalCountNotificationList(meta));
  } catch (e) {
    sweetalert({
      message: e?.message,
      type: "error",
    });
    dispatch(failureNotificationRead(e));
  }
};


export const eventNotificationViewThunk = (params,callback) => async (dispatch) => {
  try {
    dispatch(requestNotificationView());
    const { data } = await requestApi.post(
      "/notifications/view-notifications"
    );
    dispatch(successNotificationView(data));
    if(typeof callback === "function"){
      callback()
    }
  } catch (e) {
    sweetalert({
      message: e?.message,
      type: "error",
    });
    dispatch(failureNotificationView(e));
  }
};
