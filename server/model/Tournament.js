const mongoose = require('mongoose');
const { Schema } = mongoose;

const TournamentSchema = new Schema({
    name: {
        type: String,
        required: 'Please enter the name of the Tournament',
        default: ""
    },
    userId: {
        type: String,
        default: ""
    },
    location: {
        type: String,
        required: 'Please enter the location of the Tournament',
        default: ""
    },
    date: {
        type: Date,
        default: Date.now
    },
    participants: {
        type: Array,
        default: []
    },
});

exports.Tournament = mongoose.models.tournaments || mongoose.model('tournaments', TournamentSchema);