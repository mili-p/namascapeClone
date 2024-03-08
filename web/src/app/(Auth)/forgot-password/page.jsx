import BackButton from '@/app/components/common/BackButton';
import LRFHeader from '@/app/components/common/LRFHeader';
import ForgotPasswordForm from '@/app/components/LRFForm/ForgotPasswordForm';
import React from 'react'
import "./forgot-password.scss";
import ForgotPasswordHeader from './ForgotPasswordHeader';

export const metadata = {
  title: 'NamaScape - Forgot Password',
  description: 'NamaScape - Forgot Password',
}
const page = () => {

  return (
    <div className='auth-form forgot-password md:flex md:justify-start md:flex-col'>
      <BackButton />
      <div className='auth-title'>
        <ForgotPasswordHeader/>
        {/* <LRFHeader
          title={'forgot password?'}
          description={'Enter your registered email address, we will send verification code for resetting password.'}
        /> */}
      </div>
      <div className='form-wrapper'>
        <ForgotPasswordForm />
      </div>
    </div>
  )
}

export default page