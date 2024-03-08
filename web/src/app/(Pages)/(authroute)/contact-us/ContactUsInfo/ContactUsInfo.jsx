import React from 'react'
import './ContactUsInfo.scss'
import ContactList from '@/app/components/ContactList/ContactList'
import { notFound } from 'next/navigation'
import getContactUsList from '@/utils/ssrapi/user/getcontactuslist'

const ContactUsInfo = async () => {
  const getData = await getContactUsList()
  // console.log(getData,"getData");
    // if(!getData?.data) {
    //   notFound()
    // }
  return (
    <>
        <div className='contact-info pb-120'>
            <div className="container">
                <ContactList getData={getData} />
            </div>
        </div>
    </>
  )
}

export default ContactUsInfo