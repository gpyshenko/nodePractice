const passport = require('passport');

const getLoginPage = (req,res) => {
    res.render('login', {
        title: 'Это страница авторизации, отправьте сюда POST запрос {email, password}',
        isAuthenticated: false
    })
}

const logIn = (req, res, next) => {
    console.log(req.body.email, req.body.password)
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.render('login', {
                title: err,
                isAuthenticated: false
            }); 
        }
        if (!user) {
            return res.render('login', {
                title: 'Укажите правильный email и пароль!',
                isAuthenticated: false
            });
        }
        req.login(user, (err) => {
            return res.render('login', {
                title: 'Вы удачно прошли аутентификацию!',
                isAuthenticated: true 
            });
        });
    })(req, res, next);
}

const logOut = (req,res) => { 
    req.session.destroy()
    res.render('index', {
        msg: 'Вы вышли из своего аккаунта'
    })
}

module.exports = {
    getLoginPage,
    logIn,
    logOut
}