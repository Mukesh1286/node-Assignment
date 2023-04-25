const express = require('express');
const app = express();


app.use(express.json());
// Import all routes
const users = require('./routes/user')



app.use('/api/user', users)

module.exports = app
