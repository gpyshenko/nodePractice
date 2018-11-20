const getContact = function (req, res) {
    res.render('contacts', { title: 'Contact' });
}
const postData = function (req, res) {
    res.render('contacts', { name: req.body.name, email: req.body.email });
}

module.exports = {
    getContact,
    postData
}