const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    email: {
        type: String,
        required: 'Please enter the email of the User',
    },
    password: {
        type: String,
        required: 'Please enter the password of the User',
    },
    token: {
        type: String,
        required: 'Please enter the token of the User',
    },
    username: {
        type: String,
        required: 'Please enter the username of the User',
        default: 'NameNotSet'
    },
});

exports.User = mongoose.models.users || mongoose.model('users', UserSchema);