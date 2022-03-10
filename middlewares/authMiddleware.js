const User = require('../models/UserModel');

exports.bindUserWithRequest = () => {
    return async (req, res, next) => {
        if(!req.session.isLoggedIn){
            return next();
        }
        
        try {
            const user = await User.findOne({email: req.session.user.email});
            req.isLoggedIn = req.session.isLoggedIn ? true : false;
            req.user = await user;
            return next();
        } catch (error) {
            console.log(error);
            return next();
        }
    }
}