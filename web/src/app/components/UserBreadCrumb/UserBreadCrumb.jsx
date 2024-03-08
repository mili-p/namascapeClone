"use client"
import React from 'react'
import {usePathname, useRouter} from 'next/navigation'
import './UserBreadCrumb.scss'

const UserBreadCrumb = ({items}) => {
    const pathName = usePathname()
    const router = useRouter()
  return (

    <>
        <ul className='user-bread-crumb'>
            {items && items?.map((e,i)=> {
                if(pathName !== e.url){
                    return <li className='active' key={i} onClick={()=> router.push(e.url)} > {e.name} </li>
                } else{
                    return <li key={i}> {e.name} </li>
                }
            })}
        </ul>
    </>
  )
}

export default UserBreadCrumb