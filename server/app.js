const express = require('express');
var cors = require('cors');

// routes
const books = require('./routes/api/books');

const app = express();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Hello world!'));

// use Routes
app.use('/api/books', books);

module.exports = app;
