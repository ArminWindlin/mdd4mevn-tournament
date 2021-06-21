const { User } = require('../model/User');
const TokenGenerator = require('uuid-token-generator');
const pass = require('bcrypt');


exports.getUsers = async (req, res, next) => {
    try {
        User.aggregate([{$match: {}}, {$project: {email: 1}}], (err, users) => {
            if (err) return next(err);
            res.send(users);
        });
    } catch (err) {
        return next(err);
    }
};

exports.postUser = async (req, res, next) => {
    try {
        const user = req.body;

        // check email validity
        const emailValidationRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailValidationRegex.test(user.email.toLowerCase())) {
            return next(new Error('email is not valid'));
        }
        // check if email already exists
        const emailRegex = new RegExp(`^${user.email}$`, 'i');
        if (await User.countDocuments({email: emailRegex}) > 0) {
            return next(new Error('email already taken'));
        }
        // check if username already exists
        const usernameRegex = new RegExp(`^${user.username}$`, 'i');
        if (await User.countDocuments({username: usernameRegex}) > 0) {
            return next(new Error('username already taken'));
        }

        // generate new token
        const tokgen = new TokenGenerator(512, TokenGenerator.BASE62);
        user.token = tokgen.generate();

        // encrypt password
        user.password = await pass.hash(user.password, 10)

        const newUser = new User(req.body);
        newUser.save((err) => {
            if (err) return next(err);
            res.send(user);
        });
    } catch (err) {
        return next(err);
    }
};

exports.getUser = async (req, res, next) => {
    try {
        User.aggregate([{$match: {_id: req.params.id}}, {$project: {email: 1}}], (err, users) => {
            if (err) return next(err);
            res.send(users[0]);
        });
    } catch (err) {
        return next(err);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        User.deleteOne({ _id: req.params.id }, (err) => {
            if (err) return next(err);
            res.send({ info: 'Deleted a user!' });
        });
    } catch (err) {
        return next(err);
    }
};

exports.putUser = async (req, res, next) => {
    try {
        User.updateOne({ _id: req.params.id }, {$set: req.body}, (err, updateInfo) => {
            if (err) return next(err);
            res.send({ info: 'Successfully updated' });
        });
    } catch (err) {
        return next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const emailRegex = new RegExp(`^${req.body.email}$`, 'i');
        const userDoc = await User.findOne({email: emailRegex});
        if (!userDoc) return next(new Error('User doesn\'t exits'));
        const user = userDoc.toObject();
        const valid = await pass.compare(req.body.password, user.password);
        if (!valid) return next(new Error('Invalid Password'));
        console.info('User login: ' + user.email);
        res.send(user);
    } catch (err) {
        return next(err);
    }
};

exports.register = async (req, res, next) => {
    try {
        const user = req.body;

        // check email validity
        const emailValidationRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailValidationRegex.test(user.email.toLowerCase())) {
            return next(new Error('email is not valid'));
        }
        // check if email already exists
        const emailRegex = new RegExp(`^${user.email}$`, 'i');
        if (await User.countDocuments({email: emailRegex}) > 0) {
            return next(new Error('email already taken'));
        }
        // check if username already exists
        const usernameRegex = new RegExp(`^${user.username}$`, 'i');
        if (await User.countDocuments({username: usernameRegex}) > 0) {
            return next(new Error('username already taken'));
        }

        // generate new token
        const tokgen = new TokenGenerator(512, TokenGenerator.BASE62);
        user.token = tokgen.generate();

        // encrypt password
        user.password = await pass.hash(user.password, 10)

        const newUser = new User(req.body);
        newUser.save((err) => {
            if (err) return next(err);
            res.send(user);
        });
    } catch (err) {
        return next(err);
    }
};

exports.getCurrentUser = async (req, res, next) => {
    try {
        User.aggregate([{$match: {token: req.get('Authorization')}}, {$project: {password: 0}}], (err, users) => {
            if (err) return next(err);
            if (!users.length) {
                res.send('Invalid user');
                return;
            }
            res.send(users[0]);
        });
    } catch (err) {
        return next(err);
    }
};
