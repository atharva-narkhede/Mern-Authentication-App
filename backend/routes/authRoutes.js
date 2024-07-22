const express = require('express');
const router = express.Router();
const passport = require('passport');

// Google authentication routes
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect to React app
    res.redirect('http://localhost:3000'); // Adjust this URL as needed
  });

// GitHub authentication routes
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect to React app
    res.redirect('http://localhost:3000'); // Adjust this URL as needed
  });

module.exports = router;
