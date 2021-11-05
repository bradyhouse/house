import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import { LicenseManager } from 'ag-grid-enterprise';


fetch('resources.json').then((response) => {
  return response.json();
}).then((data) => {
  LicenseManager.setLicenseKey(data.license);
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
});



reportWebVitals(console.log);
