var mysql = require('mysql');

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database:'db_fitness_v2'
});

// var con = mysql.createConnection({
//   host: '142.4.201.250',
//   user: 'test0',
//   password: '1234567890',
//   database: 'db_fitness'
// });


// var con = mysql.createConnection({
//   host: '142.4.201.250',
//   user: 'root',
//   password: 'bas59021726',
//   database: 'db_fitness'
// });

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected Success!");
 
});

module.exports = con