
const bodyParser = require("body-parser");      //middleware for handling post and get requests
const express = require("express");    
const app = express();
const mysql = require('mysql');

 var con = mysql.createConnection({                 //Creating mysql connection
     host: "localhost",
     user: "root",              //these values according to your database credentials
     password: "raisingh1"      
 });

 con.connect(function (err) {                            //connect to mysql
     if (err) throw err;

     con.query("CREATE DATABASE finaldb2", function (err, result) {         //Create database
         if (err) throw err;
     });

      var sql = "use finaldb2";               //use database
      con.query(sql, function (err, result) {
          if (err) throw err;
      });
      //make table
      var sql = "CREATE TABLE answers (name VARCHAR(255), cricketer VARCHAR(255), colors VARCHAR(255), seconds VARCHAR(255))"; //make table
      con.query(sql, function (err, result) {
          if (err) throw err;
      });

 });
 

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static('appfiles'));                //path to site folder

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);       //sending default file
});

app.post('/senddata', (req, res) => {               //handles post request for data submission to database
    
    const name = req.body.name;                 //take name of user 
    const cricketor = req.body.cricketor        //take favorite  cricketor 
    const color = JSON.parse(req.body.color).join(' ')     // take colors in national flag
    const milisecs = req.body.time
    insertIntoDatabase(name, cricketor, color , milisecs)     // insertion into database
    res.end();
});

app.post('/getdata', (req, res) => {            //handles post request for getting data from database

    con.query("SELECT * FROM answers", function (err, result, fields) {
        if (err) throw err;
        res.end(JSON.stringify(result));   //sending stringified object to script.js
    });
});

app.listen(8080, () => {            //port 
});


function insertIntoDatabase(name , cricketor , color , milisecs){          //insert into db

         var sql = `INSERT INTO answers (name, cricketer, colors, seconds) VALUES ('${name}','${cricketor}' ,'${color}','${milisecs}')`;
         con.query(sql, function (err, result) {
             if (err) throw err;
             console.log("record inserted");
         });
        
}

