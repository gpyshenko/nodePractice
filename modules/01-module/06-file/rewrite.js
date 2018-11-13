const fs = require('fs');
const path = require('path');

const file = 'test/test02.txt';

fs.readFile(file, (err,data) => {
    let Data = data.toString()
    console.log(Data);
    if(!fs.existsSync('./temp')) {
        fs.mkdirSync('./temp')
    }
    fs.writeFile('temp/test.txt', Data + ' ups', (err) => {
        console.log('Done');
    })
})