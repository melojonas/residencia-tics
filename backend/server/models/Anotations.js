const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const AnotationsSchema = new mongoose.Schema({
    content: {
        type: String,
        default: ''
    },

    actions: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, { collection: 'anotations' });

module.exports = mongoose.model('Anotations', AnotationsSchema);