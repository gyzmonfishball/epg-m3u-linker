import { all, takeEvery, put } from 'redux-saga/effects';

import { 
  UPLOAD_M3U, 
  _set_pending_m3u, 
  _set_pending_m3u_progress, 
  _set_pending_m3u_status 
} from '../../shared/actionCreators/m3u';

import { readFileByLine } from '../utils';
import { getStore } from '../store';
import { M3UPROPMAP } from '../utils/constants';

import { SUCCESS, ERROR, INPROGRESS } from '../../utils/constants';

function* processM3U(action) {
  try {
    console.log('Reading file');
    yield put(_set_pending_m3u_status({status: INPROGRESS}))

    const {
      payload: {
        value,
      },
    } = action;

    const channels = [];
    const store = getStore();
    const filesize = value.size;

    let count = 0;
    let key = 0;
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
            key++;
            channels.push({...channel, key});
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
        const progress = (count/filesize) * 100;
        store && store.dispatch(_set_pending_m3u_progress(progress));
      });
      
      yield put(_set_pending_m3u(channels));
      yield put(_set_pending_m3u_status({status: SUCCESS, message: 'M3U file successfully imported'}));
      

  } catch (e) {
    console.log('error', e.message);
    yield put(_set_pending_m3u_status({status: ERROR, message: 'M3U file import failed', description: e.message}));
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