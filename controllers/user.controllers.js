const User = require('../models/User');
const { validationResult } = require('express-validator');
const error = require('../utils/error-handler.utils');

module.exports.getAllController = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({
            response: 'ok',
            message: users.length ? 'Users found' : 'No users',
            users,
        });
    } catch (e) {
        error(res, e);
    }
};

module.exports.getByUsernameController = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username.toString() });
        res.status(200).json({
            response: 'ok',
            message: user ? 'User found' : 'No user',
            user,
        });
    } catch (e) {
        error(res, e);
    }
};

module.exports.getByIdController = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({
            response: 'ok',
            message: user ? 'User found' : 'No user',
            user,
        });
    } catch (e) {
        error(res, e);
    }
};

module.exports.createController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
            message: 'Incorrect user data',
        });
    }

    try {
        const { first_name, last_name, username } = req.body;

        const user = new User({
            first_name,
            last_name,
            username,
            enabled: false,
        });

        await user.save();

        res.status(201).json({
            response: 'ok',
            message: user ? 'New user was successfully created' : 'User not created',
            user,
        });
    } catch (e) {
        error(res, e);
    }
};

module.exports.updateController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
            message: 'Incorrect user data',
        });
    }

    try {
        const updated = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            enabled: req.body.enabled,
            _id: req.params.id,
        });

        const user = await User.findOneAndUpdate(
            { _id: req.params.id },
            { $set: updated },
            { new: true },
        );

        res.status(201).json({
            response: 'ok',
            message: user ? 'User was successfully updated' : 'User not updated',
            user,
        });
    } catch (e) {
        error(res, e);
    }
};

module.exports.removeController = async (req, res) => {
    try {
        await User.remove({ _id: req.params.id });
        res.status(200).json({ response: 'ok', message: 'User has been deleted' });
    } catch (e) {
        error(res, e);
    }
};
