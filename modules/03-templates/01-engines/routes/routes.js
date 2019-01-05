const express = require('express');
const router = express.Router();

const ctrlHome = require('../controllers/index'); 
const ctrlAbout = require('../controllers/about');
const ctrlPost = require('../controllers/post');
const ctrlContact = require('../controllers/contact');
const ctrlRegistration = require('../controllers/registration');
const ctrlLogin = require('../controllers/login');

router.get('/', ctrlHome.getIndex);
router.post('/', ctrlHome.uploadFile)

router.get('/about', ctrlAbout.getAbout);
router.get('/post/:id', ctrlPost.getIdPost);
router.get('/users', (req,res) => {
    res.render('users')
});
router.get('/contacts', ctrlContact.getContact);
router.post('/contacts', ctrlContact.sendMail);

const isAdmin = (req, res, next) => {
    if (req.session.isAdmin) {
        return next();
    }
    res.redirect('/?reason=Для начала вам надо зарегистрироваться')
}
  
router.get('/registration', ctrlRegistration.getRegistration);
router.post('/registration', ctrlRegistration.postRegistration);

router.get('/login', ctrlLogin.getLoginPage)
router.post('/login', ctrlLogin.logIn)
router.post('/logout', ctrlLogin.logOut)

router.get('/cabinet', isAdmin, (req, res, next) => {
    res.render('cabinet');
});

module.exports = router; 