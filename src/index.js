import React from 'react'
import ReactDOM from 'react-dom';
import App from './App';
import init  from './audioContextWrapper.js' 

init()

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
