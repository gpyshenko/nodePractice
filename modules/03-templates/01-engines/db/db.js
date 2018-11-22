const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'pride';
const client = new MongoClient(url, { useNewUrlParser: true });

const gets = function () {
    return new Promise((resolve, reject) => {
        client.connect(function (err) {
            if (err) {
                reject(err);
            }
            const db = client.db(dbName);
            db.collection('robots').find().toArray(function (err, results) {
                if (err) {
                    reject(err);
                }
                
                resolve(results);
            })
        })
    })
}

module.exports = {
    gets
}