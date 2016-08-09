var angular 	= require('angular');
var _ 			= require('lodash');

require('./_index.js').constant('fields', [
	{name: 'Name', 			prop: 'name', 					width: 20, align: 'left'},
	{name: 'Nickname', 		prop: 'nickname', 				width: 20, align: 'left'},
	{name: 'Cp', 			prop: 'cp', 					width: 15, align: 'center'},
	{name: 'Attack', 		prop: 'individual_attack', 		width: 10, align: 'center'},
	{name: 'Defense', 		prop: 'individual_defense', 	width: 10, align: 'center'},
	{name: 'Stamina', 		prop: 'individual_stamina', 	width: 10, align: 'center'},
	{name: 'Perfection', 	prop: 'perfection', 			width: 15, align: 'center'},
]);