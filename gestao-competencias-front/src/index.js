import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import {storeConfig, persistor} from './store/storeConfig'

import './styles/index.css';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <Provider store = {storeConfig}>
    <PersistGate persistor = { persistor } loading = {null}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
