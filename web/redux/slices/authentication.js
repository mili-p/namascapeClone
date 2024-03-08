import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from "cookies-next";

const userTypeAll = getCookie("userType");
const LocalAuthToken = getCookie("authToken");
const userToken = getCookie("userAuthToken");
const organizerToken = getCookie("organizerAuthToken");

////// Encrytion Data ///////
// const EncodedToken = btoa(LocalAuthToken)
///// Description data //////
// const DecodedToken = atob(EncodedToken)
////////////////////

const authentication = createSlice({
  name: "auth",
  initialState: {
    isloading: false,
    logoutLoader: false,
    userData:
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("userData")) ?? null
        : null,
    // userData: null,
  },
  reducers: {
    //////// Sign Up Start ///////
    signUpRequest: (state, action) => {
      return { ...state, isloading: true };
    },
    signUpSuccess: (state, action) => {
      return { ...state, isloading: false, userData: action?.payload };
    },
    signUpFailure: (state, action) => {
      return { ...state, isloading: false };
    },
    //////// Sign Up End ///////

    //////////////// OTP Verification start ////////////////
    OTPVerificationRequest: (state, action) => {
      return { ...state, isloading: true };
    },
    OTPVerificationSuccess: (state, action) => {
      if (action?.payload?.data?.isVerified) {
        const userType = action?.payload?.data?.userType;
        const authToken = LocalAuthToken
          ? LocalAuthToken
          : action?.payload?.meta?.token;
        const userData = JSON.stringify(action?.payload);
        localStorage.setItem("userData", userData);
        document.cookie = `authToken=${authToken};  path=/`;
        document.cookie = `userType=${userType};  path=/`;
        // document.cookie = `userData=${userData}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`
      }
      return { ...state, userData: action?.payload, isloading: false };
    },
    OTPVerificationFailure: (state, action) => {
      return { ...state, userData: action?.payload, isloading: false };
    },
    ///////////////  OTP Verification End   ///////////////

    ///// resend OTP ////
    ResendOTPVerificationRequest: (state, action) => {
      return { ...state, isloading: true };
    },
    ResendOTPVerificationSuccess: (state, action) => {
      console.log(" Resend OTP VERI", action);

      return { ...state, isloading: false };
    },
    ResendOTPVerificationFailure: (state, action) => {
      return { ...state, isloading: false };
    },
    ////// resend otp end/////

    //////// Sign In Start ///////
    signInRequest: (state, action) => {
      return { ...state, isloading: true };
    },
    signInSuccess: (state, action) => {
      if (action?.payload?.data?.isVerified) {
        const userType = action?.payload?.data?.userType;
        const authToken = action?.payload?.meta?.token;
        // const userAuthToken = action.payload?.data?.userType === 2 ? action?.payload?.meta?.token : ""
        // const organizerAuthToken = action.payload?.data?.userType === 1 ? action?.payload?.meta?.token : ""
        const userData = JSON.stringify(action?.payload);
        localStorage.setItem("userData", userData);
        // document.cookie = `authToken=${userAuthToken}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`
        // document.cookie = `authToken=${organizerToken}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`
        document.cookie = `authToken=${authToken}; path=/`;
        document.cookie = `userType=${userType}; path=/`;
        // document.cookie = `userData=${userData}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`
      }
      return {
        ...state,
        isloading: false,
        userData: action?.payload,
      };
    },
    signInFailure: (state, action) => {
      return { ...state, isloading: false };
    },
    //////// Sign In End ///////

    //// Forgot-Password start //////
    forgotpassRequest: (state, action) => {
      return { ...state, isloading: true };
    },
    forgotpassSuccess: (state, action) => {
      return { ...state, isloading: false };
    },
    forgotpassFailure: (state, action) => {
      return { ...state, isloading: false };
    },
    //// Forgot-Password End ///////

    ////// Reset Password Start ///////
    resetPassRequest: (state, action) => {
      return { ...state, isloading: true };
    },
    resetPassSuccess: (state, action) => {
      return { ...state, isloading: false };
    },
    resetPassFailure: (state, action) => {
      return { ...state, isloading: false };
    },
    ////// Reset password End //////

    //////// LogOut User ///////
    logOutUserRequest: (state, action) => {
      return { ...state, logoutLoader: true };
    },
    logOutUserSuccess: (state, action) => {
      document.cookie =
        "authToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;";
      document.cookie =
        "userType=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
      document.cookie =
        "language=; expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;";
      document.cookie =
        "currentPage=; expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;";
      // document.cookie = 'userData=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';

      return { ...state, logoutLoader: false };
    },
    logOutUserFailure: (state, action) => {
      return { ...state, logoutLoader: false };
    },
    //////// End LogOut User ///////
  },
  extraReducers: (builder) => {
    builder.addCase("update", (state, action) => {
      console.log(action?.finalLocalData?.data, "fgdhddrfddfd");
      return {
        ...state,
        userData: {
          ...state.userData,
          data: action?.finalLocalData?.data
            ? action?.finalLocalData?.data
            : action?.payload?.data,
        },
      };
      // action is inferred correctly here if using TS
    });
    // You can chain calls, or have separate `builder.addCase()` lines each time
  },
});

export const {
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
  ResendOTPVerificationSuccess,
  ResendOTPVerificationFailure,
  forgotpassRequest,
  forgotpassSuccess,
  forgotpassFailure,
  resetPassRequest,
  resetPassSuccess,
  resetPassFailure,
  logOutUserRequest,
  logOutUserSuccess,
  logOutUserFailure,
} = authentication.actions;
export default authentication.reducer;
