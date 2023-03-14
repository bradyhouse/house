import { useState, useEffect } from 'react'

//#region Enums

export enum Letter {
    I = 'I',
    Q = 'Q',
    Z = 'Z',
    S = 'S',
    T = 'T',
    L = 'L',
    J = 'J'
}

//#endregion
//#region Input Interface

export interface ITetrisEng {
    isNewGame: boolean
    isFrozen: boolean
    letter: string | null
    width: number
    height: number
    radius: number
    context: CanvasRenderingContext2D | null
}

//#endregion
//#region Output Interface

export interface ITetrisEngState {
    columns: number
    rows: number
    currentX: number
    currentY: number
    board: number[][]
    squares: number[][]
    isFrozen: boolean
    isRunning: boolean
    isLoss: boolean
}

export const defaultState = {

}

//#endregion

const tetrisEng = (props: ITetrisEng) => {
 
  //#region Internal State

  let calcTimer: any = null
  let renderTimer: any = null
  let engState: ITetrisEngState = {
    columns: 10,
    rows: 20,
    currentX: 0,
    currentY: 0,
    board: [],
    squares: [],
    isFrozen: false,
    isRunning: false,
    isLoss: false
  }

  const letters = {
    I: [ 1, 1, 1, 1 ] ,
    Q: [ 1, 1, 0, 0, 1, 1 ],
    Z: [ 1, 1, 0, 0, 0, 1, 1 ],
    S: [ 0, 1, 1, 0, 1, 1 ],
    T: [ 1, 1, 1, 0, 0, 1, 0 ],
    L: [ 1, 0, 0, 0, 1, 0, 0, 0, 1, 1 ],
    J: [ 0, 1, 0, 0, 0, 1, 0, 0, 1, 1 ]
  }

  const width = props.width
  const height = props.height



  //#endregion
  //#region Internal Methods
  //#region Bit Calc 

  const toBitArray = (letter: string) => {
    switch(letter) {
        case Letter.I:
            return letters.I
        case Letter.J:
            return letters.J
        case Letter.L:
            return letters.L
        case Letter.Q:
            return letters.Q
        case Letter.S:
            return letters.S
        case Letter.T:
            return letters.T
        case Letter.Z:
            return letters.Z
        default:
            throw new Error('Unknown Letter')
    }
  }

  const init = () => {
    console.log('init')
    const newBoard: number[][] = []

    for (let y = 0; y < engState.rows; y++) {
        newBoard[y] = []
        for (let x = 0; x < engState.columns; x++) {
            newBoard[y][x] = 0
        }
    }

    engState = {
        ... engState,
        ... {
            board: newBoard
        }
    }
    

}

  const beginCalc = () => {
    console.log('beginCalc')
    const newCurrent: number[][] = []
    if (props.letter) {
        const pixels = toBitArray(props.letter)
        for (let y = 0; y < 4; y++) {
            newCurrent[y] = []
            for (let x = 0; x < 4; x++) {
                const pixel: number = 4 * y + x
                if (typeof pixels[pixel] !== undefined && pixels[pixel]) {
                    newCurrent[y][x] = 1
                } else {
                    newCurrent[y][x] = 0
                }
            }
        }
        engState = {
            ... engState,
            ... {
              currentX: 0,
              currentY: 0,
              isFrozen: false,
              current: newCurrent
            }
          }          
    }
  }

  const canCalc = (deltaX: number = 0, deltaY: number = 0, squares: Number[][] | any = null ) => {
    console.log('canCalc')
    const newEngState = {
        x: engState.currentX + deltaX,
        y: engState.currentY + deltaY,
        squares: squares || engState.squares,
    }
    for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 4; x++) {
            if (newEngState.squares[y][x]) {
                if (typeof engState.board[y + newEngState.y] === undefined ||
                    typeof engState.board[y + newEngState.y][x + newEngState.x] === undefined ||
                    engState.board[y + newEngState.y][x + newEngState.x] ||
                    x + newEngState.x < 0 ||
                    y + newEngState.y >= engState.rows ||
                    x + newEngState.x >= engState.columns) {
                        if (newEngState.y === 1 && engState.isFrozen) {
                            engState = {
                                ... engState,
                                ... {
                                    isLoss: true
                                }
                            }
                        }
                        return false
                        
                    }    
            }
        }
    }

    return true
    

}

  const stopCalc = () => {
    console.log('stopCalc')
    const newBoard: number[][] = engState.board

    for (let y = 0; y < 4; ++y) {
        for (let x = 0; x < 4; ++x) {
            if (engState.squares[y][x]) {
                newBoard[y + engState.currentY][x + engState.currentX] = engState.squares[y][x]
            }
        }
    }

    engState = {
        ... engState,
        ... {
            board: newBoard,
            isFrozen: true
        }
    }

  }

  const clearRows = () => {
    console.log('clearRows')

    const newBoard: number[][] = engState.board

    for (let y = engState.rows -1; y >= 0; --y) {
        let isFilled: Boolean = true;
        for ( let x = 0; x < engState.columns; ++x) {
            if (engState.board[y][x] === 0) {
                isFilled = false
                break
            }
        }
        if (isFilled) {
            for (let dy = y; dy > 0; dy --) {
                for (let x = 0; x < engState.columns; ++x) {
                    newBoard[dy][x] = newBoard[dy - 1][x]
                }
            }
            ++y
        }
    }

    if (JSON.stringify(newBoard) !== JSON.stringify(engState.board)) {
        engState = {
            ...engState,
            ... {
                board: newBoard
            }
        }
    }

  }

  const calc = () => {
    console.log('calc')
    if (canCalc(0,1)) {
        engState = {
            ... engState,
            ... {
                currentY: ++engState.currentY
            }
        }
    } else {
       stopCalc()
       canCalc(0,1) 
       clearRows()
       if (engState.isLoss) {
            clearInterval(calcTimer)
            return false
       }
    }
  }

  const stopTimers = () => {
    console.log('stopTimer')
    if (calcTimer) {
        clearInterval(calcTimer)
    }
    if (renderTimer) {
        clearInterval(renderTimer)
    }
  }

  //#endregion
  //#region Ctx Render 

  const renderSquare = (posX: number, posY: number, ctx: CanvasRenderingContext2D) => {
    console.log('renderSquare')
    const fullWidth: number = props.width / engState.columns
    const fullHeight: number = props.height / engState.rows
    const x: number = fullWidth * posX
    const y: number = fullHeight * posY
    const squareWidth: number = fullWidth - 1
    const squareHeight: number = fullHeight - 1
    const cornerRadius: number = props.radius

    ctx.beginPath();
    ctx.moveTo(x + cornerRadius, y);
    ctx.lineTo(x + squareWidth - cornerRadius, y);
    ctx.quadraticCurveTo(x + squareWidth, y, x + squareWidth, y + cornerRadius);
    ctx.lineTo(x + squareWidth, y + squareHeight - cornerRadius);
    ctx.quadraticCurveTo(x + squareWidth, y + squareHeight, x + squareWidth - cornerRadius, y + squareHeight);
    ctx.lineTo(x + cornerRadius, y + squareHeight);
    ctx.quadraticCurveTo(x, y + squareHeight, x, y + squareHeight - cornerRadius);
    ctx.lineTo(x, y + cornerRadius);
    ctx.quadraticCurveTo(x, y, x + cornerRadius, y);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();

  }

  const render = (ctx: CanvasRenderingContext2D) => {
    console.log('render')
    ctx.clearRect(0,0, props.width, props.height)
    ctx.strokeStyle = 'black'

    for (let x = 0; x < engState.columns; ++x) {
        for (let y = 0; y < engState.rows; ++y) {
            if (engState.board[y][x]) {
                renderSquare(x, y, ctx)
            }
        }
    }
    ctx.fillStyle = 'blue'
    for (let y = 0; y < 4; ++y) {
        for (let x = 0; x < 4; ++x) {
            if (engState.squares[y][x]) {
                renderSquare(engState.currentX, engState.currentY, ctx)
            }
        }
    }
  }

  //#endregion
  //#endregion
  //#region Loop Effects

  useEffect(() => {
    if (props.letter && props.context && props.isNewGame && !engState.isRunning) {
        stopTimers()
        renderTimer = setInterval(render, 30)
        init()        
        beginCalc()
        engState = {
            ... engState, 
            ... { 
                isRunning: true,
                isFrozen: false,
                isLoss: false
            }
        }
        calcTimer = setInterval(calc, 400)
    }
    return () => stopTimers()

  }, [props]); 
  
  //#endregion
  //#region Response

  return engState

  //#endregion

}

export default tetrisEng