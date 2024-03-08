import React, { useState, useEffect } from 'react'
import './ResetPassword.scss'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch } from 'react-redux'
import {
    asyncresendotp,
    asyncresetpassword
} from '../../redux/thunk/authThunk/resetpassword.thunk'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { forgotpassword, home } from '../../config/routeConsts'
import BackButton from '../../components/common/BackButton'
import OtpInputControl from '../../components/OtpInputControl'

//#region Reset-Password Validation
const validationSchema = yup.object({
    otp: yup.string().required('Please enter Verification Code').trim(),
    newpassword: yup
        .string()
        .required('Please enter password')
        .trim()
        .min(6, 'Password must be 6 to 15 characters long.')
        .max(15, 'Password must be 6 to 15 characters long.'),
    confirmpassword: yup
        .string()
        .required('Please enter confirm password')
        .trim()
        .min(6, 'Password must be 6 to 15 characters long.')
        .max(32, 'Password must be 6 to 15 characters long.')
        .oneOf([yup.ref('newpassword'), null], 'Password does not match.')
})
//#endregion

const ResetPassword = () => {
    const { state } = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [otp, setOtp] = useState('')

    useEffect(() => {
        if (!state) {
            navigate(forgotpassword)
        }
    }, [])

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control
    } = useForm({
        resolver: yupResolver(validationSchema)
    })

    const [newpasswordToggle, setNewPasswordToggle] = useState(false)

    const toggleNewPassFun = () => {
        setNewPasswordToggle(newpasswordToggle ? false : true)
    }
    const [confirmpasswordToggle, setConfirmPasswordToggle] = useState(false)

    const toggleConfirmPassFun = () => {
        setConfirmPasswordToggle(confirmpasswordToggle ? false : true)
    }

    const handleresetForm = (data) => {
        dispatch(
            asyncresetpassword(
                {
                    email: state,
                    otp: data.otp,
                    password: data.newpassword
                },
                () => {
                    navigate(home)
                }
            )
        )
    }

    return (
        <div className="auth-form reset-password md:flex md:justify-start md:flex-col">
            <Link to={forgotpassword}>
                <BackButton />
            </Link>

            <div className="auth-title">
                <h1 className="h-50">reset password</h1>
                <p>
                    Enter the Verification Code we sent to you on registered
                    email address.
                </p>
            </div>

            <div className="form-wrapper">
                <form onSubmit={handleSubmit(handleresetForm)}>
                    <div className="input-group timmer-group w-full">
                        <label htmlFor="otp">Verification Code</label>
                        <Controller
                            name="otp"
                            control={control}
                            render={({ field }) => (
                                <OtpInputControl
                                    {...field}
                                    autoFocus
                                    isNumberInput
                                    length={4}
                                    onChangeOTP={(otp) => {
                                        field.onChange(otp)
                                        setOtp(otp)
                                    }}
                                />
                            )}
                        />
                        {errors?.otp?.message && (
                            <span className="error-msg">
                                {errors?.otp?.message}
                            </span>
                        )}
                        
                    </div>
                    <div className="input-group w-full">
                        <label htmlFor="new-password">New Password</label>
                        <div className="pwd-input">
                            <input
                                type={newpasswordToggle ? 'text' : 'password'}
                                id="new-password"
                                name="newpassword"
                                {...register('newpassword')}
                            />
                            {errors?.newpassword?.message && (
                                <span className="error-msg">
                                    {errors?.newpassword?.message}
                                </span>
                            )}
                            <button
                                type="button"
                                className="eye-btn"
                                onClick={toggleNewPassFun}
                            >
                                <i
                                    className={
                                        newpasswordToggle
                                            ? 'icon-eye-open'
                                            : 'icon-eye-close'
                                    }
                                ></i>
                            </button>
                        </div>
                    </div>
                    <div className="input-group w-full">
                        <label htmlFor="confirm-password">
                            Confirm Password
                        </label>
                        <div className="pwd-input">
                            <input
                                type={
                                    confirmpasswordToggle ? 'text' : 'password'
                                }
                                id="confirm-password"
                                name="confirmpassword"
                                {...register('confirmpassword')}
                            />
                            {errors?.confirmpassword?.message && (
                                <span className="error-msg">
                                    {errors?.confirmpassword?.message}
                                </span>
                            )}

                            <button
                                type="button"
                                className="eye-btn"
                                onClick={toggleConfirmPassFun}
                            >
                                <i
                                    className={
                                        confirmpasswordToggle
                                            ? 'icon-eye-open'
                                            : 'icon-eye-close'
                                    }
                                ></i>
                            </button>
                        </div>
                    </div>
                    <button className="solid-btn w-full" type="submit">
                        Reset Password
                    </button>
                    <Timmer />
                </form>
            </div>
        </div>
    )
}

export default ResetPassword

const Timmer = () => {
    const { state } = useLocation()
    const [count, setcount] = useState(59)
    const dispatch = useDispatch()
    useEffect(() => {
        let time = setInterval(() => {
            setcount((p) => p - 1)
        }, 1000)
        return () => {
            clearInterval(time)
        }
    }, [])

    return count > 0 ? (
        <div className="para">
            <span className="link">
                {' '}
                Resend verification code : 00:{count < 10 ? `0${count}` : count}
            </span>
        </div>
    ) : (
        <div className="para">
            <button
                className="link cursor-pointer"
                onClick={() => {
                    dispatch(
                        asyncresendotp({ email: state }, () => {
                            setcount(59)
                        })
                    )
                }}
                type="button"
            >
                Resend Verification Code
            </button>
        </div>
    )
}
