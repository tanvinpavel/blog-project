//import mongoose model
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');
const {errorFormatter} = require('../utils/utility');
require('dotenv').config();

//module scaffolding
const authController = {};

//singUp view
authController.signupControllerGet = (req, res) => {
    res.render('pages/auth/signup', {title: 'Create A New Account', error: {}, value: {}});
};

//singUp logic
authController.signupControllerPost = async (req, res) => {
    const {username, email, password} = req.body;
    const result = validationResult(req).formatWith(errorFormatter);
    if(!result.isEmpty()){
        return res.render('pages/auth/signup', {
            title: 'Create A New User',
            error: result.mapped(),
            value: {username, email, password}
        });
    }
    
    try {
        const hashedPass = await bcrypt.hash(password, 11);

        const user = new User({
            username,
            email,
            password: hashedPass
        });

        await user.save();
        console.log('Data Insert Successfully');
        res.render('pages/auth/signup', {title: 'Create A New User', error: {}, value: {}});
    } catch (e) {
        console.log('Data Insert Failed: ' + e);
        res.status(500).json({error: 'Internal Server Error', error: {}, value: {}});
    }
};

//login view
authController.loginControllerGet = (req, res) => {
    res.render('pages/auth/login', {title: 'Login'})
};

//login logic
authController.loginControllerPost = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email: email});

        if(!user){
           return res.status(505).json({"error": 'Invalid Email & Password'});
        }
        const match = await bcrypt.compare(password, user.password);

        if(!match){
            return res.status(505).json({"error": 'Invalid Email & Password'});
        }
        
        console.log(user);
        res.render('pages/auth/login', {title: 'Login'});
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'})
    }

};

//log out logic
authController.logoutController = (req, res) => {

};

module.exports = authController;