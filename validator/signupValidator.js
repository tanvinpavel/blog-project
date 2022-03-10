const { body } = require("express-validator");
const User = require('../models/UserModel');

const signupValidator = [
    body('username')
        .not().isEmpty().withMessage('Username required!')
        .isLength({'max': 15}).withMessage('Username must be less then 15 character!')
        .custom(async username => {
            const isUserExists = await User.findOne({username});
            if(isUserExists){
                return Promise.reject('Username already use!');
            }
            return true;
        })
        .trim()
    ,
    body('email')
        .isEmail().withMessage('Please provide a valid email!')
        .normalizeEmail()
        .custom(async email => {
            const isEmailExists = await User.findOne({email});
            if(isEmailExists){
                return Promise.reject('Email already use!');
            }
            return true;
        })
    ,
    body('password')
        .isLength({min: 8}).withMessage('Password must contain 8 character!')
    ,
    body('confirmPass')
        .isLength({min: 8}).withMessage('Password must contain 8 character!')
        .custom((confirmPass, {req}) => {
            if(confirmPass !== req.body.password){
                throw new Error('Confirm Password not matched!');
            }
            return true;
        })
];

module.exports = signupValidator;