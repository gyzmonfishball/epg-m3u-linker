//import * as tables from './schema';

const sqlite3 = require('sqlite3').verbose();

function DB (options) {

    let _config = {
        path: null,
        openOpts: sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE
    }

    let _instance = null;

    this._handleResponse = (err, msg) => {
        if (err) console.error(err.message);
        else console.log(msg);
    }

    this._connect = () => new sqlite3.Database(_config.path, _config.openOpts, err => { 
        this._handleResponse(err, 'Connected to main database')
    });

    this._close = () => _dbInstance.close(err => this._handleResponse(err, 'Closed the database connection'));

    this._init = () => { _instance = this._connect(); }

    this._getInstance = () => _instance;

    this._createRow = (table, fields) => {
        const insert_query = 'INSERT INTO {table}({columns}) VALUES ({values});'
            .replace('{table}', table)
            .replace('{columns}', Object.keys(fields).join(', '))
            .replace('{values}', Object.values(fields).join(', '));
       
        _instance.run(insert_query, err => this._handleResponse(err, `Values for ${table} successfully inserted`));

        if (typeof(this.lastID) !== 'undefined') {
            const get_query = 'SELECT * FROM {table} WHERE id = {lastID};'
                .replace('{table}', table)
                .replace('{lastID}', this.lastID);
                
            return _instance.get(get_query, (err, row) => {
                if (err) {
                    console.error(err.message);
                    return undefined
                }
                return row
            });
        }

        return undefined
        
    }

    (() => Object.assign(_config, options))();

}

DB.prototype = {
    init: function() { return this._init(); },
    close: function() { this._close(); },
    instance: function() { return this._getInstance(); },
    handleResponse: function(err, msg) { return this._handleResponse(err, msg); },
    createRow: function(table, fields) { return this._createRow(table, fields); }
}

export default DB;