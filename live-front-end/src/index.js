import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import LiveApp from './App';

import store from './Store.js';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
ReactDOM.render(
  <Provider store={store}>
    <LiveApp />
  </Provider>,
   document.getElementById('root')
 );
