import Model from '.';

const Config = new Model({
    tblConfig: {
        name: 'tbl_webgrabconfig',
        columns: [
            { name: 'id', type: 'INTEGER', primaryKey: true },
            { name: 'filename', type: 'TEXT' },
            { name: 'mode', type: 'TEXT' },
            { name: 'postprocess_id', type: 'INTEGER' },
            { name: 'useragent', type: 'TEXT' },
            { name: 'logging', type: 'TEXT' },
            { name: 'retry_id', type: 'INTEGER' },
            { name: 'skip', type: 'TEXT' },
            { name: 'timespan', type: 'TEXT' },
            { name: 'c_update', type: 'TEXT' },
            { name: 'channel_id', type: 'INTEGER' }
        ]
    },
    graphQLConfig: {
        model: {
            name: 'Config',
            fields: [
                { name: 'id', type: 'ID!'},
                { name: 'filename', type: 'String' },
                { name: 'mode', type: 'String' },
                { name: 'postprocess', type: 'PostProcess' },
                { name: 'useragent', type: 'String' },
                { name: 'logging', type: 'String' },
                { name: 'retry', type: 'Retry' },
                { name: 'skip', type: 'String' },
                { name: 'timespan', type: 'String' },
                { name: 'cUpdate', type: 'String' },
                { name: 'channel', type: 'Channel' }
            ]
        },
        queries: [
           { name: 'getConfig', params: 'id: ID!', type: 'Config' } 
        ]
    }
});

export default Config;