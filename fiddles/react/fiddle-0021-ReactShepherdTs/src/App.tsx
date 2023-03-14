
import { Nav, Tetris } from './components'
import useWindowHeight from './hooks/useWindowHeight'



const App = () => {
  const height = useWindowHeight(220)
  return (
    <>
      <Nav></Nav>
      <Tetris height={height}/>
    </>
  )
}


export default App