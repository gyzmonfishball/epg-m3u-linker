import Model from '..';

const tblConfig = {
    name: 'tbl_webgrabconfig_to_webgrabchannel',
    columns: [
        { name: 'config_id', type: 'INTEGER'},
        { name: 'channel_id', type: 'INTEGER'},
    ],
    foreignKeys: [
        { column: 'config_id', ref: { table: 'tbl_webgrabconfig', column: 'id' } },
        { column: 'channel_id', ref: { table: 'tbl_webgrabchannel', column: 'id' } },
    ],
    primaryKeys: ['config_id', 'channel_id']
};

export default new Model({ tblConfig });