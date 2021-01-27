const { body } = require('express-validator');

exports.loginValidators = [
    body('email')
        .isEmail()
        .notEmpty()
        .withMessage('Enter correct email!')
        .matches(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        )
        .normalizeEmail(),
    body('password')
        .notEmpty()
        .isLength({ min: 8, max: 50 })
        .withMessage('Enter correct password. Minimum length 8 symbols')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
];

exports.registrationValidators = [
    body('email')
        .isEmail()
        .notEmpty()
        .withMessage('Not correct email!')
        .matches(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        )
        .normalizeEmail(),
    body('username')
        .notEmpty()
        .isLength({ min: 5, max: 20 })
        .withMessage('Not correct username. Minimum length 5 symbols')
        .matches(/^(?=[a-zA-Z0-9._]{6,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/),
    body('password')
        .notEmpty()
        .isLength({ min: 8, max: 50 })
        .withMessage('Not correct password. Minimum length 8 symbols')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
];

exports.userValidators = [
    body('first_name').notEmpty().withMessage('Not correct first name').trim(),
    body('username').notEmpty().isNumeric().withMessage('Not correct username'),
    body('last_name').notEmpty().withMessage('Not correct last name').trim(),
];

exports.defectValidators = [
    body('title').notEmpty().withMessage('Not correct title').trim().isLength({ min: 5, max: 50 }),
    body('room').notEmpty().withMessage('Not correct room').trim(),
    body('status').notEmpty().withMessage('Not correct status').trim(),
    body('open_date').notEmpty().withMessage('Not correct open date').isDate(),
];
