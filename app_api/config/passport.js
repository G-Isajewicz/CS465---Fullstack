/*
* Created 6/18/2024
* Author: G.Isajewicz 
* Sourced from: CS 465 Module Seven Full stack Guide, 
*   Harber, C., Holmes, S. (2019) Getting MEAN with Mongo, Ecpress, Angular, and Node. Manning Publications, Second Edition.
*       
* Refactored into try/catch because Model.findOne() no longer accepts callback
*/

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return done(null, false, { message: 'Incorrect email.' });
        }
        if (!user.validPassword(password)) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));
