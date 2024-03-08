import { sweetalert } from "@/app/components/common/Common";
import requestApi from "@/utils/request";
import {
  failureTermsAndConditionsAddEdit,
  failureTermsAndConditionsView,
  requestTermsAndConditionsAddEdit,
  requestTermsAndConditionsView,
  successTermsAndConditionsAddEdit,
  successTermsAndConditionsView,
} from "../../../slices/Organizer/TermsandConditions/TermsandConditionsSlice";

export const TermsAndConditionsAddEditThunk = (params,callback) => async (dispatch) => {
  try {
    dispatch(requestTermsAndConditionsAddEdit());
    const { data, meta } = await requestApi.post(
      "/user/add-edit-terms-conditions",
      params
    );
    dispatch(successTermsAndConditionsAddEdit(data));
    if(typeof callback === "function"){
      callback(meta)
    }
  } catch (e) {
    sweetalert({
      message: e?.message,
      type: "error",
    });
    dispatch(failureTermsAndConditionsAddEdit(e));
  }
};

export const TermsAndConditionsViewThunk = (params) => async (dispatch) => {
  try {
    dispatch(requestTermsAndConditionsView());
    const { data, meta } = await requestApi.post("/user/view-terms-conditions");
    dispatch(successTermsAndConditionsView(data));
  } catch (e) {
    sweetalert({
      message: e?.message,
      type: "error",
    });
    dispatch(failureTermsAndConditionsView(e));
  }
};
