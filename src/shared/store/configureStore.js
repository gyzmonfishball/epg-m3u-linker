import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import getRootReducer from '../reducers';
import {
  forwardToMain,
  forwardToRenderer,
  triggerAlias,
  replayActionMain,
  replayActionRenderer,
} from 'electron-redux';
import DevTools from '../../renderer/main/components/DevTools';

/**
 * @param  {Object} initialState
 * @param  {String} [scope='main|renderer']
 * @return {Object} store
 */

function configureMainStore() {
    middleware = [
        triggerAlias,
        forwardToRenderer,
    ];

    const enhanced = [
        applyMiddleware(...middleware),
    ]

    return compose(...enhanced);
}

function configureRendererStore() {

    const router = routerMiddleware(hashHistory);

    middleware = [
        forwardToMain,
        router,
    ];

    const enhanced = [
        applyMiddleware(...middleware),
    ];

    enhanced.push(DevTools.instrument());
    enhanced.push(persistState(
      window.location.href.match(
        /[?&]debug_session=([^&]+)\b/
      )
    ));
    
    return compose(...enhanced);
}

 export default function configureStore(initialState, scope = 'main') {

  const enhancer = (scope == 'main') ? configureMainStore() : configureRendererStore();
  const rootReducer = getRootReducer(scope);
  const store = createStore(rootReducer, initialState, enhancer);

  if (!process.env.NODE_ENV && module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers'));
    });
  }

  if (scope === 'main') {
    replayActionMain(store);
  } else {
    replayActionRenderer(store);
  }

  return store;
}