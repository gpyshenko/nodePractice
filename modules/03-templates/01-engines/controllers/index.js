const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const db = require('../models/db')();

const getIndex = (req, res, next) => {
    res.render('index', { 
        title: 'Upload File',
        msg: req.query.msg, 
        pic: db.stores.file.store,
        reason: req.query.reason
    });
}

const uploadFile = (req, res, next) => {
    let form = new formidable.IncomingForm();
    let upload = path.join('./public', 'upload');
    let fileName;
    console.log(upload)
    if (!fs.existsSync(upload)) {
        fs.mkdirSync(upload);
    }

    form.uploadDir = path.join(process.cwd(), upload);

    form.parse(req, function (err, fields, files) {
        if (err) {
            return next(err);
        }
        if (files.photo.name === '' || files.photo.size === 0) {
            fs.unlink(files.photo.path);
            return res.redirect('/?msg=Не загружена картинка!');
        }
        if (!fields.name) {
            fs.unlink(files.photo.path);
            return res.redirect('/?msg=Не указано описание картинки!');
        }
        fileName = path.join(upload, files.photo.name);
        fs.rename(files.photo.path, fileName, function (err) {
            if (err) {
                console.error(err);
                fs.unlink(fileName);
                fs.rename(files.photo.path, fileName);
            }
            let dir = fileName.substr(fileName.indexOf('\\'));
            db.set(fields.name, dir);
            db.save();
            res.redirect('/?msg=Картинка успешно загружена');
        })

    })

}

module.exports = {
    getIndex,
    uploadFile
}