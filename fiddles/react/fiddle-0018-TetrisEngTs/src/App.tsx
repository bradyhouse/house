
import Testris from './components'
import useWindowHeight from './hooks/useWindowHeight'


const App = () => {

  const height = useWindowHeight(150)


  return (
    <>
      <Testris height={height}/>
    </>
  )
}


export default App