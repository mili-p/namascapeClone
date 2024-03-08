import React from 'react'
import '../SiteModal.scss'
import H2 from '../../common/h2'
import Link from 'next/link'
import Image from 'next/image'

const ThankYouModal = ({title,show, setshow,url,SolidBTNText,description}) => {
  const CancelModal = () =>{
    setshow(false)
    document.body.classList.remove('open-modal')
  }
  return (
    <>
        <div className={`site-modal successfully-modal  ${show===true? 'show' : ''}`}>
            <div className='modal-boday'>
                <Image src="/assets/images/successfully-icon.svg" alt='successfully' width={130} height={130}/>
                <H2>Thank You</H2>
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