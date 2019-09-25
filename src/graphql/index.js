import { graphql, buildSchema } from 'graphql';

const resolver = {};
const models = [];
const queries = [];
const mutations = [];

function Schema () {

    const _buildModel = (model) => {
        const fields = model.fields.map(field => "{name}: {type}"
            .replace('{name}', field.name)
            .replace('{type}', field.type)
        ).join('\n');

        return `
            type ${model.name} {
                ${fields}
            }
        `;
    }

    const _buildQuery = (query) => model.fields.map(
        field => "{name}({params}): {type}"
            .replace('{name}', field.name)
            .replace('{params}', field.params)
            .replace('{type}', field.type)
        ).join('\n');

    const _buildMutation = (mutation) => {

    }

    const _schemaToText = () => [...queries, ...models, ...mutations].join('\n');

    this._addModel = model => models.push(_buildModel(model));
    this._addQuery = query => queries.push(_buildQuery(query))
    this._generate = () => buildSchema(_schemaToText());
}

Schema.prototype = {
    get: function() { return this._generate(); },
    addModel: function(model) { this._addModel(model) },
    addQuery: function(query) { this._addQuery(query) }
}

export const schema = new Schema();

function GraphQLBuilder (options = {}) {

    let _config = {
        name: null,
        fields: [],
        resolver
    }

    this._resolver = resolver;

    this._addResolverMethod = (key, method) => _resolver[key] = method;

    this._query = (query) => graphql(this._schema, query, this._resolver).then(response => response);
    
    (() => { 
        Object.assign(_config, options);
        this._resolver = _config.resolver;
        schema.addModel(_config);
    })();

}

GraphQLBuilder.prototype = {
    schema: function() { return this._schema; },
    resolver: function() { return this._resolver; },
    addResolverMethod: function(key, method) { this._addResolverMethod(key, method); },
    query: function(query) { return this._query(query); }
}

export default GraphQLBuilder;