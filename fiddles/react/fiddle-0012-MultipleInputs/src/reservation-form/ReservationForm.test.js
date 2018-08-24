import React from 'react';
import ReactDOM from 'react-dom';
import ReservationForm from './ReservationForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ReservationForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});
