import React, { useEffect } from 'react'
import MyAccountUserImage from "../../assets/images/myaccount-user-image.png"
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { asynceditprofile } from '../../redux/thunk/authThunk/editprofile.thunk'
import { asyncupdateprofile } from '../../redux/thunk/authThunk/updateprofile.thunk'
import Swal from 'sweetalert2'


function showImag(imgUrl) {
  if (imgUrl) {
      if (typeof imgUrl === 'string') {
          return imgUrl
      } else {
          return URL.createObjectURL(imgUrl?.[0])
      }
  }
}

const EditAccount = () => {

const dispatch = useDispatch()
const { isLoading, userDetail } = useSelector((e) => e.editprofile)
const { isLoading: postIsloading } = useSelector((e) => e.updateprofile)


useEffect(() => {
  dispatch(asynceditprofile())
}, [])

const validationSchema = yup.object({
    firstName: yup
        .string()
        .required('Please enter first name')
        .trim(),
        lastName: yup
        .string()
        .required('Please enter last name')
        .trim(),
        email:yup.string().email("Please enter valid email").required("Please enter email").matches(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ,"Please enter correct email").trim(),
    profile: yup.mixed().test('type', 'Accepted image formats', (value) => {
        if (typeof value === 'string') {
            return true
        }
        return !value || (value && value[0].type.startsWith('image/'))
    })
})

const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    control
} = useForm({
    resolver: yupResolver(validationSchema)
})

useEffect(() => {
    if (userDetail) {
        reset({
            firstName: userDetail?.firstName,
            lastName: userDetail?.lastName,
            email: userDetail?.email,
            profile: userDetail?.profilePicture
        })
    }
}, [userDetail])

function onSubmit(data) {
    const formdata = new FormData()
    formdata.append('firstName', data?.firstName)
    formdata.append('lastName', data?.lastName)
    formdata.append('email', data?.email)

    if (typeof data?.profile === 'object') {
        formdata.append('profilePicture', data?.profile?.[0])
    } else {
        formdata.append('profilePicture', data?.profile)
    }
    dispatch(asyncupdateprofile(formdata))
}

  return (
      <div className="personal-details-page account-common-details">
          <form onSubmit={handleSubmit(onSubmit)}>
              <div className="account-title">
                  <h2>Personal Details</h2>

              </div>
              <div className="user-profile flex items-center justify-center flex-col">
                  <div className="users-image">
                      <img
                          onError={(e) => {
                              e.target.src = MyAccountUserImage
                          }}
                          src={showImag(watch('profile')) ?? MyAccountUserImage}
                          width={160}
                          height={160}
                          alt="Profile Image"
                      />
                    <label className='flex items-center justify-center edit-profile'>
                        <Controller
                            control={control}
                            name="profile"
                            render={({ field: { onChange } }) => {
                                return (
                                    <input
                                        accept="image/png,image/jpg,image/jpeg"
                                        type="file"
                                        name="profile"
                                        id="profileImage"
                                        onChange={(e) => {
                                            if (
                                                e.target?.accept
                                                    ?.split(',')
                                                    .includes(
                                                        e.target.files?.[0].type
                                                    )
                                            ) {
                             
                                                onChange(e.target.files)
                                            } else {
                                                Swal.fire({
                                                    text: "Please select valid file type",
                                                    icon: 'warning'
                                                })
                                            }
                                        }}
                                    />
                                )
                            }}
                        />
                        <i className="icon-edit"></i>
                    </label>
                  </div>
                  {errors?.profile?.message &&  <span className="error-msg">
                        {errors?.profile?.message}
                    </span>}
              </div>
              <div className="form-content mt-32">
                  <div className="sm:flex sm:items-center sm:gap-4 2xl:gap-5">
                      <div className="input-group w-full">
                          <label htmlFor="firstName">First Name</label>
                          <input
                              type="text"
                              id="firstName"
                              name="firstName"
                              {...register('firstName')}
                          />
                               {errors?.firstName?.message && (
                    <span className="error-msg">
                        {errors?.firstName?.message}
                    </span>
                )}
                      </div>
                      <div className="input-group w-full">
                          <label htmlFor="lastName">Last Name</label>
                          <input
                              type="text"
                              id="lastName"
                              name="lastName"
                              {...register('lastName')}
                          />
                               {errors?.lastName?.message && (
                    <span className="error-msg">
                        {errors?.lastName?.message}
                    </span>
                )}
                      </div>
                  </div>
                  <div className="input-group w-full">
                      <label htmlFor="email">Email Address</label>
                      <input
                      readOnly
                          type="email"
                          id="email"
                          name="email"
                          {...register('email')}
                      />
                           {errors?.email?.message && (
                    <span className="error-msg">
                        {errors?.email?.message}
                    </span>
                )}
                  </div>
                  <button className="solid-btn dashboard-form-btn">Save</button>
              </div>
          </form>
      </div>
  )
}

export default EditAccount