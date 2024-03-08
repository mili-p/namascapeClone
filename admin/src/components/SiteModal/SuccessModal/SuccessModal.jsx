import React from 'react'
import '../SiteModal.scss'
import { Link } from 'react-router-dom'

const SuccessModal = ({title,show, setshow,url,SolidBTNText,description}) => {
  const CancelModal = () =>{
    setshow(false)
    document.body.classList.remove('open-modal')
  }
  return (
    <>
        <div className={`site-modal successfully-modal  ${show===true? 'show' : ''}`}>
            <div className='modal-boday'>
                <img src="/assets/images/successfully-icon.svg" alt='successfully'/>
                <h2>success</h2>
                <div className='flex items-center justify-center modal-btn-group'>
                    <Link href={url} className='solid-btn modal-btn' onClick={CancelModal}>Go Back</Link>
                </div>
            </div>
        </div>
    </>
  )
}

export default SuccessModal