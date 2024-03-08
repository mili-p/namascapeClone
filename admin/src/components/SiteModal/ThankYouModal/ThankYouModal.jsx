import React from 'react'
import '../SiteModal.scss'
import { Link } from 'react-router-dom'

const ThankYouModal = ({title,show, setshow,url,SolidBTNText,description}) => {
  const CancelModal = () =>{
    setshow(false)
    document.body.classList.remove('open-modal')
  }
  return (
    <>
        <div className={`site-modal successfully-modal  ${show===true? 'show' : ''}`}>
            <div className='modal-boday'>
                <img src="/assets/images/successfully-icon.svg" alt='successfully' />
                <h2>Thank You</h2>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry is standard dummy text ever since the 1500s.</p>
                <div className='flex items-center justify-center modal-btn-group'>
                    <Link href={url} className='solid-btn modal-btn' onClick={CancelModal}>Go Back</Link>
                </div>
            </div>
        </div>
    </>
  )
}

export default ThankYouModal