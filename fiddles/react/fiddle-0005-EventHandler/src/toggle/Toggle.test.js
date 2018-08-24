import React from 'react';
import ReactDOM from 'react-dom';
import Toggle from './Toggle';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Toggle />, div);
  ReactDOM.unmountComponentAtNode(div);
});
