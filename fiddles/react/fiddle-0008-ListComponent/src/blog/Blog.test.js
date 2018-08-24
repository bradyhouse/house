import React from 'react';
import ReactDOM from 'react-dom';
import Blog from './Blog';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Blog />, div);
  ReactDOM.unmountComponentAtNode(div);
});
