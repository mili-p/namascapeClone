import React from 'react'
import './ForgotPassword.scss'
import BackButton from '../../components/common/BackButton'

import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import { asyncforgotpassword } from '../../redux/thunk/authThunk/forgotpassword.thunk'
import { home, resetpassword } from '../../config/routeConsts'
import LoaderBtn from '../../components/common/LoaderBtn'


const ForgotPassword = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isLoading} = useSelector((e) => e.forgotpassword.isLoading)

    const validationSchema = yup.object({
        email:yup.string().email("Please enter valid email").required("Please enter email").matches(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ,"Please enter correct email").trim()
    })
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(validationSchema)
    })
    
    const ForgotPasswordHandle = (data) => {
        dispatch(
            asyncforgotpassword(
                data,
                () => {
                    navigate(resetpassword, { state: data.email })
                },
                []
            )
        )
    }

    return (
        <div className="auth-form forgot-password md:flex md:justify-start md:flex-col">
           <Link to={home}><BackButton /></Link>
            <div className="auth-title">
                <h1 className="h-50">forgot password?</h1>
                <p>
                    Enter your registered email address, we will send
                    verification code for resetting password.
                </p>
            </div>
            <div className="form-wrapper">
                <form onSubmit={handleSubmit(ForgotPasswordHandle)}>
                    <div className="input-group w-full">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            // placeholder={'Enter Email'}
                            {...register('email')}
                        />
                         {errors?.email?.message && (
                    <span className="error-msg">{errors?.email?.message}</span>
                )}
                    </div>
                    <button className="solid-btn w-full" type="submit">
                    {isLoading ? <LoaderBtn /> :"Reset Password"}   
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword
