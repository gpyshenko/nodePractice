const getIdPost = function(req,res) {
    res.render('post', {id: req.params.id})
}

module.exports = {
    getIdPost
}