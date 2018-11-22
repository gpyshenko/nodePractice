const express = require('express');
const router = express.Router();

const ctrlRobots = require('../controllers/robots');

router.get('/users', (req, res) => {
    res.json({
        name: "Artyom",
        age: 23
    })
}) 

router.get('/robots', ctrlRobots.getRobots);

module.exports = router; 