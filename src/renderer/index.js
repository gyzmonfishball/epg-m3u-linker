import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import { remote } from 'electron';
import { Provider } from 'react-redux';
import configureStore from '../shared/store/configureStore';

import routes from './routes';

import history from './history';

// css reset
import 'normalize.css/normalize.css';

// project global styles
import './index.css';

const initialState = remote.getGlobal('state');
const store = configureStore(initialState, 'renderer');

render(
  <Provider store={store}>
    <HashRouter history={history}>
      <Route component={routes} />
    </HashRouter>
  </Provider>,
  document.querySelector('#app'),
);
