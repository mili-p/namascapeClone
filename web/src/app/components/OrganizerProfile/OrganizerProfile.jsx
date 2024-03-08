"use client";
import React, { useEffect, useState } from "react";
import "./OrganizerProfile.scss";
import H1 from "../common/h1";
import Image from "next/image";
import H3 from "../common/h3";
import H4 from "../common/h4";
import { useDispatch, useSelector } from "react-redux";
import { responseOrganizerProfileTab } from "../../../../redux/slices/User/organizerprofile";
import { useTranslation } from "react-i18next";
import Skeleton from "@/app/components/Skeleton/Skeleton";
import TermsandConditionsModal from "@/app/components/SiteModal/TermsandConditionsModal/TermsandConditionsModal";

const OrganizerProfile = ({ activeTab, ProfileData, isLoading }) => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const [show, setShow] = useState(false);
  const { viewDataTandC } = useSelector((e) => e?.TermsandConditionsUserSlice);

  const TabActive = (item) => {
    dispatch(responseOrganizerProfileTab(item));
    // setActiveTab(item)
  };

  return (
    <section className="organizer-profile-wrap pt-120">
      <div className="container">
        <div className="title-wrap">
          <H1 className="h2 title">
            {i18n.t(`useEvent.organizerProfile.organizerprofile`)}
          </H1>
        </div>
        <div className="profile-box">
          <div className="md:flex md:items-center gap-5 xl:gap-8">
            <div className="image-box md:mb-0">
              {isLoading ? (
                <Skeleton width="100%" height="100%" />
              ) : (
                <Image
                  src={ProfileData?.profileImage}
                  alt="organizer image"
                  title="organizer image"
                  width={240}
                  height={240}
                />
              )}
            </div>

            {isLoading ? (
              <>
                <div className="profile-content skeleton">
                  <Skeleton width="50%" height={25} className="mb-5" />
                  <Skeleton
                    width="80%"
                    height={15}
                    count={3}
                    className="description mb-3"
                  />
                  <Skeleton width="20%" height={25} className="mt-3" />
                </div>
              </>
            ) : (
              <>
                <div className="profile-content">
                  <H3>
                    {ProfileData?.firstName} {ProfileData?.lastName}
                  </H3>
                  {ProfileData?.bio && <p>{ProfileData?.bio}</p>}
                  {ProfileData?.instagramLink && ProfileData?.websiteLink && (
                    <div className="flex items-center justify-center md:justify-start gap-5">
                      {ProfileData?.allowInstagramLink &&
                        ProfileData?.instagramLink && (
                          <a
                            href={ProfileData?.instagramLink}
                            target="_blank"
                            className="social-link"
                          >
                            <i className="icon-instagram-bg"></i>Instagram
                          </a>
                        )}
                      {ProfileData?.allowWebsiteLink &&
                        ProfileData?.websiteLink && (
                          <a
                            href={ProfileData?.websiteLink}
                            target="_blank"
                            className="social-link"
                          >
                            <i className="icon-website-bg"></i>Website
                          </a>
                        )}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
          {viewDataTandC?.termsAndConditions && (
              <span
              className="flex justify-center md:inline-flex items-center gap-1 terms-conditions-btn"
              onClick={() => setShow(true)}
            >
              {" "}
              <i className="icon-terms-condition"></i>{i18n.t(`organizer.termsandconditions.heading`)}
            </span>
          )}
        
          <div className="button-wrap sm:flex sm:items-center sm:gap-5 xl:gap-8">
            <H4 className="w-full">
              <span
                className={`solid-btn w-full mb-4 sm:mb-0 cursor-pointer ${
                  activeTab === 1 ? "active" : ""
                }`}
                onClick={() => TabActive(1)}
              >
                {i18n.t(`useEvent.organizerProfile.hostedEvent`)}
              </span>
            </H4>
            <H4 className="w-full">
              <span
                className={`solid-btn upcoming-btn w-full cursor-pointer ${
                  activeTab === 2 ? "active" : ""
                }`}
                onClick={() => TabActive(2)}
              >
                {i18n.t(`useEvent.organizerProfile.upComingEvent`)}
              </span>
            </H4>
          </div>
        </div>
      </div>
      {/* {console.log(tandcData,"tandcData")} */}
      {show && (
        <TermsandConditionsModal
          show={show}
          title={i18n.t(`organizer.termsandconditions.heading`)}
          description={viewDataTandC?.termsAndConditions}
          CancelModal={() => setShow(false)}
          cancelBtn= {i18n.t(`settings.deleteModal.cancleBtn`)}
        />
      )}
    </section>
  );
};

export default OrganizerProfile;
