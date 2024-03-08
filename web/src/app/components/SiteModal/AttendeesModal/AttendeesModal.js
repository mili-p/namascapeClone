import React from 'react'
import '../SiteModal.scss'
import H2 from '../../common/h2'

const AttendeesModal = ({title, attendees, onClickOK, SolidBTNText, onClickCancle, show, onClickCancleText}) => {
  return (
    <div className={`site-modal ${attendees?  'delete' : ''} ${show===true? 'show' : ''}`}>
            <div className='modal-boday'>
                <H2>{title}</H2>
                <div className='flex items-center justify-center modal-btn-group'>
                    <div className='border-btn modal-btn' onClick={onClickCancle}>
                        {onClickCancleText}
                    </div>
                    <div className='solid-btn modal-btn' onClick={onClickOK}>{SolidBTNText}</div>
                </div>
            </div>
        </div>
  )
}

export default AttendeesModal