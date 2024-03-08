
import { sweetalert } from "@/app/components/common/Common";
import requestApi from "@/utils/request";
import { failureTermsAndConditionsUserView, requestTermsAndConditionsUserView, successTermsAndConditionsUserView } from "../../../slices/User/TermsandConditionsUserSlice/TermsandConditionsUserSlice";

export const UserTermsAndConditionsViewThunk = (params) => async (dispatch) => {
    try {
      dispatch(requestTermsAndConditionsUserView());
      const { data, meta } = await requestApi.post("/endUser/organizer-terms-and-conditions",params);
      dispatch(successTermsAndConditionsUserView(data));
    } catch (e) {
      sweetalert({
        message: e?.message,
        type: "error",
      });
      dispatch(failureTermsAndConditionsUserView(e));
    }
  };
  