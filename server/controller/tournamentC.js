const { Tournament } = require('../model/Tournament');
const { User } = require('../model/User');

exports.getTournaments = async (req, res, next) => {
    try {
        const tournaments = (await Tournament.find({}))
            .map(doc => doc.toObject());
        for (const tournament of tournaments) {
            const users = (await User.find({_id: {$in: tournament.participants}}, { token: 0, password: 0 })).map(doc => doc.toObject());
            tournament.participants = users;
        }
        res.send(tournaments);
    } catch (err) {
        return next(err);
    }
};
exports.postTournament = async (req, res, next) => {
    try {
        // connect to user
        if (req.userId) {
            req.body.userId = req.userId;
        }
        const tournament = new Tournament(req.body);
        tournament.save((err, task) => {
        if (err) return next(err);
            res.send(tournament);
        });
    } catch (err) {
        return next(err);
    }
};
exports.getTournament = async (req, res, next) => {
    try {
        Tournament.findOne({ _id: req.params.id }, (err, tournament) => {
            if (err) return next(err);
            res.send(tournament);
        });
    } catch (err) {
        return next(err);
    }
};
exports.deleteTournament = async (req, res, next) => {
    try {
        Tournament.deleteOne({ _id: req.params.id }, (err) => {
            if (err) return next(err);
            res.send({ info: 'Deleted a tournament!' });
        });
    } catch (err) {
        return next(err);
    }
};
exports.putTournament = async (req, res, next) => {
    try {
        Tournament.updateOne({ _id: req.params.id }, {$set: req.body}, (err, updateInfo) => {
            if (err) return next(err);
            res.send('Successfully updated');
        });
    } catch (err) {
        return next(err);
    }
};
exports.addParticipant = async (req, res, next) => {
    try {
        Tournament.updateOne({ _id: req.params.id }, {$push: {participants: req.body.participant}}, (err, updateInfo) => {
            if (err) return next(err);
            res.send('Successfully updated');
        });
    } catch (err) {
        return next(err);
    }
};
