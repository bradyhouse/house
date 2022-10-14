import { useState, useEffect } from 'react'



export default function useWindowHeight(offset: number) {
 
  const [windowSize, setWindowSize] = useState({
    height: 0
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        height: window.innerHeight - offset
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [offset]); 
  
  return windowSize.height

}