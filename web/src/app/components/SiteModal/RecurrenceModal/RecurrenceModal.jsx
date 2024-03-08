'use client'
import React from 'react'
import '../SiteModal.scss'
import H2 from '../../common/h2'
import { useTranslation } from 'react-i18next'

const RecurrenceModal = ({title,show,Delete,IconClass,SolidBTNText,onClickCancle,onClickOK}) => {
  const {t,i18n} = useTranslation()

  return (
    <>
        <div className={`site-modal ${Delete?  'delete' : ''} ${show===true? 'show' : ''}`}>
            <div className='modal-boday'>
                {/* <i className={IconClass}></i> */}
                <H2>{title}</H2>
                <div className='flex items-center justify-center modal-btn-group'>
                    <div className='border-btn modal-btn' onClick={onClickCancle}>{i18n.t(`payment.model.AttendeesModal.onClickCancleText`)}</div>
                    {/* <div className='solid-btn modal-btn' onClick={Delete? onDeleteClickFun : CloseModal}>{SolidBTNText}</div> */}
                    <div className='solid-btn modal-btn' onClick={onClickOK}>{i18n.t(`payment.model.AttendeesModal.SolidBTNText`)}</div>
                </div>
            </div>
        </div>
    </>
  )
}

export default RecurrenceModal