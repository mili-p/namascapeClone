import { sweetalert } from "@/app/components/common/Common"
import requestApi from "@/utils/request"
import {
    bankDetailsViewFailure,
    bankDetailsViewRequest,
    bankDetailsViewSuccess,
    changePasswordFailure,
    changePasswordRequest,
    changePasswordSuccess,
    contactAdminFailure,
    contactAdminRequest,
    contactAdminSuccess,
    editBankDetailFailure,
    editBankDetailRequest,
    editBankDetailSuccess,
    editPersonalDetailFailure,
    editPersonalDetailRequest,
    editPersonalDetailSuccess
} from '../../../slices/OrganizerAccount/myaccount'

// Personal_details Add-edit API calling ///// 
export const personalDetails = (payload,callback) => async (dispatch) => {
    try{
        dispatch(editPersonalDetailRequest())
        const data = await requestApi.post(`/user/edit-profile`,payload)
        dispatch(editPersonalDetailSuccess(data))
        dispatch({type : "update" ,payload : data})
        sweetalert({
            message : data?.meta?.message,
            type : "success"
        })
        if(typeof callback === 'function'){
            callback()
        }
    }
    catch(error){
        sweetalert({
            message : error?.message,
            type : "error"
        })
        dispatch(editPersonalDetailFailure())
    }
}
////// End Personal_details Add-edit API calling ////

///// start view bank details api calling ////////
export const viewBankDetailsData = (payload,callback) => async (dispatch) =>{
    try{
        dispatch(bankDetailsViewRequest())
        const data  = await requestApi.post(`/user/view-bankaccount`,payload)
        dispatch(bankDetailsViewSuccess(data))
        if (typeof callback === 'function') {
            callback()
        }
    }
    catch(error){
        // sweetalert({
        //     message : error?.message,
        //     type : "error"
        // })
        dispatch(bankDetailsViewFailure(error))
    }
}
///// start view bank details api calling ///////


//////// start bank details edit call Api ///////
export const editBankDetail = (payload,callback) => async(dispatch) =>{
    try{
        dispatch(editBankDetailRequest())
        const data = await requestApi.post(`/user/add-edit-bankaccount`,payload)
        dispatch(editBankDetailSuccess(data))
        sweetalert({
            message : data?.meta?.message,
            type : "success"
        })
        if(typeof callback === 'function'){
            callback()
        }
    }
    catch(error){
        sweetalert({
            message : error?.message,
            type:"error"
        })
        dispatch(editBankDetailFailure())
    }
}
//////// End bank details edit call Api //////


///// Change password api calling ////////
export const changepassword = (payload,callback) => async (dispatch) =>{ 
    try {
        dispatch(changePasswordRequest())
        const data =  await requestApi.post(`/user/change-password`,payload)
        dispatch(changePasswordSuccess(data))
        sweetalert({
            message : data?.meta?.message,
            type: "success"
        })
        if (typeof callback === 'function') {
            callback()
        }
    } catch (error) {
        sweetalert({
            message : error?.message,
            type:"error"
        })
        dispatch(changePasswordFailure())
    }
}
///// End Change password api calling ////////


///////////// contact admin api calling start ////////
export const contactAdminThunk = (payload,callback) => async (dispatch) => {
    try {
        dispatch(contactAdminRequest())
        const data =  await requestApi.post(`/contact-us/view-config`,payload)
        dispatch(contactAdminSuccess(data))
        // sweetalert({
        //     message : data?.meta?.message,
        //     type: "success"
        // })
        if (typeof callback === 'function') {
            callback()
        }
    } catch (error) {
        sweetalert({
            message : error?.message,
            type:"error"
        })
        dispatch(contactAdminFailure())
    }
}

///////////// contact admin api calling end ////////