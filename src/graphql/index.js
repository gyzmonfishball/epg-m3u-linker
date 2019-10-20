import { graphql, buildSchema } from 'graphql';

let resolverObj = {};
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
            ${queries.map(query => query).join('\n')}
        }
    `;

    const _mutationsToText = () => mutations.length > 0 ? `
        type Mutation {
            ${mutations.map(mutation => mutation).join('\n')}
        }
    `:'';
    
    const _modelsToText = () => models.map(model => model).join('\n');

    const _schemaToText = () => `
        {queries}
        {models}
        {mutations}
    `
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
    this._add = resolver => resolverObj = {...resolverObj, ...resolver};
}

Resolver.prototype.add = function(resolver) { this._add(resolver); }

export const resolver = new Resolver();

function GraphQLUtils () {
    this._query = (query) => graphql(schema.get(), query, resolverObj);
    this._addQueries = (queries) => queries.map(query => schema.addQuery(query));
    this._addMutations = (mutations) => mutations.map(mutation => schema.addMutation(mutation));
    this._addResolvers = (resolvers) => resolvers.map(r => resolver.add(r));
}

GraphQLUtils.prototype = {
    query: function(query) { return this._query(query); },
    addQueries: function(queries) { return this._addQueries(queries); },
    addMutations: function(mutations) { return this._addMutations(mutations); },
    addResolvers: function(resolvers) { return this._addResolvers(resolvers); },
    resolver: function() { return resolverObj; },
    queries: function() { return queries; },
    mutations: function() { return mutations; },
    models: function() { return models; },
    schema: function() { return schema.get(); }
}

export const graphQLUtils = new GraphQLUtils();

function GraphQLBuilder (options = {}) {

    let _config = {
        model: null,
        queries: [],
        mutations: [],
        resolvers: []
    };

    (() => { 
        Object.assign(_config, options);
        _config.model && schema.addModel(_config.model);
        _config.queries.length > 0 && graphQLUtils.addQueries(_config.queries);
        _config.mutations.length > 0 && graphQLUtils.addMutations(_config.mutations);
        _config.resolvers.length > 0 && graphQLUtils.addResolvers(_config.resolvers);
    })();

}

export default GraphQLBuilder;