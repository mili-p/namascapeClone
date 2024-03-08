'use client'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'next/navigation'
import { ResendOTPVerification } from '../../../../redux/Thunks/auth.thunk'
import { useTranslation } from 'react-i18next'

const convertMM = (totalSeconds)=>{
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

const Timmer = () => {
    const search = useSearchParams()
    const {i18n} = useTranslation()
    const emailQuery = search.get('email')
    // console.log(emailQuery,"/////////");

    const [count, setcount] = useState(59)
    // const [count, setcount] = useState(120)
    const dispatch = useDispatch()
    useEffect(() => {
        let time = setInterval(() => {
            setcount((p) => p - 1)
        },1000)
        return () => {
            clearInterval(time)
        }
    }, [])

    const resendOTPfun = () =>{
        dispatch(ResendOTPVerification({email:emailQuery}))
    }
    

    return count > 0 ? (
        // <span className='para'>{i18n.t('otpVerification.form.resendVerification')} <span className="link">{convertMM(count)}</span></span>
        <span className='para'>{i18n.t('otpVerification.form.resendVerification')} <span className="link"> 00:{count < 10 ? `0${count}` : count}</span></span>
    ) : (
        <>
        <span className='para'><span className="link cursor-pointer" onClick={()=>{
            setcount(59)
            resendOTPfun()}}>{i18n.t(`otpVerification.form.resendVerificationcode`)}</span></span>
        </>
    )
}


export default Timmer