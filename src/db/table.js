import { Column, ForeignKey } from './column';

const tables = [];

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

    (() => {
        Object.assign(_config, options);
        tables.push(this);
    })();
}

Table.prototype.create = function(db) { this._create(db); }
Table.prototype.name = function() { return this._name() }

export default Table;

export tables;