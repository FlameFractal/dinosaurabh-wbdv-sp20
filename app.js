const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const config = require('./config/database');

// connect to DB
mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, });


// On Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database '+config.database);
  });
  
// On Error
mongoose.connection.on('error', (err) => {
    console.log('Database error: '+err);
  });

// CORS middleware
app.use(cors());

// Body Parser middleware
app.use(bodyParser.json());

// routes
app.get('/health', (req, res) => res.send({ success: true }));
app.use('/users', require('./routes/users'));

// catch all route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
})

app.listen(config.port || 3000, () => {
	console.log(`server listening at port ${config.port || 3000}`)
});
