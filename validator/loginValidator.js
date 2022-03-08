const {body} = require('express-validator');

const loginValidator = [
    body('email')
        .isEmail().withMessage('Email required!'),
    body('password')
        .not().isEmpty().withMessage('Password required!'),
];

module.exports = loginValidator;