
function Table(options = {}) {

    let _config = {
        columns: [],
        name: null,
        foreignKeys: []
    }

    const _columnsToString = columns => columns.map(column => column.String()).join(', ');

    this._create = (db) => {
        const query = 'CREATE TABLE IF NOT EXISTS {name} ({columns}{foreignKeys});'
            .replace('{name}', _config.name)
            .replace('{columns}', _columnsToString(_config.columns))
            .replace('{foreignKeys}', _config.foreignKeys.length ? `, ${_columnsToString(_config.foreignKeys)}` : '');

        db.instance().run(query, err => db.handleResponse(err, `Table ${_config.name} successfully created or skipped`));
    }

    this._name = () => _config.name;

    (() => Object.assign(_config, options))();
}

Table.prototype.create = function(db) { this._create(db); }
Table.prototype.name = function() { return this._name() }

export default Table;