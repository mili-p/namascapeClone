import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {
    asynccontatusUpdateThunk,
    asynccontatusViewThunk,
    asynccountryCodeGetThunk
} from '../../redux/thunk/contactus.thunk'
import LoaderBtn from '../../components/common/LoaderBtn'
import SelectCustom from '../../components/SelectCustom/SelectCustom'

let timer

const ContactUs = () => {
    //#region Contactus Validation Schema
    const validationSchema = yup.object({
        mobilenumber: yup
            .string()
            .max(15,"Please enter maximum 15 digits")
            .min(6,"Please enter minimum 6 digits")
            .required('Please enter mobile number')
            .trim(),
        email:yup.string().email("Please enter valid email").required("Please enter email").matches(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ,"Please enter correct email").trim(),
        address: yup.string().required('Please enter address').trim(),
        country:yup.object().required("Please enter country code")
    })
    //#endregion

    const dispatch = useDispatch()
    const { contactus,country,isLoading } = useSelector((e) => e?.contactus)
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control
    } = useForm({ resolver: yupResolver(validationSchema) })

    useEffect(() => {
        if (contactus) {
            reset({
                mobilenumber: contactus?.data?.phone,
                email: contactus?.data?.email,
                address: contactus?.data?.address,
                country:contactus?.data?.country
                
            })
        }
    }, [contactus])

    useEffect(() => {
        dispatch(asynccontatusViewThunk({ slug: 'contact-us' }))
    }, [])

    useEffect(()=>{
            dispatch(asynccountryCodeGetThunk())    
    },[])

    const handleCountryChange = (e) => {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            dispatch(
                asynccountryCodeGetThunk({
                    search: e
                })
            )
        }, 500)
    }

    function handleContactus(data) {
        dispatch(
            asynccontatusUpdateThunk({
                slug: 'contact-us',
                phone: data?.mobilenumber,
                email: data?.email,
                address: data?.address,
                country:{countryId:data?.country?.countryId,dialingCode:data?.country?.dialingCode}
            })
        )
    }

    return (
        <div className="contact-page account-common-details">
            <form onSubmit={handleSubmit(handleContactus)}>
                <div className="account-title">
                    <h2>Contact Us</h2>
                </div>
                <div className="form-content mt-32">
                    <div className="input-group mobile-num">
                        <label htmlFor="mobilenumber">Mobile Number</label>
                        <div className='flex items-center'>

                           <Controller
                                control={control}
                                name="country"
                                render={({ field: { onChange, value } }) => {
                                    return (
                                        <SelectCustom
                                            openMenuOnFocus={true}
                                            value={value}
                                            className={'event-type-select'}
                                            onChange={onChange}
                                            onInputChange={handleCountryChange}
                                            getOptionLabel={(e) => {
                                                return e.dialingCode
                                            }}
                                            getOptionValue={(e) => {
                                                return e.countryId
                                            }}
                                            options={
                                                country?.data
                                            }
                                            isSearchable={true}
                                        />
                                    )
                                }}
                            />
                            {errors?.country?.message && (
                                <span className="error-msg">
                                    {errors?.country?.message}
                                </span>
                            )}
                            
                        <input
                            type="number"
                            id="mobilenumber"
                            name="mobilenumber"
                            {...register('mobilenumber')}
                        />
                        </div>
                        {errors?.mobilenumber?.message && (
                            <span className="error-msg">
                                {errors?.mobilenumber?.message}
                            </span>
                        )}
                    </div>
                    <div className="input-group w-full">
                        <label htmlFor="email">Email ID</label>
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
                    <div className="input-group w-full">
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            {...register('address')}
                        />
                        {errors?.address?.message && (
                            <span className="error-msg">
                                {errors?.address?.message}
                            </span>
                        )}
                    </div>
                    <button className="solid-btn dashboard-form-btn">
                    {isLoading ? <LoaderBtn/> :"Save"}  
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ContactUs
