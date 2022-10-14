import { useState } from 'react'

export interface ICtrl {
  isDisabled: boolean
  setValue: Function
  onClick: Function
}

enum key {
  ENTER = 'Enter',
  BACKSPACE = 'Backspace',
  TAB = 'Tab',
  COMMA = ',',
  SPACE = ' ',
  I = 'I',
  i = 'i',
  Q = 'Q',
  q = 'q',
  Z = 'Z',
  z = 'z',
  S = 'S',
  s = 's',
  T = 'T',
  t = 't',
  L = 'L',
  l = 'l',
  J = 'J',
  j = 'j'
}

const Ctrl = (props: ICtrl) => {
    
    //#region State

    const [shapes, setShapes] = useState<string>('')
    const [isDisabled, setIsDisabled] = useState<boolean>(props.isDisabled)

    //#endregion
    //#region Utils

    const isFinishedEditingKey = (event: any) => {
      return event.key === key.ENTER || key.TAB
    }

    const isKeyAllowed = (val: string) => {
      switch (val) {
        case key.I:
        case key.i:
        case key.J:
        case key.j:
        case key.L:
        case key.l:
        case key.Q:
        case key.q:
        case key.S:
        case key.s:
        case key.T:
        case key.t:
        case key.Z:
        case key.z:
        case key.COMMA:
        case key.SPACE:
        case key.ENTER:
        case key.TAB:
          return true
        default:
          return /[1-9]/.test(val)
      }
    }

    //#endregion
    //#region Event Handler

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setShapes(event.target.value)
    }

    const onClick = (event: any) => {
      props.setValue(shapes)
    }

    const onValidateShape = (shape: string) => {
      const chars: string[] = shape.trim().split('')
      
      if (chars.length !== 2) {
        return false
      }

      if(!isKeyAllowed(chars[0]) || !isKeyAllowed(chars[1])) {
        return false
      }

      return true

    }

    const onValidateKeyInput = (event: any) => {
      const value: string = String(event.target.value)
      const shapes: string[] = value.split (',')
      let disabled: boolean = false

      if (value.trim() !== '' && shapes.length) {
        shapes.forEach((shape: string) => {
          if (!onValidateShape(shape)) {
            disabled = true
          }
        })
      }

      setIsDisabled(disabled)

    }

    const onKeyDownCapture = (event: any) => {
      
      if (event.key === key.BACKSPACE) {
        return
      }

      if (!isKeyAllowed(event.key)) {
        event.preventDefault()
      }

      if (isFinishedEditingKey(event)) {
        onValidateKeyInput(event)
      }

    }

    const onMouseLeave = (event: any) => {
      onValidateKeyInput(event)
    }

    const onPasteCapture = (event: any) => {
      event.preventDefault()
    }
  
    
    //#endregion
    //#region Response

    return (
      <>
        <nav className="navbar navbar-expand-sm navbar-lite bg-lite warp-border">
          <div className="container">
              <div className="collapse navbar-collapse">
                  <ul className="navbar-nav me-auto" style={{display: 'table'}}>
                    <li className="nav-item" style={{display: 'table-cell'}}>
                      <input datatest-id="ctrl-txt"
                      style={{width: '212px'}}  
                      className="form-control me-sm-2" 
                      type="text" 
                      title="Enter <I,J,L,Q,S,T,Z>1, <...>2, ... <...>n"
                      value={shapes}
                      onChange={onChange}
                      onMouseLeave={onMouseLeave}
                      onKeyDownCapture={onKeyDownCapture}
                      onPasteCapture={onPasteCapture}
                      />
                    </li>
                    <li className="nav-item" style={{display: 'table-cell'}}>
                      <button datatest-id="ctrl-btn"
                       onClick={onClick}
                       className= "btn btn-primary"
                       disabled={isDisabled}
                       type="button">Play</button>
                    </li>
                  </ul>
                </div>
            </div>
        </nav>

      </>
    )

    //#endregion
}

export default Ctrl
