import { useState } from 'react';

export default function useCheckChanged(initValue, newValue, callback) {
  const [prevValue, setPrevValue] = useState(initValue);
  if (prevValue !== newValue) {
    setPrevValue(newValue);
    callback();
  }
}
