import React from 'react'
import {Cinzel } from 'next/font/google'
const cinzel = Cinzel({ subsets: ['latin' ,] , weight: ["400","700"], })

const H2 = ({children, className}) => {
  return (
    <h2 className= {`${cinzel.className} ${className || ''}` }  >{children}</h2>
  )
}

export default H2