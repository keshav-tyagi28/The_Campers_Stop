
const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../passport-setup");



router.get('/',
    passport.authenticate('google', { scope: [ 'profile', 'email' ] }
  ));
  
  
  router.get( '/callback',
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
  console.log("hello");

    // Successful authentication, redirect home.
    req.flash("success", "Welcome to Yelp Camp!");
    const redirectUrl = req.session.returnTo || "/campgrounds";
    delete req.session.returnTo;
    res.redirect(redirectUrl);
  }
);
module.exports = router