const { dashboardControllerGet } = require('../controllers/dashboardController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

const route = require('express').Router();

//dashboard view
route.get('/dashboard', isAuthenticated, dashboardControllerGet);


module.exports = route;