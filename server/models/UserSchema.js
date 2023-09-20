const mongoose = require('../database');

const User = mongoose.Schema({

    email: {
        type: String
    },
    password: {
        type: String
    }
})

mongoose.model('usuarios', User);

module.exports = User;