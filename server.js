const express = require('express');
const app = express();
const mongoose = require('mongoose');
const startupDebug = require('debug', 'app:startup');
const users = require('./routes/users');
const profile = require('./routes/profile');
const passport = require('passport');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next();
});

const db = require('./config/keys').mongoURI;

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log('Error: ', err));

// PASSPORT
app.use(passport.initialize());

// PASSPORT CONFIG
require('./config/passport.js')(passport);

app.use('/api/users', users);
app.use('/api/profile', profile);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening on port ${port}...`));
