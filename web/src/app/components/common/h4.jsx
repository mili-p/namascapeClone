import React from 'react'
import {Cinzel } from 'next/font/google'
const cinzel = Cinzel({ subsets: ['latin' ,] , weight: ["400","700"] })

const H4 = ({children, className}) => {
  return (
    <h4 className= {`${cinzel.className} ${className || ''}` }  >{children}</h4>
  )
}

export default H4