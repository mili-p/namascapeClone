import React, { useEffect } from 'react'
import './SocialConfirmation.scss'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import {
    asyncSocialConfirmationUpdateThunk,
    asyncSocialConfirmationViewThunk
} from '../../redux/thunk/userThunk/user.thunk'

const SocialConfirmation = () => {
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control
    } = useForm()

    const { socialconfirmation, isSocialConfirmationLoading } = useSelector((e) => e.user)

    console.log(socialconfirmation?.data,"socialconfirmation");

    useEffect(() => {
        dispatch(asyncSocialConfirmationViewThunk())
    }, [])

    useEffect(() => {
        if (socialconfirmation) {
            reset({
                allowInstagramLink:
                    socialconfirmation?.data?.allowInstagramLink,
                allowWebsiteLink:
                    socialconfirmation?.data?.allowWebsiteLink
            })
        }
    }, [socialconfirmation])



    return (
        <>
            <div className="pyment-fees account-common-details">
                <div className="account-title">
                    <h2>Web Links Setting</h2>
                </div>
                <div className="form-content mt-32">
                    <form>
                        <div className="input-group w-full extraclass gap-4">
                            <label htmlFor="allowInstagramLink">Instagram Link  </label>
                            <div className="switch-toggle">
                            <input
                                title={
                                    socialconfirmation?.data
                                        ?.allowInstagramLink == 1
                                        ? 'Active'
                                        : ' In-Active'
                                }
                                type="checkbox"
                                id='allowInstagramLink'
                                checked={
                                    socialconfirmation?.data
                                        ?.allowInstagramLink === true
                                        ? true
                                        : false
                                }
                                onChange={() => {
                                    dispatch(
                                        asyncSocialConfirmationUpdateThunk({
                                            allowInstagramLink:
                                                socialconfirmation?.data
                                                    ?.allowInstagramLink ? false:true
                                        })
                                    )
                                }}
                            />
                                <label
                                    htmlFor='allowInstagramLink'
                                >
                          
                            </label>
                            </div>
                        </div>
                        <div className="input-group w-full extraclass gap-4">
                            <label htmlFor="allowWebsiteLink">Web Link   </label>
                            <div className="switch-toggle">
                            <input
                                title={
                                    socialconfirmation?.data
                                        ?.allowWebsiteLink == 1
                                        ? 'Active'
                                        : ' In-Active'
                                }
                                type="checkbox"
                                id='allowWebsiteLink'
                                checked={
                                    socialconfirmation?.data
                                        ?.allowWebsiteLink === true
                                        ? true
                                        : false
                                }
                                onChange={() => {
                                    dispatch(
                                        asyncSocialConfirmationUpdateThunk({
                                            allowWebsiteLink:
                                                socialconfirmation?.data
                                                    ?.allowWebsiteLink ? false:true
                                        })
                                    )
                                }}
                            />
                                <label
                                    htmlFor='allowWebsiteLink'
                                >
                          
                            </label>
                            </div>
                        </div>
                    </form>
                </div>
                
            </div>
        </>
    )
}

export default SocialConfirmation
