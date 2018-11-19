var express = require('express');
var app = express();
var nunjucks = require('nunjucks');

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.get('/', function (req, res) {
    res.render('index.njk');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});