import React, { useState, useEffect, useCallback } from 'react';
import useChangedValue from '@/components/ComparationComponent';

export default function HookComponent({ test = Math.random() }) {
    const [count, setCount] = useState(0);
    const a = 1
    function log(b) {
      console.log(b)
    }
    const memoizedCallback = () => {
      log(a)
    }
    
    // const [constValues, initConstValue] = useState(0);
    // useEffect(() => {
    //   // console.log("reset")
    //   const id = setInterval(() => {
    //     setCount(count + 1);
    //   }, 1000);
    //   // return () => { clearInterval(id); console.log("clear!!!!") };
    // }, );
    
    // useEffect(() => {
    //   const id = setInterval(() => {
    //     setCount(c => c + 1);
    //   }, 1000);
    //   return () => clearInterval(id);
    // }, []);  /// []

    // useEffect(() => {
    //   setState(Math.random())
    // }, [])
    console.log("re-render")
    let shouldComponentUpdate = useChangedValue({value: 1})
     shouldComponentUpdate = useChangedValue({value: 2})
    useEffect(() => {
      
      if (shouldComponentUpdate) {
        console.log("update")
      }
      
      const id = setInterval(() => {
        setCount(c => c + 1);
      }, 1000);
      return () => {
        clearInterval(id)
        // console.log("Will unmount")
      }
    }); 
  
    // useEffect(() => {
    //   if (count <= 5) {
    //     console.log("Did Update")
    //     console.log(count)
    //   }
    // }, [count]); 

    // console.log('render')
    return (
      <div>
        <h1>{test}</h1>
        <h1>Count: {count}</h1>
        <componentCon callback={memoizedCallback}></componentCon>
      </div>
    );
}