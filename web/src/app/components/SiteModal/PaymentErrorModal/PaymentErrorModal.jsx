"use client"
import React from "react";
import '../SiteModal.scss'
import H2 from '../../common/h2'
import Image from 'next/image'
import { useTranslation } from "react-i18next";

const PaymentErrorModal = ({ show, setshow, title ,CancelModal}) => {
  const {i18n} = useTranslation()

  return (
    <div
      className={`site-modal successfully-modal  ${
        show === true ? "show" : ""
      }`}
    >
      <div className="modal-boday">
        <Image
          src="/assets/images/icon-error.svg"
          alt="icon-error"
          width={130}
          height={130}
        />
        <H2>{title}</H2>
        <div className="flex items-center justify-center modal-btn-group">
          <button className="solid-btn modal-btn" onClick={CancelModal}>
            {i18n.t(`payment.backBtn`)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentErrorModal;
