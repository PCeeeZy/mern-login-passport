// dependencies
const passport = require('passport');
const LocalStrategy = require('./localStrategy');
const User = require('../database/models/user');

// called on login, saves the id to session req.session.passport.user = {id: '..'}
passport.serializeUser((user, done) => {
    console.log('*** serializeuser called, user: ');
    console.log(user); // the whole raw user object
    console.log('--*--*-----*-*-*---*---');
    done(null, { _id: user._id });
});

passport.deserializeUser((id, done) => {
    console.log(`deserializeUser called`);
    User.findOne({
        _id: id
    }, 'username', (err, user) => {
        console.log(`*********deserialized user, user: `);
        console.log(user);
        console.log(`*-*-*--*--*--**-**-*`);
        done(null, user);
    })
});

// use strategies
passport.use(LocalStrategy);

module.exports = passport;