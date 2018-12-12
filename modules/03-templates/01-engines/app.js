const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const morgan = require('morgan');
const favicon = require('serve-favicon');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/pride', {
    useNewUrlParser: true,
    useCreateIndex: true,
});

// view engine setup
nunjucks.configure('views', {
    autoescape: true,
    express: app
});
app.set('view engine', 'njk');
app.use(express.static(path.join(__dirname, 'public')));

const log = fs.createWriteStream('mylog.log', { flags: 'a' });
app.use(morgan('combined', { stream: log }));

// bodyPaser config
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Session
app.use(session({
    store: new FileStore,
    secret: 'node practice',
    saveUninitialized: true,
    resave: false
}));

const userDB = {
    id: '1',
    email: 'gpyshenko@gmail.com',
    password: '281987gp'
}

passport.use(new LocalStrategy(
    {
        usernameField: 'email'
    },
    (email, password, done) => {
        if (email === userDB.email && password === userDB.password) {
            // если они совпадают передаем объект user в callback функцию done
            console.log('Возвращаем пользователя: ' + JSON.stringify(userDB));
            return done(null, userDB);
        } else {
            // если не соответствуют то отдаем false
            return done(null, false);
        }
    }
)
)

// Routes
app.all('/registration', function (req, res, next) {
    console.log(req.session.id);
    req.session.views = req.session.views === void 0
        ? 0
        : req.session.views;
    req.session.views++;
    next();
})

app.use('/', require('./routes/routes'));
app.use('/api/', require('./routes/api'))

app.use(function (req, res, next) {
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
    console.log('App listening on port 3000!');
});