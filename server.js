// dependencies
const express = require('express')
const morgan = require('morgan')
const session = require('express-session')
const dbConnection = require('./database')
const MongoStore = require('connect-mongo')(session)
const passport = require('./passport');
const app = express();
const PORT = process.env.PORT || 8080;
// Route requires
const user = require('./routes/user');

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: 'peek-a-boo', // keep this hidden
    store: new MongoStore({ mongooseConnection: dbConnection }),
    resave: false, //required
    saveUninitialized: false //required
}))

// passport
app.use(passport.initialize());
app.use(passport.session()); // calls the desearilizer

// routes
app.use('/user', user)

app.listen(PORT, function () {
    console.log('Server listening on: http://localhost:' + PORT);
});