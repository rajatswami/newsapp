import React from 'react';
import { createRoot } from 'react-dom/client'; // 👈 correct import
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container); // create root
root.render(<App />); // render app
