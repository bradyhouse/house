import React from 'react';
import ReactDOM from 'react-dom';
import EssayForm from './EssayForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EssayForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});
