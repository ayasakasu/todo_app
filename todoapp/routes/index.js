const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const knex = require('../db/knex');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0218Inori',
  database: 'todo_app',
});

router.get('/', function (req, res, next) {
  const isAuth = req.isAuthenticated();
  if (isAuth) {
    const userId = req.user.id;
    console.log(`isAuth: ${isAuth}`);
    knex('tasks')
      .select('*')
      .where({ user_id: userId })
      .then(function (results) {
        console.log(results);
        res.render('index', {
          title: 'ToDo App',
          todos: results,
          isAuth: isAuth,
        });
      })
      .catch(function (err) {
        console.error(err);
        res.render('index', {
          title: 'ToDo App',
          isAuth: isAuth,
        });
      });
  } else {
    res.render('index', {
      title: 'ToDo App',
      isAuth: isAuth,
    });
  }
});

router.post('/', function (req, res, next) {
  const isAuth = req.isAuthenticated();
  const userId = req.user.id;
  const todo = req.body.add;
  knex('tasks')
    .insert({ user_id: userId, content: todo })
    .then(function (results) {
      res.redirect('/');
    })
    .catch(function (err) {
      console.error(err);
      res.render('/', {
        title: 'ToDo App',
        isAuth: isAuth,
      });
    });
});

router.use('/signup', require('./signup'));
router.use('/signin', require('./signin'));
router.use('/logout', require('./logout'));

module.exports = router;
