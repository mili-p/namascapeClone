import React from 'react'
import './Skeleton.scss'

const Skeleton = ({className,width,height,count=1}) => {
  return Array.from({length:count},(e,i)=>i+1).map((a)=>{
    return  <span className={`skeleton-box ${className || ''}`} style={{maxWidth: width,height: height}} key={a}></span>
  })
}

export default Skeleton