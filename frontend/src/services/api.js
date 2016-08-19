var angular 	= require('angular');
var _ 			= require('lodash');

require('./_index.js').service('api', function($http, $q, pokeData, $c) {
	var self = this;

	self.res = {};

	self.list = localStorage.pokemon ? JSON.parse(localStorage.pokemon) : null;
	$c.broadcast('list:updated', self.list);

	self.pokemon = function(credentials) {
		credentials = credentials.u && credentials.p && credentials.provider ? credentials : (self.credentials || {});
		self.credentials = credentials;
		var defer = $q.defer();
		console.log(credentials);
		if(credentials.u && credentials.p && credentials.provider) {
			$http.get('/api/pokemon', {params: credentials}).success(function(res) {
				_.each(res, function(r, prop) {
					self.res[prop] = r;
				});
				console.log(self.res);
				self.list = res.myPokemon;
				self.familyInfo = res.familyInfo;
				localStorage.pokemon = JSON.stringify(res.myPokemon);
				defer.resolve(self.list);
				$c.broadcast('list:updated', self.list);
			});
		}
		return defer.promise;
	};

	self.refresh = function(credentials) {
		console.log(credentials);
		var defer = $q.defer();
		if(credentials.u && credentials.p && credentials.provider) {
			$http.get('/api/refresh', {params: credentials}).success(function() {
				self.pokemon(credentials).then(defer.resolve);
			});
		}
		return defer.promise;
	};
});