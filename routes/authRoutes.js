const express = require('express');
const authController = require('../controllers/authControllers');
//validator middleware
const signupValidator = require('../validator/signupValidator');
const loginValidator = require('../validator/loginValidator');

const route = express.Router();

// <== auth routes goes here ==>

//sign up route
route.get('/signup', authController.signupControllerGet);
route.post('/signup', signupValidator, authController.signupControllerPost);

//log in route
route.get('/login', authController.loginControllerGet);
route.post('/login', loginValidator, authController.loginControllerPost);

//log out route
route.get('/logout', authController.logoutController);


module.exports = route;