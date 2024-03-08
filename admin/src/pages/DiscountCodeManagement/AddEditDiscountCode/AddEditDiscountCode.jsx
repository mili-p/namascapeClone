import React, { useEffect, useState } from "react";
import { discountcodemanagement, home } from "../../../config/routeConsts";
import SiteBreadcrumb from "../../../components/SiteBreadcrumb/SiteBreadcrumb";
import { useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import {
  EVENTCATEGORY,
  DISCOUNTTYPE,
  DISCOUNTTYPENEW,
} from "../../../common/constsforCodes";
import {
  asyncdiscountcodeUpdateThunk,
  asyncdiscountcodeViewThunk,
} from "../../../redux/thunk/discountCode/dicountcode.thunk";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { editorConfiguration } from "../../../common/EditorConfiguration";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import DeleteLogoutModal from "../../../components/SiteModal/DeleteLogoutModal/DeleteLogoutModal";
import SelectCustom from "../../../components/SelectCustom/SelectCustom";
import MultiSelect from "../../../components/MultiSelect/MultiSelect";
import Swal from "sweetalert2";
import "../DiscountCodeManagement.scss";
import { asyncExperienceListThunk } from "../../../redux/thunk/experiencesListDiscountCodeM/experiencesList.thunk";
//#region AppHomeScreen Validation Schema
const yy = yup
  .object()
  .shape(
    {
      startDate: yup
        .string()
        .when("endDate", {
          is: (e) => !!e,
          then: () => yup.string().required("Please enter start date"),
          otherwise: () => yup.string(),
        })
        .max(new Date(), "Please enter valid date"),
      endDate: yup.string().when("startDate", {
        is: (e) => !!e,
        then: () => yup.string().required("Please enter end date"),
        otherwise: () => yup.string(),
      }),
    },
    ["startDate", "endDate"]
  )
  .test(
    "custome-message",
    "End date should  be greater than start date",
    function (value) {
      if (Boolean(value?.startDate) && Boolean(value?.endDate)) {
        return new Date(value?.endDate).getTime() >
          new Date(value?.startDate).getTime()
          ? true
          : false;
      } else {
        return true;
      }
    }
  );

const validationSchema = yup
  .object()
  .shape({
    title: yup.string().required("Please enter title").trim(),
    discount: yup.number().when(["type"], {
      is: (t) => t?.id !== 3,
      then: () =>
        yup
          .number()
          .transform((value) => (Number.isNaN(value) ? null : value))
          .required("Please enter discount")
          .test(
            "Is positive?",
            "The number must be greater than 0!",
            (value) => value > 0
          ),
    }),
    // discount: yup
    //   .number()
    //   .nullable()
    //   .transform((value) => (Number.isNaN(value) ? null : value))

    //   .required("Please enter discount")
    //   .test(
    //     "Is positive?",
    //     "The number must be greater than 0!",
    //     (value) => value > 0
    //   ),
    // minOrderAmount: yup.number().when(["type"], {
    //   is: (t) => t?.id !== 3,
    //   then: () =>
    //     yup
    //       .number()
    //       .transform((value) => (Number.isNaN(value) ? null : value))
    //       .required("Please enter Min. order Amount")
    //       .test(
    //         "Is positive?",
    //         "The number must be greater than 0!",
    //         (value) => value > 0
    //       ),
    // }),
    // minOrderAmount: yup
    //   .number()
    //   .nullable()
    //   .transform((value) => (Number.isNaN(value) ? null : value))
    //   .required("Please enter Min. order Amount")
    //   .test(
    //     "Is positive?",
    //     "The number must be greater than 0!",
    //     (value) => value > 0
    //   ),
    code: yup.string().when(["type"], {
      is: (t) => t?.id !== 3,
      then: () => yup.string().required("Please enter discount code"),
    }),
    // code: yup.string().required("Please enter discount code"),
    description: yup.string().required("Please enter description").trim(),
    notificationTitle: yup
      .string()
      .required("Please enter notification title")
      .trim(),
    notificationTitleDe: yup
      .string()
      .required("Please enter notification title in german")
      .trim(),
    notificationDesc: yup
      .string()
      .required("Please enter notification description"),
    notificationDescDe: yup
      .string()
      .required("Please enter notification description in german"),
    descriptionDe: yup
      .string()
      .required("Please enter description in German")
      .trim(),
    eventCategory: yup
    .array()
    .min(1, "Please select at least one category")
    .required("Please select category"),
    type: yup.object().required("Please select discount type"),
  })
  .concat(yy);
//#endregion

const AddEditDiscountCode = () => {
  const { discountId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [payloadWithStatus, setpayloadWithStatus] = useState();
  const [show, setshow] = useState(false);
  const { discountcode, isLoading } = useSelector((e) => e?.discountcode);
  const { experiencesList } = useSelector((e) => e.experiencesSlice);
  console.log(experiencesList, "experiencesList");
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
    setValue,
    clearErrors,
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      // eventCategory: [],
      // minOrderAmount : null
    },
  });

  console.log(errors, "errr");
  useEffect(() => {
    if (discountId) {
      dispatch(asyncdiscountcodeViewThunk({ discountId: discountId }));
    }
  }, []);

  useEffect(() => {
    if (watch("eventCategory")?.length > 0) {
      const ArrayEventCategory = watch("eventCategory")?.map((e) => e?.id);
      dispatch(
        asyncExperienceListThunk({ category: ArrayEventCategory || [] })
      );
    }
  }, [watch("eventCategory")]);

  //#region set Data in element
  useEffect(() => {
    if (discountcode && discountId) {
      reset({
        title: discountcode?.data?.title,
        startDate: convertTimestampToDate(discountcode?.data?.startDate),
        endDate: convertTimestampToDate(discountcode?.data?.endDate),
        discount: discountcode?.data?.discount,
        experiences: discountcode?.data?.events,
        minOrderAmount: discountcode?.data?.minOrderAmount,
        description: discountcode?.data?.description,
        descriptionDe: discountcode?.data?.descriptionDe,
        notificationTitle: discountcode?.data?.notificationTitle,
        notificationDesc: discountcode?.data?.notificationDesc,
        notificationTitleDe: discountcode?.data?.notificationTitleDe,
        notificationDescDe: discountcode?.data?.notificationDescDe,
        code: discountcode?.data?.code,
        type: DISCOUNTTYPENEW.find((e) => e.id == discountcode?.data?.type),
        eventCategory: EVENTCATEGORY.filter((e) =>
          discountcode?.data?.eventCategory?.includes(e.id)
        ),
        sendPushNotification: discountcode?.data?.sendPushNotification,
      });
    }
  }, [discountcode]);
  //#endregion
  console.log(errors, "fgdgdgdgdfgdfg");
  //#region Custom style for MultiSelect Dropdown
  const colourStyles = {
    option: (styles, { data, isDisabled, isFocused, isSelected, ...rest }) => {
      return {
        ...styles,
        fontSize: "16px",
        backgroundColor: isFocused ? "#B09684" : "white",
        color: isFocused ? "white" : "black",
        cursor: "pointer",
        zIndex: "2",

        // background: 'transparent',
        // border: 'none',
        // boxShadow: 'none',
        ":active": {
          backgroundColor: "#B09684",
          color: "white",
        },
        "@media only screen and (min-width: 1200px)": {
          ...styles["@media only screen and (min-width: 1200px)"],
          fontSize: "22px",
        },
      };
    },
  };
  //#endregion
  console.log(errors, "eeeeeeeeeeeeeeeeeeeeeeeee", watch("eventCategory"));
  //#region BreadCrum
  const BreadcrumbData = [
    {
      title: "Home",
      url: home,
    },
    {
      title: "Discount Code Management",
      url: discountcodemanagement,
    },
    {
      title: `${discountId ? "Edit discount code" : "Add discount code"}`,
    },
  ];
  //#endregion

  //#region date Formate
  const convertTimestampToDate = (timestamp) => {
    const date = new Date(parseInt(timestamp));
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  };
  //#endregion

  //#region  past data should not be emoji
  const handlePaste = (event) => {
    event.preventDefault();
    const pastedText = event.clipboardData.getData("text/plain");

    // Check if the pasted content contains emojis using regex
    const emojiRegex =
      /[\u{1F600}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}]/u;
    if (emojiRegex.test(pastedText)) {
      // Emoji detected, handle accordingly (e.g., show a warning message)
      //   alert('Emojis are not allowed in this textbox!');
      Swal.fire({
        icon: "warning",
        text: "Please do not Enter Emojis",
      });
      // Optionally, clear the clipboard content
      event.clipboardData.setData("text/plain", "");
    } else {
      // No emojis detected, proceed with the paste
      // You may set the pasted text into the textbox here
    }
  };
  //#endregion
  //#region  submit button
  const handleDiscountData = (data) => {
    if (watch("type")?.id === 3) {
      setValue("code", "");
      setValue("minOrderAmount", "");
      setValue("discount", "");
    }
    console.log(data, "datadatadatadatadata");
    const events =
      data?.experiences?.length > 0
        ? data?.experiences?.map((e) => e?.eventId)
        : [];
    const eventCategory =
      data?.eventCategory?.length > 0
        ? data?.eventCategory?.map((e) => e?.id)
        : [];
    const payload = {};
    for (const key in data) {
      if (discountId) {
        payload.discountId = discountId;
      }
      if (key === "startDate") {
        payload.startDate = new Date(data[key]).getTime();
      } else if (key === "endDate") {
        payload.endDate = new Date(data[key]).getTime();
      } else if (
        ["string", "boolean", "number"].includes(typeof data[key]) &&
        data[key]
      ) {
        if(!data?.minOrderAmount){
          payload.minOrderAmount = "0"
        } 
          payload[key] = data[key];
      }
      if (key === "type") {
        payload.type = data[key]?.id;
      }
      if (key === "experiences") {
        payload.events = events;
      }
      if (key === "eventCategory") {
        payload.eventCategory = eventCategory;
      }
    }
    console.log(payload, "HDJKHJDJDHDHDHDH");
    dispatch(
      asyncdiscountcodeUpdateThunk(payload, () =>
        navigate(discountcodemanagement)
      )
    );

    // try {
    //   if (discountId) {
    //     payload.discountId = discountId;
    //   }

    //   if (discountcode?.data?.status === 2) {
    //     for (let t in data) {
    //       if (t == "eventCategory") {
    //         payload[t] = data[t].map((e) => e?.id);
    //       } else if (t == "type") {
    //         payload[t] = DISCOUNTTYPE.find(
    //           (e) => e?.title == data[t]?.title
    //         )?.id;
    //       } else if (t == "startDate") {
    //         payload[t] = new Date(data[t]).getTime();
    //       } else if (t == "endDate") {
    //         payload[t] = new Date(data[t]).getTime();
    //       } else {
    //         payload[t] = data[t];
    //       }
    //     }
    //     setshow(true);
    //     payload.status = 1;
    //     setpayloadWithStatus(payload);
    //   } else {
    //     for (let t in data) {
    //       if (t == "eventCategory") {
    //         payload[t] = data[t].map((e) => e?.id);
    //       } else if (t == "type") {
    //         payload[t] = DISCOUNTTYPE.find(
    //           (e) => e?.title == data[t]?.title
    //         )?.id;
    //       } else if (t == "startDate") {
    //         payload[t] = new Date(data[t]).getTime();
    //       } else if (t == "endDate") {
    //         payload[t] = new Date(data[t]).getTime();
    //       } else {
    //         payload[t] = data[t];
    //       }
    //     }

    //     dispatch(
    //       asyncdiscountcodeUpdateThunk(payload, () =>
    //         navigate(discountcodemanagement)
    //       )
    //     );
    //   }
    // } catch (e) {
    //   Swal.fire({
    //     icon: "warning",
    //     title: e.message,
    //   });
    //   // throw new Error(e.message)
    // }
  };
  //#endregion

  console.log("errrrrrr", errors);
  return (
    <>
      <div className="add-edit-discount-code">
        <SiteBreadcrumb
          BreadcrumbData={BreadcrumbData}
          className="protected-breadcrumb"
        />
        <form onSubmit={handleSubmit(handleDiscountData)}>
          <div className="protected-head">
            <h2>{discountId ? "Edit" : "Add"} discount code</h2>
            <button className="solid-btn dashboard-form-btn">Save</button>
          </div>
          <div className="add-edit-discount-code-wrapper bg-white mt-32 p-5">
            <div className="add-edit-common-details">
              <div className="input-group w-full">
                <label htmlFor="title">Offer Title</label>
                <input
                  onPaste={handlePaste}
                  type="text"
                  id="title"
                  name="title"
                  {...register("title")}
                />
                {errors?.title?.message && (
                  <span className="error-msg">{errors?.title?.message}</span>
                )}
              </div>
              <div className="input-group w-full">
                {console.log(watch("eventCategory"), "gbcjgvjfjfjdkdf")}
                <label htmlFor="event-title">Experiences Category</label>
                <div className="input-wrapper">
                  <Controller
                    name="eventCategory"
                    control={control}
                    render={({
                      field: { onChange, onBlur, value, name, ref },
                      fieldState: { invalid, isTouched, isDirty, error },
                    }) => (
                      <Select
                        // menuIsOpen = {true}
                        aria-label="Select an option"
                        isMulti
                        value={value}
                        name="eventCategory"
                        onChange={onChange}
                        classNamePrefix="multiselect"
                        options={EVENTCATEGORY}
                        styles={{
                          ...colourStyles,
                        }}
                        placeholder={
                          <div
                            style={{
                              fontSize: "inherit",
                              color: "rgb(117, 117, 117)",
                              fontWeight: 300,
                            }}
                          >
                            Select Category
                          </div>
                        }
                        className="react-select-menu"
                        getOptionLabel={(e) => e.title}
                        getOptionValue={(e) => e.title}
                      />
                    )}
                  />
                  {errors?.eventCategory?.message && (
                    <span className="error-msg">
                      {errors?.eventCategory?.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="input-group w-full">
                {console.log(watch("eventCategory"), "gbcjgvjfjfjdkdf")}
                <label htmlFor="event-title">Experiences</label>
                <div className="input-wrapper">
                  <Controller
                    name="experiences"
                    control={control}
                    render={({
                      field: { onChange, onBlur, value, name, ref },
                      fieldState: { invalid, isTouched, isDirty, error },
                    }) => (
                      <Select
                        // menuIsOpen = {true}
                        aria-label="Select an option"
                        isMulti
                        value={value}
                        name="eventCategory"
                        onChange={onChange}
                        classNamePrefix="multiselect"
                        options={experiencesList}
                        styles={{
                          ...colourStyles,
                        }}
                        placeholder={
                          <div
                            style={{
                              fontSize: "inherit",
                              color: "rgb(117, 117, 117)",
                              fontWeight: 300,
                            }}
                          >
                            Select Experiences
                          </div>
                        }
                        className="react-select-menu"
                        getOptionLabel={(e) => e.title}
                        getOptionValue={(e) => e.title}
                        isDisabled={!watch("eventCategory")}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="sm:flex sm:items-center sm:gap-4 2xl:gap-5">
                <div className="input-group w-full">
                  <label htmlFor="disc-type">Disc. Type</label>
                  <Controller
                    control={control}
                    name="type"
                    render={({ field: { onChange, value } }) => {
                      console.log(value, "gdfgdgfdgfdgf");
                      return (
                        <SelectCustom
                          openMenuOnFocus={true}
                          value={value}
                          className={"event-type-select"}
                          onChange={onChange}
                          getOptionLabel={(e) => {
                            return e.title;
                          }}
                          getOptionValue={(e) => {
                            return e.id;
                          }}
                          options={DISCOUNTTYPENEW}
                          isSearchable={false}
                        />
                      );
                    }}
                  />

                  {errors?.type?.message && (
                    <span className="error-msg">{errors?.type?.message}</span>
                  )}
                </div>
                {console.log(watch("type")?.id, "vdfdfdfjdjfdjf")}
                {watch("type")?.id !== 3 && (
                  <div className="input-group w-full">
                    <label htmlFor="discount">
                      Discount {watch("type")?.id === 2 && "(%)"}
                    </label>
                    <Controller
                      name="discount"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <>
                          <input
                            type="number"
                            id="discount"
                            name="discount"
                            value={value}
                            onKeyDown={(e) => {
                              if (
                                e.key === "e" ||
                                e.key === "E" ||
                                (e.ctrlKey == true &&
                                  (e.which == "118" || e.which == "86"))
                              ) {
                                e.preventDefault();
                              }
                            }}
                            onChange={(e) => {
                              if (watch("type")?.id === 2) {
                                if (e.target.value?.length > 3) {
                                  onChange(value);
                                } else {
                                  if (Number(e.target.value) > 100) {
                                    onChange(value);
                                  } else {
                                    onChange(e.target.value);
                                  }
                                }
                              } else {
                                onChange(e.target.value);
                              }
                            }}
                            disabled={!watch("type")?.id}
                          />
                          {errors?.discount?.message && (
                            <span className="error-msg">
                              {errors?.discount?.message}
                            </span>
                          )}
                        </>
                      )}
                    />
                  </div>
                )}
              </div>
              {watch("type")?.id !== 3 && (
                <div className="sm:flex sm:items-center sm:gap-4 2xl:gap-5">
                  <div className="input-group w-full">
                    <label htmlFor="minOrderAmount">Min. Order Amount (Optional)</label>
                    <input
                      onPaste={handlePaste}
                      type="number"
                      id="minOrderAmount"
                      name="minOrderAmount"
                      {...register("minOrderAmount")}
                      disabled={!watch("type")?.id}
                    />
                    {/* {errors?.minOrderAmount?.message && (
                      <span className="error-msg">
                        {errors?.minOrderAmount?.message}
                      </span>
                    )} */}
                  </div>

                  <div className="input-group w-full">
                    <label htmlFor="code">Disc. Code</label>
                    <input
                      onInput={(e)=>console.log(e.target.value?.toUpperCase(),"HARRY")}
                      onPaste={handlePaste}
                      type="text"
                      id="code"
                      name="code"
                      value={watch("code")?.toUpperCase()}
                      {...register("code")}
                      disabled={!watch("type")?.id}
                    />
                    {errors?.code?.message && (
                      <span className="error-msg">{errors?.code?.message}</span>
                    )}
                  </div>
                </div>
              )}
              <div className="sm:flex sm:items-center sm:gap-4 2xl:gap-5">
                <div className="input-group w-full">
                  <label htmlFor="startDate">Start Date</label>
                  <Controller
                    name="startDate"
                    control={control}
                    render={({
                      field: { onChange, onBlur, value, name, ref },
                      fieldState: { invalid, isTouched, isDirty, error },
                    }) => (
                      <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        pattern="(0[1-9]|1[0-2])/(0[1-9]|[12][0-9]|3[01])/[0-9]{4}"
                        min={new Date().toISOString().split("T")[0]}
                        max="2099-12-31"
                        {...register("startDate")}
                      />
                    )}
                  />
                  {errors?.startDate?.message && (
                    <span className="error-msg">
                      {errors?.startDate?.message}
                    </span>
                  )}
                </div>
                <div className="input-group w-full">
                  <label htmlFor="endDate">End Date</label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    pattern="(0[1-9]|1[0-2])/(0[1-9]|[12][0-9]|3[01])/[0-9]{4}"
                    max="2099-12-31"
                    {...register("endDate")}
                  />
                  {errors?.endDate?.message && (
                    <span className="error-msg">
                      {errors?.endDate?.message}
                    </span>
                  )}
                  {errors?.[""]?.message && (
                    <span className="error-msg">{errors?.[""]?.message}</span>
                  )}
                </div>
              </div>

              {/* sendPushNotification  start */}
              <div className="flex items-center flex-wrap gap-3 input-group w-full">
                <label htmlFor="sendPushNotification">
                  Send Push Notification
                </label>
                <div className="switch-toggle">
                  <input
                    type="checkbox"
                    name="sendPushNotification"
                    id="sendPushNotification"
                    checked={watch("sendPushNotification")}
                    {...register("sendPushNotification")}
                  />
                  <label htmlFor="sendPushNotification">
                    Send Push Notification
                  </label>
                </div>
              </div>
              {/* Notificaation End */}

              {/* Notification Title and Description in Eng Start */}
              <div className="input-group w-full">
                <label htmlFor="minOrderAmount">Notification Title</label>
                <input
                  onPaste={handlePaste}
                  type="text"
                  id="notificationTitle"
                  name="notificationTitle"
                  {...register("notificationTitle")}
                />
                {errors?.notificationTitle?.message && (
                  <span className="error-msg">
                    {errors?.notificationTitle?.message}
                  </span>
                )}
              </div>

              <div className="input-group w-full">
                <label htmlFor="code">Notification Description</label>
                <textarea
                  onPaste={handlePaste}
                  id="notificationDesc"
                  name="notificationDesc"
                  {...register("notificationDesc")}
                />
                {errors?.notificationDesc?.message && (
                  <span className="error-msg">
                    {errors?.notificationDesc?.message}
                  </span>
                )}
              </div>
              {/* end */}

              {/* Notification Title and Description in German Start */}
              <div className="input-group w-full">
                <label htmlFor="minOrderAmount">
                  Notification Title in German
                </label>
                <input
                  onPaste={handlePaste}
                  type="text"
                  id="notificationTitleDe"
                  name="notificationTitleDe"
                  {...register("notificationTitleDe")}
                />
                {errors?.notificationTitleDe?.message && (
                  <span className="error-msg">
                    {errors?.notificationTitleDe?.message}
                  </span>
                )}
              </div>

              <div className="input-group w-full">
                <label htmlFor="code">Notification Description in German</label>
                <textarea
                  onPaste={handlePaste}
                  id="notificationDescDe"
                  name="notificationDescDe"
                  {...register("notificationDescDe")}
                />
                {errors?.notificationDescDe?.message && (
                  <span className="error-msg">
                    {errors?.notificationDescDe?.message}
                  </span>
                )}
              </div>
              {/* end */}

              <div className="input-group w-full">
                <label htmlFor="description">
                  Discount Description in English
                </label>
                <Controller
                  name="description"
                  control={control}
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                    fieldState: { invalid, isTouched, isDirty, error },
                  }) => (
                    <CKEditor
                      onPaste={handlePaste}
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

                {errors?.description?.message && (
                  <span className="error-msg">
                    {errors?.description?.message}
                  </span>
                )}
              </div>
              <div className="input-group w-full">
                <label htmlFor="descriptionDe">
                  Discount Description in German
                </label>
                <Controller
                  name="descriptionDe"
                  control={control}
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                    fieldState: { invalid, isTouched, isDirty, error },
                  }) => (
                    <CKEditor
                      onPaste={handlePaste}
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
                {errors?.descriptionDe?.message && (
                  <span className="error-msg">
                    {errors?.descriptionDe?.message}
                  </span>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>

      <DeleteLogoutModal
        payload={payloadWithStatus}
        deleteItem={asyncdiscountcodeUpdateThunk}
        invalidate={() => {
          navigate(discountcodemanagement);
        }}
        show={show}
        setshow={setshow}
        title={<>are you sure you want to active this discount code?</>}
        IconClass={payloadWithStatus ? "icon-duplicate" : "icon-delete"}
        SolidBTNText={payloadWithStatus ? "Yes" : "Delete"}
        Delete={payloadWithStatus ? false : true}
      />
    </>
  );
};

export default AddEditDiscountCode;
