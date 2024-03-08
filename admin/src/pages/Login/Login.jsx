import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import BackButton from '../../components/common/BackButton'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { asyncSignin } from '../../redux/thunk/authThunk/signin.thunk'
import {forgotpassword} from '../../config/routeConsts'
import LoaderBtn from '../../components/common/LoaderBtn'

const signinschema = yup.object().shape({
  email: yup.string().email("Please enter valid email").required('Please enter email'),
  password: yup.string().required('Please enter password').min(6,"Password must be 6 to 15 characters long.").max(15,"Password must be 6 to 15 characters long.")
})

const Login = () => {
  const device_token = useSelector((e) => e.signin.device_token)
  const {isLoading} = useSelector((e) => e.signin.isLoading)

  const dispatch = useDispatch()

  const [passwordToggle, setPasswordToggle] = useState(false)
  const togglePassFun = () => {
      setPasswordToggle(passwordToggle ? false : true)
  }

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors }
} = useForm({ resolver: yupResolver(signinschema), mode: 'onChange' })

function handleLogin(data) {
  dispatch(asyncSignin({ ...data, device_token }))
}


  return (
    <>
      <div className='auth-form signin md:flex md:justify-start md:flex-col'>
        {/* <BackButton /> */}
        <div className='auth-title'>
          <h1 className='h-50'>sign in</h1>
          <p>Please enter your email address and password to sign in to your account.</p>
        </div>
        <div className='form-wrapper'>
          <form onSubmit={handleSubmit(handleLogin)}>
              <div className="input-group w-full">
                  <label htmlFor="email">Email Address</label>
                  <input
                      type="text"
                      id="email"
                      name="email"
                      // placeholder='Enter Email'
                      {...register('email')}
                  />
                   {errors?.email?.message && (
                    <span className="error-msg">{errors?.email?.message}</span>
                )}
              </div>
              <div className="input-group w-full">
                  <label htmlFor="password">Password</label>
                  <div className='password-security'>
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
                        </button>
                        {errors?.password?.message && (
                      <span className="error-msg">
                          {errors?.password?.message}
                      </span>
                  )}
                    </div>
                    <div className='password-tooltip-body'>
                      <ul>
                      <li><p>Your password must contain:</p></li>
                        <li className='red'> <i className='icon-check'></i> <i className='icon-reject'></i> <p>At least 6 characters</p> </li>
                        <li className='green'> <i className='icon-check'></i> <i className='icon-reject'></i><p>At least 3 of the following:</p></li>
                          <ul className='inner-list'>
                            <li className='red'><i className='icon-check'></i> <i className='icon-reject'></i> <p>Lower case letters (a-z)</p> </li>
                            <li className='green'> <i className='icon-check'></i> <i className='icon-reject'></i> <p>Upper case letters (A-Z)</p> </li>
                            <li className='green'><i className='icon-check'></i> <i className='icon-reject'></i> <p>Numbers (0-9)</p> </li>
                            <li className='green'><i className='icon-check'></i> <i className='icon-reject'></i> <p>Special characters (ex. !@#$%^&*)</p></li>
                          </ul>
                      </ul>
                    </div>
                  </div>
              </div>

              <div className="forget-pwd-link text-end">
                  <Link to={forgotpassword}>Forgot Password?</Link>
              </div>
              <button className="solid-btn w-full" type="submit">{isLoading ? <LoaderBtn /> :"Sign In"}</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login