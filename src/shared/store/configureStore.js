import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  forwardToMain,
  forwardToRenderer,
  replayActionMain,
  replayActionRenderer,
  triggerAlias,
} from 'electron-redux';
import getRootReducer from '../../main/reducers';


/**
 * @param  {Object} initialState
 * @param  {String} [scope='main|renderer']
 * @return {Object} store
 */
export default function configureStore(initialState, scope = 'main') {
  let middleware = [];

  if (scope === 'renderer') {
    middleware = [
      forwardToMain,
      ...middleware,
    ];
  }

  if (scope === 'main') {
    middleware = [
      triggerAlias,
      ...middleware,
      forwardToRenderer,
    ];
  }


  const rootReducer = getRootReducer();
  const store = createStore(rootReducer, initialState, composeWithDevTools(
    applyMiddleware(...middleware),
  ));

  if (scope === 'main')
    replayActionMain(store);
  else 
    replayActionRenderer(store);

  return store;
}
