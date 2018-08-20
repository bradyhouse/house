import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Element(props) {
  return <h1>{props.value}</h1>;
}

function App() {
  return (
    <div>
      <Element value="1" />
      <Element value="2" />
      <Element value="3" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);