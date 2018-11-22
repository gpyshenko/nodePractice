const d = require('../db/db');

const getRobots = function (req, res) {
    d.gets()
        .then((results) => {
            if (results) {
                res.json(results);
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

module.exports = {
    getRobots
}