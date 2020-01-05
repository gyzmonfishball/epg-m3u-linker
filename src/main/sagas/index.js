import { all, takeEvery } from 'redux-saga/effects';

import { UPLOAD_M3U } from '../../shared/actionCreators/m3u'


function* processM3U(action) {
  try {
    console.log('Reading file')

    const {
      payload: {
        value,
      },
    } = action;

    let count = 0;

    const fs = require('fs');
    const upfile = fs.createReadStream(value.path);

    upfile.on('data', function(data) {
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