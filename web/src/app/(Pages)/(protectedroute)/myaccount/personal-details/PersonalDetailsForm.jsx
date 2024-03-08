"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { asyncViewprofile } from "../../../../../../redux/Thunks/Account/viewprofile.thunk";
import { personalDetails } from "../../../../../../redux/Thunks/Account/OrganizerAccount/myaccount.thunk";
import { sweetalert } from "@/app/components/common/Common";
import LoaderBtn from "@/app/components/common/LoaderBtn";
import H2 from "@/app/components/common/h2";
import { useTranslation } from "react-i18next";
import { DateofBirthFormatorFn } from "@/utils/commonfn/DateOfBirth";
import DatePicker from "react-datepicker";
import DatePikerLang from "@/app/components/DatePikerLang/DatePikerLang";
import de from "date-fns/locale/de";

const PersonalDetailsForm = () => {
  const { i18n } = useTranslation();
  const languageName = i18n.language || "de";
  const urlMatch =
    /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
  const editDetailValidation = yup.object({
    profileImage: yup.mixed().required("Image is required."),
    firstName: yup
      .string()
      .trim()
      .required(
        i18n.t(
          `organizer.myaccount.personalDetails.form.inputs.firstname.validation.required`
        )
      )
      .min(
        3,
        i18n.t(
          `organizer.myaccount.personalDetails.form.inputs.firstname.validation.min`
        )
      )
      .max(
        15,
        i18n.t(
          `organizer.myaccount.personalDetails.form.inputs.firstname.validation.max`
        )
      )
      .matches(
        /^[a-zA-Z0-9]+$/,
        i18n.t(`settings.editProfile.form.inputs.firstName.validation.matches`)
      ),
    lastName: yup
      .string()
      .trim()
      .required(
        i18n.t(
          `organizer.myaccount.personalDetails.form.inputs.lastname.validation.required`
        )
      )
      .min(
        3,
        i18n.t(
          `organizer.myaccount.personalDetails.form.inputs.lastname.validation.min`
        )
      )
      .max(
        15,
        i18n.t(
          `organizer.myaccount.personalDetails.form.inputs.lastname.validation.max`
        )
      )
      .matches(
        /^[a-zA-Z0-9]+$/,
        i18n.t(
          `organizer.myaccount.personalDetails.form.inputs.lastname.validation.matches`
        )
      ),
    email: yup
      .string()
      .email(
        i18n.t(
          `organizer.myaccount.personalDetails.form.inputs.email.validation.email`
        )
      )
      .required(
        i18n.t(
          `organizer.myaccount.personalDetails.form.inputs.email.validation.required`
        )
      ),
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
    // .test(
    //   "hasCountryCode",
    //   i18n.t(
    //     `organizer.myaccount.personalDetails.form.inputs.mobileNumber.validation.matches`
    //   ),
    //   (value) => {
    //     const countryCodeRegex = /^\+(?:[0-9] ?){1,6}/;
    //     return countryCodeRegex.test(value);
    //   }
    // ),

    // dob: yup.string().required('Please select date of birth.'),

    bio: yup
      .string()
      .test(
        "bio-length",
        i18n.t(
          `organizer.myaccount.personalDetails.form.inputs.bio.validation.test`
        ),
        function (value) {
          if (value && (value.length < 5 || value.length > 150)) {
            return false; // Return false to indicate validation failure and display the error message
          }
          return true; // Return true for values within the length range to pass the validation
        }
      ),

    instagramLink: yup
      .string()
      .test(
        "is-url",
        i18n.t(
          `organizer.myaccount.personalDetails.form.inputs.instagramLink.validation.test`
        ),
        function (value) {
          if (value && !urlMatch.test(value)) {
            return this.createError({
              message: i18n.t(
                `organizer.myaccount.personalDetails.form.inputs.instagramLink.validation.test`
              ),
            });
          }
          return true;
        }
      ),
    websiteLink: yup
      .string()
      .url(
        i18n.t(
          `organizer.myaccount.personalDetails.form.inputs.websiteLink.validation.test`
        )
      ),
    // .test(
    //     'is-url',
    // i18n.t(
    //     `organizer.myaccount.personalDetails.form.inputs.websiteLink.validation.test`
    // ),
    //     function (value) {
    //         if (value && !urlMatch.test(value)) {
    //             return this.createError({
    //                 message: 'Please enter correct URL'
    //             })
    //         }
    //         return true
    //     }
    // )
  });
  const uploadImage = useRef(null);
  const dispatch = useDispatch();
  const { isloading } = useSelector((m) => m.myaccount);
  useEffect(() => {
    dispatch(asyncViewprofile());
  }, []);
  const { userDetail } = useSelector((action) => action.viewprofile);
  const viewOrgData = userDetail?.data;
  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
    watch,
    setValue,
    control,
  } = useForm({
    resolver: yupResolver(editDetailValidation),
    mode: "all",
  });

  //////// DOB Format Function ///////
  const convertTimestampToDate = (timestamp) => {
    const date = new Date(parseInt(timestamp)); // Convert timestamp to Date object
    const day = String(date.getDate()).padStart(2, "0"); // Get day component
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month component
    const year = date.getFullYear(); // Get year component
    // Return the date in dd/mm/yyyy format
    return `${year}-${month}-${day}`;
  };

  const formatDateForInput = (timestamp) => {
    if (!timestamp) return "";
    const dob = new Date(timestamp);
    const year = dob.getFullYear();
    const month = String(dob.getMonth() + 1).padStart(2, "0");
    const day = String(dob.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const handleDateChange = (value) => {
    const parts = value.split("-");
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];
    const formattedDate = `${day}/${month}/${year}`;
    setValue("dob", formattedDate);
  };
  //////// End DOB Format Function ///////

  // Maximun input for selecting date of birth ///
  const today = new Date();
  const maxDate = new Date(
    today.getFullYear() - 20,
    today.getMonth(),
    today.getDate()
  );
  const minDate = new Date(
    today.getFullYear() - 80,
    today.getMonth(),
    today.getDate()
  );
  console.log(watch("mobileNumber"), "mobileNumber");
  // Format dates for input type date
  const formattedMaxDate = maxDate.toISOString().split("T")[0];
  const formattedMinDate = minDate.toISOString().split("T")[0];
  // End Maximun input for selecting date of birth ///

  ///// set data from api when user redirect on this page //////
  useEffect(() => {
    if (viewOrgData) {
      setValue("profileImage", viewOrgData?.profileImage || "");
      setValue("firstName", viewOrgData?.firstName || "");
      setValue("lastName", viewOrgData?.lastName || "");
      setValue("email", viewOrgData?.email || "");
      setValue("mobileNumber", viewOrgData?.mobileNumber || "");
      setValue(
        "dob",
        viewOrgData?.dob ? new Date(+viewOrgData?.dob) : "" || ""
      );
      setValue("bio", viewOrgData?.bio || "");
      setValue("instagramLink", viewOrgData?.instagramLink || "");
      setValue("websiteLink", viewOrgData?.websiteLink || "");
    }
  }, [viewOrgData]);
  /////// end user api's data /////

  const editProfileData = (data) => {
    //  const DOB  =  new Date(data.dob).getTime()
    const DOB = data.dob ? new Date(data.dob).getTime() : "";
    const rawFormData = new FormData();
    {
      data.profileImage &&
        rawFormData.append("profileImage", data.profileImage);
    }
    rawFormData.append("firstName", data.firstName);
    rawFormData.append("lastName", data.lastName);
    rawFormData.append("email", data.email);
    rawFormData.append("mobileNumber", data.mobileNumber);
    // rawFormData.append('dob', DOB )
    // if (DOB !== '') {
    //     rawFormData.append('dob', DOB);
    // } else {
    //     rawFormData.append('dob', '');
    // }
    {
      DOB ? rawFormData.append("dob", DOB) : "";
    }
    {
      data.bio ? rawFormData.append("bio", data.bio) : "";
    }
    {
      data.instagramLink
        ? rawFormData.append("instagramLink", data.instagramLink)
        : "";
    }
    {
      data.websiteLink
        ? rawFormData.append("websiteLink", data.websiteLink)
        : "";
    }
    // rawFormData.append('bio', data.bio)
    // rawFormData.append('instagramLink', data.instagramLink)
    // rawFormData.append('websiteLink', data.websiteLink)
    dispatch(
      personalDetails(rawFormData, () => {
        // reset()
        dispatch(asyncViewprofile());
      })
    );
  };
  return (
    <>
      <div className="account-title flex items-center justify-between flex-wrap">
        <H2>{i18n.t(`organizer.myaccount.personalDetails.title`)}</H2>
      </div>
      <form onSubmit={handleSubmit(editProfileData)}>
        <Controller
          name="profileImage"
          control={control}
          render={({ field: { value, onChange } }) => {
            return (
              <div className="user-profile flex items-center justify-center flex-col">
                <div className="users-image">
                  <Image
                    src={
                      typeof value === "object" && value
                        ? URL.createObjectURL(value)
                        : viewOrgData?.profileImage
                    }
                    width={160}
                    height={160}
                    alt="Picture of the author"
                  />
                  <label
                    className="flex items-center justify-center edit-profile"
                    onClick={() => uploadImage?.current?.click()}
                  >
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      id="profileImage"
                      aria-label="profileImage"
                      onChange={(e) => {
                        if (
                          e.target.files[0].type === "image/jpg" ||
                          e.target.files[0].type === "image/jpeg" ||
                          e.target.files[0].type === "image/png"
                        ) {
                          // console.log(
                          //     e.target.files,
                          //     'traget'
                          // )
                          onChange(e.target.files[0]);
                        } else {
                          sweetalert({
                            message: i18n.t(
                              `organizer.myaccount.personalDetails.form.inputs.image.validation.notvalid`
                            ),
                            type: "error",
                          });
                          // alert('NOT VALID IMAGE')
                        }
                      }}
                    />
                    <i className="icon-edit"></i>
                  </label>
                </div>
              </div>
            );
          }}
        />

        <div className="form-content mt-32">
          <div className="sm:flex sm:items-center sm:gap-4 2xl:gap-5">
            <div className="input-group w-full">
              <label htmlFor="first-name">
                {i18n.t(
                  `organizer.myaccount.personalDetails.form.inputs.firstname.label`
                )}
              </label>
              <input
                type="text"
                id="first-name"
                name="firstName"
                {...register("firstName")}
              />
              {errors?.firstName?.message && (
                <span className="error-msg">{errors?.firstName?.message}</span>
              )}
            </div>
            <div className="input-group w-full">
              <label htmlFor="last-name">
                {i18n.t(
                  `organizer.myaccount.personalDetails.form.inputs.lastname.label`
                )}
              </label>
              <input
                type="text"
                id="last-name"
                name="lastName"
                {...register("lastName")}
              />
              {errors?.lastName?.message && (
                <span className="error-msg">{errors?.lastName?.message}</span>
              )}
            </div>
          </div>
          <div className="input-group w-full">
            <label htmlFor="email">
              {i18n.t(
                `organizer.myaccount.personalDetails.form.inputs.email.label`
              )}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              {...register("email")}
            />
            {errors?.email?.message && (
              <span className="error-msg">{errors?.email?.message}</span>
            )}
          </div>
          <div className="input-group w-full">
            <label htmlFor="mobileNumber">
              {i18n.t(
                `organizer.myaccount.personalDetails.form.inputs.mobileNumber.label`
              )}
            </label>
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
          <div className="input-group icon-input w-full">
            <label htmlFor="dob">
              {i18n.t(
                `organizer.myaccount.personalDetails.form.inputs.DOB.label`
              )}
            </label>
            {/* <input
                            type="date"
                            id="dob"
                            name="dob"
                            // min={formattedMinDate}
                            min="1000-01-01"
                            max={DateofBirthFormatorFn()}
                            // max={formattedMaxDate}
                            // defaultValue={formatDateForInput(viewOrgData?.dob)}
                            // onChange={(e) => handleDateChange(e.target.value)}
                            {...register('dob')}
                        /> */}
            <Controller
              name="dob"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <>
                  <DatePicker
                    onChange={(e) => {
                      onChange(e);
                      // setValue("end_date","");
                    }}
                    // selected={
                    //   typeof value === "string" ? new Date(value) : value || ""
                    // }

                    selected={value || ""}
                    // inputFormat="dd-MM-yyyy"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    // scrollableYearDropdown
                    // yearDropdownItemNumber={15}
                    dateFormat="dd-MM-yyyy"
                    locale={languageName === "de" && de}
                    customInput={
                      <DatePikerLang
                        value={value || ""}
                        formateDate={
                          i18n?.language === "en" ? "dd-mm-yyyy" : "tt-mm-jjjj"
                        }
                        ref={ref}
                      />
                    }
                    maxDate={new Date(DateofBirthFormatorFn())}
                  />
                </>
              )}
            />
            {/* {errors?.dob?.message && (
                            <span className="error-msg">
                                {errors?.dob?.message}
                            </span>
                        )} */}
          </div>
          <div className="input-group w-full">
            <label htmlFor="bio">
              {" "}
              {i18n.t(
                `organizer.myaccount.personalDetails.form.inputs.bio.label`
              )}
            </label>
            <textarea
              name="bio"
              id="bio"
              rows="3"
              {...register("bio")}
            ></textarea>
            {errors?.bio?.message && (
              <span className="error-msg">{errors?.bio?.message}</span>
            )}
          </div>
          <div className="input-group w-full">
            <label htmlFor="instagramLink">
              {i18n.t(
                `organizer.myaccount.personalDetails.form.inputs.instagramLink.label`
              )}
            </label>
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
            <label htmlFor="websiteLink">
              {i18n.t(
                `organizer.myaccount.personalDetails.form.inputs.websiteLink.label`
              )}
            </label>
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
        </div>
        {isloading ? (
          <button type="submit" className="solid-btn dashboard-form-btn">
            <LoaderBtn />
          </button>
        ) : (
          <button type="submit" className="solid-btn dashboard-form-btn">
            {i18n.t(`organizer.myaccount.personalDetails.form.button`)}
          </button>
        )}
      </form>
    </>
  );
};

export default PersonalDetailsForm;
