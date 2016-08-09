var angular 	= require('angular');
var _ 			= require('lodash');

require('../_index.js').controller('rootController', function(api, fields, ngDialog, pokeData, card, login) {
	var self = this;
	self.fields = fields;
	if(localStorage.credentials) {
		self.credentials = JSON.parse(localStorage.credentials);
	} else {
		self.credentials = {};
	}

	self.pokemon = api.list;
	console.log(_.clone(self.pokemon));
	self.getPokemon = function() {
		localStorage.credentials = JSON.stringify(self.credentials);
		api.pokemon(self.credentials).then(function(pokemon) {
			self.pokemon = pokemon;
		});
	};

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