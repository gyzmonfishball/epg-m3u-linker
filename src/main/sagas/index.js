import { all, takeEvery } from 'redux-saga/effects';

import { UPLOAD_M3U } from '../../shared/actionCreators/m3u'
import { readFileByLine } from '../utils';

function* processM3U(action) {
  try {
    console.log('Reading file')

    const {
      payload: {
        value,
      },
    } = action;

    const propMap = {
      'tvg-ID': 'ID',
      'tvg-name': 'name',
      'group-title': 'group'
    };

    let count = 0;
    readFileByLine(
      value.path, 
      (line) => {

        

        switch(true) {
          case line.startsWith('#EXTINF'):
            line.split(' ').map(prop => { 
              propKeyPair = prop.split('=');
              
              
            });
            break;
          case line.startsWith('http'):
            break;
          default:
            break;
        }
        

      }, 
      (data) => {
        count += data.length;
        console.log(count/value.size*100);
      });

  } catch (e) {
    console.log('error', e.message);
  }
}

export default function* () {
    try {
      console.log('sagas started');
      yield all([
        takeEvery(UPLOAD_M3U, processM3U),
      ]);
    } catch (e) {
      logger.log('error', e.message);
    }
  }