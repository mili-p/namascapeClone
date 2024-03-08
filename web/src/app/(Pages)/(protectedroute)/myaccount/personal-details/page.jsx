import H2 from "@/app/components/common/h2";
import React from "react";
import PersonalDetailsForm from "./PersonalDetailsForm";

const page = () => {
  return (
    <div className="personal-details-page account-common-details">
      {/* <div className="account-title flex items-center justify-between flex-wrap">
        <H2>Personal Details</H2> */}
        {/* <button type="button" className="solid-btn dashboard-form-btn">
          Save
        </button> */}
      {/* </div> */}
      <PersonalDetailsForm/>
      {/* <form action="">
        <div className="user-profile flex items-center justify-center flex-col">
          <div className="users-image">
            <Image
              src="/assets/images/myaccount-user-image.png"
              width={160}
              height={160}
              alt="Picture of the author"
            />
          </div>
          <button type="button" className="border-btn edit-profile mt-32">
            <input type="file" accept="image*" />
            <i className="icon-edit"></i>Edit Profile
          </button>
        </div>
        <div className="form-content mt-32">
          <div className="sm:flex sm:items-center sm:gap-4 2xl:gap-5">
            <div className="input-group w-full">
              <label htmlFor="first-name">First Name</label>
              <input type="text" id="first-name" name="first-name" />
            </div>
            <div className="input-group w-full">
              <label htmlFor="last-name">Last Name</label>
              <input type="text" id="last-name" name="last-name" />
            </div>
          </div>
          <div className="input-group w-full">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" />
          </div>
          <div className="input-group icon-input w-full">
            <label htmlFor="birth-date">Date of Birth</label>
            <input type="date" id="birth-date" name="birth-date" />
          </div>
          <div className="input-group w-full">
            <label htmlFor="bio">Bio</label>
            <textarea name="Description" id="bio" rows="3"></textarea>
          </div>
          <div className="input-group w-full">
            <label htmlFor="insta-link">Instagram Links</label>
            <input type="text" id="insta-link" name="insta-link" />
          </div>
          <div className="input-group w-full mb-0">
            <label htmlFor="website-links">Website Links</label>
            <input type="text" id="website-links" name="website-links" />
          </div>
        </div>
        <button type="button" className="solid-btn dashboard-form-btn">
          Save
        </button>
      </form> */}
    </div>
  );
};

export default page;
