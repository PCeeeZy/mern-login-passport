const User = require('../database/models/user');
const LocalStrategy = require('passport-local').Strategy;

const strategy = new LocalStrategy (
    {
        usernameField: 'username' //not necessary, default
    },
    (username, password, done) => {
        User.findOne({ username: username}, (err, userFromDB) => {
            if (err) {
                return done(err)
            };
            if (!userFromDB) {
                return done(null, false, { message: 'no known username'})
            };
            if (!userFromDB.checkPassword(password)) {
                return done(null, false, { message: 'incorrect password'})
            };
            return done(null, userFromDB);
        });
    }
);

module.exports = strategy;