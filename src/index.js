import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App drift={0.24} volatility={0.08}/>
    <App drift={0.8} volatility={0.25}/>
    <App drift={0.5} volatility={0.6}/>
    <App drift={0.1} volatility={0.2}/>
  </React.StrictMode>,
  document.getElementById('root')
);