const app = require("./app");
const connectDB = require('./config/db');

// Connect Database
connectDB();

const port = process.env.PORT || 8888;

module.exports = app.listen(port, () => console.log(`server starting on port ${port}!`));;
