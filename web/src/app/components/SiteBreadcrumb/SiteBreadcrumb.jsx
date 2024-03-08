"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import './SiteBreadcrumb.scss'

const SiteBreadcrumb = ({ BreadcrumbData , className ,lastDataORGAccount , lastElement}) => {

const pathname = usePathname()
  return (
    <>
            {lastDataORGAccount ? <>
              <ul className={ `site-breadcrumb flex items-center ${className ? className : ''}`} >
              {BreadcrumbData?.map((item, i) => {
              return (
                <React.Fragment key={i}>
                  {item?.url && item?.url !== pathname ?
                    <li><Link href={item?.url} className='link'>{item?.title}</Link></li>
                    :
                    <li>{item?.title}</li>
                  }
                  {/* {item?.url ? <li><Link href={item?.url} className='link'>{item?.title}</Link></li> : item?.pathname === true? <li>{item?.title}</li> : ''} */}
                </React.Fragment> 
              ) 
                })
              }

              {lastElement && lastElement?.map((last,i)=>{
                return (
                  <React.Fragment key={i}>
                    {last?.url === pathname && <li>{last?.title}</li>}
                  </React.Fragment>
                )
              })}
            </ul>
            </> : 
            <>
              <ul className={ `site-breadcrumb flex items-center ${className ? className : ''}`}>
              {BreadcrumbData?.map((item, i) => {
              return (
                <React.Fragment key={i}>
                  {item?.url ?
                    <li><Link href={item?.url} className='link'>{item?.title}</Link></li>
                    :
                     <li >{item?.title}</li>
                  }
                </React.Fragment> 
              ) 
            })
            }
            </ul>
            </>}




    </>
  )
}

export default SiteBreadcrumb
