import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Hotjar from '@hotjar/browser';

// Inicializa o Hotjar
const siteId = process.env.REACT_APP_HOTJAR_SITE_ID;
const hotjarVersion = 6;
Hotjar.init(siteId, hotjarVersion);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

