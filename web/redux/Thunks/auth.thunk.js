import { sweetalert } from '@/app/components/common/Common'
import requestApi from '@/utils/request'
import {
    signInRequest,
    signInSuccess,
    signInFailure,
    signUpRequest,
    signUpSuccess,
    signUpFailure,
    OTPVerificationRequest,
    OTPVerificationSuccess,
    OTPVerificationFailure,
    ResendOTPVerificationRequest,
    ResendOTPVerificationFailure,
    ResendOTPVerificationSuccess,
    forgotpassRequest,
    forgotpassSuccess,
    forgotpassFailure,
    resetPassFailure,
    resetPassSuccess,
    resetPassRequest,
    logOutUserRequest,
    logOutUserSuccess,
    logOutUserFailure,
} from '../slices/authentication'

/////// sign up Api calling ////
export const signUp = (payload, Callback) => async (dispatch) => {
    try {
        dispatch(signUpRequest())
        const res = await requestApi.post('/user/register', payload)
        dispatch(signUpSuccess(res))
        if (typeof Callback === 'function') {
            Callback()
        }
    } catch (error) {
        sweetalert({
            message:error.message,
            type:"error"
        })
        dispatch(signUpFailure())
    }
}


/// OTP - Verification Api calling /////
export const OTPVerification = (payload, Callback) => async (dispatch) => {
    try {
        dispatch(OTPVerificationRequest())
        const res = await requestApi.post('/user/verify-user', payload)

        dispatch(OTPVerificationSuccess(res))

        if (typeof Callback === 'function') {
            Callback()
        }
    } catch (error) {
        sweetalert({
            message:error.message,
            type:"error"
        })
        dispatch(OTPVerificationFailure())
    }
}


////// Resend OTP Verification api calling /////
export const ResendOTPVerification =
    (payload, Callback) => async (dispatch) => {
        try {
            dispatch(ResendOTPVerificationRequest())
            const res = await requestApi.post('/user/resend-otp', payload)
            sweetalert({
                message:res?.meta?.message,
                type:"success"
            })
            dispatch(ResendOTPVerificationSuccess(res))
            if (typeof Callback === 'function') {
                Callback()
            }
        } catch (error) {
            sweetalert({
                message:error.message,
                type:"error"
            })
            dispatch(ResendOTPVerificationFailure())
        }
    }


/////// Sign In Api Calling //////
export const signIn = (payload, callback) => async (dispatch) => {
    try {
        dispatch(signInRequest())
        const data = await requestApi.post('/user/login', payload)
        dispatch(signInSuccess(data))
        if (typeof callback === "function") {
            callback(data?.data)
        }
    } catch (error) {
        sweetalert({
            message:error.message,
            type:"error"
        })
        dispatch(signInFailure())
    }
}

//////// Forgot-Password Api calling /////
export const forgotPassword = (payload, callback) => async (dispatch) => {
    try {
        dispatch(forgotpassRequest())
        const data = await requestApi.post('/user/forgot-password', payload)
        dispatch(forgotpassSuccess())
        if (typeof callback === "function") {
            callback()
        }
    } catch (error) {
        sweetalert({
            message:error.message,
            type:"error"
        })
        dispatch(forgotpassFailure())
    }
}

/////// Reset password Api calling
export const resetPassword = (payload, callback) => async (dispatch) => {
    try {
        dispatch(resetPassRequest())
        const data = await requestApi.post('/user/reset-password', payload)
        dispatch(resetPassSuccess())
        if (typeof callback === "function") {
            callback()
        }
    } catch (error) {
        sweetalert({
            message:error.message,
            type:"error"
        })
        dispatch(resetPassFailure())
    }
}



/////// logout user account //// 
export const logOutUser = (payload, callback) => async (dispatch) => {
    try {
        dispatch(logOutUserRequest())
        const data = await requestApi.post(`/user/logout`, payload)
        dispatch(logOutUserSuccess(data)) 
        if (typeof callback === "function") {
            callback()
            window.location.reload(true)
        }
        // localStorage.removeItem('userData')
        // localStorage.removeItem('language')
        localStorage.clear()
    }
    catch (error) {
        sweetalert({
            message:error.message,
            type:"error"
        })
        dispatch(logOutUserFailure())
    }
}