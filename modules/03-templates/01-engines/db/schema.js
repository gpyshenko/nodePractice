let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let robotSchema = new Schema({
    name: {
        type: String,
        required: [
            true, 
            'Укажите имя робота'
        ],
        unique: true
    },
    body: {
        type: String,
        required: [
            true,
            'Укажите имя робота'
        ]
    },
    weapons: {
        type: [String]
    }
});

const Robot = mongoose.model('Robot', robotSchema);

module.exports = Robot;