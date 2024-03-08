import React from 'react'
import './social-media.scss'
import Link from 'next/link'

const SocialMedia = () => {
    const socialLink= [
        {
            Icon:<><i className='icon-facebook'></i></>,
            URL:'https://www.facebook.com/profile.php?id=61555758840276',
            LinkTitle:'Facebook',
        },
        {
            Icon:<><i className='icon-instagram'></i></>,
            URL:'https://www.instagram.com/namascape/?igsh=ZmU3ZXNqenkxcG5v',
            LinkTitle:'Instagram',
        },
        {
            Icon:<><i className='icon-tiktok'></i></>,
            URL:'http://www.tiktok.com/@namascape',
            LinkTitle:'Tiktok', 
        },
        {
            Icon:<><i className='icon-whatsapp'></i></>,
            URL:'https://chat.whatsapp.com/I7Ugx5pXwArFKK0fjq0p4X',
            LinkTitle:'Whatsapp',
        },
    ]
  return (
    <>
        <ul className='social-link'>
            {socialLink?.map((list,i)=>{
                return(
                    <React.Fragment key={i}>
                        <li>
                            <Link href={list.URL} title={list.LinkTitle} target='_blank'>{list.Icon}</Link>
                        </li>
                    </React.Fragment>
                )
            })}
        </ul>
    </>
  )
}

export default SocialMedia