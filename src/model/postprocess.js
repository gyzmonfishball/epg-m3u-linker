import Model from '.';

const PostProcess = new Model({
    tblConfig: {
        name: 'tbl_webgrabpostprocess',
        columns: [
            { name: 'id', type: 'INTEGER', primaryKey: true },
            { name: 'name', type: 'TEXT' },
            { name: 'grab', type: 'TEXT' },
            { name: 'run', type: 'TEXT' }
        ]
    },
    graphQLConfig: {
        model: {
            name: 'PostProcess',
            fields: [
                { name: 'id', type: 'ID!'},
                { name: 'name', type: 'String' },
                { name: 'grab', type: 'String' },
                { name: 'run', type: 'String' }
            ]
        },
        queries: [
           { name: 'getPostProcess', params: 'id: ID!', type: 'PostProcess' } 
        ]
    }
});

export default PostProcess;