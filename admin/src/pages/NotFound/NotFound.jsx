import React from 'react'
import PagenotFound from '../../assets/images/page-not-found.png'
import { Link } from 'react-router-dom'
import { home } from '../../config/routeConsts'

const NotFound = () => {
  return (
   <>
      <section className='page-not-found'>
        <img src={PagenotFound} alt='page-not-found'/>
        <div className="content">
          <h1>Oops!</h1>
          <h2>404 - PAGE NOT FOUND</h2>
          <p>The page you are looking for might have been removed had it is name changed or is temporarily unavalable.</p>
          <Link to={home} className='solid-btn'>Go Back</Link>
        </div>
      </section>
   </>
  )
}

export default NotFound