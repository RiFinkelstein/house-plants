import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const app = createRoot(container);
app.render(<App tab='home' />)
