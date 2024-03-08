import { sweetalert } from "@/app/components/common/Common";
import requestApi from "@/utils/request";
import {
    requestLanguageChange,
    responseLanguageChange,
    errorLanguageChange,
    deleteAccountRequest,
    deleteAccountSuccess,
    deleteAccountFailure
} from '../../slices/languagechange'
import {logOutUserSuccess} from '../../slices/authentication'
/////// Language Change Api calling ////

export const asyncLanguageChange = (payload, Callback) => async (dispatch) => {
    try {
        dispatch(requestLanguageChange())
        const res = await requestApi.post('/user/setting', payload)
        console.log(res,"res");
        dispatch(responseLanguageChange(res))
        dispatch({type:"update",payload:res})
        if (typeof Callback === 'function') {
            Callback()
        }
        sweetalert({
            message:res?.meta?.message,
            type:"success"
        })
    } catch (error) {
        sweetalert({
            message:error?.message,
            type:"error"
        })
        dispatch(errorLanguageChange())
        
    }
}



// Delete Account Api calling /////
export const deleteUserAccount = (payload,callback) => async (dispatch) => {
    try{
        dispatch(deleteAccountRequest())
        const data = await requestApi.post(`/user/delete-account`,payload)
        dispatch(deleteAccountSuccess(data))
        dispatch(logOutUserSuccess())
        if(typeof callback === 'function'){
            callback()
        }
    }
    catch(error){
        sweetalert({
            message:error?.message,
            type : "error"
        })
        dispatch(deleteAccountFailure())
    }
}
// End Delete Account Api calling //// 