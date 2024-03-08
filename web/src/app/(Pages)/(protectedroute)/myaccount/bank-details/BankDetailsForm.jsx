"use client";
import React, { useEffect, useState } from "react";
import { set, useFieldArray, useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  editBankDetail,
  viewBankDetailsData,
} from "../../../../../../redux/Thunks/Account/OrganizerAccount/myaccount.thunk";
import * as yup from "yup";
import H2 from "@/app/components/common/h2";
import { yupResolver } from "@hookform/resolvers/yup";
import LoaderBtn from "@/app/components/common/LoaderBtn";
import { useTranslation } from "react-i18next";
import { getCityThunk } from "../../../../../../redux/Thunks/Organizer/EventForm/event.thunk";
import ReactSelectcmp from "@/app/components/ReactSelectcmp/ReactSelectcmp";
import {countryThunk} from '../../../../../../redux/Thunks/Organizer/Country/country.thunk'
const BankDetailsForm = () => {
  let timer;
  // const swiftBICPattern = /^[A-Z]{4}-[A-Z]{2}-[A-Z][0-9]{2}-\d{3}$/
  const { i18n } = useTranslation();
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
    // address : yup.string().required("Please enter bank address.").min().max()
    branchName: yup
      .string()
      .trim()
      .required(
        i18n.t(
          `organizer.myaccount.bankdetails.form.inputs.branchName.validation.required`
        )
      ),
    // .matches(
    //     /^[a-zA-Z0-9]+(?:\s[a-zA-Z0-9]+)*$/,
    //     i18n.t(
    //         `organizer.myaccount.bankdetails.form.inputs.branchName.validation.matches`
    //     )
    // ),
    // city : yup.string().nullable(),

    // plz: yup
    // .string()
    // .trim()
    // .max(4, "4 digit")
    // .test({
    //     name: 'city',
    //     test: function(value) {
    //     const cityValue = this.parent.city;
    //     // return !!value || !!cityValue;
    //     return (!value && !cityValue) || (!!value || !!cityValue);
    //     },
    //     message: 'Either PLZ or City is required',
    // }),

    // city: yup
    // .string()
    // .trim()
    // .test({
    //     name: 'plz',
    //     test: function(value) {
    //     const plzValue = this.parent.plz;
    //     // return !!value || !!plzValue;
    //     return (!value && !plzValue) || (!!value || !!plzValue);
    //     },
    //     message: 'Either PLZ or City is required',
    // }),

    //     plz: yup
    //     .string()
    //     .trim()
    //     .max(4, "4 digit")
    //     .test({
    //       name: 'plz',
    //       test: function(value) {
    //         const cityValue = this.parent.city;
    //         if (!value && cityValue) {
    //           return false; // PLZ is required when City is entered
    //         }
    //         return true ;
    //         // return (!value && !cityValue) || (!!value || !!cityValue);
    //       },
    //       message: ({ path }) => {
    //         if (path === 'plz') {
    //           return 'PLZ is required when City is entered';
    //         }
    //         return 'PLZ is required';
    //       },
    //     }),
    ////////////////////////////////////////////////////////////////
    //   city: yup
    //     .string()
    //     .trim()
    //     .test({
    //       name: 'city',
    //       test: function(value) {
    //         const plzValue = this.parent.plz;

    //         if (!value && plzValue) {
    //           return false; // City is required when PLZ is entered
    //         }
    //         return true ;
    //         // return (!value && !plzValue) || (!!value || !!plzValue);
    //       },
    //       message: ({ path }) => {
    //         if (path === 'city') {
    //           return 'City is required when PLZ is entered';
    //         }
    //         return 'City is required';
    //       },
    //     }),

    // plz : yup.string().nullable(),
    // test('customMessage',i18n.t(`organizer.myaccount.bankdetails.form.inputs.plz.validation.test`),
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
    country: yup.mixed()
          .required(
            i18n.t(`organizer.myaccount.bankdetails.form.inputs.country.validation.required`)
          ),
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
    // .matches(swiftBICPattern,"Please enter valid Swift/BIC number.")
    // .test("swift_bic","Please enter valid SWIFT/BIC number.",function(value){
    //   console.log(value === swiftBICPattern ,"VVVVVVVV");
    //   if(value === swiftBICPattern){
    //     console.log(value,"VVVVVVVV");
    //     // alert('if')
    //     // return true
    //   }
    //   // alert("else")
    //   // return false
    // })
    // offerLink: yup.array().of(
    //   yup.object().shape({
    //     value: yup.string().required('Please enter a offer link.'),
    //   })
    // ).min(1, 'At least one offer link is required'),
    // offerLink: yup.array().of(yup.string().url("Please enter a valid URL")).min(1, "At least one offer link is required"),
  });

  const dispatch = useDispatch();
  const { isloading } = useSelector((m) => m.myaccount);
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    register,
    reset,
    watch,
  } = useForm({ resolver: yupResolver(bankFormValidation), mode: "all" });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "offerLink",
    }
  );
  ////// api calling for view bank details //////
  const { viewBankData } = useSelector((action) => action.myaccount);
  const {countryData} = useSelector ((e)=>e.countrySlice)
  const viewBankDataList = viewBankData?.data;
  useEffect(() => {
    dispatch(viewBankDetailsData());
  }, []);
  ////// end api calling for bank details ////

  useEffect(() => {
    if (viewBankDataList) {
      setValue("bankName", viewBankDataList?.bankName || "");
      setValue("bankHolderName", viewBankDataList?.bankHolderName || "");
      setValue("branchName", viewBankDataList?.branchName || "");
      setValue("plz", viewBankDataList?.plz || "");
      setValue("country",viewBankDataList?.country || "")
      // setValue('city', {_id : viewBankDataList?.city?._id,name : viewBankDataList?.city?.name}|| '')
      setValue("city", viewBankDataList?.city || "");
      setValue("IBANNumber", viewBankDataList?.IBANNumber || "");
      setValue("swiftBIC", viewBankDataList?.swiftBIC || "");
      setValue(
        "offerLink",
        viewBankDataList?.offerLink?.map((e, i) => {
          return { value: e };
        }) || ""
      );
    }
  }, [viewBankDataList]);


  const addOfferLink = () => {
    append({ value: "" });
  };

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
      country : data?.country?.countryId || "",
      // city : data?.city?.cityId || data?.city?._id,
      IBANNumber: data?.IBANNumber,
      swiftBIC: data?.swiftBIC,
      // offerLink: data?.offerLink?.map((e) => e?.value)
    };
    dispatch(
      editBankDetail(payloadData, () => {
        dispatch(viewBankDetailsData());
      })
    );
  };

  return (
    <>
      <div className="account-title flex items-center justify-between flex-wrap">
        <H2>{i18n.t(`organizer.myaccount.bankdetails.title`)}</H2>
      </div>
      <form onSubmit={handleSubmit(BankFormSubmit)}>
        <div className="form-content mt-32">
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
              <span className="error-msg">{errors?.bankName?.message}</span>
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
              <span className="error-msg">{errors?.branchName?.message}</span>
            )}
          </div>
          <div className="input-group w-full">
            <label htmlFor="plz">
              {" "}
              {i18n.t(`organizer.myaccount.bankdetails.form.inputs.plz.label`)}
            </label>
            <div className="flex items-cemter plz-body">
              <input
                type="text"
                id="plz"
                name="plz"
                className="plz"
                maxLength={4}
                // onKeyPress={(event)=>{
                //     if(event.key === 'e'){
                //         event.preventDefault();
                //     }
                // }}
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
              {i18n.t(
                `organizer.myaccount.bankdetails.form.inputs.country.label`
              )}
            </label>
            <Controller
              name="country"
              id = "country"
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
                  onInputChange={(e) => { handleCountryChange(e) }}
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
                  isClearable
                />
              )}
            />
            {errors?.country?.message && (
              <span className="error-msg">{errors?.country?.message}</span>
            )}
          </div>

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
              <span className="error-msg">{errors?.IBANNumber?.message}</span>
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
              <span className="error-msg">{errors?.swiftBIC?.message}</span>
            )}
          </div>
          {/* 
                    
                            {errors?.city?.message && (
                            <span className="error-msg">
                                {errors?.city?.message}
                            </span>
                        )}
                    
                    {watch(`offerLink`)?.map((field,index)=>(
                <React.Fragment key={index}>
                <div className="input-group w-full">
                <label htmlFor="offerLink">Offer Link(optional)</label>
                <div className='flex items-start xl:items-center flex-col xl:flex-row gap-4'>
                  <input  type="text"  {...register(`offerLink.${index}.value`)} />
                  // {watch('offerLink')?.length > 1 && 
                  <button onClick={() => remove(index)} type="button" className='add-link-btn border-btn'>Remove</button>
                //  }
                </div>
                // {errors?.offerLink?.message && <span className='error-msg'>{errors?.offerLink?.message}</span>}
                {errors?.offerLink?.[index]?.value && (
                  <span className='error-msg'>{errors?.offerLink?.[index]?.value?.message}</span>
                )}
                </div>
            </React.Fragment>
            ))}
          <button type="button" className="add-link-btn border-btn" onClick={()=>{addOfferLink()}}>+Add Offer Link</button> */}
        </div>

        {isloading ? (
          <button type="submit" className="solid-btn dashboard-form-btn">
            <LoaderBtn />
          </button>
        ) : (
          <button type="submit" className="solid-btn dashboard-form-btn">
            {i18n.t(`organizer.myaccount.bankdetails.form.button`)}
          </button>
        )}
      </form>
    </>
  );
};

export default BankDetailsForm;
