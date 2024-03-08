"use client"
import React, { useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import OtpInputControl from '@/app/components/OtpInputControl'
import i18n from '../../../i18n/i18n'
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../../../redux/Thunks/auth.thunk";
import Timmer from "../Timmer";
import LoaderBtn from "../common/LoaderBtn";

const ResetPasswordForm = () => {
    const {isloading} = useSelector((m)=>m.authentication)
    const router = useRouter()
    const search = useSearchParams()
    const emailQuery = search.get('email')
    // const otpValidation = (otpArray) => {
    //     const otp = otpArray.join('') // Convert the OTP array to a single string
    //     if (!/^\d{4}$/.test(otp)) {
    //         return i18n.t('resetPassword.validation.otp.invalidOtp')
    //     }
    //     return true
    // }
    // const emojiRegex = /^[a-zA-Z][a-zA-Z ]*$/
    const userValidation = yup.object({
        // otp: yup
        //     .array()
        //     .of(yup.string())
        //     .test('otp-validation', 'Invalid OTP code', otpValidation)
        //     .required(i18n.t('resetPassword.validation.otp.required')),
        otp : yup.string().required(i18n.t('resetPassword.validation.otp.required')),
        newpassword: yup
            .string()
            .required(i18n.t('resetPassword.validation.newpassword.required'))
            .min(6, i18n.t('signup.validation.password.min'))
            .max(15, i18n.t('signup.validation.password.max'))
            .matches(/^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/,"Enter valid password"),
            // .matches(emojiRegex, {
            //     message: 'Please enter valid password.'
            // }),
        confirmpassword: yup
            .string()
            .oneOf([yup.ref('newpassword')], i18n.t('resetPassword.validation.confirmpassword.match'))
            .required(i18n.t('resetPassword.validation.confirmpassword.required'))
    })
    const {
        handleSubmit,
        register,
        reset,
        control,
        formState: { errors }
    } = useForm({ resolver: yupResolver(userValidation), mode: 'all' })

    const dispatch = useDispatch()
    const [otp,setOtp] = useState('')


    ///// Password toggle /////
    const [passwordShown, setPasswordShown] = useState([])
    const togglePasswordVisiblity = (e) => {
        setPasswordShown((ert) => {
            if (ert.includes(e)) {
                return ert.filter((ttt) => {
                    return ttt !== e
                })
            } else {
                return [...ert, e]
            }
        })
    }
    ////  End Password Toggle //////

    
    const onResetFormSubmit = (data) => {
        // console.log(data,"data");
        dispatch(resetPassword({email:emailQuery,password:data?.confirmpassword,otp:Number(otp)},
        ()=>{
            // alert('')
            router.push('/signin')
            reset()
        }))
    }
    
    return (
        <form onSubmit={handleSubmit(onResetFormSubmit)}>
            <div className="input-group w-full">
                <label htmlFor="otp">{i18n.t('resetPassword.form.input.otp.label')}</label>
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
                  />
                )}
            />
             {errors?.otp?.message && <span className="error-msg">{errors?.otp?.message}</span>}
            </div>
            <div className="input-group w-full">
                <label htmlFor="password">{i18n.t('resetPassword.form.input.newPassword.label')}</label>
                <div className="pwd-input">
                    <input
                        type={
                            passwordShown?.includes('newpassword')
                                ? 'text'
                                : 'password'
                        }
                        id="newpassword"
                        name="newpassword"
                        aria-label="newpassword"
                        {...register('newpassword')}
                    />
                    <button
                        type="button"
                        className="eye-btn"
                        aria-label="Eye"
                        onClick={(e) => {
                            togglePasswordVisiblity('newpassword')
                        }}
                    >
                        {passwordShown?.includes('newpassword') ? (
                            <i className="icon-eye-open"></i>
                        ) : (
                            <i className="icon-eye-close"></i>
                        )}
                        {/* <i className="icon-eye-open"></i> */}
                        {/* <i className="icon-eye-close"></i> */}
                    </button>
                </div>
                {errors?.newpassword?.message && (
                    <span className="error-msg">
                        {errors?.newpassword?.message}
                    </span>
                )}
            </div>
            <div className="input-group w-full">
                <label htmlFor="password">{i18n.t('resetPassword.form.input.confirmPassword.label')}</label>
                <div className="pwd-input">
                    <input
                        type={
                            passwordShown?.includes('confirmpassword')
                                ? 'text'
                                : 'password'
                        }
                        id="confirmpassword"
                        name="confirmpassword"
                        aria-label="confirmpassword"
                        {...register('confirmpassword')}
                    />
                    <button
                        type="button"
                        className="eye-btn"
                        aria-label="Eye"
                        onClick={(e) => {
                            togglePasswordVisiblity('confirmpassword')
                        }}
                    >
                        {passwordShown?.includes('confirmpassword') ? (
                            <i className="icon-eye-open"></i>
                        ) : (
                            <i className="icon-eye-close"></i>
                        )}
                        {/* <i className="icon-eye-open"></i> */}
                        {/* <i className="icon-eye-close"></i> */}
                    </button>
                </div>
                {errors?.confirmpassword?.message && (
                    <span className="error-msg">
                        {errors?.confirmpassword?.message}
                    </span>
                )}
            </div>
            {isloading ? 
                <button type="submit" className="solid-btn w-full">
                    <LoaderBtn />
                </button>
            :
            <button type="submit" className="solid-btn w-full">
                {i18n.t('resetPassword.form.confirmPassword')}
            </button>
            }
            {/* <span className='para'><span className="link cursor-pointer">Resend OTP</span></span> */}
            <Timmer/>
        </form>
    )
}

export default ResetPasswordForm;