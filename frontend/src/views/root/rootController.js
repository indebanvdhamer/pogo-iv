var angular 	= require('angular');
var _ 			= require('lodash');
window._ = _;
require('../_index.js').controller('rootController', function($scope, api, ngDialog, card, login, $c) {
	var self = this;

	self.pokemon = api.list;

	self.getPokemon = api.pokemon;

	$c.on('list:updated', function(e, list) {
		// console.log(list);
		self.pokemon = list;
	}, $scope);

	self.openCard = function(pokemon) {
		ngDialog.open(card(pokemon));
	};
self.pokemonn = api.list[0];
	self.openLogin = function() {
		ngDialog.open(login());
	};
});