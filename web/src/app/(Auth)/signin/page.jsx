import React from "react";
import "./signin.scss";
import BackButton from "@/app/components/common/BackButton";
import SignInHeader from "./SignInHeader";
import SignInForm from "@/app/components/LRFForm/SignInForm";
import Image from "next/image";
import Link from 'next/link'
import AuthenticationLogo from '@/public/assets/images/auth-logo.svg'

export const metadata = {
  title: "NamaScape - Sign in",
  description: "NamaScape - Sign in",
};

const Signin = () => {
  return (
    <div className="auth-form signin md:flex md:justify-start md:flex-col">
      <BackButton />
      <Link href={'/'} className='auth-logo'><Image src={AuthenticationLogo} alt='logo' width={104} height={104}/></Link>
      <div className="auth-title">
        <SignInHeader />
      </div>
      <div className="form-wrapper">
        <SignInForm />
      </div>
    </div>
  );
};

export default Signin;
