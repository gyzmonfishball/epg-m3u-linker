import { all } from 'redux-saga/effects';

export default function* () {
    try {
      console.log('sagas started');
  
      yield all([]);
    } catch (e) {
      logger.log('error', e.message);
    }
  }