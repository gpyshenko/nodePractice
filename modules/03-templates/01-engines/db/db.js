const mongoose = require('mongoose');
const Robots = require('./schema')

const gets = function () {
    return Robots.find()
};

const getByName = function (paramsName) {
    return Robots.findOne({ name: paramsName })
};

const add = function (data) {
    const isNotValid = data => {
        let isName = !!data.name;
        let isBody = !!data.body;
        let isWeapons = !!data.weapons
        return !isName || !isBody || !isWeapons;
    };
    if (isNotValid(data)) {
        console.log('Data format is not correct!')
        return Promise.reject('Data format is not correct!')
    };

    let Robot = new Robots({
        name: data.name,
        body: data.body,
        weapons: data.weapons
    })

    return Robot.save();
}

const update = function (data, name) {
    const isNotValid = data => {
        let isBody = !!data.body;
        let isWeapons = !!data.weapons
        return !isBody || !isWeapons;
    };
    if (isNotValid(data)) {
        console.log('Data format is not correct!')
        return Promise.reject('Data format is not correct!')
    };

    return Robots.findOneAndUpdate(
        { name: name },
        {
            $set: { body: data.body },
            $push: { weapons: data.weapons }
        }
    )
}

const remove = function (data) {
    return Robots.findOneAndDelete({ name: data.name })
}

module.exports = {
    gets,
    getByName,
    add,
    update,
    remove
}