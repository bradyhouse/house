import React, { useEffect, useRef } from 'react'

export interface IPlot {
  height: number,
  setContextFn: (ctx: CanvasRenderingContext2D | null) => void
}


const Plot: React.FC<IPlot> = (props) => {

  //#region State

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);

  //#endregion
  //#region Effects

  useEffect(() => {

    if (canvasRef.current) {
      canvasCtxRef.current = canvasRef.current.getContext('2d')
      let ctx = canvasCtxRef.current; // Assigning to a temp variable
      props.setContextFn(ctx)
    }
  }, [props])

  //#endregion
  
  return (
    <>
      <canvas data-testid="plot" width="285" height={props.height} ref={canvasRef} 
      style={{borderRadius: '.375rem',
              backgroundColor: 'transparent',
              paddingBottom: '3px',
              border: '1px solid rgba(255,255,255,.4)'}}></canvas>
    </>
  )
}

export default Plot