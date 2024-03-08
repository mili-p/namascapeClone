import React from 'react'
import {Cinzel } from 'next/font/google'
const cinzel = Cinzel({ subsets: ['latin' ,] , weight: ["400","700"], })

const H1 = ({children, className}) => {
  return (
    <h1 className= {`${cinzel.className} ${className || ''}` }  >{children}</h1>
  )
}

export default H1