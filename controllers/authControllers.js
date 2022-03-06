//import mongoose model
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
require('dotenv').config();

//module scaffolding
const authController = {};

//singUp view
authController.signupControllerGet = (req, res) => {
    res.render('pages/auth/signup', {title: 'Create A New Account'});
};

//singUp logic
authController.signupControllerPost = async (req, res) => {
    const {username, email, password} = req.body;

    try {
        const hashedPass = await bcrypt.hash(password, 11);
        const user = new User({
            username,
            email,
            password: hashedPass
        });

        await user.save();
        console.log('Data Insert Successfully');
        res.render('pages/auth/signup', {title: 'Create A New User'});
    } catch (e) {
        console.log('Data Insert Failed: ' + e);
        res.status(500).json({error: 'Internal Server Error'})
    }
};

//login view
authController.loginControllerGet = (req, res) => {

};

//login logic
authController.loginControllerPost = (req, res) => {

};

//log out logic
authController.logoutController = (req, res) => {

};

module.exports = authController;