import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
} from "react-router-dom";

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import {storeConfig, persistor} from './store/storeConfig'

import App from './App';

import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <Provider store = {storeConfig}>
    <PersistGate persistor = { persistor } loading = {null}>
      <Router>
        <App/>
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
