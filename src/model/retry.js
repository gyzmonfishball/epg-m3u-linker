import Model from '.';

const Retry = new Model({
    tblConfig: {
        name: 'tbl_webgrabretry',
        columns: [
            { name: 'id', type: 'INTEGER', primaryKey: true },
            { name: 'channel_delay', type: 'INTEGER' },
            { name: 'index_delay', type: 'INTEGER' },
            { name: 'show_delay', type: 'INTEGER' },
            { name: 'time_out', type: 'INTEGER' }
        ]
    },
    graphQLConfig: {
        model: {
            name: 'Retry',
            fields: [
                { name: 'id', type: 'ID!'},
                { name: 'channelDelay', type: 'Int' },
                { name: 'indexDelay', type: 'Int' },
                { name: 'showDelay', type: 'Int' },
                { name: 'timeOut', type: 'Int' },
            ]
        },
        queries: [
           { name: 'getRetry', params: 'id: ID!', type: 'Retry' } 
        ]
    }
});

export default Retry;