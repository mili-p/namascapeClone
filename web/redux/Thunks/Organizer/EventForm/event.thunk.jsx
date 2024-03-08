import requestApi from "@/utils/request";
import {
  FailureAddEvent,
  FailureGetCity,
  SuccessAddEvent,
  SuccessGetCity,
  failureDeleteEvent,
  failureDuplicateEvent,
  requestAddEvent,
  requestDeleteEvent,
  requestDuplicateEvent,
  requestGetCity,
  successDeleteEvent,
  successDuplicateEvent,
} from "../../../slices/Organizer/EventForm/EventFormSlice";
import { sweetalert } from "@/app/components/common/Common";
import {
  failureViewEvent,
  requestViewEvent,
  successViewEvent,
} from "../../../slices/Organizer/EventManagement/EventManagementSlice";

export const addEventThunk = (params, callback) => async (dispatch) => {
  try {
    dispatch(requestAddEvent());
    const data = await requestApi.post(
      "/organizer/web/events/add-edit",
      params
    );
    dispatch(SuccessAddEvent(data));
    if (typeof callback === "function") {
      return callback();
    }
  } catch (e) {
    sweetalert({
      message: e?.message,
      type: "error",
    });
    dispatch(FailureAddEvent(e));
  }
};

export const getCityThunk = (params) => async (dispatch) => {
  try {
    dispatch(requestGetCity());
    const { data } = await requestApi.post("/cities/list-city", params);
    dispatch(SuccessGetCity(data));
  } catch (e) {
    sweetalert({
      message: e?.message,
      type: "error",
    });
    dispatch(FailureGetCity(e));
  }
};

export const viewEventThunk = (params, callback) => async (dispatch) => {
  try {
    dispatch(requestViewEvent());
    const { data } = await requestApi.post(
      "/organizer/web/events/view",
      params
    );
    dispatch(successViewEvent(data));
    if (typeof callback === "function") {
      return callback();
    }
  } catch (e) {
    sweetalert({
      message: e?.message,
      type: "error",
    });
    dispatch(failureViewEvent(e?.message));
  }
};

export const deleteEventThunk = (params, callback) => async (dispatch) => {
  try {
    dispatch(requestDeleteEvent());
    const { data } = await requestApi.post(
      "/organizer/web/events/delete",
      params
    );
    dispatch(successDeleteEvent(data));
    if (typeof callback === "function") {
      return callback();
    }
  } catch (e) {
    sweetalert({
      message: e?.message,
      type: "error",
    });
    dispatch(failureDeleteEvent(e));
  }
};

export const duplicateEventThunk = (params, callback) => async (dispatch) => {
  try {
    dispatch(requestDuplicateEvent());
    const data = await requestApi.post(
      "/organizer/web/events/duplicate",
      params
    );
    dispatch(successDuplicateEvent(data));
    if (typeof callback === "function") {
      return callback();
    }
  } catch (e) {
    sweetalert({
      message: e?.message,
      type: "error",
    });
    dispatch(failureDuplicateEvent(e));
  }
};
