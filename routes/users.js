const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const User = require('../models/User');

// @route POST /api/users/register
// @desc Register new user
// @access PUBLIC

router.post('/register', (req, res) => {
  User.findOne({ name: req.body.name }).then(user => {
    if (user) return res.status(400).json('Username is taken.');

    const newUser = new User({
      name: req.body.name,
      password: req.body.password
    });

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
  const { name, password } = req.body;
  //Find user
  User.findOne({ name: req.body.name }).then(user => {
    if (!user)
      return res
        .status(400)
        .json({ message: 'Incorrect Username or Password' });
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, name: user.name };

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

module.exports = router;
