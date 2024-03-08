"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import H2 from "@/app/components/common/h2";
import SiteBreadcrumb from "@/app/components/SiteBreadcrumb/SiteBreadcrumb";
import Ckeditor from "@/app/components/Ckeditor/Ckeditor";
import { Controller, useForm } from "react-hook-form";
import second from 'react-redux'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { sweetalert } from "@/app/components/common/Common";
import { TermsAndConditionsAddEditThunk, TermsAndConditionsViewThunk } from "../../../../../redux/Thunks/Organizer/TermsandConditions/termsandconditions.thunk";
import { useEffect } from "react";
import './termsandconditions.scss'

const TermsAndConditions = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch()  
  const {tandcData} = useSelector((e)=>e?.TermsandConditionsSlice)
  const validationSchema = yup.object().shape({
    termsAndConditions: yup.string().required(i18n.t(`organizer.termsandconditions.input.title.required`)),
    termsAndConditionsDe: yup.string().required(i18n.t(`organizer.termsandconditions.input.title2.required`)),
  });
  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const BreadcrumbData = [
    {
      title: i18n.t(`organizer.termsandconditions.breadCrumb.home`),
      url: "/dashboard/",
    },
    {
      title: i18n.t(`organizer.termsandconditions.breadCrumb.tandc`),
    },
  ];
  
  useEffect(() => {
    dispatch(TermsAndConditionsViewThunk())
  }, [])

  useEffect(() => {
    if(tandcData){
        reset(tandcData)
    }
  }, [tandcData])
  

  const onhandleSubmit = (data) => {
    dispatch(TermsAndConditionsAddEditThunk(data,(e)=> {
      sweetalert({
        message: e?.message,
        type: "success",
      });
    }))
  };
  return (
    <div className="terms-conditions-wrapper">
      <SiteBreadcrumb
        BreadcrumbData={BreadcrumbData}
        className="protected-breadcrumb"
      />
      <form onSubmit={handleSubmit(onhandleSubmit)}>
        <div className="protected-head">
          <H2 className="h2">{i18n.t(`organizer.termsandconditions.heading`)}</H2>
          <button type="submit" className="solid-btn dashboard-form-btn">
            {i18n.t("settings.editProfile.form.button")}{" "}
          </button>
        </div>
        <div className="mt-32 terms-conditions-inner">
          <div className="terms-conditions-content">
            <div className="input-group">
              <label> {i18n.t(`organizer.termsandconditions.input.title.label`)} </label>
              <Ckeditor control={control} name="termsAndConditions" />
              {errors?.termsAndConditions?.message && (
                <span className="error-msg">
                  {errors?.termsAndConditions?.message}
                </span>
              )}
            </div>
            <div className="input-group">
              <label> {i18n.t(`organizer.termsandconditions.input.title1.label`)} </label>
              <Ckeditor control={control} name="termsAndConditionsDe" />
              {errors?.termsAndConditionsDe?.message && (
                <span className="error-msg">
                  {errors?.termsAndConditionsDe?.message}
                </span>
              )}
            </div>
          </div>
        </div>
        </form>
    </div>
  );
};

export default TermsAndConditions;
