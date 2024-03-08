"use client";
import React, { useState } from "react";
import "../SiteModal.scss";
import H2 from "../../common/h2";
import { useTranslation } from "react-i18next";
import LoaderBtn from "../../common/LoaderBtn";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { editBankDetail } from "../../../../../redux/Thunks/Account/OrganizerAccount/myaccount.thunk";
import { useDispatch, useSelector } from "react-redux";
import { asyncViewprofile } from "../../../../../redux/Thunks/Account/viewprofile.thunk";
import { getCityThunk } from "../../../../../redux/Thunks/Organizer/EventForm/event.thunk";
import ReactSelectcmp from "@/app/components/ReactSelectcmp/ReactSelectcmp";
import { countryThunk } from "../../../../../redux/Thunks/Organizer/Country/country.thunk";
const BankDetailsModal = ({ setBankInfoModal, BankInfoModal }) => {
  let timer;
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const { isloading } = useSelector((e) => e.myaccount);
  const bankFormValidation = yup.object({
    bankName: yup
      .string()
      .trim()
      .required(
        i18n.t(
          `organizer.myaccount.bankdetails.form.inputs.bankName.validation.required`
        )
      )
      .matches(
        /^[a-zA-Z0-9]+(?:\s[a-zA-Z0-9]+)*$/,
        i18n.t(
          `organizer.myaccount.bankdetails.form.inputs.bankName.validation.matches`
        )
      ),
    bankHolderName: yup
      .string()
      .trim()
      .required(
        i18n.t(
          `organizer.myaccount.bankdetails.form.inputs.bankHolderName.validation.required`
        )
      )
      .matches(
        /^[a-zA-Z0-9]+(?:\s[a-zA-Z0-9]+)*$/,
        i18n.t(
          `organizer.myaccount.bankdetails.form.inputs.bankHolderName.validation.matches`
        )
      ),
    branchName: yup
      .string()
      .trim()
      .required(
        i18n.t(
          `organizer.myaccount.bankdetails.form.inputs.branchName.validation.required`
        )
      ),
    // plz : yup.string().test('customMessage',i18n.t(`organizer.myaccount.bankdetails.form.inputs.plz.validation.test`),
    // function (value) {
    //     if (value && (value.length > 4)) {
    //         return this.createError({
    //             message: i18n.t(
    //                 `organizer.myaccount.bankdetails.form.inputs.plz.validation.test`
    //             )
    //         })
    //     }
    //     return true
    // }),
    IBANNumber: yup
      .string()
      .trim()
      .required(
        i18n.t(
          `organizer.myaccount.bankdetails.form.inputs.IBANNumber.validation.required`
        )
      )
      .min(
        3,
        i18n.t(
          `organizer.myaccount.bankdetails.form.inputs.IBANNumber.validation.min`
        )
      )
      .max(
        34,
        i18n.t(
          `organizer.myaccount.bankdetails.form.inputs.IBANNumber.validation.max`
        )
      )
      .matches(
        /^[a-zA-Z0-9]+(?:\s[a-zA-Z0-9]+)*$/,
        i18n.t(
          `organizer.myaccount.bankdetails.form.inputs.IBANNumber.validation.matches`
        )
      ),
    country: yup
      .mixed()
      .required(
        i18n.t(
          `organizer.myaccount.bankdetails.form.inputs.country.validation.required`
        )
      ),
    swiftBIC: yup
      .string()
      .trim()
      .required(
        i18n.t(
          `organizer.myaccount.bankdetails.form.inputs.swiftBIC.validation.required`
        )
      )
      .min(
        3,
        i18n.t(
          `organizer.myaccount.bankdetails.form.inputs.swiftBIC.validation.min`
        )
      )
      .max(
        17,
        i18n.t(
          `organizer.myaccount.bankdetails.form.inputs.swiftBIC.validation.max`
        )
      )
      .matches(
        /^[a-zA-Z0-9]+(?:\s[a-zA-Z0-9]+)*$/,
        i18n.t(
          `organizer.myaccount.bankdetails.form.inputs.swiftBIC.validation.matches`
        )
      ),
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    register,
    reset,
    watch,
  } = useForm({ resolver: yupResolver(bankFormValidation), mode: "all" });
  const { countryData } = useSelector((e) => e.countrySlice);
  ///////////////////////// city api calling //////
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
  const handleCountryChange = (e) => {
    if (!!e) {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        // onChange(e)
        dispatch(
          countryThunk({
            search: e,
          })
        );
      }, 500);
    }
  };
  ////////////////////////  city api calling end //////

  const BankFormSubmit = (data) => {
    const payloadData = {
      bankName: data?.bankName,
      bankHolderName: data?.bankHolderName,
      branchName: data?.branchName,
      plz: data?.plz,
      city: data?.city,
      country: data?.country?.countryId || "",
      IBANNumber: data?.IBANNumber,
      swiftBIC: data?.swiftBIC,
      // offerLink: data?.offerLink?.map((e) => e?.value)
    };
    dispatch(
      editBankDetail(payloadData, () => {
        dispatch(asyncViewprofile());
        setBankInfoModal(false);
      })
    );
  };
  return (
    <>
      <div
        className={`site-modal bank-details-modal ${
          BankInfoModal === true ? "show" : ""
        }`}
      >
        <div className="modal-boday">
          <H2>{i18n.t(`organizer.myaccount.bankdetails.title`)}</H2>
          <form onSubmit={handleSubmit(BankFormSubmit)}>
            <div className="form-content mt-32">
              <div className="sm:flex sm:items-center sm:gap-4 2xl:gap-5">
                <div className="input-group w-full">
                  <label htmlFor="bankName">
                    {i18n.t(
                      `organizer.myaccount.bankdetails.form.inputs.bankName.label`
                    )}
                  </label>
                  <input
                    type="text"
                    id="bankName"
                    name="bankName"
                    {...register("bankName")}
                  />
                  {errors?.bankName?.message && (
                    <span className="error-msg">
                      {errors?.bankName?.message}
                    </span>
                  )}
                </div>
                <div className="input-group w-full">
                  <label htmlFor="bankHolderName">
                    {i18n.t(
                      `organizer.myaccount.bankdetails.form.inputs.bankHolderName.label`
                    )}
                  </label>
                  <input
                    type="text"
                    id="bankHolderName"
                    name="bankHolderName"
                    {...register("bankHolderName")}
                  />
                  {errors?.bankHolderName?.message && (
                    <span className="error-msg">
                      {errors?.bankHolderName?.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="sm:flex sm:items-center sm:gap-4 2xl:gap-5">
                <div className="input-group w-full">
                  <label htmlFor="IBANNumber">
                    {i18n.t(
                      `organizer.myaccount.bankdetails.form.inputs.IBANNumber.label`
                    )}
                  </label>
                  <input
                    type="text"
                    id="IBANNumber"
                    name="IBANNumber"
                    {...register("IBANNumber")}
                  />
                  {errors?.IBANNumber?.message && (
                    <span className="error-msg">
                      {errors?.IBANNumber?.message}
                    </span>
                  )}
                </div>
                <div className="input-group w-full">
                  <label htmlFor="swiftBIC">
                    {i18n.t(
                      `organizer.myaccount.bankdetails.form.inputs.swiftBIC.label`
                    )}
                  </label>
                  <input
                    type="text"
                    id="swiftBIC"
                    name="swiftBIC"
                    {...register("swiftBIC")}
                  />
                  {errors?.swiftBIC?.message && (
                    <span className="error-msg">
                      {errors?.swiftBIC?.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="input-group w-full">
                <label htmlFor="branchName">
                  {" "}
                  {i18n.t(
                    `organizer.myaccount.bankdetails.form.inputs.branchName.label`
                  )}
                </label>
                <input
                  type="text"
                  id="branchName"
                  name="branchName"
                  {...register("branchName")}
                />
                {errors?.branchName?.message && (
                  <span className="error-msg">
                    {errors?.branchName?.message}
                  </span>
                )}
              </div>
              {/* <div className="input-group w-full">
                                <label htmlFor="plz">
                                    {' '}
                                    {i18n.t(
                                        `organizer.myaccount.bankdetails.form.inputs.plz.label`
                                    )}
                                </label>
                                <input
                                    type="number"
                                    id="plz"
                                    name="plz"
                                    onKeyPress={(event)=>{
                                        if(event.key === 'e'){
                                            event.preventDefault();
                                        }
                                    }}
                                    {...register('plz')}
                                />
                                {errors?.plz?.message && (
                                    <span className="error-msg">
                                        {errors?.plz?.message}
                                    </span>
                                )}
                            </div> */}

              <div className="input-group w-full">
                <label htmlFor="plz">
                  {" "}
                  {i18n.t(
                    `organizer.myaccount.bankdetails.form.inputs.plz.label`
                  )}
                </label>
                <div className="flex items-cemter plz-body">
                  <input
                    type="text"
                    id="plz"
                    name="plz"
                    className="plz"
                    maxLength={4}
                    onKeyPress={(event) => {
                      const pressedKey = event.key;
                      // Check if the pressed key is not a digit between 0 and 1
                      // if (!/[0-1]/.test(pressedKey)) {
                      //     event.preventDefault();
                      // }
                      if (!/\d/.test(pressedKey)) {
                        event.preventDefault();
                      }
                    }}
                    {...register("plz")}
                  />

                  <input
                    type="text"
                    id="city"
                    name="city"
                    className="city"
                    // maxLength={4}
                    // onKeyPress={(event)=>{
                    //     if(event.key === 'e'){
                    //         event.preventDefault();
                    //     }
                    // }}

                    {...register("city")}
                  />

                  {/* For city Drop Down */}

                  {/* <div
                            className={`custom-select ${
                                city === true ? 'active' : ''
                            }`}
                        >
                            <Controller
                                control={control}
                                name="city"
                                render={({ field: { onChange, value } }) => (
                                    <ReactSelectcmp 
                                    openMenuOnFocus= {true}
                                    value={value}
                                    onChange={onChange}
                                    onInputChange={(e)=>handleCityChange(e)}
                                    getOptionLabel={(e)=>{return e.name}}
                                    getOptionValue={(e)=>{return e.cityId}}
                                    options={cityData}
                                    isSearchable={true}
                                    isClearable = {true}
                                    className='w-full'
                                    />
                                )}
                            />
                        </div> */}
                  {/* For city Drop Down  End*/}
                </div>
                {errors?.plz?.message && (
                  <span className="error-msg">{errors?.plz?.message}</span>
                )}
                {errors?.city?.message && (
                  <span className="error-msg">{errors?.city?.message}</span>
                )}
              </div>
              <div className="input-group w-full">
                <label htmlFor="country">
                  {" "}
                  {i18n.t(
                    `organizer.myaccount.bankdetails.form.inputs.country.label`
                  )}
                </label>

                <Controller
                  name="country"
                  id="country"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <ReactSelectcmp
                      openMenuOnFocus={true}
                      value={value}
                      onChange={(e) => {
                        // if (e?.id === 3) {
                        //   // setValue("eventTitle","")
                        //   onChange(e);
                        // } else {
                        onChange(e);
                        // }
                      }}
                      onInputChange={(e) => {
                        handleCountryChange(e);
                      }}
                      getOptionLabel={(e) => {
                        return e?.name;
                      }}
                      getOptionValue={(e) => {
                        return e?.countryId;
                      }}
                      options={countryData}
                      isSearchable={true}
                      placeholder={i18n.t(
                        `organizer.event.eventForm.inputs.City.placeholder`
                      )}
                      //   placeholder="Search City"
                      // isClearable
                    />
                  )}
                />
                 {errors?.country?.message && (
              <span className="error-msg">{errors?.country?.message}</span>
            )}
              </div>
            </div>

            <div className="flex items-center justify-center modal-btn-group">
              <button
                type="button"
                className="border-btn modal-btn"
                onClick={() => {
                  setBankInfoModal(false);
                }}
              >
                {i18n.t(`organizer.myaccount.bankdetails.form.cancelBtn`)}
              </button>
              {isloading ? (
                <button type="submit" className="solid-btn modal-btn">
                  <LoaderBtn />
                </button>
              ) : (
                <button type="submit" className="solid-btn modal-btn">
                  {i18n.t(`organizer.myaccount.bankdetails.form.button`)}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default BankDetailsModal;
