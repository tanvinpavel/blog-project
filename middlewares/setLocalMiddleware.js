exports.getLocalValue = () => {
    return (req, res, next) => {
        res.locals.user = req.user;
        res.locals.isLoggedIn = req.isLoggedIn;
        return next();
    }
}