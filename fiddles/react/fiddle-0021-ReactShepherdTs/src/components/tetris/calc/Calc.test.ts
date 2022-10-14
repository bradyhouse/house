import { Calc, ICalc } from './Calc'


let state: ICalc = {
  columns: 10,
  rows: 20,
  width: 320,
  height: 200,
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

const newBoard = [[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]]

describe('Calc', () => {
  it('translate a letter to a bit array', () => {
    const I = [ 1, 1, 1, 1 ]
    const L = [ 1, 0, 0, 0, 1, 0, 0, 0, 1, 1 ]
    expect(Calc.toBitArray('I')).toEqual(I)
    expect(Calc.toBitArray('L')).toEqual(L)
  })

  it('can intiate a board', () => {
    const newState = Calc.initBoard(state)
    expect(newState.board).toEqual(newBoard)
   })
   
  it('can begin game', () => {
    const newState = Calc.beginCalc('S', 1, state)
    const expectedSquares = [[0,1,1,0],[1,1,0,0],[0,0,0,0],[0,0,0,0]]
    expect(newState.squares).toEqual(expectedSquares)
   })

  it('will allow valid moves', () =>{
    let newState = Calc.initBoard(state)
    newState = Calc.beginCalc('S', 1, newState)
    expect(Calc.canCalc(0, 1, null, newState)).toEqual(true)
  })

  it('will prevent invalid moves', () =>{
    let newState = Calc.initBoard(state)
    newState = Calc.beginCalc('S', 1, newState)
    expect(Calc.canCalc(-1, 1, null, newState)).toEqual(false)
  })

  it('can freeze shapes', () => {
    let newState = Calc.initBoard(state)
    newState = Calc.beginCalc('S', 1, newState)
    newState = Calc.stopCalc(newState)
    expect(newState.isFrozen).toEqual(true)
    expect(newState.squares.length).toEqual(0)
  })

  it('can clear rows', () => {
    // tbw
  })

  it ('can render squares', () => {
    // tbw
  })



})