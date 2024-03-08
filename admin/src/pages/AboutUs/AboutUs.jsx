import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncaboutusUpdateThunk,
  asyncaboutusViewThunk,
} from "../../redux/thunk/aboutus.thunk";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LoaderBtn from "../../components/common/LoaderBtn";
import { editorConfiguration } from "../../common/EditorConfiguration";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const AboutUs = () => {
  //#region Aboutus Validation Schema
  const validationSchema = yup.object({
    aboutus: yup.string().required("Please enter about us").trim(),
    aboutusde: yup.string().required("Please enter about us in german").trim(),
    whatwedo: yup.string().required("Please enter what we do").trim(),
    whatwedode: yup
      .string()
      .required("Please enter what we do in german")
      .trim(),
    ourmission: yup.string().required("Please enter our mission").trim(),
    ourmissionde: yup
      .string()
      .required("Please enter our mission in german")
      .trim(),
    // ourvision: yup.string().required("Please enter our vision").trim(),
    // ourvisionde: yup
    //   .string()
    //   .required("Please enter our vision in german")
    //   .trim(),
    // ourvalues: yup.string().required("Please enter our values").trim(),
    // ourvaluesde: yup
    //   .string()
    //   .required("Please enter our values in german")
    //   .trim(),
  });
  //#endregion

  const dispatch = useDispatch();
  const { aboutus, isLoading } = useSelector((e) => e?.aboutus);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({ resolver: yupResolver(validationSchema) });

  useEffect(() => {
    if (aboutus) {
      reset({
        aboutus: aboutus?.data?.aboutUs,
        aboutusde: aboutus?.data?.aboutUsDe,
        whatwedo: aboutus?.data?.whatWeDo,
        whatwedode: aboutus?.data?.whatWeDoDe,
        ourmission: aboutus?.data?.ourMissionDo,
        ourmissionde: aboutus?.data?.ourMissionDoDe,
        // ourvision: aboutus?.data?.ourVision,
        // ourvisionde: aboutus?.data?.ourVisionDe,
        // ourvalues: aboutus?.data?.ourValues,
        // ourvaluesde: aboutus?.data?.ourValuesDe,
      });
    }
  }, [aboutus]);

  useEffect(() => {
    dispatch(asyncaboutusViewThunk({ slug: "about-us" }));
  }, []);

  function handleAboutus(data) {
    dispatch(
      asyncaboutusUpdateThunk({
        slug: "about-us",
        aboutUs: data?.aboutus,
        aboutUsDe: data?.aboutusde,
        whatWeDo: data?.whatwedo,
        whatWeDoDe: data?.whatwedode,
        ourMissionDo: data?.ourmission,
        ourMissionDoDe: data?.ourmissionde,
        ourVision: data?.ourvision,
        ourVisionDe: data?.ourvisionde,
        ourValues: data?.ourvalues,
        ourValuesDe: data?.ourvaluesde,
      })
    );
  }

  return (
    <div className="about-us account-common-details">
      <form onSubmit={handleSubmit(handleAboutus)}>
        <div className="account-title">
          <h2>About us</h2>
        </div>
        <div className="form-content mt-32">
          <div className="input-group w-full">
            <label htmlFor="aboutus">About Us</label>
            {/* <textarea name="aboutus" id="aboutus" rows="8" {...register("aboutus")}></textarea> */}

            <Controller
              name="aboutus"
              control={control}
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
              }) => (
                <CKEditor
                  data={value}
                  removePlugins="ckeditor_logo"
                  editor={ClassicEditor}
                  config={editorConfiguration}
                  onReady={(editor) => {}}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    onChange(data);
                  }}
                  onBlur={(event, editor) => {}}
                  onFocus={(event, editor) => {}}
                />
              )}
            />

            {errors?.aboutus?.message && (
              <span className="error-msg">{errors?.aboutus?.message}</span>
            )}
            {/* </div> */}

            {/* {errors?.aboutus?.message && (
            <span className="error-msg">{errors?.aboutus?.message}</span>
          )} */}
          </div>
          <div className="input-group w-full">
            <label htmlFor="aboutusde">About Us in German</label>
            {/* <textarea name="aboutusde" id="aboutusde" rows="8" {...register("aboutusde")}></textarea>
            {errors?.aboutusde?.message && (
            <span className="error-msg">{errors?.aboutusde?.message}</span>
          )} */}

            <Controller
              name="aboutusde"
              control={control}
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
              }) => (
                <CKEditor
                  data={value}
                  removePlugins="ckeditor_logo"
                  editor={ClassicEditor}
                  config={editorConfiguration}
                  onReady={(editor) => {}}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    onChange(data);
                  }}
                  onBlur={(event, editor) => {}}
                  onFocus={(event, editor) => {}}
                />
              )}
            />

            {errors?.aboutusde?.message && (
              <span className="error-msg">{errors?.aboutusde?.message}</span>
            )}
          </div>
          <div className="input-group w-full">
            <label htmlFor="whatwedo">What We Do</label>
            {/* <textarea name="whatwedo" id="whatwedo" rows="8" {...register("whatwedo")}></textarea>
            {errors?.whatwedo?.message && (
            <span className="error-msg">{errors?.whatwedo?.message}</span>
          )} */}
            <Controller
              name="whatwedo"
              control={control}
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
              }) => (
                <CKEditor
                  data={value}
                  removePlugins="ckeditor_logo"
                  editor={ClassicEditor}
                  config={editorConfiguration}
                  onReady={(editor) => {}}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    onChange(data);
                  }}
                  onBlur={(event, editor) => {}}
                  onFocus={(event, editor) => {}}
                />
              )}
            />

            {errors?.whatwedo?.message && (
              <span className="error-msg">{errors?.whatwedo?.message}</span>
            )}
          </div>
          <div className="input-group w-full">
            <label htmlFor="whatwedo">What We Do in German</label>
            {/* <textarea name="whatwedode" id="whatwedode" rows="8" {...register("whatwedode")}></textarea>
            {errors?.whatwedode?.message && (
            <span className="error-msg">{errors?.whatwedode?.message}</span>
          )} */}
            <Controller
              name="whatwedode"
              control={control}
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
              }) => (
                <CKEditor
                  data={value}
                  removePlugins="ckeditor_logo"
                  editor={ClassicEditor}
                  config={editorConfiguration}
                  onReady={(editor) => {}}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    onChange(data);
                  }}
                  onBlur={(event, editor) => {}}
                  onFocus={(event, editor) => {}}
                />
              )}
            />

            {errors?.whatwedode?.message && (
              <span className="error-msg">{errors?.whatwedode?.message}</span>
            )}
          </div>
          <div className="account-title">
            <h2>Who We Are</h2>
          </div>
          <div className="input-group w-full">
            <label htmlFor="ourmission">Our Mission</label>
            {/* <textarea name="ourmission" id="ourmission" rows="8" {...register("ourmission")}></textarea>
            {errors?.ourmission?.message && (
            <span className="error-msg">{errors?.ourmission?.message}</span>
          )} */}
            <Controller
              name="ourmission"
              control={control}
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
              }) => (
                <CKEditor
                  data={value}
                  removePlugins="ckeditor_logo"
                  editor={ClassicEditor}
                  config={editorConfiguration}
                  onReady={(editor) => {}}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    onChange(data);
                  }}
                  onBlur={(event, editor) => {}}
                  onFocus={(event, editor) => {}}
                />
              )}
            />

            {errors?.ourmission?.message && (
              <span className="error-msg">{errors?.ourmission?.message}</span>
            )}
          </div>
          <div className="input-group w-full">
            <label htmlFor="ourmission">Our Mission in German</label>
            <Controller
              name="ourmissionde"
              control={control}
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
              }) => (
                <CKEditor
                  data={value}
                  removePlugins="ckeditor_logo"
                  editor={ClassicEditor}
                  config={editorConfiguration}
                  onReady={(editor) => {}}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    onChange(data);
                  }}
                  onBlur={(event, editor) => {}}
                  onFocus={(event, editor) => {}}
                />
              )}
            />

            {errors?.ourmissionde?.message && (
              <span className="error-msg">{errors?.ourmissionde?.message}</span>
            )}
          </div>
          {/* <div className="input-group w-full">
            <label htmlFor="ourvision">Our Vision</label>
            <Controller
              name="ourvision"
              control={control}
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
              }) => (
                <CKEditor
                  data={value}
                  removePlugins="ckeditor_logo"
                  editor={ClassicEditor}
                  config={editorConfiguration}
                  onReady={(editor) => {}}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    onChange(data);
                  }}
                  onBlur={(event, editor) => {}}
                  onFocus={(event, editor) => {}}
                />
              )}
            />

            {errors?.ourvision?.message && (
              <span className="error-msg">{errors?.ourvision?.message}</span>
            )}
          </div>
          <div className="input-group w-full">
            <label htmlFor="ourvision">Our Vision in German</label>
            <Controller
              name="ourvisionde"
              control={control}
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
              }) => (
                <CKEditor
                  data={value}
                  removePlugins="ckeditor_logo"
                  editor={ClassicEditor}
                  config={editorConfiguration}
                  onReady={(editor) => {}}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    onChange(data);
                  }}
                  onBlur={(event, editor) => {}}
                  onFocus={(event, editor) => {}}
                />
              )}
            />

            {errors?.ourvisionde?.message && (
              <span className="error-msg">{errors?.ourvisionde?.message}</span>
            )}
          </div> */}
          {/* <div className="input-group w-full">
            <label htmlFor="ourvalues">Our Values</label>

            <Controller
              name="ourvalues"
              control={control}
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
              }) => (
                <CKEditor
                  data={value}
                  removePlugins="ckeditor_logo"
                  editor={ClassicEditor}
                  config={editorConfiguration}
                  onReady={(editor) => {}}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    onChange(data);
                  }}
                  onBlur={(event, editor) => {}}
                  onFocus={(event, editor) => {}}
                />
              )}
            />

            {errors?.ourvalues?.message && (
              <span className="error-msg">{errors?.ourvalues?.message}</span>
            )}
          </div>
          <div className="input-group w-full">
            <label htmlFor="ourvalues">Our Values in German</label>
            <Controller
              name="ourvaluesde"
              control={control}
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
              }) => (
                <CKEditor
                  data={value}
                  removePlugins="ckeditor_logo"
                  editor={ClassicEditor}
                  config={editorConfiguration}
                  onReady={(editor) => {}}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    onChange(data);
                  }}
                  onBlur={(event, editor) => {}}
                  onFocus={(event, editor) => {}}
                />
              )}
            />

            {errors?.ourvaluesde?.message && (
              <span className="error-msg">{errors?.ourvaluesde?.message}</span>
            )}
          </div> */}
          <button className="solid-btn dashboard-form-btn">
            {isLoading ? <LoaderBtn /> : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AboutUs;
