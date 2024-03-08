import React from 'react'
import H1 from "@/app/components/common/h1";

const LRFHeader = ({title, description}) => {
    return (
        <>
            <H1 className="h-50">{title}</H1>
            <p>
                {description}
            </p>
        </>
    )
}

export default LRFHeader;