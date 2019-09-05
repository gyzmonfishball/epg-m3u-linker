//import * as tables from './schema';

const sqlite3 = require('sqlite3').verbose();

const DB = (options) => {

    let _config = {
        path: null,
        openOpts: sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE
    }

    let _instance = null;

    const _handleResponse = (err, msg) => {
        if (err) console.error(err.message);
        else console.log(msg);
    }

    const _connect = () => new sqlite3.Database(_config.path, _config.openOpts, err => _handleResponse(err, 'Connected to main database'));

    const _close = () => _dbInstance.close(err => _handleResponse(err, 'Closed the database connection'));

    const _init = () => { _instance = _connect(); }

    const _getInstance = () => _instance;

    (() => Object.assign(_config, options))();

    return {
        init: _init,
        close: _close,
        instance: _getInstance,
        handleResponse: _handleResponse
    }

}

export default DB;