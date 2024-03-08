import React from 'react'
import './SiteBreadcrumb.scss'
import { Link } from 'react-router-dom'

const SiteBreadcrumb = ({ BreadcrumbData , className }) => {

  return (
    <>
        <ul className={ `site-breadcrumb flex items-center ${className ? className : ''}`} >
            {BreadcrumbData?.map((item, i) => {
              return (
                <React.Fragment key={i}>
                  {item?.url ?
                    <li><Link to={item?.url} className='link'>{item?.title}</Link></li>
                    :
                     <li>{item?.title}</li>
                  }
                </React.Fragment> 
              ) 
            })
            }
        </ul>
    </>
  )
}

export default React.memo(SiteBreadcrumb)