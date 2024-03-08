import React, { memo, useRef, useLayoutEffect, forwardRef } from 'react';
import usePrevious from './hooks/usePrevious';

export const SingleOTPInputComponent = React.forwardRef((props, ref) => {
    const { focus, autoFocus, className, ...rest } = props;
    const inputRef = useRef(null);
    const prevFocus = usePrevious(!!focus);

    useLayoutEffect(() => {
        if (inputRef.current) {
            if (focus && autoFocus && focus !== prevFocus) {
                inputRef.current.focus();
                inputRef.current.select();
            }
        }
    }, [autoFocus, focus, prevFocus]);

    return <input ref={ref ? ref : inputRef} {...rest} aria-label="OTPnumber" />;
});

const SingleOTPInput = memo(SingleOTPInputComponent);
export default SingleOTPInput;
