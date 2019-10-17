import { Column, ForeignKey } from './column';

function Table(options = {}) {

    let _config = {
        columns: [],
        name: null,
        foreignKeys: []
    }

    const _columnsToString = (columns, columnType) => columns.map(column => new columnType(column).String()).join(', ');

    this._create = (db) => {
        const query = 'CREATE TABLE IF NOT EXISTS {name} ({columns}{foreignKeys});'
            .replace('{name}', _config.name)
            .replace('{columns}', _columnsToString(_config.columns, Column))
            .replace('{foreignKeys}', _config.foreignKeys.length ? `, ${_columnsToString(_config.foreignKeys, ForeignKey)}` : '');

        db.instance().run(query, err => db.handleResponse(err, `Table ${_config.name} successfully created or skipped`));
    }

    this._name = () => _config.name;

    (() => Object.assign(_config, options))();
}

Table.prototype = {
    create: function(db) { this._create(db); },
    name: function() { return this._name() }
}

export default Table;