const express = require('express');
const router = express.Router();

router.get('/users', (req, res) => {
    res.json({
        name: "Artyom",
        age: 23
    })
}) 

module.exports = router;