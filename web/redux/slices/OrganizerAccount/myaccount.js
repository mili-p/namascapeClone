import { createSlice } from "@reduxjs/toolkit";
const myaccount = createSlice({
    name : "myaccount",
    initialState : {
        isloading : false,
        viewBankData : [],
        userData:typeof window !=="undefined" ? JSON.parse(localStorage.getItem('userData')) ?? null :null,
        contctAdmin : []
    },
    reducers : {

        ////// personal- details start ////
        editPersonalDetailRequest : (state,action) => {
            return {...state,isloading:true}
        },
        editPersonalDetailSuccess : (state,action) =>{
            const userData = JSON.stringify(action?.payload)
            localStorage.setItem('userData', userData)
            return {...state,isloading:false,
                userData: action?.payload
            }
        },
        editPersonalDetailFailure : (state,action) =>{
            return {...state,isloading:false}
        },
        ////// personal detail end ////



        ////// view Bank-Details Start //////
        bankDetailsViewRequest : (state,action)=>{
            return {...state,isloading:true}
        },
        bankDetailsViewSuccess : (state,action)=>{
            console.log(action?.payload,"action?.payload");
            return {...state,isloading:false,viewBankData:action?.payload}
        },
        bankDetailsViewFailure : (state,action)=>{
            return {...state,isloading:false,viewBankData : null}
        },
        ////// view Bank-Details End //////

        /////// Edit bank detail start //////
        editBankDetailRequest:(state,action)=>{
            return {...state,isloading:true}
        },
        editBankDetailSuccess:(state,action)=>{
            return {...state,isloading:false}
        },
        editBankDetailFailure:(state,action)=>{
            return {...state,isloading:false}
        },
        /////// End Edit bank detail ///// 

        /////// Contact Admin Data Get start///////
            contactAdminRequest : (state,action) =>{
                return {...state,isloading:true}
            },
            contactAdminSuccess : (state,action) =>{
                return {...state,isloading:false,contctAdmin:action?.payload}
            },
            contactAdminFailure : (state,action) =>{
                return {...state,isloading:false}
            },
        //////  Contact Admin Data get End /////


        ///// change password start /////
        changePasswordRequest :(state,action)=>{
            return {...state,isloading:true}
        },
        changePasswordSuccess :(state,action)=>{
            console.log(action.payload.meta.message,"1233333");
            return {...state,data:action.payload,isloading:false}
        },
        changePasswordFailure :(state,action)=>{
            return {...state,isloading:false}
        },  
        ///// change password end //////
    }
})

export const {
    changePasswordRequest,
    changePasswordSuccess,
    changePasswordFailure,
    editPersonalDetailFailure,
    editPersonalDetailRequest,
    editPersonalDetailSuccess,
    bankDetailsViewRequest,
    bankDetailsViewSuccess,
    bankDetailsViewFailure,
    editBankDetailRequest,
    editBankDetailSuccess,
    editBankDetailFailure,
    contactAdminRequest,
    contactAdminSuccess,
    contactAdminFailure
} = myaccount.actions
export default myaccount.reducer