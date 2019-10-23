import { combineReducers } from 'redux';
import m3us from './m3u';
import epgs from './epg';
import matches from './match';

export default function getRootReducer() {
  const reducers = {
    m3us,
    epgs,
    matches,
  };

  return combineReducers({ ...reducers });
}
