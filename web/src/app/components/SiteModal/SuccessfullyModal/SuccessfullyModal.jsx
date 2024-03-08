import React from "react";
import "../SiteModal.scss";
import H2 from "../../common/h2";
import Image from "next/image";
import Link from "next/link";

const SuccessfullyModal = ({
  title,show, setshow,url,SolidBTNText,description
}) => {
  const CancelModal = () =>{
    setshow(false)
    document.body.classList.remove('open-modal')
  }
  return (
    <>
      <div
        className={`site-modal successfully-modal  ${
          show === true ? "show" : ""
        }`}
      >
        <div className="modal-boday">
          <Image
            src="/assets/images/successfully-gif.gif"
            alt="successfully"
            width={130}
            height={130}
          />
          <H2>{title}</H2>
          <p>{description}</p>
          <div className="flex items-center justify-center modal-btn-group">
            <Link
              href={url}
              className="solid-btn modal-btn"
              onClick={CancelModal}
            >
              {SolidBTNText}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessfullyModal;
