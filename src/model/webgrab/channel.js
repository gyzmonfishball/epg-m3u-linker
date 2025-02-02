import Model from '..';

const tblConfig = {
    name: 'tbl_webgrabchannel',
    columns: [
        { name: 'id', type: 'INTEGER', primaryKey: true },
        { name: 'name', type: 'TEXT' },
        { name: 'site', type: 'TEXT' },
        { name: 'site_id', type: 'INTEGER' },
        { name: 'c_update', type: 'TEXT' },
        { name: 'xmltv_id', type: 'TEXT' }
    ]
};

const graphQLConfig = {
    models: [
        {
            name: 'WebgrabChannel',
            fields: [
                { name: 'id', type: 'ID!'},
                { name: 'name', type: 'String!' },
                { name: 'site', type: 'String' },
                { name: 'siteID', type: 'Int' },
                { name: 'cUpdate', type: 'String' },
                { name: 'xmltvID', type: 'String' }
            ]
        }
    ],
    queries: [
        { name: 'getChannel', params: 'id: ID!', type: 'WebgrabChannel' } 
    ],
    resolvers: [
        { getChannel: () => { return { name: 'hello world' }; } }
    ]
};

export default new Model({ tblConfig, graphQLConfig });