"use client";
import H3 from "@/app/components/common/h3";
import H4 from "@/app/components/common/h4";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  contactAdminThunk,
  viewBankDetailsData,
} from "../../../../../redux/Thunks/Account/OrganizerAccount/myaccount.thunk";
import { asyncViewprofile } from "../../../../../redux/Thunks/Account/viewprofile.thunk";
import { Cinzel } from "next/font/google";
const cinzel = Cinzel({ subsets: ["latin"], weight: ["700"] });

const MyAccountViewData = () => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  /////// api calling for user details ///////
  useEffect(() => {
    dispatch(asyncViewprofile());
  }, []);
  const { userDetail } = useSelector((action) => action.viewprofile);
  const viewOrgData = userDetail?.data;
  ////// end api calling for user details /////

  //////// DOB Format Function ///////

  const convertTimestampToDate = (timestamp) => {
    const date = new Date(parseInt(timestamp)); // Convert timestamp to Date object
    const day = String(date.getDate()).padStart(2, "0"); // Get day component
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month component
    const year = date.getFullYear(); // Get year component
    // 2003-11-22
    // Return the date in dd/mm/yyyy format
    return `${day}/${month}/${year}`;
  };

  const timestamp = viewOrgData?.dob;

  const formatDate = (timestamp) => {
    const dob = new Date(timestamp);
    // Extract day, month, and year
    const day = dob.getDate();
    const month = dob.getMonth() + 1;
    const year = dob.getFullYear();
    // Ensure leading zeros if needed
    const formattedDay = String(day).padStart(2, "0");
    const formattedMonth = String(month).padStart(2, "0");
    // Create the formatted date string
    const formattedDOB = `${formattedDay}/${formattedMonth}/${year}`;
    return formattedDOB;
  };
  const formattedDate = convertTimestampToDate(timestamp);
  //////// End DOB Format Function ///////

  ////// api calling for view bank details //////
  const { viewBankData, contctAdmin } = useSelector(
    (action) => action.myaccount
  );
  const viewBankDataList = viewBankData?.data;
  // console.log(viewBankDataList, 'viewBankDataList')
  useEffect(() => {
    dispatch(viewBankDetailsData());
  }, []);
  ////// end api calling for bank details ////

  ///// api calling for contact admin details //////
  const contactAdminData = contctAdmin?.data;
  useEffect(() => {
    dispatch(contactAdminThunk());
  }, []);
  //// end api calling for contact admin details ////

  return (
    <>
      <div className="my-account-content">
        <div className="bg-white md:flex md:items-start user-info mt-32">
          <div className="users-image flex items-start justify-center">
            <Image
              src={viewOrgData?.profileImage}
              width={160}
              height={160}
              alt="Picture of the author"
            />
          </div>
          <div className="users-content">
            <H3>
              {viewOrgData?.firstName} {viewOrgData?.lastName}
            </H3>
            <div className="email">{viewOrgData?.email}</div>
            {viewOrgData?.mobileNumber && (
              <div className="birthdate flex items-center">
                <i className="icon-call"></i>
                <span>{viewOrgData?.mobileNumber}</span>
              </div>
            )}
            {viewOrgData?.dob !== "" && (
              <div className="birthdate flex items-center">
                <i className="icon-calendar"></i>
                {/* <span> {viewOrgData?.dob === "" ? '10/11/1994' : viewOrgData?.dob}</span> */}
                <span>{formattedDate}</span>
              </div>
            )}

            <p>
              {viewOrgData?.bio === "" ? "" : viewOrgData?.bio}
              {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. */}
            </p>
            <ul className="social-links flex items-center flex-wrap">
              {viewOrgData?.instagramLink && (
                <li>
                  <a
                    className="flex items-center"
                    href={viewOrgData?.instagramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="icon-instagram-bg"></i>
                    <span>{viewOrgData?.instagramLink}</span>
                  </a>
                </li>
              )}
              {viewOrgData?.websiteLink && (
                <li>
                  <a
                    href={viewOrgData?.websiteLink}
                    className="flex items-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="icon-website-bg"></i>
                    <span>{viewOrgData?.websiteLink}</span>
                  </a>
                </li>
              )}
            </ul>
          </div>
          <Link href="/myaccount/personal-details/">
            <button type="button" className="border-btn account-edit-btn">
              <i className="icon-edit"></i>
              {i18n.t(`organizer.myaccount.myccountView.userDetails.btnText`)}
            </button>
          </Link>
        </div>
        <div className="bg-white common-content bank-details mt-32">
          <div className="wrap-title flex items-center justify-between flex-wrap">
            <H3 className="content-title">
              {i18n.t(`organizer.myaccount.myccountView.bankdetails.title`)}
            </H3>
            <Link href="/myaccount/bank-details/">
              <button type="button" className="border-btn account-edit-btn">
                <i className="icon-edit"></i>
                {viewBankDataList
                  ? i18n.t(
                      `organizer.myaccount.myccountView.bankdetails.editBankBtn`
                    )
                  : i18n.t(
                      `organizer.myaccount.myccountView.bankdetails.addBankBtn`
                    )}
                {/* Edit Bank Details */}
              </button>
            </Link>
          </div>
          {viewBankDataList ? (
            <ul className="user-content-list">
              <li>
                <div className="label-name">
                  {i18n.t(
                    `organizer.myaccount.myccountView.bankdetails.viewCardData.bankname`
                  )}
                </div>
                <H4>{viewBankDataList?.bankName}</H4>
              </li>
              <li>
                <div className="label-name">
                  {i18n.t(
                    `organizer.myaccount.myccountView.bankdetails.viewCardData.bankholdername`
                  )}
                </div>
                <H4>{viewBankDataList?.bankHolderName}</H4>
              </li>
              <li>
                <div className="label-name">
                  {i18n.t(
                    `organizer.myaccount.myccountView.bankdetails.viewCardData.bankbranchname`
                  )}
                </div>
                <H4>{viewBankDataList?.branchName}</H4>
              </li>
              {viewBankDataList?.plz && viewBankDataList?.city && (
                <li>
                  <div className="label-name">
                    {i18n.t(
                      `organizer.myaccount.myccountView.bankdetails.viewCardData.plz`
                    )}
                  </div>
                  {viewBankDataList?.plz && viewBankDataList?.city && (
                    <H4>
                      {viewBankDataList?.plz} - {viewBankDataList?.city}
                    </H4>
                  )}
                </li>
              )}
              <li>
                <div className="label-name">
                  {i18n.t(
                    `organizer.myaccount.myccountView.bankdetails.viewCardData.IBANnumber`
                  )}
                </div>
                <H4>{viewBankDataList?.IBANNumber}</H4>
              </li>

              <li>
                <div className="label-name">
                  {i18n.t(
                    `organizer.myaccount.myccountView.bankdetails.viewCardData.Swift/BICnumber`
                  )}
                </div>
                <H4>{viewBankDataList?.swiftBIC}</H4>
              </li>
              <li>
                <div className="label-name">
                  {i18n.t(
                    `organizer.myaccount.bankdetails.form.inputs.country.label2`
                  )}
                </div>
                <H4>{viewBankDataList?.country?.name}</H4>
              </li>

              {/* {(viewBankDataList?.offerLink?.length > 0) &&
                                <li>
                                    <div className="label-name">Offer Link</div>
                                    // {viewBankDataList?.offerLink?.map((ofrlinkData,i)=>{
                                    //         return <H4 key={i}>{ofrlinkData}</H4>
                                    // })}
                                    <H4>
                                        {viewBankDataList?.offerLink?.join(
                                            ' , '
                                        )}
                                    </H4>
                                </li>} */}
            </ul>
          ) : (
            <>
              <p>
                {i18n.t(
                  `organizer.myaccount.myccountView.bankdetails.noDataFound`
                )}
              </p>
            </>
          )}
        </div>
        <div className="bg-white common-content contact-admin mt-32">
          <div className="wrap-title flex items-center justify-between flex-wrap">
            <H3 className="content-title">
              {i18n.t(`organizer.myaccount.myccountView.contactAdmin.title`)}
            </H3>
          </div>
          <ul className="user-content-list">
            <li>
              <div className="label-name">
                {i18n.t(
                  `organizer.myaccount.myccountView.contactAdmin.emailAdd`
                )}
              </div>
              {/* <H4 className="email"> */}
              <a
                href={`mailto:${contactAdminData?.email}`}
                className={cinzel.className}
              >
                {contactAdminData?.email}
              </a>
              {/* </H4> */}
            </li>
            <li>
              <div className="label-name">
                {i18n.t(
                  `organizer.myaccount.myccountView.contactAdmin.contactNo`
                )}
              </div>
              {/* <H4> */}
              <a
                href={`tel: ${contactAdminData?.country?.dialingCode} ${contactAdminData?.phone}`}
                className={cinzel.className}
              >
                {/* +1 (551) 445 9532 */}
                {contactAdminData?.country?.dialingCode}{" "}
                {contactAdminData?.phone}
              </a>
              {/* </H4> */}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default MyAccountViewData;
