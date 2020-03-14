export const readFileByLine = (path, lineFunction, dataFunction = () => {}) => {

    let resolve;
    const p = new Promise(_resolve => resolve = _resolve);

    const fs = require('fs');
    const file = fs.createReadStream(path);
    const readline = require('readline');

    const readInterface = readline.createInterface({
        input: file,
        output: process.stdout,
        console: false
    });

    readInterface.on('close', () => resolve());

    file.on('data', function(data) {
        //console.log(data);
        dataFunction(data);
    });

    readInterface.on('line', line => lineFunction(line));

    return p;
    
};