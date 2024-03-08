import React from 'react'
import '../SiteModal.scss'
import H2 from '../../common/h2'
import Link from 'next/link'
import Image from 'next/image'

const ErrorModal = ({title,show, setshow,url="/",SolidBTNText,description}) => {
  const CancelModal = () =>{
    setshow(false)
    document.body.classList.remove('open-modal')
  }
  return (
    <>
        <div className={`site-modal successfully-modal  ${show===true? 'show' : ''}`}>
            <div className='modal-boday'>
                <Image src="/assets/images/icon-error.svg" alt='icon-error' width={130} height={130}/>
                <H2>{description ? description : 'Error'}</H2>
                <div className='flex items-center justify-center modal-btn-group'>
                    <Link href={url} className='solid-btn modal-btn' onClick={CancelModal}>Go Back</Link>
                </div>
            </div>
        </div>
    </>
  )
}

export default ErrorModal