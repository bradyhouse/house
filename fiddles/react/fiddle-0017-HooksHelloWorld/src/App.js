import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';



function App(props) {
  const [clicked, setClicked] = useState(false);
  function doClick() {
    setClicked(true);
  }


  return (
    <div className="App">
      <br />
      <button
      onClick={clicked ? undefined : doClick}
      disabled={clicked}
    >
      You Can Only Click Me Once
    </button>
    </div>
  );
}

export default App;
