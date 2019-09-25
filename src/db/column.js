
export function Column(options = {}) {

    let _config = {
        name: null,
        type: null,
        primaryKey: false,
        notNull: false,
        unique: false,
        defaultVal: null
    }

    this._string = () => '{name} {type}{primaryKey}{notNull}{unique}{default}'
        .replace('{name}', _config.name)
        .replace('{type}', _config.type)
        .replace('{primaryKey}', _config.primaryKey ? ' PRIMARY KEY' : '')
        .replace('{notNull}', _config.notNull ? ' NOT NULL' : '')
        .replace('{unique}', _config.unique ? ' UNIQUE' : '')
        .replace('{default}', _config.defaultVal ? ` DEFAULT ${_config.defaultVal}` : '');

    this._name = () => _config.name;

    (() => Object.assign(_config, options))();
}

Column.prototype.String = function() { return this._string() }
Column.prototype.name = function() { return this._name() }

export function ForeignKey (options = {}) {

    let _config = {
        column: null,
        ref: null
    }

    this._string = () => 'FOREIGN KEY({column}) REFERENCES {refTable}({refColumn})'
        .replace('{column}', _config.column)
        .replace('{refTable}', _config.ref.table.name())
        .replace('{refColumn}', _config.ref.column);

    (() => Object.assign(_config, options))();
}

ForeignKey.prototype.String = function() { return this._string() };

