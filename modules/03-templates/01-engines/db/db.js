const mongoose = require('mongoose');
const Robots = require('./schema')

const gets = function() {
    return Robots.find()
};

const getByName = function (paramsName) {
    return Robots.findOne({ name: paramsName })
};
  
module.exports = {
    gets,
    getByName 
}