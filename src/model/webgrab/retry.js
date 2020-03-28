import Model from '..';

const tblConfig = {
    name: 'tbl_webgrabretry',
    columns: [
        { name: 'id', type: 'INTEGER', primaryKey: true },
        { name: 'channel_delay', type: 'INTEGER' },
        { name: 'index_delay', type: 'INTEGER' },
        { name: 'show_delay', type: 'INTEGER' },
        { name: 'time_out', type: 'INTEGER' }
    ]
};

const graphQLConfig = {
    models: [
        {
            name: 'WebgrabRetry',
            fields: [
                { name: 'id', type: 'ID!'},
                { name: 'channelDelay', type: 'Int' },
                { name: 'indexDelay', type: 'Int' },
                { name: 'showDelay', type: 'Int' },
                { name: 'timeOut', type: 'Int' },
            ]
        }
    ],
    queries: [
       { name: 'getRetry', params: 'id: ID!', type: 'WebgrabRetry' } 
    ]
};

export default new Model({ tblConfig, graphQLConfig });