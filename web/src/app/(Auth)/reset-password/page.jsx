import BackButton from '@/app/components/common/BackButton'
import LRFHeader from '@/app/components/common/LRFHeader'
import ResetPasswordForm from '@/app/components/LRFForm/ResetPasswordForm'
import React from 'react'
import './reset-password.scss'
import ResetPassHeader from './ResetPassHeader'
export const metadata = {
    title: 'NamaScape - Reset Password',
    description: 'NamaScape - Reset Password',
}

const page = () => {
    return (
        <div className="auth-form reset-password md:flex md:justify-start md:flex-col">
            <BackButton />
            <div className="auth-title">
                <ResetPassHeader />
            </div>
            <div className="form-wrapper">
                <ResetPasswordForm />
            </div>
        </div>
    )
}

export default page
