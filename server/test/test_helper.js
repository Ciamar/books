process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');

const mongoInterlude = require('mongo-interlude')
let User = require('../models/User');
let Book = require('../models/Book');

const clearDb = mongoInterlude.clearDb

mongoose.Promise = global.Promise;

const config = require('config');
const db = config.get('mongoURI');

process.on('unhandledRejection', function (reason) {
    throw reason;
});

let user = {
    username: "someone",
    email: "a@a",
    password: "1234"
};

before(async () => {
    await mongoose.connect(db);
    await clearDb({ mongoose: mongoose, silent: true });

    let dbUser = new User(user);
    await dbUser.save();
});
