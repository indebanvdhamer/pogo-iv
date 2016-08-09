const fs = require('fs');
const _ = require('lodash');
const request = require('request');





//**************************************** balls
_.times(4, function(i) {
	setTimeout(function() {
		request('https://www.pokeadvisor.com/img/ball/'+(i+1)+'.png').pipe(fs.createWriteStream('./frontend/src/img/ball/'+(i+1)+'.png'));
	}, i*100);
});




//**************************************** types

// var types = [
// 	'Normal',
// 	'Fire',
// 	'Fighting',
// 	'Water',
// 	'Flying',
// 	'Grass',
// 	'Poison',
// 	'Electric',
// 	'Ground',
// 	'Psychic',
// 	'Rock',
// 	'Ice',
// 	'Bug',
// 	'Dragon',
// 	'Ghost',
// 	'Dark',
// 	'Steel',
// 	'Fairy'
// ];

// _.each(types, function(type, i) {
// 	setTimeout(function() {
// 		request('https://www.pokeadvisor.com/img/type/'+type+'.png').pipe(fs.createWriteStream('./frontend/src/img/type/'+type+'.png'));
// 	}, i*100);
// });


//**************************************** pokemon
// _.times(151, function(i) {
// 	setTimeout(function() {
// 		request('https://www.pokeadvisor.com/img/mon/'+_.padStart(i+1, 3, '0')+'.png').pipe(fs.createWriteStream('./frontend/src/img/mon/'+_.padStart(i+1, 3, '0')+'.png'));
// 	}, i*100);
// });



