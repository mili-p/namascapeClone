'use client'
import React from 'react'
import "./UserAttendeesCard.scss";
import Image from 'next/image';
import { useRouter } from 'next/navigation';


const UserAttendeesCard = ({item}) => {
  const router = useRouter()
  // console.log('item',item)

  const otherUserProfile = () => {
      if(!item?.anonymous){
        router.push(`/user/${item?.userId}`)
      }
  }
 
  return (
    <div className={`user-attend-card flex items-center flex-col ${item?.anonymous ? '' : 'cursor-pointer'}`} onClick={otherUserProfile}>
        <div className='user-image-box flex items-center justify-center'>
            <Image src={item?.profileImage} alt='user' width={120} height={120}/>
        </div>
        <p>{item?.userName}</p>
        {/* <p>Quantity : ({item?.quantity})</p> */}
        {/* <p> quantity : {item?.quantity}</p> */}
    </div>
  )
}

export default UserAttendeesCard