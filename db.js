var pg = require('pg');


function PostgresDb() {
  if (!(this instanceof PostgresDb))
    return new PostgresDb();

}

PostgresDb.prototype.connect = function (callback) {
  var dbConn = process.env.DATABASE_URL || 'postgres://todolists:secret@localhost/todolists_test';
  pg.connect(dbConn, function (err, client, done) {
    if (err) return callback(err);

    console.log('Ho preso un client dal pool di clients PostgresDb!');
    return callback(null, client, done);


  });
};

PostgresDb.prototype.getAllUsers = function (callback) {
  console.log('Query for all users...');
  this.connect(function (err, client, done) {
    if (err) return callback(err);

    client.query('SELECT * from todo_users', function (err, result) {
      done();

      if (err) return callback(err);

      return callback(null, result.rows);
    });
  });
};

PostgresDb.prototype.tryLogin = function (email, password, callback) {
  console.log('Query for login...');
  this.connect(function (err, client, done) {
    if (err) return callback(err);

    client.query('SELECT * from todo_users WHERE email=$1 AND password=$2', [email, password], function (err, result) {
      done();

      if (err) return callback(err);

      return callback(null, result.rows);
    });
  });
};

module.exports = PostgresDb;