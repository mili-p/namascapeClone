import requestApi from '@/utils/request'
import {
    requestViewprofile,
    responseViewprofile,
    errorViewprofile
} from '../../slices/viewprofile'

/////// View Profile Api calling ////
export const asyncViewprofile = (payload, Callback) => async (dispatch) => {
    try {
        dispatch(requestViewprofile())
        const res = await requestApi.post('/user/view-profile', payload)
        dispatch(responseViewprofile(res))
        const {meta} = JSON.parse(localStorage.getItem('userData'))
        const Updatedata = res?.data
        console.log("MMMMMMMMMMMMMMMMMMMMMM",res);
        const finalLocalData = {data : Updatedata , meta}
        console.log(finalLocalData,"finallUserDatafinallUserDatafinallUserData");
        localStorage.setItem('userData',JSON.stringify(finalLocalData))
        dispatch({type : "update" , finalLocalData})
        console.log(res,"view RESSSSS");
        if (typeof Callback === 'function') {
            Callback()
        }
    } catch (error) {
        console.log(error,"action")
        dispatch(errorViewprofile())
    }
}