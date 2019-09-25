import Table from '../db/table';
import GraphQL from '../graphql';

function Model(options = {}) {

    let _config = {
        tblConfig: {},
        graphQLConfig: {}
    }

    this._tblInstance = null;
    this._graphQLInstance = null;

    const _generateTable = () => new Table(_config.tblConfig);

    const _generateGraphQL = () => new GraphQL(_config.graphQLConfig);

    (() => {
        Object.assign(_config, options);
        this._tblInstance = _generateTable();
        this._graphQLInstance = _generateGraphQL();
    })();

}

Model.prototype = {
    tblInstance: function() { return this._tblInstance; },
    graphQLInstance: function() { return this._graphQLInstance; }
}

export default Model;