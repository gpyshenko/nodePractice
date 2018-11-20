const express = require('express');
const router = express.Router();

const ctrlHome = require('../controllers/index'); 
const ctrlAbout = require('../controllers/about');
const ctrlPost = require('../controllers/post');
const ctrlContact = require('../controllers/contact');

router.get('/', ctrlHome.getIndex);
router.post('/', ctrlHome.sendData);

router.get('/about', ctrlAbout.getAbout);
router.get('/post/:id', ctrlPost.getIdPost);
router.get('/contact', ctrlContact.getContact);
router.post('/contact', ctrlContact.postData);

module.exports = router; 