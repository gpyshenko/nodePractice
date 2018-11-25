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
router.get('/robots/:name', ctrlRobots.getRobot);
router.get('/createRobot', (req,res) => {
    res.render('create-robot')
});  
router.post('/createRobot', ctrlRobots.addRobot);  
router.post('/robots/:name', ctrlRobots.updateRobot);
router.post('/removeRobot', ctrlRobots.removeRobot);
 
module.exports = router; 