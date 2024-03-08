"use client";
import H1 from "@/app/components/common/h1";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { asyncViewprofile } from "../../../../../../redux/Thunks/Account/viewprofile.thunk";
import { sweetalert } from "@/app/components/common/Common";
import { personalDetails } from "../../../../../../redux/Thunks/Account/OrganizerAccount/myaccount.thunk";
import LoaderBtn from "@/app/components/common/LoaderBtn";
import { getCityThunk } from "../../../../../../redux/Thunks/Organizer/EventForm/event.thunk";
import ReactSelectcmp from "../../../../components/ReactSelectcmp/ReactSelectcmp";
// import Select from 'react-select'
import { DateofBirthFormatorFn } from "@/utils/commonfn/DateOfBirth";
import DatePicker from "react-datepicker";
import DatePikerLang from "@/app/components/DatePikerLang/DatePikerLang";
import de from "date-fns/locale/de";
import "./edit-profile.scss";
import { useTranslation } from "react-i18next";

const EditProfileForm = () => {
  let timer; //for city api calling after some seconds
  const { i18n } = useTranslation();
  const urlMatch = /^(https?|ftp):\/\/[^\s\/$.?#]+\.[^\s\/$.?#]+[^\s]*$/;
  // /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  const cityButtonRef = useRef(null);
  const editDetailValidation = yup.object({
    profileImage: yup.mixed().required("Image is required."),
    firstName: yup
      .string()
      .trim()
      .required(
        i18n.t(`settings.editProfile.form.inputs.firstName.validation.required`)
      )
      .min(
        3,
        i18n.t(`settings.editProfile.form.inputs.firstName.validation.min`)
      )
      .max(
        15,
        i18n.t(`settings.editProfile.form.inputs.firstName.validation.max`)
      )
      .matches(
        /^[a-zA-Z0-9]+$/,
        i18n.t(`settings.editProfile.form.inputs.firstName.validation.matches`)
      ),
    lastName: yup
      .string()
      .trim()
      .required(
        i18n.t(`settings.editProfile.form.inputs.lastName.validation.required`)
      )
      .min(
        3,
        i18n.t(`settings.editProfile.form.inputs.lastName.validation.min`)
      )
      .max(
        15,
        i18n.t(`settings.editProfile.form.inputs.lastName.validation.max`)
      )
      .matches(
        /^[a-zA-Z0-9]+$/,
        i18n.t(`settings.editProfile.form.inputs.lastName.validation.matches`)
      ),
    email: yup
      .string()
      .email(i18n.t(`settings.editProfile.form.inputs.email.validation.email`))
      .required(
        i18n.t(`settings.editProfile.form.inputs.email.validation.required`)
      )
      .matches(emailRegex, {
        message: i18n.t(
          `settings.editProfile.form.inputs.email.validation.matches`
        ),
      }),
    dob: yup.string().nullable(),
    // dob: yup.string().test('custom','Enter Valid DOB.',function (value){
    //     console.log(value !== 'yyyy/mm/dd',"eeeeeeeeee");
    //     if(value !== ('yyyy/mm/dd')){
    //         console.log(value,"valuevaluevalue");
    //         return false
    //     }
    //     return true
    // }),

    // city:yup.mixed().required(i18n.t(`settings.editProfile.form.inputs.city.validation.required`)),

    socialMediaLink: yup
      .string()
      .url(
        i18n.t(
          `settings.editProfile.form.inputs.socialMediaLink.validation.test`
        )
      ),
    // .test(
    //     'is-url',
    //     i18n.t(
    //         `settings.editProfile.form.inputs.socialMediaLink.validation.test`
    //     ),
    //     function (value) {
    //         if (value && !urlMatch.test(value)) {
    //             return this.createError({
    //                 message: i18n.t(
    //                     `settings.editProfile.form.inputs.socialMediaLink.validation.createError`
    //                 )
    //             })
    //         }
    //         return true
    //     }
    // ),

    bio: yup
      .string()
      .test(
        "bio-length",
        i18n.t(`settings.editProfile.form.inputs.bio.validation.test`),
        function (value) {
          if (value && (value.length < 5 || value.length > 150)) {
            return false; // Return false to indicate validation failure and display the error message
          }
          return true; // Return true for values within the length range to pass the validation
        }
      ),
  });
  const languageName = i18n.language || "de";
  const uploadImage = useRef(null);
  const { isloading } = useSelector((m) => m.myaccount);
  const dispatch = useDispatch();
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
    setValue,
    watch,
    control,
    trigger,
  } = useForm({
    resolver: yupResolver(editDetailValidation),
    mode: "all",
  });

  //      // Calculate the minimum date allowed (14 years ago)
  //   const minnDate = new Date();
  //   minnDate.setFullYear(minnDate.getFullYear() - 14);
  //   const formatttedMinDate = minnDate.toISOString().split('T')[0];
  //////// DOB Format Function ///////
  const convertTimestampToDate = (timestamp) => {
    const date = new Date(parseInt(timestamp)); // Convert timestamp to Date object
    const day = String(date.getDate()).padStart(2, "0"); // Get day component
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month component
    const year = date.getFullYear(); // Get year component
    // Return the date in dd/mm/yyyy format
    return `${year}-${month}-${day}`;
  };
  const timestamp = viewOrgData?.dob; // Your timestamp as a string
  const formattedDate = convertTimestampToDate(timestamp);

  // const formatDateForInput = (timestamp) => {
  //     if (!timestamp || isNaN(new Date(timestamp))) return ''
  //     // if (!timestamp) return ''
  //     const dob = new Date(timestamp)
  //     const year = dob.getFullYear()
  //     const month = String(dob.getMonth() + 1).padStart(2, '0')
  //     const day = String(dob.getDate()).padStart(2, '0')
  //     return `${year}-${month}-${day}`
  // }

  // const formatDateForInput = (timestamp) => {
  //     if (!timestamp || isNaN(new Date(timestamp))) return '';
  //     const dob = new Date(timestamp);
  //     if (isNaN(dob.getTime())) return ''; // Invalid date string
  //     const year = dob.getFullYear();
  //     const month = String(dob.getMonth() + 1).padStart(2, '0');
  //     const day = String(dob.getDate()).padStart(2, '0');
  //     return `${year}-${month}-${day}`;
  // };

  // const handleDateChange = (value) => {
  //     const parts = value.split('-')
  //     const year = parts[0]
  //     const month = parts[1]
  //     const day = parts[2]
  //     const formattedDate = `${day}/${month}/${year}`
  //     setValue('dob', formattedDate)
  // }
  //////// End DOB Format Function ///////

  //Start Maximum-Minimum input for selecting date of birth ///
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
  // Format dates for input type date
  const formattedMaxDate = maxDate.toISOString().split("T")[0];
  const formattedMinDate = minDate.toISOString().split("T")[0];
  // End Maximun input for selecting date of birth ///

  // Start Select City Drop-Down All Functionality ////

  const [city, setCity] = useState(false);
  const { cityData } = useSelector((e) => e.EventFormSlice);
  const handleCityChange = (e) => {
    if (!!e) {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        // onChange(e)
        dispatch(
          getCityThunk({
            search: e,
          })
        );
      }, 500);
    }
  };

  // End Select City Drop-Down All Functionality ////

  ///// set data from api when user redirect on this page //////
  useEffect(() => {
    // console.log(viewOrgData,"viewOrgData");
    if (viewOrgData) {
      setValue("profileImage", viewOrgData?.profileImage || "");
      setValue("firstName", viewOrgData?.firstName || "");
      setValue("lastName", viewOrgData?.lastName || "");
      setValue("email", viewOrgData?.email || "");
      setValue(
        "dob",
        viewOrgData?.dob
          ? // ? convertTimestampToDate(viewOrgData?.dob)
            new Date(+viewOrgData?.dob)
          : "" || ""
      );
      setValue(
        "city",
        viewOrgData?.city?.hasOwnProperty("_id") ? viewOrgData?.city : null
      );
      setValue("socialMediaLink", viewOrgData?.socialMediaLink || "");
      setValue("bio", viewOrgData?.bio || "");
    }
  }, [viewOrgData]);
  /////// end user api's data /////const cityButtonRef = useRef(null)

  // Start On Handle Submit Api for Edit Data ////
  const onFormSubmit = (data) => {
    const DOB = new Date(data.dob).getTime();
    const rawFormData = new FormData();
    {
      data.profileImage &&
        rawFormData.append("profileImage", data.profileImage);
    }
    rawFormData.append("firstName", data.firstName);
    rawFormData.append("lastName", data.lastName);
    rawFormData.append("email", data.email);
    // rawFormData.append('dob', DOB)
    {
      DOB ? rawFormData.append("dob", DOB) : "";
    }
    // rawFormData.append('city',data?.city?.cityId)

    {
      data?.city?.cityId || data?.city?._id
        ? rawFormData.append(
            "city",
            data?.city?.cityId
              ? data?.city?.cityId
              : data?.city?._id
              ? data?.city?._id
              : ""
          )
        : "";
    }

    // rawFormData.append('city',data?.city?.cityId
    // ? data?.city?.cityId
    // : data?.city?._id
    // ? data?.city?._id
    // : "")
    {
      data.bio ? rawFormData.append("bio", data.bio) : "";
    }
    {
      data.socialMediaLink
        ? rawFormData.append("socialMediaLink", data.socialMediaLink)
        : "";
    }
    // rawFormData.append('bio', data.bio)
    // rawFormData.append('socialMediaLink', data.socialMediaLink)
    dispatch(
      personalDetails(rawFormData, () => {
        // reset()
        dispatch(asyncViewprofile());
      })
    );
  };
  // End On Handle Submit Api for Edit Data ////

  return (
    <>
      <form
        noValidate
        className="edit-profile"
        onSubmit={handleSubmit(onFormSubmit)}
      >
        <H1 className="h2">{i18n.t(`settings.editProfile.title`)}</H1>

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
                    alt="profile-image"
                    width={240}
                    height={240}
                    sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                  />
                  <label
                    className="flex items-center justify-center edit-profile"
                    for="upload-file"
                    // className="inline-flex items-center upload-file"
                    onClick={() => uploadImage?.current?.click()}
                  >
                    <input
                      type="file"
                      id="upload-file"
                      accept=".jpg,.jpeg,.png"
                      onChange={(e) => {
                        if (
                          e.target.files[0].type === "image/jpg" ||
                          e.target.files[0].type === "image/jpeg" ||
                          e.target.files[0].type === // {...register('dob')}
                            "image/png"
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

        <div className="lg:flex lg:items-center input-group-row">
          <div className="input-group">
            <label>
              {i18n.t(`settings.editProfile.form.inputs.firstName.label`)}
            </label>
            <input
              type="text"
              id="first-name" // {...register('dob')}
              name="firstName"
              {...register("firstName")}
            />
            {errors?.firstName?.message && (
              <span className="error-msg">{errors?.firstName?.message}</span>
            )}
          </div>
          <div className="input-group">
            <label>
              {i18n.t(`settings.editProfile.form.inputs.lastName.label`)}
            </label>
            {/* <input type="text" placeholder="Enter last name" /> */}
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
        <div className="input-group">
          <label>
            {i18n.t(`settings.editProfile.form.inputs.email.label`)}
          </label>
          <input type="email" id="email" name="email" {...register("email")} />
          {errors?.email?.message && (
            <span className="error-msg">{errors?.email?.message}</span>
          )}
        </div>
        <div className="input-group">
          <label>{i18n.t(`settings.editProfile.form.inputs.DOB.label`)}</label>
          {/* <input type="date" placeholder="Enter City" /> */}
          {/* <input
                        type="date"
                        id="dob"
                        name="dob"
                        // min={formattedMinDate}
                        // min="1000-01-01"
                        // max="9999-12-31"
                        min="1000-01-01"
                        max={DateofBirthFormatorFn()}
                        // max={formattedMaxDate}
                        // defaultValue={formatDateForInput(viewOrgData?.dob)}
                        // onChange={(e) => handleDateChange(e.target.value)}
                        // {...register('dob')}
                        {...register('dob', {
                            required: 'Date is required',
                            pattern: {
                                value: /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
                                message: 'Enter a valid date in YYYY-MM-DD format',
                            },
                        })}
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
                  showMonthDropdown
                  showYearDropdown
                  // scrollableYearDropdown
                  // yearDropdownItemNumber={15}
                  dropdownMode="select"
                  selected={value || ""}
                  // inputFormat="dd-MM-yyyy"
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
          {errors?.dob && (
            <span className="error-msg">{errors?.dob?.message}</span>
          )}
        </div>

        {/* City Select DropDown  htmlFor="event-title" */}
        <div className="input-group">
          <label>{i18n.t(`settings.editProfile.form.inputs.city.label`)}</label>
          <div className={`custom-select ${city === true ? "active" : ""}`}>
            <Controller
              control={control}
              name="city"
              render={({ field: { onChange, value } }) => (
                <ReactSelectcmp
                  openMenuOnFocus={true}
                  value={value}
                  onChange={onChange}
                  onInputChange={(e) => handleCityChange(e)}
                  getOptionLabel={(e) => {
                    return e.name;
                  }}
                  getOptionValue={(e) => {
                    return e.cityId;
                  }}
                  options={cityData}
                  isSearchable={true}
                  isClearable={true}
                  // {...rest}
                />
                // <Select
                //     openMenuOnFocus={true}
                //     value={value}
                //     onChange={onChange}
                //     onInputChange={(e) => {
                //         handleCityChange(e)
                //     }}
                //     getOptionLabel={(e) => {
                //         return e.name
                //     }}
                //     getOptionValue={(e) => {
                //         return e.cityId
                //     }}
                //     options={cityData}
                //     isSearchable={true}
                //     placeholder="Search City"
                //     isClearable
                //     className="react-select-menu"
                // />
                // <>
                //     <button
                //         ref={cityButtonRef}
                //         type="button"
                //         className="select-btn"
                //         onClick={() => setCity(!city)}
                //     >
                //         {value?.name ? value?.name : 'Select City'}
                //     </button>
                //     {value?.name &&
                //     <span onClick={()=>{
                //         setValue('city' , "")
                //     }} className="remove-city"><i className='icon-cross'></i></span>}
                //     <div className="select-menu-list">
                //         <ul>
                //             <input
                //                 type="search"
                //                 placeholder="Search..."
                //                 // value={searchInput}
                //                 onChange={(e) => {
                //                     if (timer) {
                //                         clearTimeout(timer)
                //                     }
                //                     timer = setTimeout(() => {
                //                         // onChange(e)
                //                         dispatch(
                //                             getCityThunk({
                //                                 search: e.target
                //                                     .value
                //                             })
                //                         )
                //                     }, 500)
                //                 }}
                //             />

                //             {cityData &&
                //                 cityData?.map((list) => {
                //                     return (
                //                         <li
                //                             key={list?.cityId}
                //                             onClick={() => {
                //                                 onChange(list)
                //                                 setCity(!city)
                //                                 // setValue("eventTitle", "");
                //                             }}
                //                         >
                //                             {list?.name}{' '}
                //                         </li>
                //                     )
                //                 })}

                //             {cityData?.length === 0 && (
                //                 <li>
                //                     {value
                //                         ? 'No record found'
                //                         : 'Please Search City Name'}
                //                 </li>
                //             )}
                //         </ul>
                //     </div>
                // </>
              )}
            />
          </div>
          {/* {errors?.city?.message && (
                    <span className="error-msg">{errors?.city?.message}</span>
                )} */}
        </div>
        {/* End City Select DropDown */}

        <div className="input-group">
          <label>
            {i18n.t(`settings.editProfile.form.inputs.socialMediaLink.label`)}
          </label>
          <input
            type="text"
            id="socialMediaLink"
            name="socialMediaLink"
            {...register("socialMediaLink")}
          />
          {errors?.socialMediaLink?.message && (
            <span className="error-msg">
              {errors?.socialMediaLink?.message}
            </span>
          )}
        </div>
        <div className="input-group">
          <label>{i18n.t(`settings.editProfile.form.inputs.bio.label`)}</label>
          <textarea
            name="bio"
            id=""
            cols="30"
            rows="2"
            // placeholder="Paste social media link"
            {...register("bio")}
          ></textarea>
          {errors?.bio?.message && (
            <span className="error-msg">{errors?.bio?.message}</span>
          )}
        </div>
        {isloading ? (
          <button type="submit" className="solid-btn form-btn">
            <LoaderBtn />
          </button>
        ) : (
          <button type="submit" className="solid-btn form-btn">
            {i18n.t("settings.editProfile.form.button")}
          </button>
        )}
      </form>
    </>
  );
};

export default EditProfileForm;

/* <div className="user-profile">
<Image
    src={
        typeof value === 'object' && value
            ? URL.createObjectURL(value)
            : viewOrgData?.profileImage
    }
    width={160}
    height={160}
    alt="Picture of the author"
/>
<label className='inline-flex items-center upload-file'
    onClick={() =>
        uploadImage?.current?.click()
    }
>
    <input
        type="file"
        accept=".jpg,.jpeg,.png"
        id="profileImage"
        aria-label="profileImage"
        onChange={(e) => {
            if (
                e.target.files[0].type ===
                    'image/jpg' ||
                e.target.files[0].type ===
                    'image/jpeg' ||
                e.target.files[0].type ===
                    'image/png'
            ) {
                console.log(
                    e.target.files,
                    'traget'
                )
                onChange(e.target.files[0])
            } else {
                sweetalert({
                    message : "NOT VALID IMAGE",
                    type : "error"
                })
                // alert('NOT VALID IMAGE')
            }
        }}
    />
    <i className="icon-edit"></i>
</label>
</div> */
