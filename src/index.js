import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './features/Layout/Layout'
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store/store'
import './sass/main.scss'
ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <Layout />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
