'use client'
import React from 'react'
import '../SiteModal.scss'
import H2 from '../../common/h2'
import { useDispatch } from 'react-redux'
import { logOutUser } from '../../../../../redux/Thunks/auth.thunk'
import { useRouter } from 'next/navigation'
import { deleteUserAccount } from '../../../../../redux/Thunks/Account/languagechange.thunk'
import { useTranslation } from 'react-i18next'

const DeleteLogoutModal = ({title,show, setshow,Delete,IconClass,SolidBTNText,onClickCancle,onClickOK}) => {
  const {t,i18n} = useTranslation()
  const dispatch = useDispatch()
  const router = useRouter()
  const CloseModal = () =>{
    dispatch(logOutUser('',()=>{
      setshow(false)
      router.push('/')
    }))
    document.body.classList.remove('open-modal')
    localStorage.removeItem('userData')
  }
  // const CancelModal = () =>{
  //   setshow(false)
  //   document.body.classList.remove('open-modal')
  // }

  // const onDeleteClickFun = ()=>{
  //   dispatch(deleteUserAccount('',()=>{
  //     setshow(false)
  //     router.push('/')
  //   }))
  // }

  return (
    <>
        <div className={`site-modal ${Delete?  'delete' : ''} ${show===true? 'show' : ''}`}>
            <div className='modal-boday'>
                <i className={IconClass}></i>
                <H2>{title}</H2>
                <div className='flex items-center justify-center modal-btn-group'>
                    <div className='border-btn modal-btn' onClick={onClickCancle}>{i18n.t(`settings.deleteModal.cancleBtn`)}</div>
                    {/* <div className='solid-btn modal-btn' onClick={Delete? onDeleteClickFun : CloseModal}>{SolidBTNText}</div> */}
                    <div className='solid-btn modal-btn' onClick={onClickOK}>{SolidBTNText}</div>
                </div>
            </div>
        </div>
    </>
  )
}

export default DeleteLogoutModal