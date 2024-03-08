import React from "react"; 
import H2 from "@/app/components/common/h2";
import ChangePasswordForm from "./ChangePasswordForm";

export const metadata = {
  title : "Change password"
}

const page = () => {

  return (
    <div className="change-password-page account-common-details">
      {/* <div className="account-title flex items-center justify-between flex-wrap"> */}
        {/* <H2>{`Change password`}</H2> */}
        {/* <button type="submit" className="solid-btn dashboard-form-btn">
          Update Password
        </button> */}
      {/* </div> */}
      <ChangePasswordForm/>
      {/* <form onSubmit={handleSubmit(updatePassword())}>
        <div className="form-content mt-32">
          <div className="input-group w-full">
            <label htmlFor="password">Current Password</label>
            <div className="pwd-input">
              <input
                type="password"
                id="oldPassword"
                name="oldPassword"
                {...register('oldPassword')}
              />
              <button type="button" className="eye-btn" aria-label="Eye">
                <i className="icon-eye-open"></i>
                <i className="icon-eye-close"></i>
              </button>
            </div>
            {errors?.oldPassword?.message && <span className="error-msg">{errors?.oldPassword?.message}</span>}
          </div>
          <div className="input-group w-full">
            <label htmlFor="password">New Password</label>
            <div className="pwd-input">
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                {...register('newPassword')}
              />
              <button type="button" className="eye-btn" aria-label="Eye">
                <i className="icon-eye-open"></i>
                <i className="icon-eye-close"></i>
              </button>
            </div>
            {errors?.newPassword?.message && <span className='error-msg'>{errors?.newPassword?.message}</span>}
          </div>
          <div className="input-group w-full mb-0">
            <label htmlFor="password">Confirm Password</label>
            <div className="pwd-input">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
              />
              <button type="button" className="eye-btn" aria-label="Eye">
                <i className="icon-eye-open"></i>
                <i className="icon-eye-close"></i>
              </button>
            </div>
            {errors?.confirmPassword?.message && <span className="error-msg">{errors?.confirmPassword?.message}</span>}
          </div>
        </div>
        <button type="submit" className="solid-btn dashboard-form-btn">
          Update Password
        </button>
      </form> */}
    </div>
  );
};

export default page;
