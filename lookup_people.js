// Write a new script file that expects to take in a single command line argument (through ARGV) and use it to find and output famous people by their first or last name.
// The experience should look like this:

// node lookup_people.js Lincoln
// Searching ...
// Found 1 person(s) by the name 'Lincoln':
// - 1: Abraham Lincoln, born '1809-02-12'

const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});


client.connect((error) => {
  if(error) throw error;


  var last_name = process.argv[2];
  // console.log("the value is :"+last_name);
  client.query("SELECT * FROM famous_people where last_name=$1",[last_name], (error, results) => {
    if(error) throw error;

    // console.log("results:", results.rows);
    console.log('Searching ...');
    console.log("the total number of rows: "+results.rows.length);
    // console.log(results.rows[0].id, results.rows[0].first_name, results.rows[0].last_name, results.rows[0].birthdate)

    console.log(`-${results.rows[0].id}: ${results.rows[0].first_name} ${results.rows[0].last_name}, born '${results.rows[0].birthdate}'`)

    client.end((error) => {
      if(error) throw error;
    });
  });
});
