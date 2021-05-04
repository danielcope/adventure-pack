import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {HashRouter,BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'

const Router = process.env.NODE_ENV ==='development' ? HashRouter : BrowserRouter


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
