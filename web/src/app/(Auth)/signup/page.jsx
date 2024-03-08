import React from "react";
import "./signup.scss";
import BackButton from "@/app/components/common/BackButton";
import SignUpForm from "@/app/components/LRFForm/SignUpForm";
import SignUpHeader from "./SignUpHeader";

export const metadata = {
    title: 'NamaScape - Sign Up',
    description: 'NamaScape - Sign Up',
  }

const SignUp = () => {
  return (
      <>
          <div className="auth-form signup md:flex md:justify-start md:flex-col">
            <BackButton />
              <div className="auth-title">
                  <SignUpHeader />
              </div>
              <div className="form-wrapper">
                  <SignUpForm />
              </div>
          </div>
      </>
  )
};

export default SignUp;
