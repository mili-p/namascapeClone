"use client"
import React, { useEffect, useState } from 'react'
import {useForm} from 'react-hook-form'
const useFormNew = (obj) => {
  const [first, setFirst] = useState(0)
  const abc = useForm(obj);
  useEffect(()=> {
    for (const key in obj.defaultValues) {
     abc.setValue(key,obj.defaultValues[key])
    }
  },[first])
  useEffect(() => {
    setFirst(1)
  }, [])
  return abc
}

export default useFormNew