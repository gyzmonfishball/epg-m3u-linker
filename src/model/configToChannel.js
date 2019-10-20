import Model from '.';

const ConfigToChannel = new Model({
    tblConfig: {
        name: 'tbl_webgrabconfig_to_channel',
        columns: [
            { name: 'config_id', type: 'INTEGER'},
            { name: 'channel_id', type: 'INTEGER'},
        ],
        foreignKeys: [
            { column: 'config_id', ref: { table: 'tbl_webgrabconfig', column: 'id' } },
            { column: 'channel_id', ref: { table: 'tbl_webgrabchannel', column: 'id' } },
        ],
        primaryKeys: ['config_id', 'channel_id']
    }
});

export default ConfigToChannel;