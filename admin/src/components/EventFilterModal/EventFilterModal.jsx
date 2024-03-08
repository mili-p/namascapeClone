import React from 'react'
import './SiteModal.scss'

const EventFilterModal = ({show,className,children}) => {

  return (
    <>
        <div className={`site-modal ${className ? className : ''} ${show === true ? 'show' : ''}`}>
            <div className='modal-boday'>
                {children}
            </div>
        </div>
    </>
  )
}

export default React.memo(EventFilterModal)