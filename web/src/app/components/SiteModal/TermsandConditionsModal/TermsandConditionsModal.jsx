"use client"
import React from 'react'
import H2 from '../../common/h2'

const TermsandConditionsModal = ({title,description,show,CancelModal,cancelBtn}) => {
  return (
    <>
    <div
    className={`site-modal conditions-modal  ${
      show === true ? "show" : ""
    }`}
  >
    <div className="modal-boday">
      
      <H2>{title}</H2>
      <i className='icon-cross' onClick={CancelModal}></i>
      <div className='conditions-content-wrapper' dangerouslySetInnerHTML={{__html:description}}></div>
      <div className='flex items-center justify-center modal-btn-group'>
        {/* <div className='solid-btn modal-btn' >{cancelBtn}</div> */}
      </div>
    </div>
  </div>
</>
  )
}

export default TermsandConditionsModal