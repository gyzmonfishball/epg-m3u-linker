import m3uChannel from '../model/m3u/channel';
import m3uConfig from '../model/m3u/config';
import m3uConfigToChannel from '../model/m3u/configToChannel';

import webgrabChannel from '../model/webgrab/channel';
import webgrabConfig from '../model/webgrab/config';
import webgrabPostprocess from '../model/webgrab/postprocess';
import webgrabRetry from '../model/webgrab/retry';
import webgrabConfigToChannel from '../model/webgrab/configToChannel';

const schema = [
    m3uChannel,
    m3uConfig,
    m3uConfigToChannel,

    webgrabChannel,
    webgrabConfig,
    webgrabPostprocess,
    webgrabRetry,
    webgrabConfigToChannel
];

export default schema.map(model => model.tblInstance());