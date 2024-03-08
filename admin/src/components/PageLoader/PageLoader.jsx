import React from 'react'

const PageLoader = () => {
  return (
    <>
      <div className='fixed top-0 left-0 w-full h-screen flex items-center justify-center page-load'>
        <div className='loader'>
            <span className='loader-circle'></span>
            <span className='loader-text'>Loading</span>
        </div>
      </div>
    </>
  )
}

export default PageLoader