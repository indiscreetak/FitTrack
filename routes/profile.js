const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');

const Profile = require('../models/Profile');
const User = require('../models/User');

// @route GET api/profile/test
// @desc Tests profile route
// @access Public

router.get('/test', (req, res) => res.json({ msg: 'Profile page works' }));

// @route GET api/profile/
// @desc Get current users profile
// @access Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'No profile for this user';
          return res.status(404).json({ errors });
        }
        res.json({ profile });
      })

      .catch(err => res.status(404).json(err));
  }
);
// @route GET api/profile/:id
// @desc Get Profile by id
// @access Private

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.params.id })
      .populate('user', ['name', 'email'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'there is no profile for this user';
          res.status(404).json(errors);
        }

        res.json({ profile });
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route POST api/profile/
// @desc Get current users profile
// @access Private

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    const profileFields = {};

    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.steps) profileFields.steps = req.body.steps;
    if (req.body.calories) profileFields.calories = req.body.calories;
    if (req.body.weight) profileFields.weight = req.body.weight;
    if (req.body.friends) {
      const trim = req.body.friends.trim();
      profileFields.friends = trim.split(',');
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        )
          .then(profile => res.json(profile))
          .catch(err => res.json('an error'));
      } else {
        // Check if handle exits
        Profile.findOne({ user: req.user.id })
          .then(profile => {
            if (!profile) {
              new Profile(profileFields)
                .save()
                .then(profile => res.json(profile));
            } else {
              errors.handle = 'User doesnt exist';
              res.status(400).json(errors);
            }
          })
          .catch(err => res.status(400).json('errordfdfd' + err));
      }
    });
  }
);

module.exports = router;

router.post(
  '/exercises',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    const exerciseFields = {
      date: Date.now(),
      activity: req.body.exerciseActivity,
      distance: req.body.exerciseDistance,
      calburn: req.body.exerciseCalBurn
    };

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        profile.exercises.unshift(exerciseFields);

        profile.save().then(profile => res.json(profile));
      })
      .catch(err =>
        res.status(404).json('No profile found for ' + req.user.id)
      );
  }
);

module.exports = router;
