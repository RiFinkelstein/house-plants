import React from 'react';
// import ReactDOM from 'react-dom';
import App from './App';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
const container = document.getElementById('root');
const app = createRoot(container);

app.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
