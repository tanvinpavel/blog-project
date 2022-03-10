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
    // console.log(req.isLoggedIn, req.User);
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
        console.log('User Signup Successfully');
        res.render('pages/auth/signup', {title: 'Create A New User', error: {}, value: {}});
    } catch (e) {
        console.log('Data Insert Failed: ' + e);
        res.status(500).json({error: 'Internal Server Error', error: {}, value: {}});
    }
};

//login view
authController.loginControllerGet = (req, res) => {
    // console.log(req.session.isLoggedIn, req.session.user);

    res.render('pages/auth/login', {title: 'Login', error: {}, notMatch: null})
};

//login logic
authController.loginControllerPost = async (req, res) => {
    const {email, password} = req.body;

    //input validation
    const result = validationResult(req).formatWith(errorFormatter);
    if(!result.isEmpty()){
        return res.render('pages/auth/login', {title: 'Login', error: result.mapped(), notMatch: null});
    }

    try {
        const user = await User.findOne({email: email});

        if(!user){
           return res.render('pages/auth/login', {title: 'Login', error: result.mapped(), notMatch: 'Invalid Email & Password'});
        }
        const match = await bcrypt.compare(password, user.password);

        if(!match){
            return res.render('pages/auth/login', {title: 'Login', error: result.mapped(), notMatch: 'Invalid Email & Password'});
        }
        
        req.session.isLoggedIn = true;
        req.session.user = user;
        res.render('pages/auth/login', {title: 'Login', error:{}, 'notMatch': null});
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'})
    }

};

//log out logic
authController.logoutController = (req, res) => {

};

module.exports = authController;