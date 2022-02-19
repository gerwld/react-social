import React from 'react';

export function usePrevious(data){
    const ref = React.useRef();
    React.useEffect(()=>{
      ref.current = data
    }, [data])
    return ref.current
  }