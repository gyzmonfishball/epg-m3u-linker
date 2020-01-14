import Model from '..';

const WebgrabConfig = new Model({
    tblConfig: {
        name: 'tbl_webgrabconfig',
        columns: [
            { name: 'id', type: 'INTEGER', primaryKey: true },
            { name: 'filename', type: 'TEXT' },
            { name: 'mode', type: 'TEXT' },
            { name: 'name', type: 'TEXT' },
            { name: 'postprocess_id', type: 'INTEGER' },
            { name: 'useragent', type: 'TEXT' },
            { name: 'logging', type: 'TEXT' },
            { name: 'retry_id', type: 'INTEGER' },
            { name: 'skip', type: 'TEXT' },
            { name: 'timespan', type: 'TEXT' },
            { name: 'c_update', type: 'TEXT' },
            { name: 'created', type: 'DATETIME' },
            { name: 'updated', type: 'DATETIME' }
        ],
        foreignKeys: [
            { column: 'postprocess_id', ref: { table: 'tbl_webgrabpostprocess', column: 'id' } },
            { column: 'retry_id', ref: { table: 'tbl_webgrabretry', column: 'id' } },
        ]
    },
    graphQLConfig: {
        models: [
            {
                name: 'WebgrabConfig',
                fields: [
                    { name: 'id', type: 'ID!'},
                    { name: 'filename', type: 'String' },
                    { name: 'mode', type: 'String' },
                    { name: 'name', type: 'String!' },
                    { name: 'postprocess', type: 'WebgrabPostProcess' },
                    { name: 'useragent', type: 'String' },
                    { name: 'logging', type: 'String' },
                    { name: 'retry', type: 'WebgrabRetry' },
                    { name: 'skip', type: 'String' },
                    { name: 'timespan', type: 'String' },
                    { name: 'cUpdate', type: 'String' },
                    { name: 'channels', type: '[WebgrabChannel!]' },
                    { name: 'created', type: 'DateTime' },
                    { name: 'updated', type: 'DateTime' }
                ]
            }
        ],
        queries: [
           { name: 'getConfig', params: 'id: ID!', type: 'WebgrabConfig' } 
        ]
    }
});

export default WebgrabConfig;