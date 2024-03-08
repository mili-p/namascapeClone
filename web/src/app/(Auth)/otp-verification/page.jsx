import BackButton from "@/app/components/common/BackButton";
import LRFHeader from "@/app/components/common/LRFHeader";
import OtpVerificationForm from "@/app/components/LRFForm/OtpVerificationForm";
import React from "react";
import "./otp-verification.scss";

export const metadata = {
  title: 'Namascape - Verification Code',
  description: 'Namascape - Verification Code',
}

const page = () => {

  return (
    <div className="auth-form otp-verification md:flex md:justify-start md:flex-col">
      <BackButton />
      {/* <div className="auth-title">
        <LRFHeader
          title={'Verification Code'}
          description={'Enter the Verification Code we sent to you on registered email address.'}
        />
      </div> */}
      <div className="form-wrapper">
        <OtpVerificationForm />
      </div>
    </div>
  );
};

export default page;
