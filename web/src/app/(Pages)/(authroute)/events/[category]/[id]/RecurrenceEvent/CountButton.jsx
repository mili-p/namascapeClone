"use client"
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';

const CountButton = ({setMainCount}) => {
    const {i18n} = useTranslation()
    const [count, setCount] = useState(1);
    useEffect(() => {
      if(count !== 1) {
        setMainCount(count)
      }
    }, [count])
    
  return (
    <div className="flex items-center flex-wrap qty-group-wrapper">
    <div className="qty-group">
      <span className="count">{count}</span>
      <span
        className="icon-back qty-btn min"
        onClick={
          () => {
          if (count > 1) {
            setCount((e) => e - 1);
          }
        }}
      ></span>
      <span
        className="icon-back qty-btn max"
        onClick={() => {
          if (count < 10) {
            setCount((e) => e + 1);
          }
        }}
      ></span>
    </div>
    <p className="qty-text">
      {i18n.t("useEvent.NumberofTikits")}
    </p>
  </div>
  )
}

export default CountButton