import { useState, useEffect } from 'react';

const useGetValue = () => {
  const [value, updateValue] = useState(null);

  useEffect(() => {
    setInterval( () => {
        updateValue(c => c + 2)
    }, 1000
    )
  }, []);

  return value;
}

export default useGetValue