// import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app/app';
import { DataProvider } from './components';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
  <DataProvider>
    <App />
  </DataProvider>
  // </React.StrictMode>
);
