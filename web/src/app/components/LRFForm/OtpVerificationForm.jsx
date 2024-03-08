"use client"
import React, { useState } from "react";
import OtpInputControl from "@/app/components/OtpInputControl";
import { useForm ,Controller} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import i18n from '../../../i18n/i18n'
import * as yup from 'yup'
import { useRouter, useSearchParams } from "next/navigation";
import { OTPVerification } from "../../../../redux/Thunks/auth.thunk";
import { useDispatch } from "react-redux";
import Timmer from "../Timmer";
import LRFHeader from "../common/LRFHeader";

const OTPuservalidation = yup.object({
  otp : yup.string().required(i18n.t('otpVerification.validation.otp.required'))
})

const OtpVerificationForm = () => {
      const router = useRouter()
      const dispatch = useDispatch()
      const search = useSearchParams()
      const emailQuery = search.get('email')
      const userTypeQuery = search.get('type')
      
      const {handleSubmit,reset,register,formState:{errors},control} = useForm({resolver:yupResolver(OTPuservalidation),mode:"onChange"})
      const [otp,setOtp] = useState('')
      const otpVerificationForm = () =>{
        dispatch(OTPVerification({email:emailQuery , otp : otp},()=>{
          if (userTypeQuery === 'organizer') {
            router.push('/dashboard')
          }else{
            router.push('/events/')
          }
          reset()
      }))
      }
    
    return (
      <>
      <div className="auth-title">
        <LRFHeader
          title={i18n.t(`otpVerification.headerTitle`)}
          description={i18n.t(`otpVerification.description`)}
        />
      </div>
        <form onSubmit={handleSubmit(otpVerificationForm)}>
          <div className="input-group w-full">
            <label htmlFor="otp">{i18n.t('otpVerification.form.input.otp.label')}</label>
            <div className="verification-wrap">
            <Controller
                name="otp"
                control={control}
                render={({ field }) => (
                  <OtpInputControl
                    {...field}
                    autoFocus
                    isNumberInput
                    length={4}
                    onChangeOTP = {(otp)=>{
                      field.onChange(otp) 
                      setOtp(otp)}}
                    // onChangeOTP={(otp) => field.onChange(otp)} // Manually update the value in the field
                  />
                )}
            />
            </div>
            {errors?.otp?.message && <span className="error-msg">{errors?.otp?.message}</span>}
          </div>
          <button type="submit" className="solid-btn w-full">
          {i18n.t('otpVerification.form.confirmOTP')}
          </button>
          <Timmer/>
          {/* <span className='para'>{i18n.t('otpVerification.form.resendVerification')} <span className="link">00:30</span></span> */}
        </form>
        </>
    )
}

export default OtpVerificationForm;