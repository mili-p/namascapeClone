"use client";
import React, { forwardRef, useEffect, useState } from "react";
import PreviewDetail from "../innerComponents/PreviewDetail/PreviewDetail";
import "./OrgPreviewModel.scss";
import PreviewAbout from "../innerComponents/PreviewAbout/PreviewAbout";
import { useDispatch, useSelector } from "react-redux";
import { asyncViewprofile } from "../../../../../../../redux//Thunks/Account/viewprofile.thunk";
import { useTranslation } from "react-i18next";
import LoaderBtn from "@/app/components/common/LoaderBtn";
import {
  addEventThunk,
  duplicateEventThunk,
} from "../../../../../../../redux/Thunks/Organizer/EventForm/event.thunk";
import { removeEventData } from "../../../../../../../redux/slices/Organizer/EventManagement/EventManagementSlice";
import RecurrenceModal from '@/app/components/SiteModal/RecurrenceModal/RecurrenceModal'
const OrgPreviewModel = (
  {
    setPreviewModal,
    PreviewModal,
    duplicate,
    setshow,
    languageName,
    recurringEventId,
  },
  ref
) => {
  const { i18n } = useTranslation();
  const [recurrenceEditAll, setRecurrenceEditAll] = useState("");
  const [recurrenceOpen,setRecurrenceOpen] = useState(false)
  const { isLoading } = useSelector((e) => e.EventFormSlice);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncViewprofile());
  }, []);

  useEffect(() => {
    if (recurrenceEditAll) {
      onSubmit();
    }
  }, [recurrenceEditAll]);

  console.log(ref?.current, "ref?.current");
  const onSubmit = () => {
    const rawFormData = new FormData();
    for (const key in ref?.current) {
      // if (key !== "media") {
      //   rawFormData.append(key, ref?.current[key]);
      // }
      if (Array.isArray(ref?.current[key])) {
        if (key === "media") {
          ref?.current?.[key]
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
          rawFormData.append(key, JSON.stringify(ref?.current[key]));
        }
      } else {
        if (key === "city") {
          if (ref?.current[key]?._id) {
            rawFormData.append(key, ref?.current[key]?._id);
          } else {
            rawFormData.append(key, ref?.current[key]?.cityId);
          }
        } else {
          rawFormData.append(key, ref?.current[key]);
        }
      }
    }
    if (recurringEventId) {
      rawFormData.append(
        "editAll",
        recurringEventId ? (recurrenceEditAll === "true" ? true : false) : false
      );
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
      <div className={`event-preview ${PreviewModal === true ? "show" : ""}`}>
        {/* <span
        className="preview-close"
        onClick={() => {
          setPreviewModal(false);
        }}
      ></span> */}
        <div className="preview-boday">
          <div className="flex items-center flex-wrap gap-4 modal-btn-group">
            <button
              type="submit"
              className="border-btn  modal-btn"
              onClick={() => setPreviewModal(false)}
              // disabled={disable}
            >
              {i18n.t(`organizer.event.eventFormHeader.cancelBtn`)}
            </button>
            {!!isLoading ? (
              <button
                type="button"
                className="solid-btn modal-btn"

                // disabled={isLoading}
              >
                <LoaderBtn />
              </button>
            ) : (
              <>
                {recurringEventId ? (
                  <button
                    type="button"
                    className="solid-btn modal-btn"
                    onClick={() => {
                      setRecurrenceOpen(true)
                    }}
                    // disabled={disable}
                  >
                    {i18n.t(`organizer.event.eventFormHeader.saveButton`)}
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="solid-btn modal-btn"
                    onClick={onSubmit}
                    // disabled={disable}
                  >
                    {i18n.t(`organizer.event.eventFormHeader.saveButton`)}
                  </button>
                )}
              </>
            )}
          </div>
          <PreviewDetail ref={ref} languageName={languageName} />
          <PreviewAbout ref={ref} />
        </div>
      </div>
      {recurrenceOpen && (
        <RecurrenceModal 
          title={i18n.t(`organizer.event.recurrenceEditModel.title`)}
          onClickOK={()=> {
            setRecurrenceEditAll("true")
            setRecurrenceOpen(false)
          }}
          onClickCancle = {()=>{
            setRecurrenceEditAll("false")
            setRecurrenceOpen(false)
          }}
          show={recurrenceOpen}
          SolidBTNText={i18n.t(`payment.model.AttendeesModal.SolidBTNText`)}
        />
      )}
    </>
  );
};

export default forwardRef(OrgPreviewModel);
