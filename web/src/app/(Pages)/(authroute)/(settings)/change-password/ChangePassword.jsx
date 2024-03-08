'use client'
import React,{useState} from 'react'
import H1 from '@/app/components/common/h1'
import { changepassword } from '../../../../../../redux/Thunks/Account/OrganizerAccount/myaccount.thunk'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from 'react-hook-form'
import LoaderBtn from '@/app/components/common/LoaderBtn'
import { useTranslation } from 'react-i18next'

const ChangePassword = () => {
const EmojisMatch = /^[^\u0000-\uFFFF]*$/
const {i18n} = useTranslation()
const ffff= /^[^\p{Emoji}]*$/
  const dispatch = useDispatch()
  const {isloading} = useSelector((m)=>m.myaccount)
  const userValidation = yup.object({
      oldPassword: yup.string().required(i18n.t(`settings.changePassword.form.inputs.currentPass.validation.required`))
      .matches(/^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/,i18n.t(`settings.changePassword.form.inputs.currentPass.validation.matches`)),
      password: yup.string().required(i18n.t(`settings.changePassword.form.inputs.newpassword.validation.required`))
      .matches(/^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/,i18n.t(`settings.changePassword.form.inputs.newpassword.validation.matches`))
      .min(6,i18n.t(`settings.changePassword.form.inputs.newpassword.validation.min`)).max(15,i18n.t(`settings.changePassword.form.inputs.newpassword.validation.max`)),
      confirmPassword: yup
          .string()
          .required(i18n.t(`settings.changePassword.form.inputs.confirmpassword.validation.required`))
          .matches(/^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/,i18n.t(`settings.changePassword.form.inputs.confirmpassword.validation.matches`))
          .oneOf([yup.ref('password')], i18n.t(`settings.changePassword.form.inputs.confirmpassword.validation.oneof`))
  })
  const {
      handleSubmit,
      reset,
      formState: { errors },
      register
  } = useForm({ resolver: yupResolver(userValidation), mode: 'all' })


    ////// Password Toggle  /////////
    const [passwordShown, setPasswordShown] = useState([])
    const [btnDisable,setBtnDisable] = useState(false)
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
    /////  End Password Toggle /////

    const updatePassword = (data) => {
        setBtnDisable(true)
        dispatch(
            changepassword(data, () => {
                reset()
                setBtnDisable(false)
            })
        )
    }
  return (
      <>
          <form className="change-password" onSubmit={handleSubmit(updatePassword)}>
              <H1 className='h2'>{i18n.t(`settings.changePassword.title`)}</H1>
              <div className="input-group">
                  <label>{i18n.t(`settings.changePassword.form.inputs.currentPass.label`)}</label>
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
                      </button>
                  </div>
                  {errors?.oldPassword?.message && (
                      <span className="error-msg">
                          {errors?.oldPassword?.message}
                      </span>
                  )}
              </div>
              <div className="input-group">
                  <label>{i18n.t(`settings.changePassword.form.inputs.newpassword.label`)}</label>
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

              <div className="input-group">
                  <label>{i18n.t(`settings.changePassword.form.inputs.confirmpassword.label`)}</label>
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
                  {errors?.confirmPassword?.message && <span className="error-msg">{errors?.confirmPassword?.message}</span>}
              </div>


              {isloading ? <button type="submit" className="solid-btn form-btn">
                  {' '}
                  <LoaderBtn/>
              </button> : 
              <button type="submit" className="solid-btn form-btn">
                  {' '}
                  {/* Update Password */}
                  {i18n.t(`settings.changePassword.form.button`)}
              </button> }
          </form>
      </>
  )
}

export default ChangePassword