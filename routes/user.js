const express = require('express');
const router = express.Router();
const User = require('../database/models/user');
const passport = require('../passport');

router.post('/', (req, res) => {
    console.log('user signup');

    const { username, password } = req.body;
    // add validation
    User.findOne({ username }, (err, theUser) => {
        if (err) {
            console.log(`user.js post error: ${err}`);
        } else if (theUser) {
            res.json({
                error: `Sorry, already a user with the username: ${username}`
            })
        } else {
            const newUser = new User({
                username,
                password
            });
            newUser.save((err, savedUser) => { // this only works if the defined methods in the pre pass (/database/models/user.js)
                if (err) return res.json(err);
                res.json(savedUser)
            })

        }

    })
});

router.post('/login', (req, res, next) => {
    console.log('routes/user.js, login, req.body: ' + req.body);
    next()
}, passport.authenticate('local'), (req, res) => {
    console.log(`logged in: ${req.user}`);
    const userInfo = {
        username: req.user.username
    };
    res.send(userInfo)
})

router.get('/', (req, res, next) => {
    console.log(`====user====== \n ${req.user}`);
    if(req.user) {
        res.json({ user: req.user })
    } else {
        res.json({ user: null})
    }
});

router.post('/logout', (req, res) => {
    if (req.user) {
        req.logout()
        res.send({msg: 'logging out'})
    } else {
        res.send({ msg: 'no user to log out'})
    }
});

module.exports = router;