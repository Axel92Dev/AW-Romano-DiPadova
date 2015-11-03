/**
 * Created by alessandroromano on 03/11/15.
 */
var express = require('express');
var router = express.Router();
var pg = require('pg');


/* GET home page. */
router.get('/', function (req, res, next) {
  var notLogged = true;
  if (notLogged) {
    res.render('registration');
  } else {
    res.render('index', {nomeCompleto: 'Alessandro Romano'});
  }

});

/* List of REST APIs */

router.get('/login', function (req, res, next) {
  var userMail = req.getParameter('email');
  var passw = req.getParameter('password');
  /* QUERY USERS TABLE TO CHECK LOGIN*/
  //res.set(200);
  res.send({result: 'OK'});

});

router.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function (err, client, done) {
    console.log('Ho fatto la connessione');
    client.query('SELECT * FROM test_table', function (err, result) {
      done();
      if (err) {
        console.error(err);
        response.send("Error " + err);
      }
      else {
        response.render('db', {results: result.rows});
      }
    });
  });
});

module.exports = router;
