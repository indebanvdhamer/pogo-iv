var angular 	= require('angular');
var ngSanitize 	= require('angular-sanitize');
var _ 			= require('lodash');
console.log(ngSanitize);
angular.module('iv', ['ngSanitize'])
	.service('api', function($http, $q) {
		var self = this;

		self.list = localStorage.pokemon ? JSON.parse(localStorage.pokemon) : null;
		_.each(self.list, function(pokemon) {
			pokemon.perfection = _.round((pokemon.individual_attack + pokemon.individual_defense + pokemon.individual_stamina) / 45 * 100, 1);
		});

		self.pokemon = function() {
			var defer = $q.defer();
			
			// if(!self.list) {
				$http.get('/api/pokemon', {params: {
					u: 'indebanvdhamer@gmail.com',
					p: 'warhammer90',
					provider: 'google',
					location: '51.923171, 4.467580'
				}}).success(function(res) {

					res = _.each(res, function(pokemon) {
						pokemon.perfection = (pokemon.individual_attack + pokemon.individual_defense + pokemon.individual_stamina) / 45 * 100;
					});

					self.list = res;
					localStorage.pokemon = JSON.stringify(res);
					defer.resolve(self.list);

				});
			// } else {
				// defer.resolve(self.pokemon);
			// }
			return defer.promise;
		};
	})
	.controller('rootController', function(api, fields) {
		var self = this;
		self.fields = fields;
		self.pokemon = api.list;
		console.log(self.pokemon);
		self.getPokemon = api.pokemon;

		self.sortBy = function(prop) {
			self.direction = self.sort !== prop ? false : !self.direction;
			self.sort = prop;
		};

		self.sort = 'name';
	})
	.constant('fields', [
		{name: 'Name', 			prop: 'name', 					width: 20, align: 'left'},
		{name: 'Nickname', 		prop: 'nickname', 				width: 20, align: 'left'},
		{name: 'Cp', 			prop: 'cp', 					width: 15, align: 'center'},
		{name: 'Attack', 		prop: 'individual_attack', 		width: 10, align: 'center'},
		{name: 'Defense', 		prop: 'individual_defense', 	width: 10, align: 'center'},
		{name: 'Stamina', 		prop: 'individual_stamina', 	width: 10, align: 'center'},
		{name: 'Perfection', 	prop: 'perfection', 			width: 15, align: 'center'},
	])
	.filter('searchFilter', function() {
		return function(input, query) {
			return input && typeof input === 'string' ? input.replace(RegExp('('+ (query || '') + ')', 'gi'), '<span class="bold">$1</span>') : input;
		};
	});
;