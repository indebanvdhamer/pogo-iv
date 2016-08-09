var angular 	= require('angular');
var _ 			= require('lodash');

require('./_index.js').service('api', function($http, $q, pokeData) {
	var self = this;

	self.list = localStorage.pokemon ? JSON.parse(localStorage.pokemon) : null;
	_.each(self.list, function(pokemon) {
		pokemon.perfection = _.round((pokemon.individual_attack + pokemon.individual_defense + pokemon.individual_stamina) / 45 * 100, 1);
	});

	self.pokemon = function(credentials) {
		var defer = $q.defer();
		console.log(credentials);
		if(credentials.u && credentials.p && credentials.location && credentials.provider) {
			$http.get('/api/pokemon', {params: credentials}).success(function(res) {
				self.list = res;
				localStorage.pokemon = JSON.stringify(res);
				defer.resolve(self.list);
			});
		}
		return defer.promise;
	};
});