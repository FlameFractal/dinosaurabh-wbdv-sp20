const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const users = require('./routes/users');
const config = require('./config/database');

// connect to DB
mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true, });


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


// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);


// Body Parser middleware
app.use(bodyParser.json());

app.use('/users', users);


// Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
})

app.listen(3000);
