'use client'
import React, { useState } from 'react'
import H1 from '@/app/components/common/h1'
import { useDispatch, useSelector } from 'react-redux'
import { asyncLanguageChange } from '../../../../../../redux/Thunks/Account/languagechange.thunk'
import { useTranslation } from 'react-i18next'

const LanguageRadioBtn = () => {
    const dispatch = useDispatch()
    const { userData } = useSelector((m) => m.authentication)
    const {i18n} = useTranslation()
    // console.log('userData',userData)

    // const redioChecked = userData?.data?.language

    const redioChecked =typeof localStorage !== "undefined" ? localStorage.getItem('language') : 'en' 
    const getRadioChecked = redioChecked ? redioChecked : "en"
    // console.log(redioChecked,"redioChecked redioChecked",getRadioChecked);
    // useEffect(() => {
    //     dispatch(asyncLanguageChange({
    //         language : checkedValue
    //     }))
    // }, [checkedValue])

    const CheckedValue = (e) => {
        // console.log(e?.target?.value,"redioChecked redioChecked");
        localStorage.setItem('language',e?.target?.value)
        document.cookie = `language=${e?.target?.value}; path=/`;
        window.location.reload(true)
        // dispatch(
        //     asyncLanguageChange({
        //         language: e.target.value
        //     })
        // )
    }

    return (
        <>
        <H1 className='h2'>{i18n.t(`settings.changeLanguage.title`)}</H1>
        <div className='input-group'>
          <label>{i18n.t(`settings.changeLanguage.form.label`)}</label>
        <div className="flex items-center gap-4 2xl:gap-5">
            <div className="custom-radio flex items-center w-1/2">
                <input
                    id="English"
                    type="radio"
                    value="en"
                    name="Language"
                    checked ={getRadioChecked === 'en'}
                    // defaultChecked={redioChecked === 'en'}
                    onChange={CheckedValue}
                />
                <label for="English">{i18n.t(`settings.changeLanguage.form.inputs.english`)}</label>
            </div>

            <div className="custom-radio flex items-center w-1/2">
                <input
                    id="German"
                    type="radio"
                    value="de"
                    name="Language"
                    checked ={getRadioChecked === 'de'}
                    // defaultChecked={redioChecked === 'de'}
                    onChange={CheckedValue}
                />
                <label for="German">{i18n.t(`settings.changeLanguage.form.inputs.german`)}</label>
            </div>
        </div>
        </div>
        </>
    )
}

export default LanguageRadioBtn
