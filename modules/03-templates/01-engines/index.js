var express = require('express');
var app = express();
var nunjucks = require('nunjucks');
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

var myLogger = function (req, res, next) {
    console.log('LOGGED');
    next();
};

app.get('/', myLogger, function (req, res) {
    res.render('index.njk', {data: 2});
    console.log('Rendered index html')
    console.log(req.query.name)
});

app.get('/contacts', function (req, res) {
    res.render('contacts.njk');
    
});

app.post('/contact', function(req,res) {
    if (!req.body.name || !req.body.email) {
        return res.send('404');
    }
    res.render('contacts.njk', { name: req.body.name, email: req.body.email });
})


app.get('/post/:id', function (req, res) {
    res.render('index.njk', { data: req.params.id });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});