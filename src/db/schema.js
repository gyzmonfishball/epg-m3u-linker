import { Column, ForeignKey } from './column';
import Table from './table';

import * as constants from './constants';

const postproccessId = new Column({ name:'id', type: constants.DATA_TYPE_INT, primaryKey: true });
const postproccessName = new Column({ name: 'name', type: constants.DATA_TYPE_TEXT });
const postproccessGrab = new Column({ name: 'grab', type: constants.DATA_TYPE_TEXT });
const postproccessRun = new Column({ name: 'run', type: constants.DATA_TYPE_TEXT });

const TblPostProcess = new Table({
    name: 'tbl_webgrabpostprocess',
    columns: [
        postproccessId,
        postproccessName,
        postproccessGrab,
        postproccessRun
    ]
})


const retryId = new Column({ name:'id', type: constants.DATA_TYPE_INT, primaryKey: true });
const retryChanneldelay = new Column({ name: 'channel_delay', type: constants.DATA_TYPE_INT });
const retryIndexdelay = new Column({ name: 'index_delay', type: constants.DATA_TYPE_INT });
const retryShowdelay = new Column({ name: 'show_delay', type: constants.DATA_TYPE_INT });
const retryTimeout = new Column({ name: 'time_out', type: constants.DATA_TYPE_INT });

const TblRetry = new Table({
    name: 'tbl_webgrabretry',
    columns: [
        retryId,
        retryChanneldelay,
        retryIndexdelay,
        retryShowdelay,
        retryTimeout
    ]
})


const channelId = new Column({ name:'id', type: constants.DATA_TYPE_INT, primaryKey: true });
const channelName = new Column({ name: 'name', type: constants.DATA_TYPE_TEXT });
const channelSite = new Column({ name: 'site', type: constants.DATA_TYPE_TEXT });
const channelSiteid = new Column({ name:'site_id', type: constants.DATA_TYPE_INT });
const channelUpdate = new Column({ name: 'c_update', type: constants.DATA_TYPE_TEXT });
const channelXmltvid = new Column({ name:'xmltv_id', type: constants.DATA_TYPE_TEXT });

const TblChannel = new Table({
    name: 'tbl_webgrabchannel',
    columns: [
        channelId,
        channelName,
        channelSite,
        channelSiteid,
        channelUpdate,
        channelXmltvid
    ]
})


const configId = new Column({ name:'id', type: constants.DATA_TYPE_INT, primaryKey: true });
const configFilename = new Column({ name: 'filename', type: constants.DATA_TYPE_TEXT });
const configMode = new Column({ name: 'mode', type: constants.DATA_TYPE_TEXT });
const configPostprocess = new Column({ name: 'postprocess_id', type: constants.DATA_TYPE_INT });
const configUseragent = new Column({ name: 'useragent', type: constants.DATA_TYPE_TEXT });
const configLogging = new Column({ name: 'logging', type: constants.DATA_TYPE_TEXT });
const configRetry = new Column({ name: 'retry_id', type: constants.DATA_TYPE_INT });
const configSkip = new Column({ name: 'skip', type: constants.DATA_TYPE_TEXT });
const configTimespan = new Column({ name: 'timespan', type: constants.DATA_TYPE_TEXT });
const configUpdate = new Column({ name: 'c_update', type: constants.DATA_TYPE_TEXT });
const configChannel = new Column({ name: 'channel_id', type: constants.DATA_TYPE_INT });

const TblConfig = new Table({
    name: 'tbl_webgrabconfig',
    columns: [
        configId,
        configFilename,
        configMode,
        configPostprocess,
        configUseragent,
        configLogging,
        configRetry,
        configSkip,
        configTimespan,
        configUpdate,
        configChannel
    ],
    foreignKeys: [
        new ForeignKey({ column: configPostprocess, ref: { table: TblPostProcess, column: postproccessId } }),
        new ForeignKey({ column: configRetry, ref: { table: TblRetry, column: retryId } }),
        new ForeignKey({ column: configChannel, ref: { table: TblChannel, column: channelId } }),
    ]
});

const TableList = [
    TblPostProcess,
    TblRetry,
    TblChannel,
    TblConfig
];

export default TableList;