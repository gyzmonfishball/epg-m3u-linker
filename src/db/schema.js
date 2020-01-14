import webgrabChannel from '../model/webgrab/channel';
import webgrabConfig from '../model/webgrab/config';
import webgrabPostprocess from '../model/webgrab/postprocess';
import webgrabRetry from '../model/webgrab/retry';
import webgrabConfigToChannel from '../model/webgrab/configToChannel';

const schema = [
    webgrabChannel.tblInstance(),
    webgrabConfig.tblInstance(),
    webgrabPostprocess.tblInstance(),
    webgrabRetry.tblInstance(),
    webgrabConfigToChannel.tblInstance()
];

export default schema;