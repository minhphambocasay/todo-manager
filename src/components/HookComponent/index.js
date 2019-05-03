import React, { useState, useEffect } from 'react';

export default function HookComponent() {
    const [count, setCount] = useState(0);
    let test = 0;

    useEffect(() => {
      // console.log("reset")
      const id = setInterval(() => {
        setCount(count + 1);
      }, 1000);
      return () => { clearInterval(id); console.log("clear!!!!") };
    });
    
    test = Math.random()
    
    // useEffect(() => {
    //   console.log("reset")
    //   const id = setInterval(() => {
    //     setCount(count + 1);
    //   }, 1000);
    //   return () => clearInterval(id);
    // }, [count]);  // []

    // useEffect(() => {
    //   console.log("reset")
    //   const id = setInterval(() => {
    //     setCount(c => c + 1);
    //   }, 1000);
    //   return () => clearInterval(id);
    // }, []); 
  

    // console.log('render')
    return (
      <div>
        <h1>{test}</h1>
        <h1>Count: {count}</h1>
      </div>
    );
}