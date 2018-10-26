const express = require('express');
const router = express.Router();
const passport = require('passport');

// @route GET /api/dashboard
// @desc Return dashboard
// @access PRIVATE
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log(req);
    res.json({ msg: `Welcome back, ${req.user.name}` });
  }
);

module.exports = router;
