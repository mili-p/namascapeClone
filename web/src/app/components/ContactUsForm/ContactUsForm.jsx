"use client";
import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { asyncContactUs } from "../../../../redux/Thunks/User/contactus.thunk";
import { useTranslation } from "react-i18next";

const ContactUsForm = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const emojiRegex = /^[a-zA-Z][a-zA-Z ]*$/;
  const phoneNumberRules = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  const userValidationForForm = yup.object({
    firstName: yup
      .string()
      .trim()
      .required(i18n.t(`contactus.form.validation.fname.required`))
      .max(20, i18n.t(`contactus.form.validation.fname.max`))
      .matches(emojiRegex, {
        message: i18n.t(`contactus.form.validation.fname.matches`),
      }),
    lastName: yup
      .string()
      .trim()
      .required(i18n.t(`contactus.form.validation.lname.required`))
      .max(20, i18n.t(`contactus.form.validation.lname.max`))
      .matches(emojiRegex, {
        message: i18n.t(`contactus.form.validation.lname.matches`),
      }),
    email: yup
      .string()
      .required(i18n.t(`contactus.form.validation.email.required`))
      .email(i18n.t(`contactus.form.validation.email.email`))
      .matches(emailRegex, {
        message: i18n.t(`contactus.form.validation.email.matches`),
      }),
    // mobileNumber : yup.string()
    //                   .required(i18n.t(`contactus.form.validation.mobilenumber.required`))
    //                   .min(8,i18n.t(`contactus.form.validation.mobilenumber.min`))
    //                   .max(15,i18n.t(`contactus.form.validation.mobilenumber.max`)),
    mobileNumber: yup
      .string()
      .required(
        i18n.t(
          "organizer.myaccount.personalDetails.form.inputs.mobileNumber.validation.required"
        )
      )
      .matches(
        /^\+[0-9]+$/,
        i18n.t(
          "organizer.myaccount.personalDetails.form.inputs.mobileNumber.validation.matches"
        )
      )
      .max(
        15,
        i18n.t(
          `organizer.myaccount.personalDetails.form.inputs.mobileNumber.validation.max`
        )
      ),
    message: yup
      .string()
      .trim()
      .required(i18n.t(`contactus.form.validation.usermessage.required`)),
  });

  const pathName = usePathname();
  const onFormSubmit = (data) => {
    dispatch(asyncContactUs(data, () => reset()));
  };
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userValidationForForm), mode: "all" });
  return (
    <>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className="custom-row">
          <div className="input-group">
            <label htmlFor="firstName">
              {i18n.t("contactus.form.input.name.label")}
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              // placeholder={i18n.t('contactus.form.input.name.placeholder')}
              {...register("firstName")}
              autoComplete="off"
            />
            {errors?.firstName?.message && (
              <span className="error-msg">{errors?.firstName?.message}</span>
            )}
          </div>
          <div className="input-group">
            <label htmlFor="lastName">
              {i18n.t(`contactus.form.input.lname.label`)}
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              // placeholder= {i18n.t(`contactus.form.input.lname.Placeholder`)}
              {...register("lastName")}
              autoComplete="off"
            />
            {errors?.lastName?.message && (
              <span className="error-msg">{errors?.lastName?.message}</span>
            )}
          </div>
        </div>
        <div className="input-group">
          <label htmlFor="email">
            {i18n.t("contactus.form.input.email.label")}
          </label>
          <input
            type="text"
            id="email"
            name="email"
            // placeholder={i18n.t('contactus.form.input.email.placeholder')}
            {...register("email")}
          />
          {errors?.email?.message && (
            <span className="error-msg">{errors?.email?.message}</span>
          )}
        </div>
        <div className="input-group">
          <label htmlFor="mobilenumber">
            {i18n.t("contactus.form.input.mobilenumber.label")}
          </label>
          {/* <input
            type="number"
            id="mobileNumber"
            name="mobileNumber"
            onKeyPress={(evt) => {
              // console.log('evt.charCode',evt.charCode)
              if (
                evt.charCode === 101 ||
                evt.charCode === 43 ||
                evt.charCode === 45
              ) {
                evt.preventDefault();
              }
            }}
            // placeholder={i18n.t('contactus.form.input.mobilenumber.placeholder')}
            {...register("mobileNumber")}
          /> */}
          <input
              type="text"
              id="mobileNumber"
              name="mobileNumber"
              onKeyPress={(event) => {
                if (event.key === "e") {
                  event.preventDefault();
                }
              }}
              {...register("mobileNumber")}
            />
          {errors?.mobileNumber?.message && (
            <span className="error-msg">{errors?.mobileNumber?.message}</span>
          )}
        </div>
        <div className="input-group">
          <label htmlFor="usermessage">
            {i18n.t("contactus.form.input.message.label")}
          </label>
          <textarea
            type="textarea"
            id="message"
            name="message"
            //  placeholder={i18n.t('contactus.form.input.message.placeholder')}
            {...register("message")}
            cols="30"
            rows="3"
          ></textarea>
          {errors?.message?.message && (
            <span className="error-msg">{errors?.message?.message}</span>
          )}
        </div>
        <button
          type="submit"
          className={`form-btn ${
            pathName === "/contact-us/" ? "border-btn" : "solid-btn "
          }`}
        >
          {i18n.t("contactus.form.submitbtn.text")}
        </button>
      </form>
    </>
  );
};

export default ContactUsForm;
