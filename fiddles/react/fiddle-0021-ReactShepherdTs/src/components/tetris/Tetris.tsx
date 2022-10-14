/* eslint-disable */ 

import { useEffect, useState } from 'react'
import { Calc, ICalc } from './calc/Calc'
import Plot from './plot/Plot'
import Ctrl from './ctrl/Ctrl'

//#region Interface

interface ITetris {
  height: number
}

//#endregion

const Tetris = (props: ITetris) => {
  //#region State

  const defaultState: ICalc = {
    columns: 10,
    rows: 20,
    width: 320,
    height: props.height,
    radius: 5,
    currentX: 0,
    currentY: 0,
    board: [],
    squares: [],
    isNewGame: false,
    isFrozen: false,
    isRunning: false,
    isLoss: false
  }
  let calcTimer: any = null
  let renderTimer: any = null
  let cells: string[] = []
  let cell: string | undefined | null = null
  let column: number = 0
  let letter: string | undefined | null = null
  let state: ICalc = {
    columns: 10,
    rows: 20,
    width: 320,
    height: props.height,
    radius: 5,
    currentX: 0,
    currentY: 0,
    board: [],
    squares: [],
    isNewGame: false,
    isFrozen: false,
    isRunning: false,
    isLoss: false
  }
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  const [shapes, setShapes] = useState<string>('')

  //#endregion
  //#region Utils

  const parseLetter = (val:string): string => {
    const letters = val.split('')
    if (letters.length >= 1) {
      return letters[0]
    }
    return ''
  }

  const parseCol = (val: string) => {
    const num = val.match(/\d+/g);
    if (num && num.length <= 2 && !isNaN(Number(num))) {
      return Number(num)
    }
    return 0
  }

  const parseCells = (val: string): string[] => {
    const csv: string[] = val.split(',')
    const newLetters: string[] = []
    if (csv.length) {
      csv.forEach((v: string) => {
        newLetters.push(v.trim().toUpperCase())
      })
    }    
    return newLetters
  }

  const shiftCell = () => {
    if (cells.length) {
      cell = cells.shift()
      if (cell !== undefined) {
        letter = parseLetter(cell)
        column = parseCol(cell)
      } else {
        return false
      }
    } else {
      return false
    }
    return true
  }

  const parse = (val: string) => {
    cells = val.trim().length > 1 ? parseCells(val) : []
    if (cells.length) {
      return shiftCell()
    }
    return false
  }

  const stop = () => {
    if (calcTimer) {
        clearInterval(calcTimer)
    }
    if (renderTimer) {
        clearInterval(renderTimer)
    }

    setShapes('')

    letter = null
    cells = []
    cell = null
    column = 0

    state = {
      ...state,
      ...{
        currentX: 0,
        currentY: 0,
        board: [],
        isRunning: false,
        isFrozen: false,
        isNewGame: false,
        isLoss: false
      }
    }

  }

  //#endregion
  //#region Loop Effects

  useEffect(() => {
    if (ctx && shapes.trim() !== '' && !state.isRunning) {
      
      let newTetrisState: ICalc = Object.assign({}, state)      
      if (parse(shapes.trim())) {
        if (letter && column && column > 0) {
          newTetrisState = Calc.initBoard(newTetrisState)
          newTetrisState = Calc.beginCalc(letter, column, newTetrisState)
          newTetrisState = {
            ...newTetrisState, 
            ...{ 
                isRunning: true,
                isFrozen: false,
                isLoss: false }
          }
    
          state = newTetrisState
    
          renderTimer = setInterval(() => {
            Calc.render(ctx, state)}, 20)
          calcTimer = setInterval(() => {
            if (!state.isFrozen) {
              state = Calc.calc(state)  
            } else {
              if (shiftCell()) {
                if (letter && column) {
                  state = {
                    ...state,
                    ...Calc.beginCalc(letter, column, state),
                    ...{
                      isFrozen: false
                    }
                  }  
                } else {
                  stop()
                }
              } else {
                stop()
              }            
            }      
    
          }, 30)
        }  
      } else {
        state = Calc.initBoard(state)
        Calc.render(ctx, state)
        stop()
      }

    }
    return () => {
      clearInterval(renderTimer)
      clearInterval(calcTimer)
    }

  }, [ctx, shapes])

  //#endregion
  //#region Event Handlers

  const onPlayClick = () => {
      const tmpShapes: string = shapes
      setShapes('')
      state = Object.assign({}, defaultState)
      Calc.initBoard(state)
      setShapes(tmpShapes)
  }

  const onResetClick = () => {
    
  }

  //#endregion
  //#region Response

  return (
    <>
      <div data-testid="tetris" className="container" style={{ width: '380px', padding: '1rem'}}>
        <div className="row align-items-center">
          <div className="col">
            <Ctrl isDisabled={false} setValue={setShapes} onPlayClick={onPlayClick} onResetClick={onResetClick} />
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col">
            <Plot height={props.height} setContextFn={setCtx}  /> 
          </div>
        </div>
      </div>
    </>
  )

  //#endregion
}

export default Tetris