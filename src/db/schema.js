import Table from './table';

import * as constants from './constants';


const TblPostProcess = new Table({
    name: 'tbl_webgrabpostprocess',
    columns: [
        { name: 'id', type: constants.DATA_TYPE_INT, primaryKey: true },
        { name: 'name', type: constants.DATA_TYPE_TEXT },
        { name: 'grab', type: constants.DATA_TYPE_TEXT },
        { name: 'run', type: constants.DATA_TYPE_TEXT }
    ]
})


const TblRetry = new Table({
    name: 'tbl_webgrabretry',
    columns: [
        { name: 'id', type: constants.DATA_TYPE_INT, primaryKey: true },
        { name: 'channel_delay', type: constants.DATA_TYPE_INT },
        { name: 'index_delay', type: constants.DATA_TYPE_INT },
        { name: 'show_delay', type: constants.DATA_TYPE_INT },
        { name: 'time_out', type: constants.DATA_TYPE_INT }
    ]
})


const TblChannel = new Table({
    name: 'tbl_webgrabchannel',
    columns: [
        { name: 'id', type: constants.DATA_TYPE_INT, primaryKey: true },
        { name: 'name', type: constants.DATA_TYPE_TEXT },
        { name: 'site', type: constants.DATA_TYPE_TEXT },
        { name: 'site_id', type: constants.DATA_TYPE_INT },
        { name: 'c_update', type: constants.DATA_TYPE_TEXT },
        { name:'xmltv_id', type: constants.DATA_TYPE_TEXT }
    ]
})


const TblConfig = new Table({
    name: 'tbl_webgrabconfig',
    columns: [
        { name: 'id', type: constants.DATA_TYPE_INT, primaryKey: true },
        { name: 'filename', type: constants.DATA_TYPE_TEXT },
        { name: 'mode', type: constants.DATA_TYPE_TEXT },
        { name: 'postprocess_id', type: constants.DATA_TYPE_INT },
        { name: 'useragent', type: constants.DATA_TYPE_TEXT },
        { name: 'logging', type: constants.DATA_TYPE_TEXT },
        { name: 'retry_id', type: constants.DATA_TYPE_INT },
        { name: 'skip', type: constants.DATA_TYPE_TEXT },
        { name: 'timespan', type: constants.DATA_TYPE_TEXT },
        { name: 'c_update', type: constants.DATA_TYPE_TEXT },
        { name: 'channel_id', type: constants.DATA_TYPE_INT }
    ],
    foreignKeys: [
        { column: 'postprocess_id', ref: { table: TblPostProcess, column: 'id' } },
        { column: 'retry_id', ref: { table: TblRetry, column: 'id' } },
        { column: 'channel_id', ref: { table: TblChannel, column: 'id' } },
    ]
});

const TableList = [
    TblPostProcess,
    TblRetry,
    TblChannel,
    TblConfig
];

export default TableList;