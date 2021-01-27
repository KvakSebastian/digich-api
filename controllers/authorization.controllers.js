const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const config = require('../config/keys.config');
const { validationResult } = require('express-validator');
const error = require('../utils/error-handler.utils');

module.exports.loginController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
            message: 'Incorrect login information',
        });
    }

    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found. Check input data' });
        }

        const isMatch = await bcrypt.compareSync(password, admin.password);

        if (!isMatch) {
            return res.status(409).json({ message: 'Wrong password. Try again' });
        }

        const token = jwt.sign(
            { adminId: admin._id, email: admin.email, username: admin.username },
            config.jwt,
            {
                expiresIn: '1h',
            },
        );

        res.status(200).json({ response: 'logged in', token: `Bearer ${token}` });
    } catch (e) {
        error(res, e);
    }
};
