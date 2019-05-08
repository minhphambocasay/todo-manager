import React, { useState } from 'react';

const useChangedValue = ({value}) => {
    const [prevValue, setPrevValue] = useState(value);
    if (value !== prevValue) {
      setPrevValue(value)
    }

    return value !== prevValue;
}

export default useChangedValue