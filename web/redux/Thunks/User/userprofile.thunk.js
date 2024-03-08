import requestApi from "@/utils/request";
import {
    requestUserProfile,
    responseUserProfile,
    errorUserProfile,
    getTotalCountUserprofile
} from '../../slices/User/userprofile'
import { sweetalert } from "@/app/components/common/Common";

/////// UserProfile Api calling  ///////
export const asyncUserProfile = (payload, Callback) => async (dispatch) => {
    console.log(payload,"payloadpayloadpayloadpayload")
    try {
        dispatch(requestUserProfile())
        const res = await requestApi.post('/endUser/user-profile', payload)
        dispatch(responseUserProfile(res))
       const {meta} = JSON.parse(localStorage.getItem("userData"))
       const dataLocal = {...res?.data?.userData,city:res?.data?.userData?.city?.name}
       const finalLocalData = {data : dataLocal,meta}
        console.log({data : dataLocal,meta},'res?.data')
        // const a = JSON.stringify({...res?.data?.userData,city:res?.data?.userData?.city?.name})
        console.log(res?.data,"gggggggggggg")
        localStorage.setItem("userData",JSON.stringify(finalLocalData))
        dispatch({type: "update",finalLocalData})
        dispatch(getTotalCountUserprofile(res?.meta)) 
        if (typeof Callback === 'function') {
            Callback()
        }
    } catch (error) {
        sweetalert({
            message:error.message,
            type:"error"
        })
        // console.log(error,"action")
        dispatch(errorUserProfile())
    }
}