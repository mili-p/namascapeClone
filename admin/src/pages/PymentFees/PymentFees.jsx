import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import {
    asyncpaymentFeesUpdateThunk,
    asyncpaymentFeesViewThunk
} from '../../redux/thunk/paymentThunk/payment.thunk'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import LoaderBtn from '../../components/common/LoaderBtn'

const PymentFees = () => {
    const validationSchema = yup.object({
        transactionFees: yup
            .string()
            .required('Please enter transition fees')
            .trim()
    })

    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control
    } = useForm({
        resolver: yupResolver(validationSchema)
    })

    const { paymentfees, isPaymentFeeLoading } = useSelector((e) => e.payments)

    useEffect(() => {
        dispatch(asyncpaymentFeesViewThunk())
    }, [])

    useEffect(() => {
        if (paymentfees) {
            reset({
                transactionFees: paymentfees?.data?.transactionFees
            })
        }
    }, [paymentfees])

    const onHandleTransFees = (data) => {
        dispatch(asyncpaymentFeesUpdateThunk(data))
    }

    return (
        <>
            <div className="pyment-fees account-common-details">
                <div className="account-title">
                    <h2>Transaction Fees</h2>
                </div>
                <div className="form-content mt-32">
                    <form onSubmit={handleSubmit(onHandleTransFees)}>
                        <div className="input-group w-full sm:w-5/12">
                            <label htmlFor="text">Fees (%)</label>
                            <Controller
                                name="transactionFees"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        <input
                                            type="number"
                                            id="transactionFees"
                                            value={value}
                                            onKeyDown={(e) => {
                                                if (
                                                    e.key === 'e' ||
                                                    e.key === 'E' ||
                                                    (e.ctrlKey == true &&
                                                        (e.which == '118' ||
                                                            e.which == '86'))
                                                ) {
                                                    e.preventDefault()
                                                }
                                            }}
                                            onChange={(e) => {
                                             
                                                    if (
                                                        e.target.value?.length >
                                                        3
                                                    ) {
                                                        onChange(value)
                                                    } else {
                                                        if (
                                                            Number(
                                                                e.target.value
                                                            ) > 100
                                                        ) {
                                                            onChange(value)
                                                        } else {
                                                            onChange(
                                                                e.target.value
                                                            )
                                                        }
                                                    }
                                            }}
                                        />
                                        {errors?.transactionFees?.message && (
                                            <span className="error-msg">
                                                {errors?.transactionFees?.message}
                                            </span>
                                        )}
                                    </>
                                )}
                            />
                        </div>
                        <button
                            className="solid-btn dashboard-form-btn"
                            disabled={isPaymentFeeLoading ? true : false}
                        >
                            {isPaymentFeeLoading ? <LoaderBtn /> : 'Update'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default PymentFees
