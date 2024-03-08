'use client'
import React from "react";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'; 
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../../../redux/Thunks/auth.thunk";
import LoaderBtn from "../common/LoaderBtn";
import { useTranslation } from "react-i18next";

const ForgotPasswordForm = () => {
    const dispatch = useDispatch()
    const {t,i18n} = useTranslation()
    const {isloading} = useSelector((m)=>m.authentication)
    const emailMatch = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/
    const passwordFormValidation = yup.object({
        email: yup.string().required(i18n.t('forgotpassword.validation.email.required')).email(i18n.t('forgotpassword.validation.email.email')).matches(emailMatch,{message:i18n.t(`forgotpassword.validation.email.matches`)})
    })

    const { handleSubmit, reset, formState: { errors }, register } = useForm({ resolver: yupResolver(passwordFormValidation), mode: "all" })
    const router = useRouter()
    const forgotPasswordFormSubmit = (data) => {
        dispatch(forgotPassword(data,()=>{
            router.push(`/reset-password?email=${data?.email}`)
            reset()
        }))
        // reset()
        // router.push('/reset-password')
    }

    return (
        <form onSubmit={handleSubmit(forgotPasswordFormSubmit)}>
            <div className='input-group'>
                <label htmlFor="email">{i18n.t('forgotpassword.form.input.email.label')}</label>
                <input type="text" id='email' name='email' {...register('email')} />
                {errors?.email?.message && <span className='error-msg'>{errors?.email?.message}</span>}
            </div>
            {isloading ? 
                <button type="submit" className="solid-btn w-full">
                    <LoaderBtn />
                </button>
            :
                <button type="submit" className='solid-btn w-full'>{i18n.t('forgotpassword.form.resetPassword')}</button>
            }
        </form>
    )
}

export default ForgotPasswordForm;