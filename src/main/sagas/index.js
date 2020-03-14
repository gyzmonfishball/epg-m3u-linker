import { all, takeEvery, put, select } from 'redux-saga/effects';

import { UPLOAD_M3U, GET_PROGRESS, _set_pending_m3u, _set_pending_m3u_progress } from '../../shared/actionCreators/m3u'
import { readFileByLine } from '../utils';
import { M3UPROPMAP } from '../utils/constants';
import { getStore } from '../store';

function* processM3U(action) {
  try {
    console.log('Reading file')

    const {
      payload: {
        value,
      },
    } = action;

    const channels = [];
    const store = getStore();

    let count = 0;
    yield readFileByLine(
      value.path, 
      (line) => {

        switch(true) {

          case line.startsWith('#EXTINF'):
            let channel = {};
            Object.keys(M3UPROPMAP).map((key, idx) => {
              const re = new RegExp(`${key}=".*?"`, 'g'); // Check for m3ukey="value" in line
              const m3uProp = line.match(re);
              if (m3uProp != null) {
                channel[key] = m3uProp[0].split(/[=]/).map(item => item.replace(/"/g, ''))[1];
              }
            });
            channels.push(channel);
            break;

          case /https?:\/\/.*/g.test(line):
            channels[channels.length-1].link = line
            break;

          case /#EXTM3U/g.test(line):
            break;

          default:
            throw `Not a valid M3U formatted line: ${line}`;
        }
      }, 
      (data) => {
        count += data.length;
        store && store.dispatch(_set_pending_m3u_progress(count/value.size*100));
      });
      
      yield put(_set_pending_m3u(channels))
      

  } catch (e) {
    console.log('error', e.message);
  }
}

export default function* () {
    try {
      console.log('sagas started');
      yield all([
        takeEvery(UPLOAD_M3U, processM3U)
      ]);
    } catch (e) {
      logger.log('error', e.message);
    }
  }