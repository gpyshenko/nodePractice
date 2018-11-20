const getAbout = function (req, res) {
    res.render('about', { title: 'About', msg: `Страница о нас` });
}

module.exports = {
    getAbout
}