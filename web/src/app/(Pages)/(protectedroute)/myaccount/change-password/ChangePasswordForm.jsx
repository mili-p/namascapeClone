'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import H2 from "@/app/components/common/h2";
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import { changepassword } from '../../../../../../redux/Thunks/Account/OrganizerAccount/myaccount.thunk'
import LoaderBtn from '@/app/components/common/LoaderBtn'
import { useTranslation } from 'react-i18next'

const ChangePasswordForm = () => {
    const {i18n} = useTranslation()
    const dispatch = useDispatch()
    const { isloading } = useSelector((action) => action.myaccount)
    const userValidation = yup.object({
        oldPassword: yup
            .string()
            .required(
                i18n.t(
                    `organizer.myaccount.changepassword.form.inputs.currrentpass.validation.required`
                )
            )
            .matches(
                /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/,
                i18n.t(
                    `organizer.myaccount.changepassword.form.inputs.currrentpass.validation.matches`
                )
            ),
        password: yup
            .string()
            .required(
                i18n.t(
                    `organizer.myaccount.changepassword.form.inputs.newpass.validation.required`
                )
            )
            .matches(
                /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/,
                i18n.t(
                    `organizer.myaccount.changepassword.form.inputs.newpass.validation.matches`
                )
            )
            .min(
                6,
                i18n.t(
                    `organizer.myaccount.changepassword.form.inputs.newpass.validation.min`
                )
            )
            .max(
                15,
                i18n.t(
                    `organizer.myaccount.changepassword.form.inputs.newpass.validation.max`
                )
            ),
        confirmPassword: yup
            .string()
            .required(
                i18n.t(
                    `organizer.myaccount.changepassword.form.inputs.confirmpass.validation.required`
                )
            )
            .oneOf(
                [yup.ref('password')],
                i18n.t(
                    `organizer.myaccount.changepassword.form.inputs.confirmpass.validation.oneof`
                )
            )
            .matches(
                /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/,
                i18n.t(
                  `organizer.myaccount.changepassword.form.inputs.confirmpass.validation.matches`
              )
            )
    })
    const {
        handleSubmit,
        reset,
        formState: { errors },
        register
    } = useForm({ resolver: yupResolver(userValidation), mode: 'all' })

    ////// Password Toggle  /////////
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
    /////  End Password TOggle /////

    const updatePassword = (data) => {
        dispatch(
            changepassword(data, () => {
                reset()
            })
        )
    }

    return (
        <>
        <div className="account-title flex items-center justify-between flex-wrap">
        <H2>{i18n.t(`organizer.myaccount.changepassword.title`)}</H2>
        </div>
            <form onSubmit={handleSubmit(updatePassword)}>
                <div className="form-content mt-32">
                    <div className="input-group w-full">
                        <label htmlFor="password">{i18n.t(`organizer.myaccount.changepassword.form.inputs.currrentpass.label`)}</label>
                        <div className="pwd-input">
                            <input
                                type={
                                    passwordShown?.includes('oldPassword')
                                        ? 'text'
                                        : 'password'
                                }
                                id="oldPassword"
                                name="oldPassword"
                                {...register('oldPassword')}
                            />
                            <button
                                type="button"
                                className="eye-btn"
                                aria-label="Eye"
                                onClick={(e) => {
                                    togglePasswordVisiblity('oldPassword')
                                }}
                            >
                                {passwordShown?.includes('oldPassword') ? (
                                    <i className="icon-eye-open"></i>
                                ) : (
                                    <i className="icon-eye-close"></i>
                                )}
                                {/* <i className="icon-eye-open"></i>
                <i className="icon-eye-close"></i> */}
                            </button>
                        </div>
                        {errors?.oldPassword?.message && (
                            <span className="error-msg">
                                {errors?.oldPassword?.message}
                            </span>
                        )}
                    </div>
                    <div className="input-group w-full">
                        <label htmlFor="password">{i18n.t(`organizer.myaccount.changepassword.form.inputs.newpass.label`)}</label>
                        <div className="pwd-input">
                            <input
                                type={
                                    passwordShown?.includes('password')
                                        ? 'text'
                                        : 'password'
                                }
                                id="password"
                                name="password"
                                {...register('password')}
                            />
                            <button
                                type="button"
                                className="eye-btn"
                                aria-label="Eye"
                                onClick={(e) => {
                                    togglePasswordVisiblity('password')
                                }}
                            >
                                {passwordShown?.includes('password') ? (
                                    <i className="icon-eye-open"></i>
                                ) : (
                                    <i className="icon-eye-close"></i>
                                )}
                            </button>
                        </div>
                        {errors?.password?.message && (
                            <span className="error-msg">
                                {errors?.password?.message}
                            </span>
                        )}
                    </div>
                    <div className="input-group w-full">
                        <label htmlFor="password">{i18n.t(`organizer.myaccount.changepassword.form.inputs.confirmpass.label`)}</label>
                        <div className="pwd-input">
                            <input
                                type={
                                    passwordShown?.includes('confirmPassword')
                                        ? 'text'
                                        : 'password'
                                }
                                id="confirmPassword"
                                name="confirmPassword"
                                {...register('confirmPassword')}
                            />
                            <button
                                type="button"
                                className="eye-btn"
                                aria-label="Eye"
                                onClick={(e) => {
                                    togglePasswordVisiblity('confirmPassword')
                                }}
                            >
                                {passwordShown?.includes('confirmPassword') ? (
                                    <i className="icon-eye-open"></i>
                                ) : (
                                    <i className="icon-eye-close"></i>
                                )}
                            </button>
                        </div>
                        {errors?.confirmPassword?.message && (
                            <span className="error-msg">
                                {errors?.confirmPassword?.message}
                            </span>
                        )}
                    </div>
                </div>
                {isloading ? (
                    <button
                        type="submit"
                        className="solid-btn dashboard-form-btn"
                    >
                        <LoaderBtn />
                    </button>
                ) : (
                    <button
                        type="submit"
                        className="solid-btn dashboard-form-btn"
                    >
                       {i18n.t(`organizer.myaccount.changepassword.form.button`)}
                    </button>
                )}
                {/* <button type="submit" className="solid-btn dashboard-form-btn" disabled={btnDisable}>
          Update Password
        </button> */}
            </form>
        </>
    )
}

export default ChangePasswordForm
