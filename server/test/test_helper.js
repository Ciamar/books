const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const config = require('config');
const db = config.get('testURI');

mongoose.connect(db);

mongoose.connection
    .once('open', () => console.log('Connected!'))
    .on('error', (error) => {
        console.warn('Error : ',error);
    });

function clear() {
    mongoose.connection.collections.books.drop();
};


module.exports = clear;
