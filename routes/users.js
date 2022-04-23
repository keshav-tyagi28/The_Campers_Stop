const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const users = require('../controllers/users');
const Campground=require('../models/campground');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');


router.get('/:id/info',isLoggedIn,async(req,res)=>{

const{id}=req.params;
const camps= await Campground.find({author:id});

res.render('users/info',{camps});


})
router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register));

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)

router.get('/logout', users.logout)

module.exports = router;