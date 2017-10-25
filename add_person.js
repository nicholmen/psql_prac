var knex = require('knex')({
  client: 'pg',
  connection: {
    "user": "development",
    "password": "development",
    "database": "vagrant",
    "hostname": "localhost",
    "port": 5432,
    "ssl": true
  }
});

var first = process.argv[2];
var last = process.argv[3];
var date = process.argv[4];





knex.insert({ first_name: first, last_name: last, birthdate: date }).into('famous_people').asCallback((error, results) => {
  if (error) console.error(error);
  knex.select().from('famous_people').asCallback(function(error, results) {
    console.log("error, results:", error, results)
    process.exit();
  })
});
