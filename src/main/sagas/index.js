import { all, takeEvery } from 'redux-saga/effects';

import { UPLOAD_M3U } from '../../shared/actionCreators/m3u'
import { readFileByLine } from '../utils';
import { M3UPROPMAP } from '../utils/constants';

function* processM3U(action) {
  try {
    console.log('Reading file')

    const {
      payload: {
        value,
      },
    } = action;

    const channels = [];
    const links = [];

    let count = 0;
    readFileByLine(
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
                //console.log(m3uProp[0].split(/["=]/).filter(item => item));
              }
            });
            channels.push(channel);
            break;

          case /https?:\/\/.*/g.test(line):
            links.push(line);
            break;

          case /#EXTM3U/g.test(line):
            break;

          default:
            throw `Not a valid M3U formatted line: ${line}`;
        }
      }, 
      (data) => {
        count += data.length;
        //console.log(count/value.size*100);
      }).then(
        console.log({channels, links})
      );

      

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