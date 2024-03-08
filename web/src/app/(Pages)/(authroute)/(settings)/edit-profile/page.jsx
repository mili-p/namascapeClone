import React from 'react'
import './edit-profile.scss'
import EditProfileForm from './EditProfileForm'

const page = () => {
  return (
    <>
    <EditProfileForm/>
      {/* <form className='edit-profile'>
        <H2>edit profile</H2>
        <div className="user-profile">
          <Image src='/assets/images/myaccount-user-image.png' alt='profile-image' width={240} height={240}/>
          <label for="upload-file" className='inline-flex items-center upload-file'><input type="file" id="upload-file"/><i className='icon-edit'></i>Edit Picture</label>
        </div>
        <div className='lg:flex lg:items-center input-group-row'>
          <div className="input-group">
            <label>First Name</label>
            <input type="text" placeholder='Enter first name' />
          </div>
          <div className="input-group">
            <label>Last Name</label>
            <input type="text" placeholder='Enter last name' />
          </div>
        </div>
        <div className="input-group">
          <label>Email Address</label>
          <input type="text" placeholder='Enter email address' />
        </div>
        <div className="input-group icon-input">
          <label>Date of Birth</label>
          <input type="date" placeholder='Enter City' />
        </div>
        <div className="input-group">
          <label>Social Media Link</label>
          <input type="text" placeholder='Paste social media link' />
        </div>
        <div className="input-group">
          <label>Social Media Link</label>
          <textarea name="" id="" cols="30" rows="2" placeholder='Paste social media link'></textarea>
        </div>
        <button type='button' className='solid-btn form-btn'>Save</button>
      </form> */}
    </>
  )
}

export default page