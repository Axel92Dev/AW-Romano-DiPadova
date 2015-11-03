/**
 * Created by alessandroromano on 03/11/15.
 */
var express = require('express');
var router = express.Router();
var pg = require('pg');


/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.session) {
    res.render('registration');
  } else {
    res.render('homepage', {nomeCompleto: req.session.nomeCompleto});
  }

});

/* List of REST APIs */

router.post('/', function (req, res, next) {
  var userMail = req.body.emailLogin;
  var passw = req.body.passwordLogin;
  console.log('User: '+ userMail + '\nPassw: ' + passw);
  /* QUERY USERS TABLE TO CHECK LOGIN*/
  if (true) {
    req.session.nomeCompleto = 'Ale Romano';
    //render with query result
    res.render('homepage', {nomeCompleto: req.session.nomeCompleto});
  } else {
    res.send({result: 'KO', error: 'Username o password non validi'});
  }


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
