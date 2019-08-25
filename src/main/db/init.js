const sqlite3 = require('sqlite3').verbose();

export const connectDB = () => new sqlite3.Database('./main.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) console.error(err.message);
    else console.log('Connected to main database');
});

export const closeDB = () => db.close((err) => {
    if (err) return console.error(err.message);
    console.log('Closed the database connection');
})