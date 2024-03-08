"use client";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import "./create-event.scss";
import SiteBreadcrumb from "../../../components/SiteBreadcrumb/SiteBreadcrumb";
import H2 from "@/app/components/common/h2";
import SuccessfullyModal from "@/app/components/SiteModal/SuccessfullyModal/SuccessfullyModal";
import BankDetailsModal from "@/app/components/SiteModal/BankDetailsModal/BankDetailsModal";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import ReactSelectcmp from "@/app/components/ReactSelectcmp/ReactSelectcmp";
import DatePicker from "react-datepicker";
import DatePikerLang from "@/app/components/DatePikerLang/DatePikerLang";
import de from "date-fns/locale/de";
import {
  addEventThunk,
  duplicateEventThunk,
  getCityThunk,
  viewEventThunk,
} from "../../../../../redux/Thunks/Organizer/EventForm/event.thunk";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { convertHours } from "@/utils/commonfn";
import { useTranslation } from "react-i18next";
import { removeEventData } from "../../../../../redux/slices/Organizer/EventManagement/EventManagementSlice";
import LoaderBtn from "@/app/components/common/LoaderBtn";
import useFormNew from "@/i18n/NewUseFormi18n/NewUseFormi18n";
import {
  EventCategoryFn,
  EventRecurrenceFn,
  CreateEventTypeFn,
  CurrencyFn,
  DiscountTypeListFn,
} from "@/i18n/i18nCM/i18CM";
import { combinedTimestamp } from "@/utils/commonfn/Date_TimeTS/index";
import DropZone from "@/app/components/Dropzone/DropZone";
import Ckeditor from "@/app/components/Ckeditor/Ckeditor";
import OrgPreviewModel from "./components/OrgPreviewModel/OrgPreviewModel";
import { asyncViewprofile } from "../../../../../redux/Thunks/Account/viewprofile.thunk";
import RecurrenceModal from "../../../components/SiteModal/RecurrenceModal/RecurrenceModal";

// const Ckeditor = dynamic(() => import("@/app/components/Ckeditor/Ckeditor"), {
//   ssr: false,
// });
// const DropZone = dynamic(() => import("@/app/components/Dropzone/DropZone"), {
//   ssr: false,
// });

const EventForm = ({ languageName }) => {
  let timer;
  const { i18n } = useTranslation();
  const validationSchema = yup.object().shape({
    title: yup
      .string()
      .max(
        50,
        i18n.t(`organizer.event.eventForm.inputs.EventTitle.validation.max`)
      )
      .required(
        i18n.t(
          `organizer.event.eventForm.inputs.EventTitle.validation.required`
        )
      ),
    checkbox: yup
      .array()
      .min(
        1,
        i18n.t(`organizer.event.eventForm.inputs.Checkbox.validation.min`)
      )
      .of(
        yup
          .number()
          .oneOf(
            [1, 2],
            i18n.t(`organizer.event.eventForm.inputs.Checkbox.validation.oneOf`)
          )
      )
      .required(
        i18n.t(`organizer.event.eventForm.inputs.Checkbox.validation.required`)
      ),
    descriptionEnglish: yup.string().when("checkbox", {
      is: (checkbox) => checkbox?.includes(1),
      then: () =>
        yup
          .string()
          .trim()
          .required(
            i18n.t(
              `organizer.event.eventForm.inputs.DescriptionEnglish.validation.required`
            )
          )
          .min(
            20,
            i18n.t(
              `organizer.event.eventForm.inputs.DescriptionEnglish.validation.min`
            )
          ),
      // .max(100, "Description in English must be at most 100 characters"),
    }),
    descriptionGerman: yup.string().when("checkbox", {
      is: (checkbox) => checkbox?.includes(2),
      then: () =>
        yup
          .string()
          .trim()
          .required(
            i18n.t(
              `organizer.event.eventForm.inputs.DescriptionGerman.validation.required`
            )
          )
          .min(
            20,
            i18n.t(
              `organizer.event.eventForm.inputs.DescriptionGerman.validation.min`
            )
          ),
      // .max(500, "Description in German must be at most 500 characters"),
    }),

    // eventTitle: yup
    //   .string()
    //   .required(
    //     i18n.t(`organizer.event.eventForm.inputs.EventType.validation.required`)
    //   ),

    eventTitle: yup.string().when("eventCategory", {
      is: (c) => ![3]?.includes(c?.id),
      then: () =>
        yup
          .string()
          .required(
            i18n.t(
              `organizer.event.eventForm.inputs.EventType.validation.required`
            )
          ),
    }),

    eventTitle2: yup.string().when("eventCategory", {
      is: (c) => [3].includes(c?.id),
      then: () =>
        yup
          .string()
          .required(
            i18n.t(
              `organizer.event.eventForm.inputs.EventType.validation.required`
            )
          ),
    }),

    venue: yup.string().when(["eventCategory", "eventTitle"], {
      is: (category, title) => ![3].includes(category?.id) && title === "2",
      then: () =>
        yup
          .string()
          .max(
            25,
            i18n.t(`organizer.event.eventForm.inputs.Venue.validation.max`)
          )
          .required(
            i18n.t(`organizer.event.eventForm.inputs.Venue.validation.required`)
          ),
    }),
    city: yup.mixed().when(["eventCategory", "eventTitle"], {
      is: (category, title) => ![3].includes(category?.id) && title === "2",
      then: () =>
        yup
          .mixed()
          .required(
            i18n.t(`organizer.event.eventForm.inputs.City.validation.required`)
          ),
    }),
    googleMapLink: yup.string().when(["eventCategory", "eventTitle"], {
      is: (category, title) => ![3].includes(category?.id) && title === "2",
      then: () =>
        yup
          .string()
          .required(
            i18n.t(
              `organizer.event.eventForm.inputs.GoogleMapLink.validation.required`
            )
          )
          .url(
            i18n.t(
              `organizer.event.eventForm.inputs.GoogleMapLink.validation.url`
            )
          ),
      // .min(10, i18n.t(`organizer.event.eventForm.inputs.GoogleMapLink.validation.min`))
    }),
    // meetLink: yup.string().when(["eventCategory", "eventTitle"], {
    //   is: (category, title) =>{
    //     return (category?.id === 1 || category?.id === 4) && title === "1"
    //   },
    //   then: () =>
    //     yup
    //       .string()
    //       .required(
    //         i18n.t(
    //           `organizer.event.eventForm.inputs.MeetLink.validation.required`
    //         )
    //       )
    //       .url(
    //         i18n.t(`organizer.event.eventForm.inputs.MeetLink.validation.url`)
    //       ),
    //   // .min(10, "Meet link must be at least 10 characters")
    // }),
    price: yup.string().when("createEventType", {
      is: (e) => e?.id === 2,
      then: () =>
        yup
          .string()
          .required(
            i18n.t(`organizer.event.eventForm.inputs.Price.validation.required`)
          )
          .max(
            10,
            i18n.t(`organizer.event.eventForm.inputs.Price.validation.max`)
          ),
    }),
    event_date: yup.string().when("eventCategory", {
      is: (category) => [1, 4].includes(category?.id),
      then: () =>
        yup
          .string()
          .required(
            i18n.t(
              `organizer.event.eventForm.inputs.Event_date.validation.required`
            )
          )
          .test(
            "customMessage",
            i18n.t(
              `organizer.event.eventForm.inputs.Event_date.validation.test`
            ),
            (val) => {
              let currentDate = new Date();
              let selectedStartDate = new Date(val);
              return (
                selectedStartDate.setHours(0, 0, 0) >=
                currentDate.setHours(0, 0, 0, 0)
              );
            }
          ),
    }),
    event_time: yup.string().when("eventCategory", {
      is: (category) => [1, 4].includes(category?.id),
      then: () =>
        yup
          .string()
          .required(
            i18n.t(
              `organizer.event.eventForm.inputs.Event_time.validation.required`
            )
          )
          .test(
            "test",
            i18n.t(
              `organizer.event.eventForm.inputs.Event_end_time.validation.test`
            ),
            function (val) {
              let currentDate = new Date();
              let selectedStartDate = new Date(this.parent.event_date);
              if (currentDate?.getDate() === selectedStartDate.getDate()) {
                if (
                  currentDate.getHours() * 60 + currentDate.getMinutes() <=
                  Number(val?.split(":")[0] * 60) + Number(val?.split(":")[1])
                ) {
                  return true;
                } else {
                  return false;
                }
              } else {
                return true;
              }
              // console.log(val,"_____________",new Date(this.parent.event_date).getHours(),new Date().getHours())
              // return currentDate?.getDate() === selectedStartDate.getDate() && currentDate.getHours() < val?.split(":")[0]
            }
          ),
    }),
    event_start_date: yup.string().when("eventCategory", {
      is: (category) => category?.id === 2,
      then: () =>
        yup
          .string()
          .required(
            i18n.t(
              `organizer.event.eventForm.inputs.Event_start_date.validation.required`
            )
          )
          .test(
            "customMessage",
            i18n.t(
              `organizer.event.eventForm.inputs.Event_start_date.validation.test`
            ),
            (val) => {
              let currentDate = new Date();
              let selectedStartDate = new Date(val);
              // return selectedStartDate.getDate() >=  currentDate.getDate() && selectedStartDate.getFullYear() >= currentDate.getFullYear()
              return (
                selectedStartDate.setHours(0, 0, 0) >=
                currentDate.setHours(0, 0, 0, 0)
              );
            }
          ),
    }),
    event_start_time: yup.string().when("eventCategory", {
      is: (category) => category?.id === 2,
      then: () =>
        yup
          .string()
          .required(
            i18n.t(
              `organizer.event.eventForm.inputs.Event_start_time.validation.required`
            )
          )
          .test("custom", "Please select valid time.", function (val) {
            let currentDate = new Date();
            let selectedStartDate = new Date(this.parent.event_start_date);
            if (currentDate?.getDate() === selectedStartDate.getDate()) {
              if (
                currentDate.getHours() * 60 + currentDate.getMinutes() <=
                Number(val?.split(":")[0] * 60) + Number(val?.split(":")[1])
              ) {
                return true;
              } else {
                return false;
              }
            } else {
              return true;
            }
            // console.log(val,"_____________",new Date(this.parent.event_date).getHours(),new Date().getHours())
            // return currentDate?.getDate() === selectedStartDate.getDate() && currentDate.getHours() < val?.split(":")[0]
          }),
    }),
    event_end_date: yup.string().when("eventCategory", {
      is: (category) => category?.id === 2,
      then: () =>
        yup
          .string()
          .required(
            i18n.t(
              `organizer.event.eventForm.inputs.Event_end_date.validation.required`
            )
          )
          .test(
            "customMessage",
            i18n.t(
              `organizer.event.eventForm.inputs.Event_end_date.validation.test`
            ),
            function (val) {
              let currentDate = new Date();
              let selectedStartDate = new Date(val);
              let eventStartDate = this.parent.event_start_date;

              // return selectedStartDate.getDate() >=  currentDate.getDate() && selectedStartDate.getFullYear() >= currentDate.getFullYear()
              return (
                selectedStartDate.setHours(0, 0, 0) >=
                new Date(eventStartDate).setHours(0, 0, 0)
              );
            }
          ),
    }),
    event_end_time: yup.string().when("eventCategory", {
      is: (category) => category?.id === 2,
      then: function () {
        return yup
          .string()
          .required(
            i18n.t(
              `organizer.event.eventForm.inputs.Event_end_time.validation.required`
            )
          )
          .test(
            "test",
            i18n.t(
              `organizer.event.eventForm.inputs.Event_end_time.validation.test`
            ),
            function (val) {
              return (
                convertHours(
                  val,
                  new Date(this.parent.event_end_date).setHours(0, 0, 0)
                ) >
                convertHours(
                  this.parent.event_start_time,
                  new Date(this.parent.event_start_date).setHours(0, 0, 0)
                )
              );
            }
          );
      },
    }),
    recurrence_end_date: yup
      .string()
      .when(["eventRecrrence", "eventCategory"], {
        is: (e, c) => {
          return [2, 3, 4, 5]?.includes(e?.id) && [1, 4].includes(c?.id);
        },
        then: () =>
          yup
            .string()
            .required(
              i18n.t(
                `organizer.event.eventForm.inputs.Recurrence_end_date.validation.required`
              )
            ),
      }),
    // email: yup.string().when("eventCategory", {
    //   is: (category) => [3, 7, 8].includes(category?.id),
    //   then: () =>
    //     yup
    //       .string()
    //       .required(
    //         i18n.t(`organizer.event.eventForm.inputs.Email.validation.required`)
    //       ),
    // }),
    eventRecrrence: yup.object().when(["eventCategory"], {
      is: (e, c) => {
        return [1, 2, 4].includes(e?.id);
      },
      then: () =>
        yup
          .object()
          .required(
            i18n.t(
              `organizer.event.eventForm.inputs.EventRecrrence.validation.required`
            )
          ),
    }),
    ticket: yup
      .string()
      .required(
        i18n.t(`organizer.event.eventForm.inputs.Ticket.validation.required`)
      ),
    confirmation: yup
      .string()
      .required(
        i18n.t(
          `organizer.event.eventForm.inputs.Confirmation.validation.required`
        )
      ),
    emailSubject: yup.string().when("confirmation", {
      is: "true",
      then: () =>
        yup
          .string()
          .required(
            i18n.t(
              `organizer.event.eventForm.inputs.EmailSubject.validation.required`
            )
          ),
    }),
    emailBodyEditor: yup.string().when("confirmation", {
      is: "true",
      then: () =>
        yup
          .string()
          .required(
            i18n.t(
              `organizer.event.eventForm.inputs.EmailBodyEditor.validation.required`
            )
          ),
    }),
    upload: yup
      .object({
        addImage: yup.array(),
        addVideo: yup.array(),
      })
      .test(
        "custom message",
        i18n.t(`organizer.event.eventForm.inputs.Upload.validation.test`),
        (e) => {
          return e?.addImage?.length > 0 || e?.addVideo?.length > 0;
        }
      ),
  });

  /////////////////////////////////
  const [recurrenceEditAll, setRecurrenceEditAll] = useState("");
  const [recurrenceOpen, setRecurrenceOpen] = useState(false);
  const [activePreview, setActivePreview] = useState(false);
  const EventRecurrence = EventRecurrenceFn(i18n);
  const CreateEventType = CreateEventTypeFn(i18n);
  const Currency = CurrencyFn(i18n);
  const DiscountTypeList = DiscountTypeListFn(i18n);
  const EventCategory = EventCategoryFn(i18n);
  const [BankInfoModal, setBankInfoModal] = useState(false);
  ///////////////////////////////////////////
  const { cityData, isLoading, cityLoader } = useSelector(
    (e) => e.EventFormSlice
  );
  const { eventData } = useSelector((e) => e.EventManagementSlice);
  const { isLoading: viewProfileLoader, userDetail } = useSelector(
    (e) => e.viewprofile
  );
  const [deleteImageArray, setDeleteImageArray] = useState([]);
  const [deleteVideoArray, setDeleteVideoArray] = useState([]);
  const uniqueId = useSearchParams();
  const viewId = uniqueId.get("uniqueId");
  const duplicate = !!uniqueId.get("duplicate");
  const [show, setshow] = useState(false);
  const ref = useRef();
  const newRef = useRef();

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
    watch,
    getValues,
    control,
    setValue,
    setError,
    clearErrors,
  } = useFormNew({
    mode: "all",
    resolver: yupResolver(validationSchema),
    // shouldUnregister: true,
    defaultValues: {
      checkbox: ["2"],
      eventCategory: {
        title: i18n.t(`organizer.event.commonArray.EventCategory.option.1`),
        id: 1,
      },
      upload: {
        addImage: [],
        addVideo: [],
      },
      // createEventType: {
      //   title: userDetail?.data?.isBankAccountAdded
      //     ? i18n.t(`organizer.event.commonArray.CreateEventType.option.2`)
      //     : i18n.t(`organizer.event.commonArray.CreateEventType.option.1`),
      //   id: userDetail?.data?.isBankAccountAdded ? 2 : 1,
      // },
      currency: {
        // name: "₣",
        id: 2,
        title: i18n.t(`organizer.event.commonArray.Currency.option.2`),
      },
      discountType: { title: "FLAT", id: 1 },
    },
  });

  const BreadcrumbData = [
    {
      title: i18n.t(`organizer.event.breadCrumb.title`),
      url: "/dashboard",
    },
    {
      title:
        viewId && !duplicate
          ? i18n.t(`organizer.event.eventFormHeader.editTitle`)
          : i18n.t(`organizer.event.eventFormHeader.title`),
    },
  ];

  const dispatch = useDispatch();
  const [eventCategory, setEventCategory] = useState(false);
  const [createEventType, setCreateEventType] = useState(false);

  const [city, setCity] = useState(false);
  const [eventRecrrence, setEventRecrrence] = useState(false);
  const [price, setPrice] = useState(false);
  const [activePrice, setActivePrice] = useState(2);
  const [disable, setDisable] = useState(false);

  // const reverseEventStartDate = (data) => {
  //   if (data) {
  //     const dateObject = new Date(+data);
  //     const year = dateObject.getFullYear();
  //     const month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
  //     const day = dateObject.getDate().toString().padStart(2, "0");

  //     const formattedDate = `${year}-${month}-${day}`;

  //     return formattedDate;
  //   }
  // };
  const reverseEventStartDate = (data) => {
    if (data) {
      const dateObject = new Date(+data);

      // Get individual components
      const day = dateObject.toLocaleString("en-US", { weekday: "short" });
      const month = dateObject.toLocaleString("en-US", { month: "short" });
      const dayOfMonth = dateObject.getDate();
      const year = dateObject.getFullYear();
      const time = dateObject.toTimeString().split(" ")[0];
      const timeZoneOffset = dateObject.getTimezoneOffset();
      const timeZoneOffsetHours = Math.floor(Math.abs(timeZoneOffset) / 60);
      const timeZoneOffsetMinutes = Math.abs(timeZoneOffset) % 60;
      const timeZoneSign = timeZoneOffset < 0 ? "+" : "-";

      // Construct the formatted date string
      const formattedDate = `${day} ${month} ${dayOfMonth} ${year} ${time} GMT${timeZoneSign}${timeZoneOffsetHours
        .toString()
        .padStart(2, "0")}${timeZoneOffsetMinutes
        .toString()
        .padStart(2, "0")} (India Standard Time)`;
      return formattedDate;
    }
  };

  const reverseEventTime = (data) => {
    const dateObject = new Date(+data);

    const hours = dateObject.getHours().toString().padStart(2, "0");
    const minutes = dateObject.getMinutes().toString().padStart(2, "0");

    const formattedTime = `${hours}:${minutes}`;

    return formattedTime;
  };

  // const combinedTimestamp = ({
  //   eventDate,
  //   eventTime,
  //   eventEndTime,
  //   eventEndDate,
  // }) => {
  //   if (eventDate && eventTime) {
  //     const combinedDateTimeString = `${eventDate}T${eventTime}:00`;
  //     // Create a new Date object from the combined string
  //     const combinedDateTime = new Date(combinedDateTimeString);
  //     console.log(combinedDateTime, "GGGGGGGGGGGGGGGGfffhks");
  //     // Get the timestamp in milliseconds
  //     const timestamp = combinedDateTime.getTime();
  //     // Format the date string to match the expected format (YYYY-MM-DDTHH:mm:ss)
  //     return timestamp;
  //   }
  //   if (eventEndTime && eventEndDate) {
  //     const combinedDateTimeString = `${eventEndDate}T${eventEndTime}:00`;
  //     // Create a new Date object from the combined string
  //     const combinedDateTime = new Date(combinedDateTimeString);
  //     // Get the timestamp in milliseconds
  //     const timestamp = combinedDateTime.getTime();
  //     // Format the date string to match the expected format (YYYY-MM-DDTHH:mm:ss)
  //     return timestamp;
  //   }
  // };

  useEffect(() => {
    dispatch(asyncViewprofile());
  }, []);

  useEffect(() => {
    if (recurrenceEditAll) {
      handleSubmit(onSubmit)();
    }
  }, [recurrenceEditAll]);

  useEffect(() => {
    if (userDetail?.data?.isBankAccountAdded) {
      setValue("createEventType", {
        title: i18n.t(`organizer.event.commonArray.CreateEventType.option.2`),
        id: 2,
      });
    } else {
      setValue("createEventType", {
        title: i18n.t(`organizer.event.commonArray.CreateEventType.option.1`),
        id: 1,
      });
    }
  }, [userDetail]);

  useEffect(() => {
    if (viewId) {
      dispatch(viewEventThunk({ eventId: viewId }));
    }
  }, [viewId]);

  useEffect(() => {
    const category = EventCategory.find((e) => e?.id === eventData?.category);
    const eventRecrrence = EventRecurrence.find(
      (e) => e?.id === eventData?.duration
    );
    const currency = Currency.find((e) => e?.id === eventData?.currency);
    const discountType = DiscountTypeList.find(
      (e) => e?.id === eventData?.discount?.type
    );

    const images = eventData?.media?.filter((e, i) => {
      if (e.type === "image") {
        return e;
      }
    });

    const FinalImage = images?.map((e) => e?.imageUrl);

    const videos = eventData?.media?.filter((e, i) => {
      if (e?.type === "video") {
        return e;
      }
    });
    const FinalVideo = videos?.map((e) => e?.videoUrl);
    // console.log(eventData?.price,"eventData?.price",eventData?.price !== "0"
    // ? { title:  i18n.t(`useEvent.EventPaid.Paid`), id: 2 }
    // : { title:  i18n.t(`useEvent.EventPaid.Free`), id: 1 })
    const FinalArray = {
      title: eventData?.title,
      eventCategory: { title: category?.title, id: category?.id },
      checkbox: eventData?.language?.map((number) => number.toString()),
      descriptionEnglish: eventData?.description,
      descriptionGerman: eventData?.descriptionDe,
      // eventTitle: eventData?.eventType,
      // eventTitle2: eventData?.eventType,
      venue: eventData?.venue,
      city: eventData?.city,
      googleMapLink: eventData?.googleMapsLink,
      meetLink: eventData?.onlineMeetingLink,
      confirmation: eventData?.sendEmailAfterBookingConfirmation?.toString(),
      emailSubject: eventData?.emailSubject,
      emailBodyEditor: eventData?.emailBody,
      createEventType: eventData?.price
        ? { title: i18n.t(`useEvent.EventPaid.Paid`), id: 2 }
        : { title: i18n.t(`useEvent.EventPaid.Free`), id: 1 },
      // event_time: reverseEvent_time(eventData?.startTime ),

      // startTime: reverseTimestampStartTime({ eventDate: eventData?.startTime }),
      // endTime: eventData?.endTime,
      eventRecrrence: {
        title: eventRecrrence?.title,
        id: eventRecrrence?.id,
      },
      price: eventData?.price || "",
      email: eventData?.sendEmailAfterPayment?.toString(),

      discountCode: eventData?.discount?.code,
      discountValue: eventData?.discount?.discountValue,
      discountType: { title: discountType?.title, id: discountType?.id },
      ticket: eventData?.seats?.total,
      upload: {
        addImage: FinalImage || [],
        addVideo: FinalVideo || [],
      },
    };

    if (currency?.title) {
      FinalArray.currency = { title: currency?.title, id: currency?.id };
    }
    if (
      [1, 4]?.includes(watch("eventCategory")?.id) &&
      eventData?.recurrenceEndDate
    ) {
      FinalArray.recurrence_end_date = new Date(+eventData?.recurrenceEndDate);
    }
    if (category?.id === 2 && eventData?.startTime && eventData?.endTime) {
      FinalArray.event_start_date = new Date(+eventData?.startTime);
      // FinalArray.event_start_date = reverseEventStartDate(eventData?.startTime);
      // FinalArray.event_end_date = reverseEventStartDate(eventData?.endTime);
      FinalArray.event_end_date = new Date(+eventData?.endTime);

      FinalArray.event_start_time = reverseEventTime(eventData?.startTime);
      FinalArray.event_end_time = reverseEventTime(eventData?.endTime);
    } else {
      if (eventData?.startTime) {
        FinalArray.event_date = new Date(+eventData?.startTime);
        FinalArray.event_time = reverseEventTime(eventData?.startTime);
      }
    }
    if (eventData?.eventType === 1 || eventData?.eventType === 2) {
      FinalArray.eventTitle = eventData?.eventType;
    } else {
      FinalArray.eventTitle2 = eventData?.eventType;
    }

    if (eventData) {
      for (let key in FinalArray) {
        setValue(key, FinalArray[key]);
      }
      // reset(FinalArray);
    } else {
      reset();
    }
  }, [eventData]);

  useEffect(() => {
    return () => {
      dispatch(removeEventData());
      reset();
    };
  }, [viewId]);

  // const onSubmit = (data) => {
  //   const endDateRecurrence = new Date(data?.recurrence_end_date);
  //   // Set the time to 11:59:59 PM
  //   endDateRecurrence.setHours(23, 59, 59, 999);

  //   const startTime = combinedTimestamp({
  //     eventTime:
  //       watch("eventCategory")?.id === 2
  //         ? data?.event_start_time
  //         : data?.event_time,
  //     eventDate:
  //       watch("eventCategory")?.id === 2
  //         ? data?.event_start_date
  //         : data?.event_date,
  //   });
  //   const endTime = combinedTimestamp({
  //     eventEndTime: data?.event_end_time,
  //     eventEndDate: data?.event_end_date,
  //   });
  //   const rawFormData = new FormData();
  //   if (data?.email) {
  //     rawFormData.append("sendEmailAfterPayment", data?.email);
  //   }
  //   rawFormData.append("title", data?.title);
  //   rawFormData.append("category", data?.eventCategory?.id);
  //   rawFormData.append(
  //     "language",
  //     JSON.stringify(data?.checkbox.map((e) => Number(e)))
  //   );
  //   if (data?.descriptionEnglish) {
  //     rawFormData.append("description", data?.descriptionEnglish);
  //   }
  //   if (data?.descriptionGerman) {
  //     rawFormData.append("descriptionDe", data?.descriptionGerman);
  //   }
  //   if ([3, 7, 8].includes(watch("eventCategory")?.id) && data?.eventTitle2) {
  //     rawFormData.append("eventType", data?.eventTitle2);
  //   } else {
  //     rawFormData.append("eventType", data?.eventTitle);
  //   }
  //   if (data?.eventTitle === "2") {
  //     rawFormData.append("venue", data?.venue ? data?.venue : "");
  //     rawFormData.append(
  //       "city",
  //       data?.city?.cityId
  //         ? data?.city?.cityId
  //         : data?.city?._id
  //         ? data?.city?._id
  //         : ""
  //     );
  //     rawFormData.append(
  //       "googleMapsLink",
  //       data?.googleMapLink ? data?.googleMapLink : ""
  //     );
  //   }
  //   if (data?.eventTitle === "1") {
  //     rawFormData.append("onlineMeetingLinasyncViewprofilek", data?.meetLink);
  //   }

  //   rawFormData.append("sendEmailAfterBookingConfirmation", data?.confirmation);
  //   if (data?.confirmation === "true") {
  //     rawFormData.append(
  //       "emailSubject",
  //       data?.emailSubject ? data?.emailSubject : ""
  //     );
  //     rawFormData.append(
  //       "emailBody",
  //       data?.emailBodyEditor ? data?.emailBodyEditor : ""
  //     );
  //   }
  //   if (![3]?.includes(watch("eventCategory")?.id) && startTime) {
  //     rawFormData.append("startTime", startTime);
  //   }
  //   if (![3]?.includes(watch("eventCategory")?.id) && endTime) {
  //     rawFormData.append("endTime", endTime ? endTime : "");
  //   }

  //   rawFormData.append("duration", data?.eventRecrrence?.id);
  //   rawFormData.append(
  //     "price",
  //     data?.createEventType?.id == 1 ? 0 : data?.price
  //   );
  //   if (data?.createEventType?.id === 2) {
  //     rawFormData.append(
  //       "currency",
  //       data?.currency?.id ? data?.currency?.id : ""
  //     );
  //   }
  //   // if (data?.discountCode) {
  //   //   rawFormData.append("discountCode", data?.discountCode);
  //   // }
  //   // if (data?.discountValue) {
  //   //   rawFormData.append(
  //   //     "discountValue",
  //   //     data?.discountValue ? data?.discountValue : ""
  //   //   );
  //   //   rawFormData.append(
  //   //     "discountType",
  //   //     data?.discountType?.id ? data?.discountType?.id : ""
  //   //   );
  //   // }
  //   if (data?.recurrence_end_date) {
  //     rawFormData.append("recurrenceEndDate", endDateRecurrence.getTime());
  //   }
  //   rawFormData.append("availableSeats", data?.ticket);

  //   data?.upload?.addImage
  //     ?.filter((e) => typeof e === "object")
  //     .forEach((value) => {
  //       rawFormData.append("eventImage", value);
  //     });
  //   data?.upload?.addVideo
  //     ?.filter((e) => typeof e === "object")
  //     .forEach((value) => {
  //       rawFormData.append("eventVideo", value);
  //     });
  //   rawFormData.append("deletedFiles", JSON.stringify(deleteImageArray));
  //   if (eventData?.eventId && !duplicate) {
  //     rawFormData.append("eventId", eventData?.eventId);
  //   }
  //   if (eventData?.eventId && duplicate) {
  //     rawFormData.append("eventId", eventData?.eventId);
  //   }
  //   if (!duplicate) {
  //     dispatch(
  //       addEventThunk(rawFormData, () => {
  //         dispatch(removeEventData());
  //         setshow(true);
  //       })
  //     );
  //   }
  //   if (duplicate) {
  //     dispatch(
  //       duplicateEventThunk(rawFormData, () => {
  //         dispatch(removeEventData());
  //         setshow(true);
  //       })
  //     );
  //   }
  // };

  const onSubmit2 = (data) => {
    console.log(data, "DATATATATTA");
    let obj = {};

    const endDateRecurrence = new Date(data?.recurrence_end_date);
    //   // Set the time to 11:59:59 PM
    endDateRecurrence.setHours(23, 59, 59, 999);
    const startTime = combinedTimestamp({
      eventTime:
        watch("eventCategory")?.id === 2
          ? data?.event_start_time
          : data?.event_time,
      eventDate:
        watch("eventCategory")?.id === 2
          ? data?.event_start_date
          : data?.event_date,
    });
    const endTime = combinedTimestamp({
      eventEndTime: data?.event_end_time,
      eventEndDate: data?.event_end_date,
    });

    if (watch("checkbox").includes("1") && data?.descriptionEnglish) {
      obj.description = data?.descriptionEnglish;
    }

    if (watch("checkbox").includes("2") && data?.descriptionGerman) {
      obj.descriptionDe = data?.descriptionGerman;
    }
    if (data?.title) {
      obj.title = data?.title;
    }
    // if(eventData?.recurringEventId){
    //   obj.editAll = eventData?.recurringEventId ? recurrenceEditAll === "true" ? true : false : false
    // }
    if (watch("eventCategory") && data?.eventCategory) {
      obj.category = data?.eventCategory?.id;
    }
    if (![3].includes(watch("eventCategory")?.id)) {
      obj.eventType = data?.eventTitle;
      if (data?.eventTitle === "2" && data?.city) {
        obj.city = data?.city;
        obj.venue = data?.venue;
        obj.googleMapsLink = data?.googleMapLink;
      } else {
        if (data?.meetLink) {
          obj.onlineMeetingLink = data?.meetLink;
        }
      }
    }

    obj.language = data?.checkbox.map((e) => Number(e));

    if ([3].includes(watch("eventCategory")?.id)) {
      obj.eventType = data?.eventTitle2;
    }

    if (data?.confirmation === "true") {
      if (data?.emailSubject) {
        obj.emailSubject = data?.emailSubject;
      }
      if (data?.emailBodyEditor) {
        obj.emailBody = data?.emailBodyEditor;
      }
    }

    obj.sendEmailAfterBookingConfirmation = data?.confirmation;

    if ([2]?.includes(watch("eventCategory")?.id)) {
      if (startTime) {
        obj.startTime = startTime;
      }
      if (endTime) {
        obj.endTime = endTime;
      }
    }
    if ([1, 4]?.includes(watch("eventCategory")?.id) && startTime) {
      obj.startTime = startTime;
    }

    if (watch("eventRecrrence") && data?.eventRecrrence?.id) {
      obj.duration = data?.eventRecrrence?.id;
    } else {
      obj.duration = 1;
    }
    if (watch("createEventType")) {
      if (watch("createEventType")?.id === 1) {
        obj.price = 0;
      }
      if (watch("createEventType")?.id === 2 && data?.price) {
        obj.currency = data?.currency?.id;
        obj.price = data?.price;
      }
    }

    if (watch("eventRecrrence")?.id) {
      obj.duration = data?.eventRecrrence?.id;
    }

    if (
      // [2, 3, 4].includes(watch("eventRecrrence")?.id) &&
      watch("eventRecrrence")?.id !== 1 &&
      [1, 4].includes(watch("eventCategory")?.id)
    ) {
      obj.recurrenceEndDate = endDateRecurrence.getTime();
    }

    if (watch("ticket")) {
      obj.availableSeats = data?.ticket;
    }

    let ImageArray = data?.upload?.addImage?.map((e) => {
      // if(typeof e === "object"){
      let testObj = {
        type: "image",
        imageUrl: e,
        videoUrl: "",
      };
      return testObj;
      // }
    });

    let VideoArray = data?.upload?.addVideo?.map((e) => {
      // if(typeof e === "object"){
      let testObj = {
        type: "video",
        imageUrl: "",
        videoUrl: e,
      };
      return testObj;
      // }
    });

    if (VideoArray?.length > 0 || ImageArray?.length > 0) {
      obj.media = [...ImageArray, ...VideoArray];
    }

    if (deleteImageArray) {
      obj.deletedFiles = deleteImageArray;
    }

    if (eventData?.eventId) {
      obj.eventId = eventData?.eventId;
    }
    ref.current = obj;
    setActivePreview(true);
  };

  const onSubmit = (data) => {
    let obj = {};

    const endDateRecurrence = new Date(data?.recurrence_end_date);
    //   // Set the time to 11:59:59 PM
    endDateRecurrence.setHours(23, 59, 59, 999);

    const startTime = combinedTimestamp({
      eventTime:
        watch("eventCategory")?.id === 2
          ? data?.event_start_time
          : data?.event_time,
      eventDate:
        watch("eventCategory")?.id === 2
          ? data?.event_start_date
          : data?.event_date,
    });
    const endTime = combinedTimestamp({
      eventEndTime: data?.event_end_time,
      eventEndDate: data?.event_end_date,
    });

    if (watch("checkbox").includes("1") && data?.descriptionEnglish) {
      obj.description = data?.descriptionEnglish;
    }

    if (watch("checkbox").includes("2") && data?.descriptionGerman) {
      obj.descriptionDe = data?.descriptionGerman;
    }
    if (data?.title) {
      obj.title = data?.title;
    }

    if (watch("eventCategory") && data?.eventCategory) {
      obj.category = data?.eventCategory?.id;
    }
    if (![3].includes(watch("eventCategory")?.id)) {
      obj.eventType = data?.eventTitle;
      if (data?.eventTitle === "2" && data?.city) {
        obj.city = data?.city;
        obj.venue = data?.venue;
        obj.googleMapsLink = data?.googleMapLink;
      } else {
        if (data?.meetLink) {
          obj.onlineMeetingLink = data?.meetLink;
        }
      }
    }

    if (eventData?.recurringEventId) {
      obj.editAll = eventData?.recurringEventId
        ? recurrenceEditAll === "true"
          ? true
          : false
        : false;
    }

    obj.language = data?.checkbox.map((e) => Number(e));

    if ([3].includes(watch("eventCategory")?.id)) {
      obj.eventType = data?.eventTitle2;
    }

    if (data?.confirmation === "true") {
      if (data?.emailSubject) {
        obj.emailSubject = data?.emailSubject;
      }
      if (data?.emailBodyEditor) {
        obj.emailBody = data?.emailBodyEditor;
      }
    }

    obj.sendEmailAfterBookingConfirmation = data?.confirmation;
    const combineStartDateandTime = `${data?.event_start_date}T${data?.event_start_time}:00`;
    if ([2]?.includes(watch("eventCategory")?.id)) {
      if (startTime) {
        obj.startTime = startTime;
      }
      if (endTime) {
        obj.endTime = endTime;
      }
    }
    if ([1, 4]?.includes(watch("eventCategory")?.id) && data?.event_date) {
      obj.startTime = startTime;
    }

    if (watch("eventRecrrence") && data?.eventRecrrence?.id) {
      obj.duration = data?.eventRecrrence?.id;
    } else {
      obj.duration = 1;
    }
    if (watch("createEventType")) {
      if (watch("createEventType")?.id === 1) {
        obj.price = 0;
      }
      if (watch("createEventType")?.id === 2 && data?.price) {
        obj.currency = data?.currency?.id;
        obj.price = data?.price;
      }
    }

    if (watch("eventRecrrence")?.id) {
      obj.duration = data?.eventRecrrence?.id;
    }

    if (
      // [2, 3, 4].includes(watch("eventRecrrence")?.id) &&
      watch("eventRecrrence")?.id !== 1 &&
      [1, 4].includes(watch("eventCategory")?.id)
    ) {
      obj.recurrenceEndDate = endDateRecurrence.getTime();
    }

    if (watch("ticket")) {
      obj.availableSeats = data?.ticket;
    }

    let ImageArray = data?.upload?.addImage?.map((e) => {
      // if(typeof e === "object"){
      let testObj = {
        type: "image",
        imageUrl: e,
        videoUrl: "",
      };
      return testObj;
      // }
    });

    let VideoArray = data?.upload?.addVideo?.map((e) => {
      // if(typeof e === "object"){
      let testObj = {
        type: "video",
        imageUrl: "",
        videoUrl: e,
      };
      return testObj;
      // }
    });

    if (VideoArray?.length > 0 || ImageArray?.length > 0) {
      obj.media = [...ImageArray, ...VideoArray];
    }

    if (deleteImageArray) {
      obj.deletedFiles = deleteImageArray;
    }

    if (eventData?.eventId) {
      obj.eventId = eventData?.eventId;
    }

    const rawFormData = new FormData();
    for (const key in obj) {
      // if (key !== "media") {
      //   console.log(key, obj[key], "KEYYYYYYYYYYYY");
      //   rawFormData.append(key, obj[key]);
      // }
      if (Array.isArray(obj[key])) {
        if (key === "media") {
          obj?.[key]
            ?.filter(
              (e) =>
                typeof e?.imageUrl === "object" ||
                typeof e?.videoUrl === "object"
            )
            .forEach((value) => {
              if (value?.type === "image") {
                rawFormData.append("eventImage", value?.imageUrl);
              } else {
                rawFormData.append("eventVideo", value?.videoUrl);
              }
            });
        } else {
          rawFormData.append(key, JSON.stringify(obj[key]));
        }
      } else {
        if (key === "city") {
          if (obj[key]?._id) {
            rawFormData.append(key, obj[key]?._id);
          } else {
            rawFormData.append(key, obj[key]?.cityId);
          }
        } else {
          rawFormData.append(key, obj[key]);
        }
      }
    }

    if (!duplicate) {
      dispatch(
        addEventThunk(rawFormData, () => {
          dispatch(removeEventData());
          setshow(true);
        })
      );
    }
    if (duplicate) {
      dispatch(
        duplicateEventThunk(rawFormData, () => {
          dispatch(removeEventData());
          setshow(true);
        })
      );
    }
  };

  return (
    <>
      <div className="event-page">
        <SiteBreadcrumb
          BreadcrumbData={BreadcrumbData}
          className="protected-breadcrumb"
          FinalArray
        />
        <form onSubmit={handleSubmit(onSubmit)} lang="de" noValidate>
          <div className="protected-head">
            <H2>
              {viewId && !duplicate
                ? i18n.t(`organizer.event.eventFormHeader.editTitle`)
                : i18n.t(`organizer.event.eventFormHeader.title`)}
            </H2>
          </div>
          <div className="create-event-form bg-white mt-32">
            <div className="event-form-wrap xl:flex xl:items-stretch w-full">
              <div className="form-details-left xl:w-1/2">
                <div className="input-group w-full">
                  <label htmlFor="event-title">
                    {i18n.t(
                      `organizer.event.eventForm.inputs.EventTitle.title`
                    )}
                  </label>
                  <input
                    type="text"
                    id="event-title"
                    name="event-title"
                    placeholder=""
                    {...register("title")}
                  />
                  {errors?.title?.message && (
                    <span className="error-msg">{errors?.title?.message}</span>
                  )}
                </div>
                <div className="input-group w-full">
                  <label htmlFor="event-title">
                    {i18n.t(
                      `organizer.event.eventForm.inputs.EventCategory.title`
                    )}
                  </label>
                  <div
                    className={`custom-select ${
                      eventCategory === true ? "active" : ""
                    }`}
                  >
                    <Controller
                      name="eventCategory"
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
                          isSearchable={false}
                          // onInputChange={(e) => { handleCityChange(e) }}
                          getOptionLabel={(e) => {
                            return e?.title;
                          }}
                          getOptionValue={(e) => {
                            return e?.id;
                          }}
                          options={EventCategory}
                          // isSearchable={true}
                          // placeholder="Search City"
                          // isClearable
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="input-group w-full">
                  <label htmlFor="event-title">
                    {i18n.t(`organizer.event.eventForm.inputs.Checkbox.title`)}
                  </label>
                  <div className="sm:flex sm:items-center sm:gap-4 2xl:gap-5">
                    <div className="custom-checkbox flex items-center sm:w-1/2">
                      <input
                        type="checkbox"
                        id="english"
                        name="checkbox"
                        {...register("checkbox")}
                        value={1}
                      />
                      <label for="english">
                        {i18n.t(
                          `organizer.event.eventForm.inputs.Checkbox.checkboxTitle1`
                        )}
                      </label>
                    </div>

                    <div className="custom-checkbox flex items-center sm:w-1/2">
                      <input
                        type="checkbox"
                        id="german"
                        name="checkbox"
                        {...register("checkbox")}
                        value={2}
                      />
                      <label for="german">
                        {i18n.t(
                          `organizer.event.eventForm.inputs.Checkbox.checkboxTitle2`
                        )}
                      </label>
                    </div>
                  </div>
                  {errors?.checkbox?.message && (
                    <span className="error-msg">
                      {errors?.checkbox?.message}
                    </span>
                  )}
                </div>
                {watch("checkbox")?.includes("1") && (
                  <div className="input-group w-full">
                    <label htmlFor="event-title">
                      {i18n.t(
                        `organizer.event.eventForm.inputs.DescriptionEnglish.title`
                      )}
                    </label>
                    <textarea
                      name="event-title"
                      id="event-title"
                      rows="3"
                      {...register("descriptionEnglish")}
                    ></textarea>
                    {errors?.descriptionEnglish?.message && (
                      <span className="error-msg">
                        {errors?.descriptionEnglish?.message}
                      </span>
                    )}
                  </div>
                )}
                {watch("checkbox")?.includes("2") && (
                  <div className="input-group w-full">
                    <label htmlFor="event-title">
                      {i18n.t(
                        `organizer.event.eventForm.inputs.DescriptionGerman.title`
                      )}
                    </label>
                    <textarea
                      name="event-title"
                      id="event-title"
                      rows="3"
                      {...register("descriptionGerman")}
                    ></textarea>
                    {errors?.descriptionGerman?.message && (
                      <span className="error-msg">
                        {errors?.descriptionGerman?.message}
                      </span>
                    )}
                  </div>
                )}
                {![3]?.includes(watch("eventCategory")?.id) && (
                  <div className="input-group w-full">
                    <label htmlFor="event-title">
                      {i18n.t(
                        `organizer.event.eventForm.inputs.EventType.title`
                      )}
                    </label>
                    <Controller
                      name="eventTitle"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <div className="sm:flex sm:items-center sm:gap-4 2xl:gap-5">
                          <div className="custom-radio sm:w-1/2">
                            <input
                              type="radio"
                              id="offline"
                              // checked={eventType === "Offline"}
                              name="eventTitle"
                              checked={value === 2}
                              onChange={() => onChange(2)}
                            />
                            <label for="offline">
                              {i18n.t(
                                `organizer.event.eventForm.inputs.EventType.EventTypeTitle1`
                              )}
                            </label>
                          </div>
                          <div className="custom-radio  sm:w-1/2">
                            <input
                              type="radio"
                              id="online"
                              // checked={eventType === "Online"}
                              name="eventTitle"
                              checked={value === 1}
                              onChange={() => onChange(1)}
                            />
                            <label for="online">
                              {i18n.t(
                                `organizer.event.eventForm.inputs.EventType.EventTypeTitle2`
                              )}
                            </label>
                          </div>
                        </div>
                      )}
                    />

                    {errors?.eventTitle?.message && (
                      <span className="error-msg">
                        {errors?.eventTitle?.message}
                      </span>
                    )}
                  </div>
                )}
                {[3].includes(watch("eventCategory")?.id) && (
                  <div className="input-group w-full">
                    <label htmlFor="event-title">
                      {i18n.t(
                        `organizer.event.eventForm.inputs.EventType.title2`
                      )}
                    </label>
                    <Controller
                      name="eventTitle2"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <div className="sm:flex sm:items-center sm:gap-4 2xl:gap-5">
                          <div className="custom-radio sm:w-1/2">
                            <input
                              type="radio"
                              id="As a Gift"
                              checked={value === 3}
                              name="eventTitle2"
                              // value={value}
                              onChange={() => onChange(3)}
                            />
                            <label for="As a Gift">
                              {i18n.t(
                                `organizer.event.eventForm.inputs.EventType.EventTypeTitle3`
                              )}
                            </label>
                          </div>
                          <div className="custom-radio  sm:w-1/2">
                            <input
                              type="radio"
                              id="For Myself"
                              // checked={eventType === "For Myself"}
                              name="eventTitle2"
                              // value={4}
                              checked={value === 4}
                              onChange={() => onChange(4)}
                            />
                            <label for="For Myself">
                              {i18n.t(
                                `organizer.event.eventForm.inputs.EventType.EventTypeTitle4`
                              )}
                            </label>
                          </div>
                        </div>
                      )}
                    />

                    {errors?.eventTitle2?.message && (
                      <span className="error-msg">
                        {errors?.eventTitle2?.message}
                      </span>
                    )}
                  </div>
                )}
                {/* {console.log(watch("event_date"),"HIRENM")} */}
                {![3]?.includes(watch("eventCategory")?.id) && (
                  <>
                    {watch("eventTitle") === 2 && (
                      <>
                        <div className="sm:flex sm:items-center sm:gap-4 2xl:gap-5">
                          <div className="input-group w-full">
                            <label htmlFor="event-title">
                              {i18n.t(
                                `organizer.event.eventForm.inputs.Venue.title`
                              )}
                            </label>
                            <input
                              type="text"
                              id="venue"
                              name="venue"
                              {...register("venue")}
                            />
                            {errors?.venue?.message && (
                              <span className="error-msg">
                                {errors?.venue?.message}
                              </span>
                            )}
                          </div>
                          <div className="input-group w-full">
                            <label htmlFor="event-title">
                              {i18n.t(
                                `organizer.event.eventForm.inputs.City.title`
                              )}
                            </label>
                            <div
                              className={`custom-select ${
                                city === true ? "active" : ""
                              }`}
                            >
                              <Controller
                                control={control}
                                name="city"
                                render={({ field: { onChange, value } }) => (
                                  <>
                                    <ReactSelectcmp
                                      openMenuOnFocus={true}
                                      value={value}
                                      onChange={onChange}
                                      onInputChange={(e) => {
                                        if (!!e) {
                                          if (timer) {
                                            clearTimeout(timer);
                                          }
                                          timer = setTimeout(() => {
                                            // onChange(e);
                                            dispatch(
                                              getCityThunk({
                                                search: e,
                                              })
                                            );
                                          }, 500);
                                        }
                                      }}
                                      getOptionLabel={(e) => {
                                        return e?.name;
                                      }}
                                      getOptionValue={(e) => {
                                        return e?.cityId;
                                      }}
                                      options={cityData}
                                      isSearchable={true}
                                      placeholder={i18n.t(
                                        `organizer.event.eventForm.inputs.City.placeholder`
                                      )}
                                      isClearable
                                    />
                                  </>
                                )}
                              />
                            </div>
                            {errors?.city?.message && (
                              <span className="error-msg">
                                {errors?.city?.message}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="input-group w-full">
                          <label htmlFor="google-map">
                            {i18n.t(
                              `organizer.event.eventForm.inputs.GoogleMapLink.title`
                            )}
                          </label>
                          <input
                            type="text"
                            id="google-map"
                            name="google-map"
                            {...register("googleMapLink")}
                          />
                          {errors?.googleMapLink?.message && (
                            <span className="error-msg">
                              {errors?.googleMapLink?.message}
                            </span>
                          )}
                        </div>
                      </>
                    )}
                    {watch("eventTitle") === 1 && (
                      <div className="input-group w-full">
                        <label htmlFor="meet-link">
                          {i18n.t(
                            `organizer.event.eventForm.inputs.MeetLink.title`
                          )}{" "}
                          (
                          {i18n.t(
                            `organizer.event.eventForm.inputs.MeetLink.optional`
                          )}
                          )
                        </label>
                        <input
                          type="text"
                          id="meet-link"
                          name="meet-link"
                          {...register("meetLink")}
                        />
                        {/* {errors?.meetLink?.message && (
                          <span className="error-msg">
                            {errors?.meetLink?.message}
                          </span>
                        )} */}
                      </div>
                    )}
                  </>
                )}
                <div className="input-group w-full">
                  <label htmlFor="event-title">
                    {i18n.t(
                      `organizer.event.eventForm.inputs.Confirmation.title`
                    )}
                  </label>
                  <div className="sm:flex sm:items-center sm:gap-4 2xl:gap-5">
                    <div className="custom-radio sm:w-1/2">
                      <input
                        type="radio"
                        id="yes"
                        // checked={eventType === "As a Gift"}
                        name="yes"
                        value={true}
                        {...register("confirmation")}
                      />
                      <label for="yes">
                        {i18n.t(
                          `organizer.event.eventForm.inputs.Confirmation.confirmationTitle1`
                        )}
                      </label>
                    </div>
                    <div className="custom-radio  sm:w-1/2">
                      <input
                        type="radio"
                        id="no"
                        // checked={eventType === "For Myself"}
                        name="no"
                        value={false}
                        {...register("confirmation")}
                      />
                      <label for="no">
                        {i18n.t(
                          `organizer.event.eventForm.inputs.Confirmation.confirmationTitle2`
                        )}
                      </label>
                    </div>
                  </div>
                  {errors?.confirmation?.message && (
                    <span className="error-msg">
                      {errors?.confirmation?.message}
                    </span>
                  )}
                </div>
                {watch("confirmation") === "true" && (
                  <>
                    <div className="input-group w-full">
                      <label htmlFor="emailSubject">
                        {i18n.t(
                          `organizer.event.eventForm.inputs.EmailSubject.title`
                        )}
                      </label>
                      <input
                        type="text"
                        id="emailSubject"
                        name="emailSubject"
                        {...register("emailSubject")}
                      />
                      {errors?.emailSubject?.message && (
                        <span className="error-msg">
                          {errors?.emailSubject?.message}
                        </span>
                      )}
                    </div>
                    <div className="input-group w-full email-editor">
                      <label htmlFor="emailBody">
                        {i18n.t(
                          `organizer.event.eventForm.inputs.EmailBodyEditor.title`
                        )}
                      </label>
                      <Ckeditor control={control} />
                      {errors?.emailBodyEditor?.message && (
                        <span className="error-msg">
                          {errors?.emailBodyEditor?.message}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
              <div className="form-details-right xl:w-1/2">
                {[1, 4].includes(watch("eventCategory")?.id) && (
                  <div className="sm:flex sm:items-center sm:gap-4 2xl:gap-5">
                    <div className="input-group w-full">
                      <label htmlFor="event-date">
                        {i18n.t(
                          `organizer.event.eventForm.inputs.Event_date.title`
                        )}
                      </label>
                      <Controller
                        name="event_date"
                        // key={viewId}
                        control={control}
                        render={({ field: { onChange, value, ref } }) => (
                          <>
                            {/* <input
                                type="date"
                                id="event-date"
                                name="event_date"
                                value={value || ""}
                                onChange={onChange}
                                min={new Date().toISOString().split("T")[0]}
                                max="9999-12-31"
                                // {...register("event_date")}
                              /> */}
                            <DatePicker
                              onChange={(e) => {
                                onChange(e);
                                if (
                                  [1, 4]?.includes(watch("eventCategory")?.id)
                                ) {
                                  setValue("recurrence_end_date", "");
                                }
                              }}
                              selected={value || ""}
                              showMonthDropdown
                              showYearDropdown
                              dropdownMode="select"
                              // inputFormat="dd-MM-yyyy"
                              dateFormat="dd-MM-yyyy"
                              locale={languageName === "de" && de}
                              customInput={
                                <DatePikerLang
                                  value={value || ""}
                                  ref={ref}
                                  formateDate={
                                    i18n?.language === "en"
                                      ? "dd-mm-yyyy"
                                      : "tt-mm-jjjj"
                                  }
                                />
                              }
                              // minDate={new Date().toISOString().split("T")[0]}
                              minDate={new Date()}
                              maxDate={new Date(9999, 12, 31)}
                            />
                          </>
                        )}
                      />
                      {errors?.event_date?.message && (
                        <span className="error-msg">
                          {errors?.event_date?.message}
                        </span>
                      )}
                    </div>
                    <div className="input-group w-full">
                      <label htmlFor="event-end-time">
                        {i18n.t(
                          `organizer.event.eventForm.inputs.Event_time.title`
                        )}
                      </label>
                      <input
                        type="time"
                        id="event-end-time"
                        name="event_time"
                        // min={new Date}
                        defaultValue={"10:00"}
                        {...register("event_time")}
                      />
                      {errors?.event_time?.message && (
                        <span className="error-msg">
                          {errors?.event_time?.message}
                        </span>
                      )}
                    </div>
                  </div>
                )}
                {watch("eventCategory")?.id === 2 && (
                  <>
                    <div className="sm:flex sm:items-center sm:gap-4 2xl:gap-5">
                      <Controller
                        name="event_start_date"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <div className="input-group w-full">
                            <label htmlFor="event-start-date">
                              {i18n.t(
                                `organizer.event.eventForm.inputs.Event_start_date.title`
                              )}
                            </label>
                            <DatePicker
                              onChange={(e) => {
                                onChange(e);
                                setValue("event_end_date", "");
                              }}
                              showMonthDropdown
                              showYearDropdown
                              dropdownMode="select"
                              selected={value || ""}
                              // inputFormat="dd-MM-yyyy"
                              dateFormat="dd-MM-yyyy"
                              locale={languageName === "de" && de}
                              customInput={
                                <DatePikerLang
                                  value={value || ""}
                                  formateDate={
                                    i18n?.language === "en"
                                      ? "dd-mm-yyyy"
                                      : "tt-mm-jjjj"
                                  }
                                  ref={ref}
                                />
                              }
                              // minDate={new Date().toISOString().split("T")[0]}
                              minDate={new Date()}
                              maxDate={new Date(9999, 12, 31)}
                            />
                            {/* <input
                              value={value}
                              type="date"
                              id="event-start-date"
                              name="event-start-date"
                              onChange={(e) => {
                                onChange(e);
                                setValue("event_end_date", "");
                              }}
                              min={new Date().toISOString().split("T")[0]}
                              max="9999-12-31"
                              // {...register("event_start_date")}
                            /> */}
                            {errors?.event_start_date?.message && (
                              <span className="error-msg">
                                {errors?.event_start_date?.message}
                              </span>
                            )}
                          </div>
                        )}
                      />
                      <div className="input-group w-full">
                        <label htmlFor="event-start-time">
                          {i18n.t(
                            `organizer.event.eventForm.inputs.Event_start_time.title`
                          )}
                        </label>
                        <input
                          type="time"
                          id="event-start-time"
                          name="event-start-time"
                          defaultValue={"10:00"}
                          {...register("event_start_time")}
                        />
                        {errors?.event_start_time?.message && (
                          <span className="error-msg">
                            {errors?.event_start_time?.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="sm:flex sm:items-center sm:gap-4 2xl:gap-5">
                      <div className="input-group w-full">
                        {/* <input
                          type="date"
                          id="event-end-date"
                          name="event-end-date"
                          min={watch("event_start_date")}
                          max="9999-12-31"
                          // max={new Date().toISOString().split('T')[0]}
                          {...register("event_end_date")}
                        /> */}
                        <Controller
                          name="event_end_date"
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <>
                              <label htmlFor="event-end-date">
                                {i18n.t(
                                  `organizer.event.eventForm.inputs.Event_end_date.title`
                                )}
                              </label>
                              <DatePicker
                                onChange={onChange}
                                selected={value || ""}
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                // inputFormat="dd-MM-yyyy"
                                dateFormat="dd-MM-yyyy"
                                locale={languageName === "de" && de}
                                customInput={
                                  <DatePikerLang
                                  formateDate={
                                    i18n?.language === "en"
                                      ? "dd-mm-yyyy"
                                      : "tt-mm-jjjj"
                                  }
                                    value={value || ""}
                                    ref={ref}
                                  />
                                }
                                // minDate={new Date().toISOString().split("T")[0]}
                                minDate={watch("event_start_date")}
                                maxDate={new Date(9999, 12, 31)}
                              />
                              {errors?.event_end_date?.message && (
                                <span className="error-msg">
                                  {errors?.event_end_date?.message}
                                </span>
                              )}
                            </>
                          )}
                        />
                      </div>
                      <div className="input-group w-full">
                        <label htmlFor="event-end-time">
                          {i18n.t(
                            `organizer.event.eventForm.inputs.Event_end_time.title`
                          )}
                        </label>
                        <input
                          type="time"
                          id="event-end-time"
                          name="event-end-time"
                          defaultValue={"10:00"}
                          {...register("event_end_time")}
                        />
                        {errors?.event_end_time?.message && (
                          <span className="error-msg">
                            {errors?.event_end_time?.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </>
                )}
                {[1, 2, 4].includes(watch("eventCategory")?.id) && (
                  <div className="sm:flex sm:items-center sm:gap-4 2xl:gap-5">
                    <Controller
                      control={control}
                      name="eventRecrrence"
                      render={({ field: { onChange, value } }) => (
                        <>
                          <div className="input-group w-full">
                            <label htmlFor="event-title">
                              {i18n.t(
                                `organizer.event.eventForm.inputs.EventRecrrence.title`
                              )}
                            </label>
                            <div className={`custom-select`}>
                              <ReactSelectcmp
                                openMenuOnFocus={true}
                                value={value}
                                onChange={onChange}
                                isSearchable={false}
                                // onInputChange={(e) => { handleCityChange(e) }}
                                getOptionLabel={(e) => {
                                  return e?.title;
                                }}
                                getOptionValue={(e) => {
                                  return e?.id;
                                }}
                                options={EventRecurrence}
                                // isSearchable={true}
                                placeholder={i18n.t(
                                  `organizer.event.eventForm.inputs.EventRecrrence.placeholder`
                                )}
                                // isClearable
                              />
                              {errors?.eventRecrrence?.message && (
                                <span className="error-msg">
                                  {errors?.eventRecrrence?.message}
                                </span>
                              )}
                            </div>
                          </div>
                          {[2, 3, 4, 5].includes(value?.id) &&
                            [1, 4].includes(watch("eventCategory")?.id) && (
                              <div className="input-group w-full">
                                <Controller
                                  name="recurrence_end_date"
                                  control={control}
                                  render={({ field: { onChange, value } }) => (
                                    <>
                                      <label htmlFor="recurrence-end-date">
                                        {i18n.t(
                                          `organizer.event.eventForm.inputs.Recurrence_end_date.title`
                                        )}
                                      </label>
                                      <DatePicker
                                        onChange={onChange}
                                        selected={value || ""}
                                        showMonthDropdown
                                        showYearDropdown
                                        dropdownMode="select"
                                        // inputFormat="dd-MM-yyyy"
                                        dateFormat="dd-MM-yyyy"
                                        locale={languageName === "de" && de}
                                        customInput={
                                          <DatePikerLang
                                          formateDate={
                                            i18n?.language === "en"
                                              ? "dd-mm-yyyy"
                                              : "tt-mm-jjjj"
                                          }
                                            value={value || ""}
                                            ref={ref}
                                          />
                                        }
                                        // minDate={new Date().toISOString().split("T")[0]}
                                        minDate={watch("event_date")}
                                      />
                                      {errors?.event_end_date?.message && (
                                        <span className="error-msg">
                                          {errors?.event_end_date?.message}
                                        </span>
                                      )}
                                    </>
                                  )}
                                />
                                {/* <input
                                  type="date"
                                  id="recurrence-end-date"
                                  name="recurrence-end-date"
                                  min={watch("event_date")}
                                  max="9999-12-31"
                                  // min={new Date().toISOString().split("T")[0]}
                                  {...register("recurrence_end_date")}
                                /> */}
                                {errors?.recurrence_end_date?.message && (
                                  <span className="error-msg">
                                    {errors?.recurrence_end_date?.message}
                                  </span>
                                )}
                              </div>
                            )}
                        </>
                      )}
                    />
                  </div>
                )}
                <div className="input-group w-full">
                  <label htmlFor="event-title">
                    {i18n.t(
                      `organizer.event.eventForm.inputs.CreateEventType.title`
                    )}
                  </label>
                  <div className={`custom-select`}>
                    <Controller
                      control={control}
                      name="createEventType"
                      // defaultValue={
                      //   userDetail?.data?.isBankAccountAdded
                      //     ? CreateEventType[1]
                      //     : CreateEventType.slice(0, 1)[0]
                      // }
                      render={({ field: { onChange, value } }) => (
                        <>
                          <ReactSelectcmp
                            openMenuOnFocus={true}
                            value={value}
                            onChange={onChange}
                            isSearchable={false}
                            getOptionLabel={(e) => {
                              return e?.title;
                            }}
                            getOptionValue={(e) => {
                              return e?.id;
                            }}
                            options={
                              userDetail?.data?.isBankAccountAdded
                                ? CreateEventType
                                : CreateEventType.slice(0, 1)
                            }
                          />
                        </>
                      )}
                    />
                  </div>
                  {!userDetail?.data?.isBankAccountAdded && (
                    <div className="flex items-start justify-between flex-col-reverse md:flex-row mt-2 gap-1">
                      <p class="note mb-0">
                        <span class="red">
                          {i18n.t(
                            `organizer.event.eventForm.inputs.CreateEventType.noteTitle`
                          )}{" "}
                          :
                        </span>{" "}
                        {i18n.t(
                          `organizer.event.eventForm.inputs.CreateEventType.note`
                        )}
                      </p>
                      <div className="flex items-center justify-end flex-shrink-0 link-wrapper">
                        <span
                          className="link"
                          onClick={() => {
                            setBankInfoModal(true);
                          }}
                        >
                          {i18n.t(
                            `organizer.event.eventForm.inputs.CreateEventType.addBtn`
                          )}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                {/* {[3, 7, 8].includes(watch("eventCategory")?.id) && (
                  <div className="input-group w-full">
                    <label htmlFor="event-title">
                      {i18n.t(`organizer.event.eventForm.inputs.Email.title`)}
                    </label>
                    <div className="sm:flex sm:items-center sm:gap-4 2xl:gap-5">
                      <div className="custom-radio sm:w-1/2">
                        <input
                          type="radio"
                          id="yes1"
                          // checked={eventType === "As a Gift"}
                          name="yes"
                          value={true}
                          {...register("email")}
                        />
                        <label for="yes1">
                          {i18n.t(
                            `organizer.event.eventForm.inputs.Email.emailTitle1`
                          )}
                        </label>
                      </div>
                      <div className="custom-radio  sm:w-1/2">
                        <input
                          type="radio"
                          id="no1"
                          // checked={eventType === "For Myself"}
                          name="no"
                          value={false}
                          {...register("email")}
                        />
                        <label for="no1">
                          {i18n.t(
                            `organizer.event.eventForm.inputs.Email.emailTitle2`
                          )}
                        </label>
                      </div>
                    </div>
                    {errors?.email?.message && (
                      <span className="error-msg">
                        {errors?.email?.message}
                      </span>
                    )}
                  </div>
                )} */}

                <div className="sm:flex sm:items-center sm:gap-4 2xl:gap-5">
                  {watch("createEventType")?.id === 2 && (
                    <div className="input-group w-full">
                      <label htmlFor="event-title">
                        {i18n.t(`organizer.event.eventForm.inputs.Price.title`)}
                      </label>
                      <div
                        className={`custom-select price-select ${
                          price === true ? "active" : ""
                        }`}
                      >
                        <input
                          type="number"
                          id="price"
                          name="price"
                          placeholder={i18n.t(
                            `organizer.event.eventForm.inputs.Price.placeholder`
                          )}
                          // minLength={0}
                          // maxLength={10}
                          // onKeyDown={(e) => {
                          //   console.log(e.key,"eeeeee")
                          //   if (
                          //     ![
                          //       "ArrowLeft",
                          //       "ArrowRight",
                          //       "Delete",
                          //       "Backspace",
                          //       ".",
                          //       ...Array.from(
                          //         {
                          //           length: 10,
                          //         },
                          //         (_, i) => i.toString()
                          //       ),
                          //     ].includes(e.key)
                          //   ) {
                          //     e.preventDefault();
                          //   }
                          // }}
                          onKeyDown={(e) => {
                            if (
                              ["e", "-", "+", "ArrowUp", "ArrowDown"].includes(
                                e?.key
                              )
                            ) {
                              e.preventDefault();
                            }
                          }}
                          {...register("price")}
                        />
                        <Controller
                          name="currency"
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <>
                              <button
                                type="button"
                                className="select-btn"
                                onClick={() => setPrice(!price)}
                              >
                                {value?.title}
                              </button>
                              <div className="select-menu-list">
                                <ul>
                                  {Currency?.map((list) => (
                                    <li
                                      key={list?.id}
                                      onClick={() => {
                                        onChange(list);
                                        setPrice(false);
                                        setActivePrice(list?.id);
                                      }}
                                      className={
                                        list?.id === activePrice ? "active" : ""
                                      }
                                    >
                                      {list?.title}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </>
                          )}
                        />
                      </div>
                      {errors?.price?.message && (
                        <span className="error-msg">
                          {errors?.price?.message}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="input-group w-full">
                    <label htmlFor="ticket">
                      {i18n.t(`organizer.event.eventForm.inputs.Ticket.title`)}
                    </label>
                    <input
                      type="text"
                      id="ticket"
                      name="ticket"
                      placeholder=""
                      // minLength={2}
                      maxLength={50}
                      onKeyDown={(e) => {
                        if (
                          ![
                            "ArrowLeft",
                            "ArrowRight",
                            "Delete",
                            "Backspace",
                            "Tab",
                            ...Array.from({ length: 10 }, (_, i) =>
                              i.toString()
                            ),
                          ].includes(e.key)
                        ) {
                          e.preventDefault();
                        }
                      }}
                      {...register("ticket")}
                    />
                    {errors?.ticket?.message && (
                      <span className="error-msg">
                        {errors?.ticket?.message}
                      </span>
                    )}
                  </div>
                  {/* <div className="input-group w-full">
                    <label htmlFor="discount-code">
                      Discount Code (optional)
                    </label>
                    <input
                      type="text"
                      id="discount-code"
                      name="discount-code"
                      placeholder="Enter discount code"
                      {...register("discountCode")}
                    />
                  </div> */}
                </div>
                <div className="sm:flex sm:items-center sm:gap-4 2xl:gap-5">
                  {/* <div className="input-group w-full">
                    <label htmlFor="event-title">
                      Discount Type (Optional)
                    </label>
                    <div
                      className={`custom-select price-select ${
                        discountType === true ? "active" : ""
                      }`}
                    >
                      <input
                        type="text"
                        id="discountValue"
                        name="discountValue"
                        placeholder="Enter discount type"
                        maxLength={watch("discountType")?.id === 1 ? 5 : 3}
                        onKeyDown={(e) => {
                          if (
                            ![
                              "ArrowLeft",
                              "ArrowRight",
                              "Delete",
                              "Backspace",
                              ...Array.from({ length: 10 }, (_, i) =>
                                i.toString()
                              ),
                            ].includes(e.key)
                          ) {
                            e.preventDefault();
                          }
                        }}
                        {...register("discountValue")}
                      />
                      <Controller
                        name="discountType"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <>
                            <button
                              type="button"
                              className="select-btn"
                              onClick={() => setDiscountType(!discountType)}
                            >
                              {value?.title}
                            </button>
                            <div className="select-menu-list">
                              <ul>
                                {DiscountTypeList?.map((list) => (
                                  <li
                                    key={list?.id}
                                    onClick={() => {
                                      onChange(list);
                                      setDiscountType(false);
                                    }}
                                  >
                                    {list?.title}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </>
                        )}
                      />
                    </div>
                  </div> */}
                  {/* <div className="input-group w-full">
                    <label htmlFor="ticket">Ticket Capacity</label>
                    <input
                      type="text"
                      id="ticket"
                      name="ticket"
                      placeholder=""
                      minLength={2}
                      maxLength={10}
                      onKeyDown={(e) => {
                        if (
                          ![
                            "ArrowLeft",
                            "ArrowRight",
                            "Delete",
                            "Backspace",
                            ...Array.from({ length: 10 }, (_, i) =>
                              i.toString()
                            ),
                          ].includes(e.key)
                        ) {
                          e.preventDefault();
                        }
                      }}
                      {...register("ticket")}
                    />
                    {errors?.ticket?.message && (
                      <span className="error-msg">
                        {errors?.ticket?.message}
                      </span>
                    )}
                  </div> */}
                </div>
                {/* <div className="input-group w-full ">
                  <label htmlFor="event-title">Add Image</label>
                  <div
                    className="event-image-box flex items-center justify-center flex-col"
                    {...imageDropzone.getRootProps()}
                  >
                    <i className="icon-plus"></i>
                    <span>Upload Image</span>
                    <input
                      name="imageOrVideo"
                      type="file"
                      accept="image*"
                      {...imageDropzone.getInputProps()}
                      {...register("upload.addImage")}
                    />
                  </div>
                  {errors?.upload?.root?.message && (
                    <span className="error-msg">{errors?.upload?.root?.message}</span>
                  )}
                  <ul className="event-images flex flex-wrap xl:gap-4">
                    {watch("upload.addImage")?.map((image, index) => (
                      <>
                        {console.log(image, "image?.path")}
                        <li key={index}>
                          <Image
                            src={URL.createObjectURL(image)}
                            width={172}
                            height={150}
                          />
                        </li>
                      </>
                    ))}
                  </ul>
                </div>
                <div className="input-group w-full mb-0">
                  <label htmlFor="event-title">Add Video</label>
                  <ul className="event-images flex flex-wrap xl:gap-4">
                    <li>
                      <div
                        className="event-image-box flex items-center justify-center flex-col"
                        {...videoDropzone.getRootProps()}
                      >
                        <i className="icon-plus"></i>
                        <span>Upload Video</span>
                        <input
                          name="imageOrVideo"
                          type="file"
                          {...videoDropzone.getInputProps()}
                          {...register("upload.addVideo")}
                        />
                      </div>
                    </li>
                    <li>
                      <div className="event-video-box event-image-box">
                        {watch("upload.addVideo")?.map((video,index) => (
                          <video width={172} height={150} controls key={index} >
                            <source src={URL.createObjectURL(video)}></source>
                          </video>
                        ))}
                         <button type="button" className="play-btn">
                          <i className="icon-play-btn"></i>
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>  */}

                <DropZone
                  Form={watch("upload")}
                  control={control}
                  deleteImageArray={deleteImageArray}
                  setDeleteImageArray={setDeleteImageArray}
                  setDeleteVideoArray={setDeleteVideoArray}
                  deleteVideoArray={deleteVideoArray}
                  watch={watch}
                  setValue={setValue}
                  clearErrors={clearErrors}
                  register={register}
                  errors={errors}
                />
                <div className="flex itms-center flex-wrap gap-3 mt-6">
                  {/* {!!isLoading ? (
                    <button
                      type="button"
                      className="solid-btn dashboard-form-btn"
                      // onClick={() => setshow(true)}
                      // disabled={isLoading}
                    >
                      <LoaderBtn />
                    </button>
                  ) : ( */}
                  <button
                    type="button"
                    className="border-btn form-btn"
                    onClick={handleSubmit(onSubmit2)}
                    // disabled={disable}
                  >
                    {i18n.t(`organizer.event.eventFormHeader.previewBtn`)}
                    {/* {i18n.t(`organizer.event.eventFormHeader.saveButton`)} */}
                  </button>
                  {console.log(
                    eventData?.recurringEventId,
                    "eventDataeventData"
                  )}
                  {/* )} */}
                  {!!isLoading ? (
                    <button
                      type="button"
                      className="solid-btn form-btn"
                      // onClick={() => setshow(true)}
                      // disabled={isLoading}
                    >
                      <LoaderBtn />
                    </button>
                  ) : (
                    <>
                      {eventData?.recurringEventId ? (
                        <button
                          type="button"
                          className="solid-btn form-btn"
                          onClick={() => setRecurrenceOpen(true)}
                          // disabled={disable}
                        >
                          {/* {i18n.t(`organizer.event.eventFormHeader.previewBtn`)} */}
                          {i18n.t(`organizer.event.eventFormHeader.saveButton`)}
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="solid-btn form-btn"
                          // onClick={() => setshow(true)}
                          // disabled={disable}
                        >
                          {/* {i18n.t(`organizer.event.eventFormHeader.previewBtn`)} */}
                          {i18n.t(`organizer.event.eventFormHeader.saveButton`)}
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
        {BankInfoModal && (
          <BankDetailsModal
            setBankInfoModal={setBankInfoModal}
            BankInfoModal={BankInfoModal}
          />
        )}
      </div>
      {recurrenceOpen && (
        <RecurrenceModal
          title={i18n.t(`organizer.event.recurrenceEditModel.title`)}
          onClickOK={() => {
            setRecurrenceEditAll("true");
            setRecurrenceOpen(false);
          }}
          onClickCancle={() => {
            setRecurrenceEditAll("false");
            setRecurrenceOpen(false);
          }}
          show={recurrenceOpen}
        />
      )}

      <SuccessfullyModal
        show={show}
        setshow={setshow}
        title={
          viewId && !duplicate
            ? i18n.t(`organizer.event.eventForm.successfullyModal.updateTitle`)
            : i18n.t(`organizer.event.eventForm.successfullyModal.createTitle`)
        }
        description={
          viewId && !duplicate
            ? ""
            : i18n.t(`organizer.event.eventForm.successfullyModal.description`)
        }
        SolidBTNText={i18n.t(
          `organizer.event.eventForm.successfullyModal.backBTN`
        )}
        url={"/event-management/"}
      />
      {activePreview && (
        <OrgPreviewModel
          recurringEventId={eventData?.recurringEventId || ""}
          languageName={languageName}
          setshow={setshow}
          PreviewModal={activePreview}
          setPreviewModal={setActivePreview}
          ref={ref}
          duplicate={duplicate}
        />
      )}
    </>
  );
};

export default EventForm;
