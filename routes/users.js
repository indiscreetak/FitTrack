const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const validateUser = require('../validation/register');
const passport = require('passport');

const User = require('../models/User');

// @route POST /api/users/register
// @desc Register new user
// @access PUBLIC

router.post('/register', (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) return res.status(400).json({ message: 'Email is taken.' });

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    const { error } = validateUser(req.body);

    if (error) res.status(400).json({ message: error.details[0].message });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) console.log(err);
        newUser.password = hash;
        newUser
          .save()
          .then(user => res.json(user))
          .catch(err => console.log(err));
      });
    });
  });
});

// @route POST /api/users/login
// @desc Login user
// @access PUBLIC
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  //Find user
  User.findOne({ email: email }).then(user => {
    if (!user)
      return res.status(400).json({ message: 'Incorrect Email or Password' });
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, name: user.name, email: user.email };

        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: `Bearer ${token}`,
              error: err
            });
          }
        );
      } else {
        return res.status(400).json({ message: 'Password Incorrect' });
      }
    });
  });
});

// @route GET /api/users/current
// @desc Return current user
// @access PRIVATE

router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log(req);
    res.json({ msg: `Welcome back, ${req.user.name}` });
  }
);

module.exports = router;
