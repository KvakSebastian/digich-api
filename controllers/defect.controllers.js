const Defect = require('../models/Defect');
const User = require('../models/User');
const { validationResult } = require('express-validator');
const error = require('../utils/error-handler.utils');

module.exports.getAllController = async (req, res) => {
    try {
        const defects = await Defect.find({});
        res.status(200).json({
            response: 'ok',
            message: defects.length ? 'Defects found' : 'No defects',
            defects,
        });
    } catch (e) {
        error(res, e);
    }
};

module.exports.getByIdController = async (req, res) => {
    try {
        const defect = await Defect.findById(req.params.id);
        res.status(200).json({
            response: 'ok',
            message: defect.length ? 'Defect found' : 'No defect',
            defect,
        });
    } catch (e) {
        error(res, e);
    }
};

module.exports.getByStatusController = async (req, res) => {
    const query = {
        status: req.query.status,
    };

    try {
        const defects = await Defect.find(query);
        res.status(200).json({
            response: 'ok',
            message: defects.length
                ? 'Defects found by status'
                : 'There are no defects for the specified status',
            defects,
        });
    } catch (e) {
        error(res, e);
    }
};

module.exports.getByDateController = async (req, res) => {
    const query = {
        status: req.query.status,
    };

    if (req.query.start) {
        query.open_date = {
            $gte: req.query.start,
        };
    }

    if (req.query.end) {
        if (!query.open_date) {
            query.open_date = {};
        }

        query.open_date['$lte'] = req.query.end;
    }

    try {
        const defects = await Defect.find(query).sort({ open_date: -1 });
        res.status(200).json({
            response: 'ok',
            message: defects.length
                ? 'All defects were found according to the specified status and time interval'
                : 'No defects were found for the specified status and time interval',
            defects,
        });
    } catch (e) {
        error(res, e);
    }
};

module.exports.getByUserController = async (req, res) => {
    try {
        const defects = await Defect.find({ user: req.params.userId });
        res.status(200).json({
            response: 'ok',
            message: defects.length
                ? 'Defects found by user id'
                : 'No defects were found for this user id',
            defects,
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
            message: 'Incorrect new defect data',
        });
    }

    try {
        const {
            username,
            title,
            room,
            status,
            open_date,
            close_date,
            attachment,
            attachment_id,
        } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({
                response: 'noUser',
                message:
                    'The user is not in the system. To register a new defect, you must register and gain access.',
            });
        }

        if (user && !user.enabled) {
            return res.status(403).json({
                response: 'noAccess',
                message: 'This user does not have access to the ability to register new defects',
            });
        }

        const defect = new Defect({
            title,
            room,
            attachment: attachment ? attachment : '',
            attachment_id: attachment_id ? attachment_id : '',
            user: user._id,
            status,
            open_date: open_date ? open_date : Date.now(),
            close_date: close_date ? close_date : '',
        });

        await defect.save();

        res.status(201).json({
            response: 'ok',
            message: defect ? 'New defect was successfully created' : 'Defect not created',
            defect,
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
            message: 'Incorrect defect data',
        });
    }

    try {
        const {
            title,
            room,
            status,
            open_date,
            close_date,
            attachment,
            attachment_id,
            user,
        } = req.body;
        const updated = new Defect({
            title,
            room,
            attachment: attachment ? attachment : '',
            attachment_id: attachment_id ? attachment_id : '',
            user,
            status,
            open_date: open_date ? open_date : Date.now(),
            close_date: close_date ? close_date : '',
            _id: req.params.id,
        });

        const defect = await Defect.findOneAndUpdate(
            { _id: req.params.id },
            { $set: updated },
            { new: true },
        );

        res.status(201).json({
            response: 'ok',
            message: defect ? 'Defect was successfully updated' : 'Defect not updated',
            defect,
        });
    } catch (e) {
        error(res, e);
    }
};
