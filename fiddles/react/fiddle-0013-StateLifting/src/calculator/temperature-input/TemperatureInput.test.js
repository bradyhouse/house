import React from 'react';
import ReactDOM from 'react-dom';
import TemperatureInput from './TemperatureInput';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TemperatureInput />, div);
  ReactDOM.unmountComponentAtNode(div);
});
