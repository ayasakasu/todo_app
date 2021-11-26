const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/', function(req, res, next) {
    const isAuth = req.isAuthenticated();
    res.render('signin', {
        title: 'Sign in',
        isAuth: isAuth,
    });
});

router.post('/', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/signin',
    failureFlash: true,
}));

module.exports = router;