const EventEmitter = require('events');
const fs = require('fs');

class MyEmitter extends EventEmitter {};

const me = new MyEmitter();

me.on('write', (data) => {
  fs.writeFile('test.txt', data, (err) => {
    console.log('Write');
  })
});

me.on('read', (err, data) => {
  me.emit('write', data);
});

fs.readFile('data.txt', 'utf-8', (err, data) => {
  me.emit('read', err, data);
});