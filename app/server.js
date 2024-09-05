var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;

var express = require('express')
  , http = require('http')
  , path = require('path')
  , bodyParser = require('body-parser')
  , app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(3000, function () {
  console.log("app listening on port 3000!");
});

let mongoUrlLocal = "mongodb://admin:password@localhost:27017";
let mongoUrlDocker = "mongodb://admin:password@mongodb";
let databaseName = "technicians";
let mongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };

MongoClient.connect(mongoUrlDocker, function (err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});

MongoClient.connect(mongoUrlDocker, function (err, db) {
  if (err) throw err;
  var dbo = db.db(databaseName);

  dbo.listCollections().toArray(function (err, collections) {
    if (collections.length === 0) {
      dbo.createCollection("technicians", function (err, res) {
        if (err) throw err;
        console.log("Collection created");
        db.close();
      });
      var myobj = [
        // Perugia
        { nome: 'Mario', cognome: 'Rossi', professioni: ['Elettricista'], città: 'Perugia', telefono: '3569638798' },
        { nome: 'Luigi', cognome: 'Verdi', professioni: ['Idraulico'], città: 'Perugia', telefono: '3403326423' },
        { nome: 'Anna', cognome: 'Bianchi', professioni: ['Muratore'], città: 'Perugia', telefono: '3324567891' },
        { nome: 'Marco', cognome: 'Gialli', professioni: ['Giardiniere'], città: 'Perugia', telefono: '3321234567' },
        { nome: 'Lucia', cognome: 'Blu', professioni: ['Meccanico'], città: 'Perugia', telefono: '3337894561' },
        { nome: 'Paolo', cognome: 'Neri', professioni: ['Informatico'], città: 'Perugia', telefono: '3345678912' },
        { nome: 'Sofia', cognome: 'Rosa', professioni: ['Imbianchino'], città: 'Perugia', telefono: '3351237894' },
        // Napoli
        { nome: 'Giulia', cognome: 'Neri', professioni: ['Elettricista'], città: 'Napoli', telefono: '3329781204' },
        { nome: 'Alessandro', cognome: 'Viola', professioni: ['Idraulico'], città: 'Napoli', telefono: '3345678901' },
        { nome: 'Federico', cognome: 'Marrone', professioni: ['Muratore'], città: 'Napoli', telefono: '3312345678' },
        { nome: 'Claudia', cognome: 'Arancio', professioni: ['Giardiniere'], città: 'Napoli', telefono: '3367891234' },
        { nome: 'Davide', cognome: 'Lilla', professioni: ['Meccanico'], città: 'Napoli', telefono: '3374567890' },
        { nome: 'Simone', cognome: 'Ciano', professioni: ['Informatico'], città: 'Napoli', telefono: '3381234567' },
        { nome: 'Valeria', cognome: 'Azzurro', professioni: ['Imbianchino'], città: 'Napoli', telefono: '3394567891' },
        // Milano
        { nome: 'Pietro', cognome: 'Ferroni', professioni: ['Elettricista'], città: 'Milano', telefono: '3339012343' },
        { nome: 'Matteo', cognome: 'Verdi', professioni: ['Idraulico'], città: 'Milano', telefono: '3401234567' },
        { nome: 'Roberto', cognome: 'Giallo', professioni: ['Muratore'], città: 'Milano', telefono: '3456789012' },
        { nome: 'Silvia', cognome: 'Rosso', professioni: ['Giardiniere'], città: 'Milano', telefono: '3467890123' },
        { nome: 'Chiara', cognome: 'Blu', professioni: ['Meccanico'], città: 'Milano', telefono: '3478901234' },
        { nome: 'Lorenzo', cognome: 'Bianco', professioni: ['Informatico'], città: 'Milano', telefono: '3489012345' },
        { nome: 'Elena', cognome: 'Viola', professioni: ['Imbianchino'], città: 'Milano', telefono: '3490123456' },
        // Roma
        { nome: 'Francesco', cognome: 'Rossi', professioni: ['Elettricista'], città: 'Roma', telefono: '3501234567' },
        { nome: 'Stefano', cognome: 'Verdi', professioni: ['Idraulico'], città: 'Roma', telefono: '3512345678' },
        { nome: 'Elisa', cognome: 'Bianchi', professioni: ['Muratore'], città: 'Roma', telefono: '3523456789' },
        { nome: 'Cristina', cognome: 'Gialli', professioni: ['Giardiniere'], città: 'Roma', telefono: '3534567890' },
        { nome: 'Fabio', cognome: 'Neri', professioni: ['Meccanico'], città: 'Roma', telefono: '3545678901' },
        { nome: 'Marta', cognome: 'Blu', professioni: ['Informatico'], città: 'Roma', telefono: '3556789012' },
        { nome: 'Giovanni', cognome: 'Rosa', professioni: ['Imbianchino'], città: 'Roma', telefono: '3567890123' }
    ];
    
      dbo.collection("technicians").insertMany(myobj, function (err, res) {
        if (err) throw err;
      });
    }
  });
});

app.post('/get-tecnico', function (req, res) {
  let response = {};

  MongoClient.connect(mongoUrlDocker, mongoClientOptions, function (err, client) {
    if (err) throw err;

    let db = client.db(databaseName);
    let città = req.body.città;
    let professione = req.body.professione;
    let myquery = { $and: [{ città: città }, { professioni: professione }] };

    db.collection("technicians").find(myquery).toArray(function (err, result) {
      if (err) throw err;
      response = result;
      client.close();

      res.send(response ? response : {});
    });
  });
});

app.post('/get-select', function (req, res) {
  let response = {};

  MongoClient.connect(mongoUrlDocker, mongoClientOptions, function (err, client) {
    if (err) throw err;

    let db = client.db(databaseName);
    
    db.collection("technicians").find({}, { projection: { città: 1, professioni: 1, _id: 0 } }).toArray(function (err, result) {
      if (err) throw err;
      response = result;
      client.close();

      // Send response
      res.send(response ? response : {});
    });
  });
});
