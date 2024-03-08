/* eslint-disable react/jsx-props-no-spreading */
import React, { memo, useRef, useLayoutEffect } from 'react'
import usePrevious from './hooks/usePrevious'

export function SingleOTPInputComponent(props) {
    const { focus, autoFocus, className, ...rest } = props
    const inputRef = useRef(null)
    const prevFocus = usePrevious(!!focus)
    useLayoutEffect(() => {
        if (inputRef.current) {
            if (focus && autoFocus) {
                inputRef.current.focus()
            }
            if (focus && autoFocus && focus !== prevFocus) {
                inputRef.current.focus()
                inputRef.current.select()
            }
        }
    }, [autoFocus, focus, prevFocus])

    return <input ref={inputRef} {...rest} aria-label="OTPnumber" />
}

const SingleOTPInput = memo(SingleOTPInputComponent)
export default SingleOTPInput
