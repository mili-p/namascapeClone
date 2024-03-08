"use client"
import React, { forwardRef } from 'react'

const DatePikerLang = (({ value, onClick, onChange,formateDate="tt-mm-jjjj", ...rest  }, ref) => {
  return (
    <>
      <button type='button' className="date-btn" onClick={onClick} ref={ref}>
        {value || formateDate}
      </button>
    </>
  );
});

export default forwardRef(DatePikerLang);
