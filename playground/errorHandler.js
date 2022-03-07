const route = require('express').Router();
const {check, validationResult, body} = require('express-validator');

route.get('/validator/signup', (req, res) => {
    res.render('playground/signup', {"title": "test"});
})

route.post('/validator/signup', [
        check('username')
            .not().isEmpty()
            .withMessage('Username Required')
            .trim(),
        check('email')
            .isEmail()
            .withMessage('Email Required')
            .normalizeEmail(),
        check('password')
            .isLength({min: 5})
            .withMessage('password should be at last 5 char'),
        check('confirmPass')
            .custom((value, {req}) => {
                if(value !== req.body.password){
                    throw new Error('Password confirmation does not match password');
                }
                return true;
            })
    ],
    (req, res) => {
        const errorFormatter = (error) => error.msg;
        const error = validationResult(req).formatWith(errorFormatter);
        if(!error.isEmpty()){
            console.log(error.mapped());
        }
        console.log(req.body.username, req.body.email);
        res.render('playground/signup', {"title": "test"});
    }
);

module.exports = route;