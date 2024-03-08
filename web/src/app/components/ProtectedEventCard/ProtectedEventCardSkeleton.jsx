import Image from "next/image";
import Link from "next/link";
import React from "react";
import H2 from "../common/h2";
import "./ProtectedEventCard.scss";
import H3 from "../common/h3";
import H4 from "../common/h4";
import Skeleton from "../Skeleton/Skeleton";

const ProtectedEventCardSkeleton = () => {
  return (
    <>
    <div className="flex items-stretch flex-col sm:flex-row w-full protected-event-card skeleton">
        <div className="image-wrapper">
            <Skeleton width='100%' height='100%'/>
        </div>
        <div className="flex items-center w-full content-wrapper">
            <div className="w-full">
                <div className="flex items-center justify-between mb-3">
                    <Skeleton width={150} height={20}/>
                    {/* <div className="hidden sm:inline-flex items-center justify-end overlap-area  card-action" style={{width: '100%'}}>
                        <Skeleton width={40} height={25}/>
                        <Skeleton width={40} height={25}/>
                        <Skeleton width={40} height={25}/>
                    </div> */}
                </div>
                <p className="time"><Skeleton width={100} height={20}/></p>
                <H2 className="title"><Skeleton width='100%' height={20}/></H2>
                <p className="description">
                    <Skeleton width='100%' height={20}/>
                    <Skeleton width='100%' height={20}/>
                </p>
                {/* <ul className="flex items-center flex-wrap about-list">
                    <li><Skeleton width='100%' height={20}/></li>
                    <li><Skeleton width='100%' height={20}/></li>
                    <li><Skeleton width='100%' height={20}/></li>
                </ul> */}
                <div className={`flex items-center flex-wrap justify-between overlap-area status-label`}>
                    <Skeleton width={100} height={20}/>
                    <Skeleton width={100} height={20}/>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default ProtectedEventCardSkeleton