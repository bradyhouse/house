//#region Enum
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
//#region State Interface

export interface ICalc {
    columns: number
    rows: number
    width: number
    height: number
    radius: number
    currentX: number
    currentY: number
    board: number[][] | never[]
    squares: number[][] | never[]
    isNewGame: boolean
    isFrozen: boolean
    isRunning: boolean
    isLoss: boolean
}

//#endregion

export class Calc {

  public static toBitArray (letter: string) {
    const letters = {
        I: [ 1, 1, 1, 1 ] ,
        Q: [ 1, 1, 0, 0, 1, 1 ],
        Z: [ 1, 1, 0, 0, 0, 1, 1 ],
        S: [ 0, 1, 1, 0, 1, 1 ],
        T: [ 1, 1, 1, 0, 0, 1, 0 ],
        L: [ 1, 0, 0, 0, 1, 0, 0, 0, 1, 1 ],
        J: [ 0, 1, 0, 0, 0, 1, 0, 0, 1, 1 ]
    }
    
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
  
  public static initBoard (tetrisState: ICalc) {
    const newBoard: number[][] = []

    for (let y = 0; y < tetrisState.rows; ++y) {
        newBoard[y] = []
        for (let x = 0; x < tetrisState.columns; ++x) {
            newBoard[y][x] = 0
        }
    }
    return {
        ...tetrisState,
        ...{
            board: newBoard
        }
    }
  }

  public static beginCalc(letter: string, col: number, tetrisState: ICalc) {
   const newCurrent: number[][] = []
    if (letter) {
        const pixels = Calc.toBitArray(letter)
        for (let y = 0; y < 4; ++y) {
            newCurrent[y] = []
            for (let x = 0; x < 4; ++x) {
                const pixel: number = 4 * y + x
                if (typeof pixels[pixel] !== 'undefined' && pixels[pixel]) {
                    newCurrent[y][x] = 1
                } else {
                    newCurrent[y][x] = 0
                }
            }
        }
    }
    return {
        ...tetrisState,
        ...{
          currentX: col - 1,
          currentY: 0,
          isFrozen: false,
          squares: newCurrent
        }
      }          

  }

  public static canCalc(deltaX: number = 0, deltaY: number = 0, squares: Number[][] | any = null, tetrisState: ICalc ) {
    const newTetrisState = {
        x: tetrisState.currentX + deltaX,
        y: tetrisState.currentY + deltaY,
        squares: squares || tetrisState.squares,
    }
    for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 4; x++) {
            if (newTetrisState.squares[y][x]) {
                if (typeof(typeof tetrisState.board[y + newTetrisState.y]) === 'undefined' ||
                    x + newTetrisState.x < 0 ||
                    y + newTetrisState.y >= tetrisState.rows ||
                    x + newTetrisState.x >= tetrisState.columns ||
                    tetrisState.board[y + newTetrisState.y ][x + newTetrisState.x]) {
                    if (newTetrisState.y === 1 && tetrisState.isFrozen) {
                        tetrisState = {
                            ...tetrisState,
                            ...{
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

  public static stopCalc(tetrisState: ICalc) {
    const newBoard: number[][] = tetrisState.board
    for (let y = 0; y < 4; ++y) {
        for (let x = 0; x < 4; ++x) {
            if (tetrisState.squares[y][x]) {
                newBoard[y + tetrisState.currentY][x + tetrisState.currentX] = tetrisState.squares[y][x]
            }
        }
    }
    return {
        ...tetrisState,
        ...{
            board: newBoard,
            squares: [],
            isFrozen: true
        }
    }

  }

  public static clearRows(tetrisState: ICalc) {
  
    const newBoard: number[][] = tetrisState.board

    for (let y = tetrisState.rows -1; y >= 0; --y) {
        let isFilled: Boolean = true;
        for ( let x = 0; x < tetrisState.columns; ++x) {
            if (tetrisState.board[y][x] === 0) {
                isFilled = false
                break
            }
        }
        if (isFilled) {
            for (let dy = y; dy > 0; --dy) {
                for (let x = 0; x < tetrisState.columns; ++x) {
                    newBoard[dy][x] = newBoard[dy - 1][x]
                }
            }
            ++y
        }
    }

    if (JSON.stringify(newBoard) !== JSON.stringify(tetrisState.board)) {
       return {
            ...tetrisState,
            ...{
                board: newBoard
            }
        }

    }
    return tetrisState

  } 

  public static calc(tetrisState: ICalc) {
    let newTetrisState: ICalc = Object.assign({}, tetrisState)
    if (Calc.canCalc(0, 1, null, newTetrisState)) {
        newTetrisState = {
            ...newTetrisState,
            ...{
                currentY: ++newTetrisState.currentY
            }
        }
    } else {
       newTetrisState = Calc.stopCalc(newTetrisState)
       newTetrisState = Calc.clearRows(newTetrisState)
       if (newTetrisState.isLoss) {
            newTetrisState = {
                ...newTetrisState,
                ...{
                    isLoss: true
                }
            }
       }
    }
    return newTetrisState
  }

  public static renderSquare(posX: number, posY: number, tetrisState: ICalc, ctx: CanvasRenderingContext2D) {
    const fullWidth: number = tetrisState.width / tetrisState.columns - 3
    const fullHeight: number = tetrisState.height / tetrisState.rows
    const x: number = fullWidth * posX
    const y: number = fullHeight * posY
    const squareWidth: number = fullWidth - 1
    const squareHeight: number = fullHeight - 1
    const cornerRadius: number = tetrisState.radius
    

    ctx.beginPath()
    ctx.moveTo(x + cornerRadius, y)
    ctx.lineTo(x + squareWidth - cornerRadius, y)
    ctx.quadraticCurveTo(x + squareWidth, y, x + squareWidth, y + cornerRadius)
    ctx.lineTo(x + squareWidth, y + squareHeight - cornerRadius)
    ctx.quadraticCurveTo(x + squareWidth, y + squareHeight, x + squareWidth - cornerRadius, y + squareHeight)
    ctx.lineTo(x + cornerRadius, y + squareHeight)
    ctx.quadraticCurveTo(x, y + squareHeight, x, y + squareHeight - cornerRadius)
    ctx.lineTo(x, y + cornerRadius)
    ctx.quadraticCurveTo(x, y, x + cornerRadius, y)
    ctx.closePath()
    ctx.stroke()
    ctx.fill()

  }

  public static render(ctx: CanvasRenderingContext2D, tetrisState: ICalc) {
    ctx.clearRect(0,0, tetrisState.width, tetrisState.height)
    ctx.strokeStyle = 'black'
    for (let x = 0; x < tetrisState.columns; ++x) {
        for (let y = 0; y < tetrisState.rows; ++y) {
            if (tetrisState.board[y][x]) {
                Calc.renderSquare(x, y, tetrisState, ctx)
            }
        }
    }
    ctx.fillStyle = 'blue'
    for (let y = 0; y < 4; ++y) {
        for (let x = 0; x < 4; ++x) {
            if (tetrisState.currentX + x < tetrisState.columns && 
                tetrisState.currentY + y < tetrisState.rows && 
                tetrisState.squares.length && 
                tetrisState.squares[y][x]) {
                Calc.renderSquare(tetrisState.currentX + x, tetrisState.currentY +y, tetrisState, ctx)
            }
        }
    }
  }




}

