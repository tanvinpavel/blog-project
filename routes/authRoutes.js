const express = require('express');
const authController = require('../controllers/authControllers');
//validator middleware
const signupValidator = require('../validator/signupValidator');
const loginValidator = require('../validator/loginValidator');
const { alreadyLoggedIn } = require('../middlewares/authMiddleware');

const route = express.Router();

// <== auth routes goes here ==>

//sign up route
route.get('/signup', alreadyLoggedIn, authController.signupControllerGet);
route.post('/signup', alreadyLoggedIn, signupValidator, authController.signupControllerPost);

//log in route
route.get('/login', alreadyLoggedIn, authController.loginControllerGet);
route.post('/login',  alreadyLoggedIn, loginValidator, authController.loginControllerPost);

//log out route
route.get('/logout', authController.logoutController);


module.exports = route;