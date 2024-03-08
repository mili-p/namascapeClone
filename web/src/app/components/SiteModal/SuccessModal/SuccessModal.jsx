import React from 'react'
import '../SiteModal.scss'
import H2 from '../../common/h2'
import Image from 'next/image'

const SuccessModal = ({title,show,SolidBTNText,description, CancelModal}) => {
  
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
            <button
              className="solid-btn modal-btn"
              onClick={CancelModal}
            >
              {SolidBTNText}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default SuccessModal