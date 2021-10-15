const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const config = require('config');
const connectDB = require('./config/db');
const urlencodedParser = bodyParser.urlencoded({extended: false});

// routes
const users = require('./routes/api/users');
const books = require('./routes/api/books');

const app = express();

// Init Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json(), urlencodedParser);
app.use(express.json({ extended: false }));

// use Routes
app.use('/books', books);
app.use('/', users);

// Connect Database
connectDB();

const port = config.get('port');

exports.server = app.listen(port, () => console.log(`server starting on port ${port}!`));;
exports.app = app;
