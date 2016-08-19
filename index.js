const _ 			= require('lodash');
const express 		= require('express');
const bodyParser 	= require('body-parser');
const helmet 		= require('helmet');
const request 		= require('request');

const print 		= require('./controllers/print.js');
const pokemonCtrl 	= require('./controllers/pokemon.js');

var app = express();

//Config
app.use(helmet());
app.use(bodyParser.json());

//Serve static html
app.use(express.static('./frontend/dist'));

function log(req, res, next) {
	console.log('GET', req.url);
	next();
}

//Api config
app.get('/api/pokemon', log, pokemonCtrl.list);
app.get('/api/refresh', log, pokemonCtrl.callApi);

//Run
app.listen(3000);
console.log("Server listening on port 3000");


//Current browser location -> request



// kijkduin
// 52.069253, 4.221833

// bulbs (arendsdorp)
// 52.094653, 4.314670

// werk
// 51.923171, 4.467580

// Thuis
// 51.893906, 4.467718