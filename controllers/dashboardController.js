const dashboard = {};

dashboard.dashboardControllerGet = (req, res) => {
    res.render('pages/dashboard/dashboard.ejs', {title: 'Dashboard'});
};

module.exports = dashboard;