import React from 'react';
import ReactDOM from 'react-dom';
import NameForm from './NameForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NameForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});
