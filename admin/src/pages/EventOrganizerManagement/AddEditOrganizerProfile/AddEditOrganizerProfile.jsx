import React, { useEffect, useState } from 'react'
import SiteBreadcrumb from '../../../components/SiteBreadcrumb/SiteBreadcrumb'
import { eventorganizermanagement, home } from '../../../config/routeConsts'
import { Controller, useForm } from 'react-hook-form'
import profileImage from '../../../assets/images/user.png'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
    asyncUserAddThunk,
    asyncUserUpdateThunk,
    asyncUserViewThunk
} from '../../../redux/thunk/userThunk/user.thunk'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { asyncupdateprofile } from '../../../redux/thunk/authThunk/updateprofile.thunk'
import MyAccountUserImage from '../../../assets/images/signUpUser.png'
import Swal from 'sweetalert2'
import { PARTNER } from '../../../common/constsforCodes'

function showImag(imgUrl) {
    if (imgUrl) {
        if (typeof imgUrl === 'string') {
            return imgUrl
        } else {
            return URL.createObjectURL(imgUrl?.[0])
        }
    }
}

const AddEditOrganizerProfile = () => {
    console.log(
        useSelector((e) => e.updateprofile),
        'useSelector((e) => e.updateprofile)'
    )
    const { isLoading, user } = useSelector((e) => e.user)
    const dispatch = useDispatch()
    const { userId } = useParams()
    const navigate = useNavigate()

    const BreadcrumbData = [
        {
            title: 'Home',
            url: home
        },
        {
            title: `${PARTNER} Management`,
            url: eventorganizermanagement
        },
        {
            title: `${userId ? "Edit" : "Add"} ${PARTNER} Profile`
        }
    ]

    //#region  Add/Edit Organizer Validation Schema
    const validationSchema = yup.object().shape({
        firstName: yup.string().required('Please enter first name').trim(),
        lastName: yup.string().required('Please enter last name').trim(),
        email:yup.string().email("Please enter valid email").required("Please enter email").matches(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ,"Please enter correct email").trim(),
        password: yup
            .string()
            .trim()
            .min(6, 'New password must be at least 6 characters')
            .max(15, 'New password maximum 15 characters'),
        dob: yup.string()
        .nullable()
        .transform((value) =>  value ),
        bio: yup.string().notRequired(),
        instagramLink: yup.string().url('Please enter valid url'),
        websiteLink: yup.string().url('Please enter valid url'),
        profile: yup.mixed().test('type', 'Accepted image formats', (value) => {
            if (typeof value === 'string') {
                return true
            }
            return !value || (value && value[0].type.startsWith('image/'))
        })
        // .test(
        //     "fileSize",
        //     "Image size must be less than 1 MB",
        //     (file) => {
                
        //         if (typeof file.size <1000000) {
        //             return true
        //         }

        //       return !!file || file &&
        //    file[0].size <= 1000000}
        //   )
    })
    //#endregionn
    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
        control,
        reset
    } = useForm({ resolver: yupResolver(validationSchema),validateOnChange: false })

    //#region date Formate
    const convertTimestampToDate = (timestamp) => {
        const date = new Date(parseInt(timestamp))
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()

        return `${year}-${month}-${day}`
    }
    //#endregion

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

    useEffect(() => {
        if (userId) {
            dispatch(asyncUserViewThunk({ userId: userId }))
        }
    }, [])

    useEffect(() => {
        if (user && userId) {
            reset({
                firstName: user?.data?.firstName,
                lastName: user?.data?.lastName,
                email: user?.data?.email,
                profile: user?.data?.profileImage,
                instagramLink: user?.data?.instagramLink,
                websiteLink: user?.data?.websiteLink,
                bio: user?.data?.bio,
                dob: user?.data?.dob ? convertTimestampToDate(user?.data?.dob) : ""
            })
        }
    }, [user])

    const handleOrganizer = (data) => {
        const formdata = new FormData()
        console.log(data,"data")
        try {
            if (userId) {
                formdata.append('userId', userId)
                let { password, ...rest } = { ...data }
                for (let t in rest) {
                    if (t == 'dob') {
                        console.log('DOB value:', data[t]);
                        formdata.append(t, data[t]? new Date(data[t]).getTime():"")
                    } else if (t == 'profile') {
                        if (typeof data?.[t] === 'object') {
                            formdata.append('profileImage', data?.[t])
                        } else {
                            formdata.append('profileImage', data?.[t])
                        }
                    } else {
                        formdata.append(t, data[t])
                    }
                }
                dispatch(
                    asyncUserUpdateThunk(formdata, () =>
                        navigate(eventorganizermanagement)
                    )
                )
            } else {
                for (let t in data) {
                    console.log('DOB value:', data);
                    if (t == 'dob') {
                        formdata.append(t, data[t]? new Date(data[t]).getTime():0)
                    } else if (t == 'profile') {
                        if (typeof data?.[t] === 'object') {
                            formdata.append('profileImage', data?.[t])
                        } else {
                            formdata.append('profileImage', data?.[t])
                        }
                    } else {
                        formdata.append(t, data[t])
                    }
                }
                dispatch(
                    asyncUserAddThunk(formdata, () =>
                        navigate(eventorganizermanagement)
                    )
                )
            }
        } catch (e) {
            throw new Error('Something went wrong')
        }
    }

    return (
        <div className="add-edit-organizer-profile">
            <SiteBreadcrumb
                BreadcrumbData={BreadcrumbData}
                className="protected-breadcrumb"
            />
            <form onSubmit={handleSubmit(handleOrganizer)}>
                <div className="protected-head">
                    <h2>{`${!userId ? "Add" : "Edit"} ${PARTNER} Profile`}</h2>
                    <button
                        type="submit"
                        className="solid-btn dashboard-form-btn"
                    >
                        Save
                    </button>
                </div>
                <div className="account-details bg-white w-full mt-32">
                    <div className="personal-details-page account-common-details">
                        <div className="user-profile flex items-center justify-center flex-col">
                            <div className="users-image">
                                <img
                                    onError={(e) => {
                                        e.target.src = MyAccountUserImage
                                    }}
                                    src={
                                        showImag(watch('profile')) ??
                                        MyAccountUserImage
                                    }
                                    width={160}
                                    height={160}
                                    alt="Profile Image"
                                />
                                <button
                                    type="button"
                                    className="edit-profile flex items-center justify-center"
                                >
                                    <Controller
                                        control={control}
                                        name="profile"
                                        render={({ field: { onChange } }) => {
                                            return (
                                                <input
                                                    accept="image/png,image/jpg,image/jpeg"
                                                    type="file"
                                                    name="profile"
                                                    id="profile"
                                                    onChange={(e) => {
                                                        if (
                                                            e.target?.accept
                                                                ?.split(',')
                                                                .includes(
                                                                    e.target
                                                                        .files?.[0]
                                                                        .type
                                                                )
                                                        ) {
                                                            onChange(
                                                                e.target.files
                                                            )
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
                                </button>
                                {errors?.profile?.message && (
                                <span className="error-msg">
                                    {errors?.profile?.message}
                                </span>
                            )}
                            </div>
                         
                        </div>
                        <div className="form-content mt-32">
                            <div className="sm:flex sm:items-center sm:gap-4 2xl:gap-5">
                                <div className="input-group w-full">
                                    <label htmlFor="firstName">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="first-name"
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
                                    <label htmlFor="lastname">Last Name</label>
                                    <input
                                        type="text"
                                        id="last-name"
                                        name="lastname"
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

                            {!userId && (
                                <div className="input-group w-full">
                                    <label htmlFor="password">Password</label>
                                    <div className="pwd-input">
                                        <input
                                            type={
                                                passwordShown?.includes(
                                                    'Password'
                                                )
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            id="password"
                                            name="password"
                                            max={15}
                                            min={6}
                                            {...register('password')}
                                        />
                                        <button
                                            type="button"
                                            className="eye-btn"
                                            aria-label="Eye"
                                            onClick={(e) => {
                                                togglePasswordVisiblity(
                                                    'Password'
                                                )
                                            }}
                                        >
                                            {passwordShown?.includes(
                                                'Password'
                                            ) ? (
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
                            )}

                            <div className="input-group   w-full">
                                <label htmlFor="date">Date of Birth (optional)</label>
                                <input
                                    type="date"
                                    id="dob"
                                    name="dob"
                                    // max="2099-12-31"
                                    max={new Date().toISOString().split("T")[0]}
                                    // min="1900-01-01"
                                    // min={new Date().getTime()}
                                    {...register('dob')}
                                />
                                {errors?.dob?.message && (
                                    <span className="error-msg">
                                        {errors?.dob?.message}
                                    </span>
                                )}
                            </div>
                            <div className="input-group   w-full">
                                <label htmlFor="bio">Bio (optional)</label>
                                <textarea
                                    name="bio"
                                    id=""
                                    cols="30"
                                    rows="3"
                                    {...register('bio')}
                                ></textarea>
                                {errors?.bio?.message && (
                                    <span className="error-msg">
                                        {errors?.bio?.message}
                                    </span>
                                )}
                            </div>
                            <div className="input-group w-full">
                                <label htmlFor='instagramLink'>Instagram Link (optional)</label>
                                <input
                                    type="text"
                                    id="text"
                                    name="instagramLink"
                                    {...register('instagramLink')}
                                />
                                {errors?.instagramLink?.message && (
                                    <span className="error-msg">
                                        {errors?.instagramLink?.message}
                                    </span>
                                )}
                            </div>
                            <div className="input-group w-full">
                                <label htmlFor='websiteLink'>Website Link (optional)</label>
                                <input
                                    type="text"
                                    id="text"
                                    name="websiteLink"
                                    {...register('websiteLink')}
                                />
                                {errors?.websiteLink?.message && (
                                    <span className="error-msg">
                                        {errors?.websiteLink?.message}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddEditOrganizerProfile
