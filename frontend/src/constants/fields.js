var angular 	= require('angular');
var _ 			= require('lodash');

require('./_index.js').constant('fields', [
	{name: 'Name', 			prop: 'name', 					defaultSort: true},
	{name: 'Nickname', 		prop: 'nickname', 				defaultSort: true},
	{name: 'Pokedex', 		prop: 'pokemon_id', 			defaultSort: true},
	{name: 'Cp', 			prop: 'cp', 					defaultSort: false},
	{name: 'Attack', 		prop: 'individual_attack', 		defaultSort: false},
	{name: 'Defense', 		prop: 'individual_defense', 	defaultSort: false},
	{name: 'Stamina', 		prop: 'individual_stamina', 	defaultSort: false},
	{name: 'IV score', 		prop: 'perfection', 			defaultSort: false},
	{name: 'Recent', 		prop: 'recent', 				defaultSort: false},
	{name: 'Favorite', 		prop: 'favorite', 				defaultSort: true},
]);