var express = require('express');
var app = express();
var notes = require("./notes.js");
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.get('/', function(req, res) {
	console.log('GET /');
	notes.list(req, res)
});

app.get('/:note_name', function(req, res) {
    console.log('GET /note_name');
	notes.get(req.params.note_name, req, res);
});

app.post('/:note_name', function(req, res) {
	console.log('POST /note_name');
	notes.insert(req.params.note_name, req, res);
});

app.put('/:note_name', function(req, res) {
	console.log('PUT /note_name');
	notes.upsert(req.params.note_name, req, res);
});

app.listen(process.env.PORT || 8000);
console.log('Servidor up port 8000');
