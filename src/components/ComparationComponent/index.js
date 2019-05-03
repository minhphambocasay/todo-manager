import React, { useState } from 'react';

const ComparationComponent = React.memo(({value}) => {
    const [prevValue, setPrevValue] = useState(null);
    const [status, setStatus] = useState("equal");

    if (value !== prevValue) {
        setStatus(value < prevValue ? "smaller" : "bigger")
        setPrevValue(value)
    }

    return (
      <div>
        <h1>{status}</h1>
      </div>
    );
})

export default ComparationComponent