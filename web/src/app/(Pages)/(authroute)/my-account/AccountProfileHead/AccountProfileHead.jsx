"use client";
import React from "react";
import "./AccountProfileHead.scss";
import Image from "next/image";
import H1 from "@/app/components/common/h1";
import { useTranslation } from "react-i18next";
import Link from "next/link";

const AccountProfileHead = ({ userProfileData }) => {
  const viewData = userProfileData?.data?.userData;
  const purchaseCount = userProfileData?.meta?.totalCount
  const { i18n } = useTranslation();
  return (
    <>
      <section className="my-account-head pt-120">
        <div className="user-profile-wrapper">
          <Image
            src={viewData?.profileImage}
            alt="profile-image"
            width={240}
            height={240}
          />
          {/* <label
                        for="uploadimage"
                        className="flex items-center justify-center icon-group"
                    >
                        <input type="file" id="uploadimage" />
                        <i className="icon-edit" for="uploadimage"></i>
                    </label> */}
        </div>
        <H1 className="h2 title">
          {viewData?.firstName} {viewData?.lastName}
        </H1>
        {viewData?.bio && <p>{viewData?.bio}</p>}
        <ul className="flex items-center flex-wrap justify-center gap-2 sm:gap-4 lg:gap-6 3xl:gap-8 acount-about-list">
          {/* {AcountAboutList?.map((list, i) => {
                        return (
                            <>
                                <li key={i} className="flex items-center gap-1">
                                    {list.icon}
                                    {list.Title}
                                </li>
                            </>
                        )
                    })} */}

          {userProfileData?.data?.userData?.city?.name && (
            <li className="flex items-center gap-1">
              <i className="icon-location"></i>
              {userProfileData?.data?.userData?.city?.name}
            </li>
          )}
          {userProfileData?.data?.userData?.age > 0 && (
            <li className="flex items-center gap-1">
              <i className="icon-event-management"></i>
              {i18n.t(`myAccount.attendedEvent.age`)}{" "}
              {userProfileData?.data?.userData?.age}
            </li>
          )}
          {viewData?.socialMediaLink && (
            <>
              <li>
                <Link
                  target="_blank"
                  href={viewData?.socialMediaLink}
                  className="flex items-center gap-1"
                >
                  <i className="icon-language"></i>
                  {i18n.t(`myAccount.attendedEvent.socialMediaLink`)}
                </Link>
              </li>
            </>
          )}
          <li className="flex items-center gap-1">
            <i className="icon-star"></i>
            <span className="badge"> {purchaseCount}  {i18n.t(`myAccount.attendedEvent.header`)}</span>
            {/* {i18n.t(`myAccount.attendedEvent.header`)}  */}
            
          </li>
        </ul>
        {/* <p>
                    {viewData?.bio} 
                </p> */}
      </section>
    </>
  );
};

export default AccountProfileHead;
