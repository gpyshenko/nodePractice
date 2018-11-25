const db = require('../db/db');

const getRobots = function (req, res) {
  db.gets()
    .then((results) => {
      if (results) {
        res.render('robots', { robots: results });
      } else {
        res
          .status(400)
          .json({ err: 'Robots not found' });
      }
    })
    .catch((err) => {
      res
        .status(400)
        .json({ err: err.message });
    })
}

const getRobot = function (req, res) {
  db.getByName(req.params.name)
    .then((results) => {
      if (results) {
        res.render('robot', { robot: results })
      } else {
        res
          .status(400)
          .json({ err: 'Robot not found' });
      }
    })
    .catch((err) => {
      res
        .status(400)
        .json({ err: err.message });
    })
}

const addRobot = function (req, res) {
  db.add(req.body)
    .then((results) => {
      res
        .status(201)
        .render('robot', { robot: results })
    })
    .catch((err) => {
      res
        .status(400)
        .render('robots', { err: err.message })
    })
}

const updateRobot = function (req, res) {
  db.update(req.body, req.params.name)
    .then((results) => {
      if (results) {
        res.redirect(`/api/robots/${req.params.name}`);
      } else {
        res
          .status(400)
          .render('robot', { err: err.message })
      }
    })
    .catch((err) => {
      res
        .status(400)
        .render('robot', { err: err.message });
    })
}
 
const removeRobot = function (req, res) {
  db.remove(req.body)
    .then((results) => {
      if (results) {
        res
          .redirect('/api/robots');
      } else {
        res
          .status(400)
          .render('robots', { err: err.message })
      }
    })
    .catch((err) => {
      res
        .status(400)
        .render('robots', { err: err.message })
    })
}

module.exports = {
  getRobots,
  getRobot,
  addRobot,
  updateRobot,
  removeRobot
}