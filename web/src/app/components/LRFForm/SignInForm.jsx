'use client'
import React, { useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { signIn, signUp } from '../../../../redux/Thunks/auth.thunk'
import { useRouter, useSearchParams } from 'next/navigation'
import LoaderBtn from '../common/LoaderBtn'
import { getCookie } from 'cookies-next'
import { useTranslation } from 'react-i18next'

const SignInForm = () => {
    const { isloading } = useSelector((m) => m.authentication)
    const {t,i18n} = useTranslation()
    const search = useSearchParams()
    const userTypeQuery = search.get('type')
    const eventdetails = search.get('from')
    const validPasswordInput = /^[0-9]+$/
    // const emojiRegex = /^[a-zA-Z][a-zA-Z ]*$/
    const emailMatch = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/
    const userValidation = yup.object({
        email: yup
            .string()
            .email(i18n.t('signin.validation.email.email'))
            .required(i18n.t('signin.validation.email.required'))
            .matches(emailMatch, {
                message: i18n.t(`signin.validation.email.matches`)
            }),
        password: yup
            .string()
            .trim()
            .required(i18n.t('signin.validation.password.required'))
            // .min(6, i18n.t('signin.validation.password.min'))
            // .max(10, i18n.t('signin.validation.password.max'))
            // .matches(emojiRegex, {
            //     message: 'Please enter valid password.'
            // })
            // .test('emojis', 'Please enter valid password.', (value) => {
            //     if (!value) {
            //         return true
            //     }
            //     return !emojiRegex.test(value) || value
            // })
    })
    const router = useRouter()
    const {
        handleSubmit,
        reset,
        register,
        formState: { errors }
    } = useForm({ resolver: yupResolver(userValidation), mode: 'onChange' })
    const dispatch = useDispatch()
    const [passwordToggle, setPasswordToggle] = useState(false)
    const togglePassFun = () => {
        setPasswordToggle(passwordToggle ? false : true)
    }

    const userType = getCookie('userType')
    const pageCurrent = getCookie('currentPage')

    

    useEffect(() => {
        if(userType === '1'){
            router.refresh()
        }
    },[])
    const onFormSubmit = (data) => {
        const loginData = {...data, userType: userTypeQuery === 'organizer' ? 1 : 2}
        dispatch(signIn(loginData, (e) => {
            // console.log(e, "response");
            if (e?.isVerified) {
                try {
                    // let abc=atob(eventdetails)
                    // router.replace(`${abc}`)
                    if (!eventdetails) {
                        if (e?.userType === 1) {
                            // console.log('dashboard')
                            router.push('/dashboard/')
                            document.cookie = 'currentPage=; expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;';
                        }else {
                            // console.log('/')
                            router.push(pageCurrent)
                        }
                    }
                } catch (error) {
                    router.replace('/')
                }
                
            }
            else {
                router.push(`/otp-verification?email=${data.email}`)
            }
            reset()
        }))
    }

    return (
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <div className="input-group w-full">
                <label htmlFor="email">
                    {i18n.t('signin.form.input.email.label')}
                </label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    {...register('email')}
                />
                {errors?.email?.message && (
                    <span className="error-msg">{errors?.email?.message}</span>
                )}
            </div>
            {/* {errors?.email?.message && <span style={{color:"red"}}>{errors?.email?.message}</span>} */}
            <div className="input-group w-full">
                <label htmlFor="password">
                    {i18n.t('signin.form.input.password.label')}
                </label>
                <div className="pwd-input"> 
                    <input
                        type={passwordToggle ? 'text' : 'password'}
                        id="password"
                        name="password"
                        {...register('password')}
                    />

                    <button
                        type="button"
                        className="eye-btn"
                        onClick={togglePassFun}
                    >
                        <i
                            className={
                                passwordToggle
                                    ? 'icon-eye-open'
                                    : 'icon-eye-close'
                            }
                        ></i>
                        {/* {passwordToggle ? <i className='icon-eye-open'></i> : <i className='icon-eye-close'></i>}  */}
                    </button>
                </div>
                {errors?.password?.message && (
                    <span className="error-msg">
                        {errors?.password?.message}
                    </span>
                )}
            </div>
            {/* {errors?.password?.message && <span style={{color:"red"}}>{errors?.password?.message}</span>} */}
            <div className="forget-pwd-link text-end">
                <Link href="/forgot-password">
                    {i18n.t('signin.forgotPassword')}
                </Link>
            </div>
            {isloading ?
                <button type="submit" className="solid-btn w-full">
                    <LoaderBtn />
                </button>
                :
                <button className="solid-btn w-full" type="submit">
                    {i18n.t('signin.signin')}
                </button>
            }
            {userTypeQuery === 'organizer' ?
                <span className="para small-text">
                   {i18n.t(`signin.areyouuser`)} <Link href="/signin">{i18n.t(`signin.clickheretosignin`)}</Link>
                </span>
                :
                <span className="para small-text">
                  {i18n.t('signin.areyoueventorganizer')} <Link href="/signin?type=organizer">{i18n.t(`signin.clickheretosignin`)}</Link>
                </span>
            }
            <span className="para">
                {i18n.t('signin.Donthaveanaccount')}{' '}
                <Link href={userTypeQuery === 'organizer' ? "/signup?type=organizer" : "/signup"}>{i18n.t('signin.signup')}</Link>
            </span>
        </form>
    )
}

export default SignInForm
