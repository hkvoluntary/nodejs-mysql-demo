var http = require("http");
var express = require('express');
var app = express();
var mysql      = require('mysql');
var bodyParser = require('body-parser');
var http_hostname = "0.0.0.0";
var http_port = "3000";


const { networkInterfaces } = require('os');

const nets = networkInterfaces();
const results = Object.create(null); // Or just '{}', an empty object

for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
        const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
        if (net.family === familyV4Value && !net.internal) {
            if (!results[name]) {
                results[name] = [];
            }
            results[name].push(net.address);
        }
    }
}
console.log("Network Infterface:");
console.log(results);

require("dotenv").config({path:'./env'});
//require("dotenv").config();
//start mysql connection
var connection = mysql.createConnection({
  host     : process.env.DB_HOSTNAME, //mysql database host name
  user     : process.env.DB_USER, //mysql database user name
  password : process.env.DB_PASSWORD, //mysql database password
  database : process.env.DB_NAME //mysql database name
});

connection.connect(function(err) {
  if (err) throw err
  console.log('Connected with mysql database...')
})
//end mysql connection

//start body-parser configuration
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
//end body-parser configuration

//create app server
var server = app.listen(http_port,  http_hostname, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", results['eth0'][0], port)

});

//rest api to get all employees 
app.get('/employees', function (req, res) {
   connection.query('select * from employees', function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results,null,'\t'));
	});
});
