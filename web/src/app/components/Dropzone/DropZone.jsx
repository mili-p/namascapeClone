"use client";
import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { sweetalert } from "../common/Common";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
const DropZone = ({
  control,
  setValue,
  clearErrors,
  watch,
  register,
  errors,
  setDeleteImageArray,
}) => {

const {i18n} = useTranslation()
  const onImageDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      // const array = etc[0];
      // const Final = array.map((e) => e.file);
      // const FilterArray = Final.slice(0, 5);
      // const allImages = [...watch("upload-addImage"), ...acceptedFiles];

      // console.log(
      //   acceptedFiles,
      //   "ACCEPETETTET",
      //   Final.slice(0, 5),
      //   allImages?.length,
      //   FilterArray.length,
      //   allImages
      // );
      // const modify = etc[0].map((list) => {
      //   if (list.errors.some((e) => e.code !== "file-invalid-type")) {
      //     return list;
      //   }
      // });
      // const FilterArray = modify.slice(0, 5);
      // setImageList(acceptedFiles);

      // if ([...watch("upload-addImage"), ...acceptedFiles]?.length < 6) {
      //   // setValue("upload-addImage", allImages?.length > 0 ? allImages : FilterArray);
      //   setValue("upload-addImage", [
      //     ...watch("upload-addImage"),
      //     ...acceptedFiles,
      //   ]);
      //   clearErrors("upload");
      // }

      rejectedFiles.map((e) => {
        if (e.errors.some((e) => e.code === "file-invalid-type")) {
          return sweetalert({
            message: i18n.t('organizer.event.eventForm.inputs.Upload.validationSweetAlert.filetype'),
            type: "error",
          });
        }
        if (e.errors.some((e) => e.code === "too-many-files")) {
          return sweetalert({
            message: i18n.t('organizer.event.eventForm.inputs.Upload.validationSweetAlert.maxImg'),
            type: "error",
          });
        }
        if (e.errors.some((e) => e.code === "file-too-large")) {
          return sweetalert({
            message: i18n.t('organizer.event.eventForm.inputs.Upload.validationSweetAlert.imgSize'),
            type: "error",
          });
        }
      });
      if ([...watch("upload.addImage"), ...acceptedFiles]?.length > 5) {
        sweetalert({
          message:  i18n.t('organizer.event.eventForm.inputs.Upload.validationSweetAlert.allowImg'),
          type: "error",
        });
      } else {
        setValue("upload.addImage", [
          ...watch("upload.addImage"),
          ...acceptedFiles,
        ]);
        clearErrors("upload");
      }
    },
    [clearErrors, setValue, watch]
  );

  const onVideoDrop = (acceptedFiles, rejectedFiles) => {
    rejectedFiles.map((e) => {
      if (e.errors.some((e) => e.code === "file-invalid-type")) {
        return sweetalert({
          message:i18n.t('organizer.event.eventForm.inputs.Upload.validationSweetAlert.videotype'),
          type: "error",
        });
      }
      if (e.errors.some((e) => e.code === "too-many-files")) {
        return sweetalert({
          message:i18n.t('organizer.event.eventForm.inputs.Upload.validationSweetAlert.maxVideo'),
          type: "error",
        });
      }
      if (e.errors.some((e) => e.code === "file-too-large")) {
        return sweetalert({
          message:i18n.t('organizer.event.eventForm.inputs.Upload.validationSweetAlert.videoSize'),
          type: "error",
        });
      }
    });
    // Handle video files
   
    if (acceptedFiles?.length > 0) {
      // Check if the total number of videos is already 1
      if (watch("upload.addVideo").length >= 1) {
        sweetalert({
          message: i18n.t('organizer.event.eventForm.inputs.Upload.validationSweetAlert.maxVideo'),
          type: "error",
        });
      } else {
        // If not, update the "upload.addVideo" value
        setValue("upload.addVideo", acceptedFiles);
        clearErrors("upload");
      }
    }


    // if (rejectedFiles?.length > 0) {
    //   sweetalert({
    //     message: rejectedFiles?.[0]?.errors?.[0]?.message,
    //     type: "error",
    //   });
    // }
  };

  const imageDropzone = useDropzone({
    accept: {
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
      "image/png": [".png"],
    },
    onDrop: onImageDrop,
    maxFiles: 5,
    multiple: true,
    maxSize: 5 * 1024 * 1024,
  });

  const videoDropzone = useDropzone({
    accept: {
      "video/mp4": [".mp4"],
      "video/mkv": [".mkv"],
    },
    onDrop: onVideoDrop,
    maxFiles: 1,
    maxSize: 100 * 1024 * 1024, // 100 MB
  });

  const {
    tabIndex: imageTabIndex,
    style: imageStyle,
    ...finalProps
  } = imageDropzone.getInputProps();
  const {
    tabIndex: videoTabIndex,
    style: videoStyle,
    ...finalVideoProps
  } = videoDropzone.getInputProps();

  return (
    <>
      <div className="input-group w-full ">
        <label htmlFor="upload-addImage">{i18n.t(`organizer.event.eventForm.inputs.Upload.titleImage`)}</label>
        <Controller
          name="upload.addImage"
          control={control}
          render={({ field: { onChange, value } }) => (
            <>
              <div className="img-or-video-box-wrapper">
                <input
                  name="upload-addImage"
                  id="upload-addImage"
                  type="file"
                  accept="image*"
                  {...finalProps}
                />
                <div
                  className="event-image-box flex items-center justify-center flex-col"
                  {...imageDropzone.getRootProps()}
                >
                  <i className="icon-plus"></i>
                  <span>{i18n.t(`organizer.event.eventForm.inputs.Upload.placeholderImage`)}</span>
                </div>
              </div>
              <p className="note mt-2 mb-0">
                <span className="red">{i18n.t(`organizer.event.eventForm.inputs.Upload.note`)} :</span> {i18n.t(`organizer.event.eventForm.inputs.Upload.imgNote`)}
              </p>
              {errors?.upload?.root?.message && (
                <span className="error-msg">
                  {errors?.upload?.root?.message}
                </span>
              )}
              <ul className="event-images uploaded-event-images flex flex-wrap xl:gap-4">
                {watch("upload.addImage")?.length > 0 &&
                  watch("upload.addImage")?.map((image, index) => (
                    <>
                      <li key={index}>
                        <Image
                          src={
                            typeof image === "string"
                              ? image
                              : URL.createObjectURL(image)
                          }
                          width={200}
                          height={200}
                        />

                        <i
                          className="icon-cross delete-icon-btn"
                          onClick={() => {
                            const updatedImages = [...watch("upload.addImage")];
                            const removedImage = updatedImages[index];
                            if (typeof removedImage === "string") {
                              setDeleteImageArray((e) => [...e, removedImage]);
                            }
                            updatedImages.splice(index, 1);
                            setValue("upload.addImage", updatedImages);
                          }}
                        ></i>
                      </li>
                    </>
                  ))}
              </ul>
            </>
          )}
        />
      </div>
      <div className="input-group w-full mb-0">
        <label htmlFor="upload-addVideo">{i18n.t(`organizer.event.eventForm.inputs.Upload.titleVideo`)}</label>
        <Controller
          name="upload.addVideo"
          control={control}
          render={({ field: { onChange, value } }) => (
            <>
            <div className="img-or-video-box-wrapper">
              <input
                name="upload-addVideo"
                type="file"
                id="upload-addVideo"
                {...finalVideoProps}
                // {...register("upload.addVideo")}
              />
              <div
                className="event-image-box flex items-center justify-center flex-col"
                {...videoDropzone.getRootProps()}
              >
                <i className="icon-plus"></i>
                <span>{i18n.t(`organizer.event.eventForm.inputs.Upload.placeholderVideo`)}</span>
              </div>
            </div>
            <p className="note mt-2 m-0">
              <span className="red">{i18n.t(`organizer.event.eventForm.inputs.Upload.note`)} :</span> {i18n.t(`organizer.event.eventForm.inputs.Upload.videoNote`)}
            </p>
            <ul className="event-images uploaded-event-images flex flex-wrap xl:gap-4">
              {watch("upload.addVideo")?.length > 0 &&
                watch("upload.addVideo")?.map((video, index) => (
                  <>
                    <li>
                      <div className="event-video-box event-image-box">
                        <i
                          className="icon-cross delete-icon-btn"
                          onClick={() => {
                            const updatedVideo = [...watch("upload.addVideo")];
                            const removedVideo = updatedVideo[index];
                            if (typeof removedVideo === "string") {
                              setDeleteImageArray((e) => [...e, removedVideo]);
                            }
                            updatedVideo.splice(index, 1);
                            setValue("upload.addVideo", updatedVideo);
                          }}
                        ></i>
                        <video controls key={index}>
                          <source
                            src={
                              typeof video === "string"
                                ? video
                                : URL.createObjectURL(video)
                            }
                          ></source>
                        </video>
                      </div>
                    </li>
                  </>
                ))}
            </ul>
            </>
          )}
        />
      </div>
    </>
  );
};

export default DropZone;
