import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { asyncChangepassword } from "../../redux/thunk/authThunk/changepassword.thunk";

const ChangePasswordForm = () => {
  const validationSchema = yup.object({
    oldPassword: yup
      .string()
      .required("Please enter old password")
      .trim(),
    newPassword: yup
      .string()
      .required("Please enter new password")
      .trim()
      .min(6,"New password must be at least 6 characters")
      .max(15,"New password maximum 15 characters"),
    confirmPassword: yup
      .string()
      .required("Please enter confirm password")
      .trim()
      .min(6,"Confirm password must be at least 6 characters")
      .max(15,"Confirm password maximum 15 characters")
      .oneOf(
        [yup.ref("newPassword"), null],
        "Confirm password must match with new password"
      ),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const dispatch = useDispatch();
  // const isLoading = useSelector((e) => e.changepassword.isLoading)

  function updatePassword(e) {
    dispatch(
      asyncChangepassword(
        {
          oldPassword: e.oldPassword,
          password: e.newPassword,
        },
        () => {
          reset();
        }
      )
    );
  }

  const [passwordShown, setPasswordShown] = useState([]);
  const togglePasswordVisiblity = (e) => {
    setPasswordShown((ert) => {
      if (ert.includes(e)) {
        return ert.filter((ttt) => {
          return ttt !== e;
        });
      } else {
        return [...ert, e];
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(updatePassword)}>
      <div className="account-title">
        <h2>Change password</h2>
      </div>
      <div className="form-content mt-32">
        <div className="input-group w-full">
          <label htmlFor="password">Current Password</label>
          <div className="pwd-input">
            <input
              type={
                passwordShown?.includes("oldPassword") ? "text" : "password"
              }
              id="oldPassword"
              name="oldPassword"
              {...register("oldPassword")}
            />
            <button
              type="button"
              className="eye-btn"
              aria-label="Eye"
              onClick={(e) => {
                togglePasswordVisiblity("oldPassword");
              }}
            >
              {passwordShown?.includes("oldPassword") ? (
                <i className="icon-eye-open"></i>
              ) : (
                <i className="icon-eye-close"></i>
              )}
              {/* <i className="icon-eye-open"></i>
                <i className="icon-eye-close"></i> */}
            </button>
          </div>
          {errors?.oldPassword?.message && (
            <span className="error-msg">{errors?.oldPassword?.message}</span>
          )}
        </div>
        <div className="input-group w-full">
          <label htmlFor="password">New Password</label>
          <div className="pwd-input">
            <input
              type={passwordShown?.includes("Password") ? "text" : "password"}
              id="password"
              name="newPassword"
              {...register("newPassword")}
            />
            <button
              type="button"
              className="eye-btn"
              aria-label="Eye"
              onClick={(e) => {
                togglePasswordVisiblity("Password");
              }}
            >
              {passwordShown?.includes("Password") ? (
                <i className="icon-eye-open"></i>
              ) : (
                <i className="icon-eye-close"></i>
              )}
            </button>
          </div>
          {errors?.newPassword?.message && (
            <span className="error-msg">{errors?.newPassword?.message}</span>
          )}
        </div>
        <div className="input-group w-full">
          <label htmlFor="password">Confirm Password</label>
          <div className="pwd-input">
            <input
              type={
                passwordShown?.includes("confirmPassword") ? "text" : "password"
              }
              id="confirmPassword"
              name="confirmPassword"
              {...register("confirmPassword")}
            />
            <button
              type="button"
              className="eye-btn"
              aria-label="Eye"
              onClick={(e) => {
                togglePasswordVisiblity("confirmPassword");
              }}
            >
              {passwordShown?.includes("confirmPassword") ? (
                <i className="icon-eye-open"></i>
              ) : (
                <i className="icon-eye-close"></i>
              )}
            </button>
          </div>
          {errors?.confirmPassword?.message && (
            <span className="error-msg">
              {errors?.confirmPassword?.message}
            </span>
          )}
        </div>
        <button type="submit" className="solid-btn dashboard-form-btn">
          Update Password
        </button>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
