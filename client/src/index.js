import React from 'react';
import ReactDOM from 'react-dom';
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter, } from "react-router-dom";
import { AuthProvider, } from "./providers/AuthProvider";
import App from './App';
import { initMiddleware, } from 'devise-axios';

initMiddleware();

ReactDOM.render(
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>,
  document.getElementById('root')
);

