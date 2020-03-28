import Model from '..';

const tblConfig = {
    name: 'tbl_m3uchannel',
    columns: [
        { name: 'id', type: 'INTEGER', primaryKey: true },
        { name: 'tvg_name', type: 'TEXT' },
        { name: 'tvg_color', type: 'TEXT' },
        { name: 'tvg_desc', type: 'TEXT' },
        { name: 'tvg_id', type: 'TEXT' },
        { name: 'tvg_group', type: 'TEXT' },
        { name: 'tvg_logo', type: 'TEXT' }
    ]
};

const graphQLConfig = {
    models: [
        {
            name: 'M3uChannel',
            fields: [
                { name: 'id', type: 'ID!'},
                { name: 'tvgName', type: 'String' },
                { name: 'tvgColor', type: 'String' },
                { name: 'tvgDesc', type: 'String' },
                { name: 'tvgId', type: 'String' },
                { name: 'tvgGroup', type: 'String' },
                { name: 'tvgLogo', type: 'String' }
            ]
        }
    ],
    queries: [
        { name: 'getM3uChannel', params: 'id: tvgId', type: 'M3uChannel' } 
    ],
    resolvers: [
        { getChannel: () => { return { name: 'hello world' }; } }
    ]
}

export default new Model({tblConfig, graphQLConfig});