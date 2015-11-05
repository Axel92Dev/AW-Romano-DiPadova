var PostgresDb = require('./db.js');
var dbClient = new PostgresDb();

dbClient.getAllUsers(function (err, result){
  console.log(result);
});/**
 * Created by alessandroromano on 05/11/15.
 */
//ciao miche