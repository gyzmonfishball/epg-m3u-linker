import Model from '..';

const M3uConfig = new Model({
    tblConfig: {
        name: 'tbl_m3uconfig',
        columns: [
            { name: 'id', type: 'INTEGER', primaryKey: true },
            { name: 'name', type: 'TEXT' },
            { name: 'created', type: 'DATETIME' },
            { name: 'updated', type: 'DATETIME' },
        ]
    },
    graphQLConfig: {
        models: [
            {
                name: 'M3uConfig',
                fields: [
                    { name: 'id', type: 'ID!'},
                    { name: 'name', type: 'String!' },
                    { name: 'channels', type: '[M3uChannel!]' },
                    { name: 'created', type: 'DateTime!' },
                    { name: 'updated', type: 'DateTime' }
                ]
            },
            {
                name: 'M3uConfigInput',
                fields: [
                    { name: 'name', type: 'String!' },
                    { name: 'created', type: 'DateTime!' }
                ]
            }
        ],
        queries: [
            { name: 'getM3uConfig', params: 'id: ID!', type: 'M3uConfig' } 
        ],
        mutations: [
            { name: 'setM3uConfig', params: 'input: M3uConfigInput', type: 'M3uConfig' }
        ],
        resolvers: [
            { setM3uConfig: input => global.db.createRow('tbl_m3uconfig', input) }
        ]
    }
});

export default M3uConfig;