import Model from '..';

const ConfigToChannel = new Model({
    tblConfig: {
        name: 'tbl_m3uconfig_to_m3uchannel',
        columns: [
            { name: 'config_id', type: 'INTEGER'},
            { name: 'channel_id', type: 'INTEGER'},
        ],
        foreignKeys: [
            { column: 'config_id', ref: { table: 'tbl_m3uconfig', column: 'id' } },
            { column: 'channel_id', ref: { table: 'tbl_m3uchannel', column: 'id' } },
        ],
        primaryKeys: ['config_id', 'channel_id']
    }
});

export default ConfigToChannel;