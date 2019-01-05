const getRegistration = (req, res, next) => {
    res.render('registration', { title: 'My session', views: req.session.views });
}
const postRegistration = (req, res, next) => {
    req.session.isAdmin = true;
    res.redirect('/cabinet'); 
}
 
module.exports = {
    getRegistration,
    postRegistration
};