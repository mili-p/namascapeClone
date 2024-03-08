import H2 from "@/app/components/common/h2";
import React from "react";
import BankDetailsForm from "./BankDetailsForm";

const page = () => {
  return (
    <div className="bank-details-page account-common-details">
      {/* <div className="account-title flex items-center justify-between flex-wrap">
        <H2>Bank Details</H2> */}
        {/* <button type="button" className="solid-btn dashboard-form-btn">
          Save
        </button> */}
      {/* </div> */}
      <BankDetailsForm/>
      {/* <form action="">
        <div className="form-content mt-32">
          <div className="input-group w-full">
            <label htmlFor="bank-name">Bank Name</label>
            <input type="text" id="bank-name" name="bank-name" />
          </div>
          <div className="input-group w-full">
            <label htmlFor="bank-holder-name">Bank Holder’s Name</label>
            <input type="text" id="bank-holder-name" name="bank-holder-name" />
          </div>
          <div className="input-group w-full">
            <label htmlFor="bank-branch-name">Bank Branch Name</label>
            <input type="text" id="bank-branch-name" name="bank-branch-name" />
          </div>
          <div className="input-group w-full">
            <label htmlFor="iban-number">IBAN Number</label>
            <input type="text" id="iban-number" name="iban-number" />
          </div>
          <div className="input-group w-full">
            <label htmlFor="offer-link">Offer Link</label>
            <input type="text" id="offer-link" name="offer-link" />
          </div>
          <button type="button" className="add-link-btn border-btn">+Add Offer Link</button>
        </div>
      </form> */}
    </div>
  );
};

export default page;
