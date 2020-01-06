export const readFileByLine = (path, lineFunction, dataFunction = () => {}) => {
    const fs = require('fs');
    const file = fs.createReadStream(path);
    const readline = require('readline');
    const readInterface = readline.createInterface({
        input: file,
        output: process.stdout,
        console: false
    });
    file.on('data', dataFunction);
    readInterface.on('line', lineFunction);
};