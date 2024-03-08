"use client";
import React, { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import Image from "next/image";
import signUpUser from "../../../../public/assets/images/signUpUser.png";
import Link from "next/link";
import { signUp } from "../../../../redux/Thunks/auth.thunk";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import LoaderBtn from "../common/LoaderBtn";
import { useTranslation } from "react-i18next";
import { sweetalert } from "../common/Common";

const SignUpForm = () => {
  const urlMatch =
    /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;

  const { i18n } = useTranslation();
  const { isloading } = useSelector((m) => m.authentication);
  const dispatch = useDispatch();
  const router = useRouter();
  const search = useSearchParams();
  const userTypeQuery = search.get("type");
  console.log(userTypeQuery, "userTypeQueryuserTypeQuery");
  const validPasswordInput = /^[0-9]+$/;
  const emojiRegex = /^[a-zA-Z][a-zA-Z ]*$/;
  const emailMatch = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

  // console.log(i18n.t(`signup.validation.instaLink.test`),"999999999999999999999")
  const validation = {
    firstname: yup
      .string()
      .trim()
      .required(i18n.t("signup.validation.firstname.required"))
      .max(25, i18n.t("signup.validation.firstname.max"))
      .matches(emojiRegex, {
        message: i18n.t(`signup.validation.firstname.matches`),
      })
      .test("emoji", "Please enter valid firstname.", (value) => {
        if (!value) {
          return true;
        }
        return !emailMatch.test(value);
      }),
    lastname: yup
      .string()
      .trim()
      .required(i18n.t("signup.validation.lastname.required"))
      .max(25, i18n.t("signup.validation.lastname.max"))
      .matches(emojiRegex, {
        message: i18n.t(`signup.validation.lastname.matches`),
      })
      .test("emojis", "Please enter valid lastname", (value) => {
        if (!value) {
          return true;
        }
        return !emailMatch.test(value);
      }),
    email: yup
      .string()
      .required(i18n.t("signup.validation.email.required"))
      .email(i18n.t("signup.validation.email.email"))
      .matches(emailMatch, {
        message: i18n.t(`signup.validation.email.matches`),
      }),

    // contactNumber : yup.string().required('Contact number is required.'),
    instagramLink: yup
      .string()
      .test(
        "is-url",
        i18n.t(`signup.validation.instaLink.test`),
        function (value) {
          if (value && !urlMatch.test(value)) {
            return this.createError({
              message: i18n.t(`signup.validation.instaLink.test`),
            });
          }
          return true;
        }
      ),
    websiteLink: yup
      .string()
      .test(
        "is-url",
        i18n.t(`signup.validation.webSiteLink.test`),
        function (value) {
          if (value && !urlMatch.test(value)) {
            return this.createError({
              message: i18n.t(`signup.validation.webSiteLink.test`),
            });
          }
          return true;
        }
      ),
    password: yup
      .string()
      .trim()
      .required(i18n.t("signup.validation.password.required"))
      .min(6, i18n.t("signup.validation.password.min"))
      .max(15, i18n.t("signup.validation.password.max"))
      // .matches(emojiRegex, {
      //     message: 'Please enter valid password.'
      // })
      .matches(
        /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/,
        "Enter valid password"
      )
      .test("emoji", "Please enter valid password", (value) => {
        if (!value) {
          return true;
        }
        return !emailMatch.test(value) || value;
      }),
    confirmPassword: yup
      .string()
      .trim()
      .oneOf(
        [yup.ref("password")],
        i18n.t("signup.validation.confirmPassword.match")
      )
      .required(i18n.t("signup.validation.confirmPassword.required")),
    profileImage: yup
      .mixed()
      .test("custome", "please enter valid image", (value) => {
        if (!value) {
          return true;
        }
        if (
          (value && value.type === "image/jpg") ||
          value.type === "image/jpeg" ||
          value.type === "image/png"
        ) {
          return true;
        } else {
          return false;
        }
      }),
  };
  if (userTypeQuery) {
    validation.mobileNumber = yup
      .string()
      .required(i18n.t(`signup.validation.mobileNumber.required`))
      .matches(
        /^\+[0-9]+$/,
        i18n.t(
          "organizer.myaccount.personalDetails.form.inputs.mobileNumber.validation.matches"
        )
      )
      // .min(9, i18n.t(`signup.validation.mobileNumber.min`))
      .max(15, i18n.t(`signup.validation.mobileNumber.max`));
  }
  const userFormValidation = yup.object(validation);
  const {
    handleSubmit,
    reset,
    formState: { errors },
    register,
    setValue,
    control,
    setError,
    clearErrors,
  } = useForm({
    resolver: yupResolver(userFormValidation),
    mode: "all",
    shouldUnregister: true,
  });

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

  ///// for profile image change ///
  const uploadImage = useRef(null);
  const [imageUrl, setImageUrl] = useState(signUpUser);
  const [imageErr, setimageErr] = useState("");
  const handleFileUpload = (e) => {
    if (
      e.target.files[0].type === "image/jpg" ||
      e.target.files[0].type === "image/jpeg" ||
      e.target.files[0].type === "image/png"
    ) {
      setValue("profileImage", e.target.files[0]);
      setImageUrl(URL.createObjectURL(e.target.files[0]));
      setimageErr("");
    } else {
      setimageErr("Please select .jpeg, .jpg or .png file formate.");
    }
  };
  ////  end profile image change ////

  const onFormSubmit = (data) => {
    let rawFormData = new FormData();
    rawFormData.append("firstName", data.firstname);
    rawFormData.append("lastName", data.lastname);
    rawFormData.append("email", data.email);
    rawFormData.append("password", data.password);
    {
      data.profileImage &&
        rawFormData.append("profileImage", data.profileImage);
    }
    rawFormData.append("userType", userTypeQuery === "organizer" ? 1 : 2);

    if (userTypeQuery === "organizer") {
      rawFormData.append("mobileNumber", data.mobileNumber);
    }

    // {(userTypeQuery === 'organizer') && rawFormData.append('contactNumber',data.contactNumber)}
    {
      userTypeQuery === "organizer" && data.instagramLink
        ? rawFormData.append("instagramLink", data.instagramLink)
        : "";
    }
    {
      data.websiteLink && userTypeQuery === "organizer"
        ? rawFormData.append("websiteLink", data.websiteLink)
        : "";
    }
    rawFormData;
    // const formDataObject = formDataToObject(rawFormData);
    dispatch(
      signUp(rawFormData, () => {
        router.push(
          `${
            userTypeQuery === "organizer"
              ? `/otp-verification?type=organizer&email=${data.email}`
              : `/otp-verification?email=${data.email}`
          }`
        );
      })
    );
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <Controller
        name="profileImage"
        control={control}
        render={({ field: { value, onChange } }) => {
          // console.log(value,"******");
          return (
            <div className="user-profile flex items-center justify-center">
              <Image
                src={
                  typeof value === "object" && value
                    ? URL.createObjectURL(value)
                    : signUpUser
                }
                width={65}
                height={65}
                alt="profile-image"
              />
              <label
                className="profile-change flex items-center justify-center"
                for="profileImage"
                onClick={() => uploadImage?.current?.click()}
              >
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  id="profileImage"
                  aria-label="profileImage"
                  // ref={(event) => {
                  //   console.log(event,"1111111");
                  //     register('profileImage')
                  //     uploadImage.current = event
                  // }}
                  onChange={(e) => {
                    if (
                      e.target.files[0].type === "image/jpg" ||
                      e.target.files[0].type === "image/jpeg" ||
                      e.target.files[0].type === "image/png"
                    ) {
                      // setValue('profileImage', e.target.files[0])
                      // setImageUrl(URL.createObjectURL(e.target.files[0]))
                      // setimageErr('')
                      onChange(e.target.files[0]);
                    } else {
                      // alert("NOT VALID IMAGE")
                      sweetalert({
                        message: i18n.t(
                          `organizer.myaccount.personalDetails.form.inputs.image.validation.notvalid`
                        ),
                        type: "error",
                      });
                    }
                  }}
                />
                <i className="icon-camera"></i>
              </label>
              {errors?.profileImage?.message && (
                <span className="error-msg">
                  {errors?.profileImage?.message}
                </span>
              )}
            </div>
          );
        }}
      />

      <div className="custom-row lg:flex lg:items-center">
        <div className="input-group w-full">
          <label htmlFor="firstname">
            {i18n.t("signup.form.input.firstname.label")}
          </label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            {...register("firstname")}
          />
          {errors?.firstname?.message && (
            <span className="error-msg">{errors?.firstname?.message}</span>
          )}
        </div>
        <div className="input-group w-full">
          <label htmlFor="lastname">
            {i18n.t("signup.form.input.lastname.label")}
          </label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            {...register("lastname")}
          />
          {errors?.lastname?.message && (
            <span className="error-msg">{errors?.lastname?.message}</span>
          )}
        </div>
      </div>
      <div className="input-group w-full">
        <label htmlFor="email">{i18n.t("signup.form.input.email.label")}</label>
        <input type="text" id="email" name="email" {...register("email")} />
        {errors?.email?.message && (
          <span className="error-msg">{errors?.email?.message}</span>
        )}
      </div>
      {userTypeQuery === "organizer" && (
        <>
          <div className="input-group w-full">
            {/* <label htmlFor="email">{i18n.t('signup.form.input.email.label')}</label> */}
            <label>{i18n.t(`signup.form.input.mobileNumber.label`)}</label>
            <input
              type="text"
              id="mobileNumber"
              name="mobileNumber"
              {...register("mobileNumber")}
            />
            {errors?.mobileNumber?.message && (
              <span className="error-msg">{errors?.mobileNumber?.message}</span>
            )}
          </div>

          <div className="input-group w-full">
            {/* <label htmlFor="email">{i18n.t('signup.form.input.email.label')}</label> */}
            <label>{i18n.t(`signup.form.input.instaLink.label`)}</label>
            <input
              type="text"
              id="instagramLink"
              name="instagramLink"
              {...register("instagramLink")}
            />
            {errors?.instagramLink?.message && (
              <span className="error-msg">
                {errors?.instagramLink?.message}
              </span>
            )}
          </div>

          <div className="input-group w-full">
            {/* <label htmlFor="email">{i18n.t('signup.form.input.email.label')}</label> */}
            <label>{i18n.t(`signup.form.input.webSiteLink.label`)}</label>
            <input
              type="text"
              id="websiteLink"
              name="websiteLink"
              {...register("websiteLink")}
            />
            {errors?.websiteLink?.message && (
              <span className="error-msg">{errors?.websiteLink?.message}</span>
            )}
          </div>
        </>
      )}

      <div className="input-group w-full">
        <label htmlFor="password">
          {i18n.t("signup.form.input.password.label")}
        </label>
        <div className="pwd-input">
          <input
            type={passwordShown.includes("password") ? "text" : "password"}
            id="password"
            name="password"
            {...register("password")}
          />
          <button
            type="button"
            className="eye-btn"
            aria-label="Eye"
            onClick={(e) => {
              togglePasswordVisiblity("password");
            }}
          >
            {passwordShown.includes("password") ? (
              <i className="icon-eye-open"></i>
            ) : (
              <i className="icon-eye-close"></i>
            )}
            {/* <i className="icon-eye-open"></i> */}
            {/* <i className="icon-eye-close"></i> */}
          </button>
        </div>
        {errors?.password?.message && (
          <span className="error-msg">{errors?.password?.message}</span>
        )}
      </div>
      <div className="input-group w-full">
        <label htmlFor="confirm-password">
          {i18n.t("signup.form.input.confirmPassword.label")}
        </label>
        <div className="pwd-input">
          <input
            type={
              passwordShown.includes("confirmPassword") ? "text" : "password"
            }
            id="confirmPassword"
            name="confirmPassword"
            aria-label="confirmPassword"
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
            {passwordShown.includes("confirmPassword") ? (
              <i className="icon-eye-open"></i>
            ) : (
              <i className="icon-eye-close"></i>
            )}
            {/* <i className="icon-eye-open"></i> */}
            {/* <i className="icon-eye-close"></i> */}
          </button>
        </div>
        {errors?.confirmPassword?.message && (
          <span className="error-msg">{errors?.confirmPassword?.message}</span>
        )}
      </div>
      <span className="para">
        {i18n.t("signup.form.input.policy.1")}{" "}
        {/* By continuing, you agree to */}
        <Link href="/terms-and-conditions">
          {i18n.t("signup.form.input.policy.2")}
        </Link>{" "}
        {i18n.t("signup.form.input.policy.3")}{" "}
        <Link href="/privacy-policy">
          {i18n.t("signup.form.input.policy.4")}
        </Link>
      </span>
      {isloading ? (
        <button type="submit" className="solid-btn w-full">
          <LoaderBtn />
        </button>
      ) : (
        <button type="submit" className="solid-btn w-full">
          {i18n.t("signup.form.signUp")}
        </button>
      )}
      {userTypeQuery === "organizer" ? (
        <>
          <span className="para small-text">
            {i18n.t("signup.form.AlreadyAnEventOrganizer")}{" "}
            <Link href="/signin?type=organizer">
              {i18n.t("signup.form.signIn")}
            </Link>
          </span>
          <span className="para small-text">
            {i18n.t("signup.form.AreYouUser")}{" "}
            <Link href="/signup">
              {i18n.t("signup.form.clickHereToSignUp")}
            </Link>
          </span>
        </>
      ) : (
        <>
          <span className="para small-text">
            {i18n.t("signup.form.AlreadyHaveAnAccount")}{" "}
            <Link href="/signin">{i18n.t("signup.form.signIn")}</Link>
          </span>
          <span className="para small-text">
            {i18n.t("signup.form.eventOrganizer")}{" "}
            <Link href="/signup?type=organizer">
              {i18n.t("signup.form.clickHereToSignUp")}
            </Link>
          </span>
        </>
      )}
    </form>
  );
};

export default SignUpForm;
