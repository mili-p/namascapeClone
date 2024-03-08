import { sweetalert } from "@/app/components/common/Common";
import { failureEventList, getTotalCountEventList, globalSearchDataList, requestEventList, successEventList } from "../../../slices/Organizer/EventManagement/EventManagementSlice";
import requestApi from "@/utils/request";

export const eventManagementThunk = (params,callback) => async(dispatch) => {
  console.log(params?.search,"pppppppppppppppppppp");
    try {
        dispatch(requestEventList())
        const {data,meta} = await requestApi.post("/organizer/web/events/list",params);
        if(!params?.search){
        dispatch(successEventList(data))}
        dispatch(getTotalCountEventList(meta))
        if(params?.search){
          dispatch(globalSearchDataList(data))
        }
        if(typeof callback === "function"){
          callback()
        }
      } catch (e) {
        sweetalert({
          message:e?.message,
          type: "error"
      })
        dispatch(failureEventList(e))
      }
  }