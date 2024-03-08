import React from 'react'
import {Cinzel } from 'next/font/google'
const cinzel = Cinzel({ subsets: ['latin' ,] , weight: ["400","700"], })

const H3 = ({children, className}) => {
  return (
    <h3 className= {`${cinzel.className} ${className || ''}` }  >{children}</h3>
  )
}

export default H3