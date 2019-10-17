import channel from '../model/channel';
import config from '../model/config';
import postprocess from '../model/postprocess';
import retry from '../model/retry';

const schema = [
    channel.tblInstance(),
    config.tblInstance(),
    postprocess.tblInstance(),
    retry.tblInstance()
];

export default schema;