import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import './SecondaryLayout.scss'

import SecondoryHeader from './SecondoryHeader/SecondoryHeader'
const Sidebar = React.lazy(()=>import('./Sidebar/Sidebar'))

const SecondaryLayout = () => {
  const [mobileToggle, setmobileToggle] = useState(false)
  const [SideCollapse, setSideCollapse] = useState(false)
  return (
   <>
    <SecondoryHeader mobileToggle={mobileToggle} setmobileToggle={setmobileToggle}/>
    <main className='protected-main'>
      <Sidebar mobileToggle={mobileToggle} setmobileToggle={setmobileToggle} setSideCollapse={setSideCollapse} SideCollapse={SideCollapse}/>
      <div className={`protected-content ${SideCollapse===true ? "content-collapse" : ""}`}><Outlet/></div>
    </main>
   </>
  )
}

export default SecondaryLayout