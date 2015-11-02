/**
 * Created by alessandroromano on 02/11/15.
 */
var pg = require('pg');
var conString = "postgres://fbcndkseefpujz:3P0tTJxE-pZaSOMAfo0hNz9O8d@ec2-107-21-219-201.compute-1.amazonaws.com:5432/de4tvgc71rjg78";

//this initializes a connection pool
//it will keep idle connections open for a (configurable) 30 seconds
//and set a limit of 20 (also configurable)
pg.connect(conString, function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('SELECT $1::int AS number', ['1'], function(err, result) {
    //call `done()` to release the client back to the pool
    done();

    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].number);
    //output: 1
  });
});