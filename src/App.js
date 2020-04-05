import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.css';
import SlbiEmail from './containers/SlbiEmail/SlbiEmail';

function App() {
  return (
    < BrowserRouter >
      <div className=".App">
        <SlbiEmail />
      </div>
    </ BrowserRouter>
  );
}

export default App;
