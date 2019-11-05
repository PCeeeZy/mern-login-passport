//connect to mongo db
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/simple-mern-passport';

mongoose.connect(uri)
    .then(() => {
        console.log('connected to mongo');
    }).catch(err => {
        console.log('error connecting to mongo: ');
        console.log(err)
    });

module.exports = mongoose.connection;