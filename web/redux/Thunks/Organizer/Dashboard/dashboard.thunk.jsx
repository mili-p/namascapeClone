import { sweetalert } from '@/app/components/common/Common';
import requestApi from '@/utils/request';
import { dashboardDataFailure, dashboardDataRequest, dashboardDataSuccess } from '../../../slices/Organizer/Dashboard/DashboardSlice';

export const dashBoardThunk = (params,callback) => async(dispatch) => {
    try {
        dispatch(dashboardDataRequest())
        const {data} = await requestApi.post("/organizer/web/dashboard", params);
        dispatch(dashboardDataSuccess(data))
        if(typeof callback === "function"){
          return callback()
        }
      } catch (e) {
        sweetalert({
          message:e?.message,
          type: "error"
      })
        dispatch(dashboardDataFailure(e))
      }
}