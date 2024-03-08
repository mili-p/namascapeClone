import React from 'react'
import '../SiteModal.scss'
import { useDispatch } from 'react-redux'

const DeleteLogoutModal = ({title,show, setshow,Delete,IconClass,SolidBTNText,deleteItem,payload,invalidate}) => {

  const dispatch = useDispatch()
  const CloseModal = () =>{

    setshow(false)
    document.body.classList.remove('open-modal')

   dispatch(deleteItem(payload,()=>{
    if (typeof invalidate == "function"){
      invalidate()
    }
   }))
  }
  
  const CancelModal = () =>{
    setshow(false)
    document.body.classList.remove('open-modal')
  }                                             
  return (
    <>
        <div className={`site-modal ${Delete?  'delete' : ''} ${show===true? 'show' : ''}`}>
            <div className='modal-boday'>
                <i className={IconClass}></i>
                <h2>{title}</h2>
                <div className='flex items-center justify-center modal-btn-group'>
                    <div className='border-btn modal-btn' onClick={CancelModal}>Cancel</div>
                    <div className='solid-btn modal-btn' onClick={CloseModal}>{SolidBTNText}</div>
                </div>
            </div>
        </div>
    </>
  )
}

export default React.memo(DeleteLogoutModal)