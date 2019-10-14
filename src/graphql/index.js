import { graphql, buildSchema } from 'graphql';

const resolverObj = {};
const models = [];
const queries = [];
const mutations = [];

function Schema () {

    const _buildModel = (model) => `
        type ${model.name} {
            ${model.fields.map(field => "{name}: {type}"
                .replace('{name}', field.name)
                .replace('{type}', field.type)
            ).join('\n')}
        }
    `;

    const _buildQuery = (query) => "{name}{params}: {type}"
        .replace('{name}', query.name)
        .replace('{params}', `(${query.params})`)
        .replace('{type}', query.type);

    const _buildMutation = (mutation) => "{name}{params}: {type}"
        .replace('{name}', mutation.name)
        .replace('{params}', `(${mutation.params})`)
        .replace('{type}', mutation.type);

    const _queriesToText = () => `
        type Query {
            ${queries.map().join('\n')}
        }
    `;

    const _mutationsToText = () => `
        type Mutation {
            ${mutations.map().join('\n')}
        }
    `;

    const _modelsToText = () => models.map().join('\n');

    const _schemaToText = () => `
            {models}
            {queries}
            {mutations}`
        .replace('{models}', _modelsToText())
        .replace('{queries}', _queriesToText())
        .replace('{mutations}', _mutationsToText());

    this._addModel = model => models.push(_buildModel(model));
    this._addQuery = query => queries.push(_buildQuery(query))
    this._addMutation = mutation => mutations.push(_buildMutation(mutation));
    this._generate = () => buildSchema(_schemaToText());
}

Schema.prototype = {
    get: function() { return this._generate(); },
    addModel: function(model) { this._addModel(model) },
    addQuery: function(query) { this._addQuery(query) },
    addMutation: function(mutation) { this._addMutation(mutation) }
};

export const schema = new Schema();

function Resolver () {
    this._add = resolver => resolverObj[resolver.key] = resolver.method;
}

Resolver.prototype.add = function(resolver) { this._add(resolver); }

export const resolver = new Resolver();

function GraphQLBuilder (options = {}) {

    let _config = {
        model: null,
        queries: [],
        mutations: [],
        resolvers: []
    }

    const _addQueries = (queries) => queries.map(query => schema.addQuery(query));
    const _addMutations = (mutations) => mutations.map(mutation => schema.addMutation(mutation));
    const _addResolvers = (resolvers) => resolvers.map(resolver => resolver.add(resolver));

    this._query = (query) => graphql(schema.get(), query, resolverObj).then(response => response);
    
    (() => { 
        Object.assign(_config, options);
        _config.model && schema.addModel(_config.model);
        _config.queries.length > 0 && _addQueries(_config.queries);
        _config.mutations.length > 0 && _addMutations(_config.mutations);
        _config.resolvers.length > 0 && _addResolvers(_config.resolvers);
    })();

}

GraphQLBuilder.prototype.query = function(query) { return this._query(query); }

export default GraphQLBuilder;