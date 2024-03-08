"use client"
import React from "react";
import { usePathname, useRouter } from 'next/navigation'

const BackButton = () => {
    const router = useRouter()
    const pathName = usePathname()

    return (
        <button type="button" aria-label="Back" className="back-btn" onClick={() => {
            if(pathName === "/signin/"){
                router.push("/")
            }else{
                router.back()
            }
            }}>
            <i className="icon-back"></i>
        </button>
    )
}

export default BackButton;