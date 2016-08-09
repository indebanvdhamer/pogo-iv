var angular 	= require('angular');
var _ 			= require('lodash');

require('../_index.js').controller('rootController', function($scope, api, fields, ngDialog, pokeData, card, login, $c) {
	var self = this;
	self.fields = fields;

	self.pokemon = api.list;

	self.getPokemon = api.pokemon;

	$c.on('list:updated', function(e, list) {
		console.log(list);
		self.pokemon = list;
	}, $scope);

	self.sortBy = function(prop) {
		self.direction = self.sort !== prop ? false : !self.direction;
		self.sort = prop;
	};

	self.openCard = function(pokemon) {
		ngDialog.open(card(pokemon));
	};

	self.openLogin = function() {
		ngDialog.open(login());
	};

	self.sort = 'name';
});