import React from 'react'
import {Cinzel } from 'next/font/google'
const cinzel = Cinzel({ subsets: ['latin' ,] , weight: "700" })

const H5 = ({children, className}) => {
  return (
    <h5 className= {`${cinzel.className} ${className || ''}` }  >{children}</h5>
  )
}

export default H5