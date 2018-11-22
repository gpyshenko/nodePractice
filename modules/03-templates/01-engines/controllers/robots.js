const db = require('../db/db');

const getRobots = function (req, res) {
    db.gets()
        .then((results) => {
            if (results) {
                // res.json(results);
                res.render('robots', { robots: results })
            } else {
                res
                    .status(400)
                    .json({ err: 'Robots not found' });
            }
        })
        .catch((err) => {
            res
                .status(400)
                .json({ err: err.message });
        })
}
 
const getRobot = function (req, res) {
    db.getByName(req.params.name)
        .then((results) => {
            if (results) {
                res.render('robot', { robot: results })
            } else {
                res
                    .status(400)
                    .json({ err: 'Robot not found' });
            }
        })
        .catch((err) => {
            res
                .status(400)
                .json({ err: err.message });
        })
}

module.exports = {
    getRobots,
    getRobot
}