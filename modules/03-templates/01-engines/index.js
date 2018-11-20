const path = require('path');
const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

nunjucks.configure('views', {
    autoescape: true,
    express: app
});
app.set('view engine', 'njk'); 

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/routes'));

// app.get('/', myLogger, function (req, res) {
//     res.render('index', {data: 2});
//     console.log('Rendered index html')
//     //console.log(req.query.name) 
// });

// app.get('/contacts', function (req, res) {
//     res.render('contacts'); 
// });

// app.post('/contact', function(req,res) {
//     if (!req.body.name || !req.body.email) {
//         return res.send('404');
//     }
//     res.render('contacts', { name: req.body.name, email: req.body.email });
// })


// app.get('/post/:id', function (req, res) {
//     res.render('index', { data: req.params.id });
// });

app.use(function(req,res,next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
})

// error handler
app.use(function (err, req, res, next) {
    // render the error page
    res.status(err.status || 500);
    res.render('error', { message: err.message, error: err });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});