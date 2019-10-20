import channel from '../model/channel';
import config from '../model/config';
import postprocess from '../model/postprocess';
import retry from '../model/retry';
import configToChannel from '../model/configToChannel';

const schema = [
    channel.tblInstance(),
    config.tblInstance(),
    postprocess.tblInstance(),
    retry.tblInstance(),
    configToChannel.tblInstance()
];

export default schema;