import React from 'react';
import ReactDOM from 'react-dom';
import FlavorForm from './FlavorForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FlavorForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});
