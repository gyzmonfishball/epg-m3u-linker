import { combineReducers } from 'redux';

export default function getRootReducer() {
  const reducers = {};

  return combineReducers({ ...reducers });
}
