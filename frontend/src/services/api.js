var angular 	= require('angular');
var _ 			= require('lodash');

require('./_index.js').service('api', function($http, $q, pokeData, $c) {
	var self = this;

	self.list = localStorage.pokemon ? JSON.parse(localStorage.pokemon) : null;
	$c.broadcast('list:updated', self.list);

	self.pokemon = function(credentials) {
		var defer = $q.defer();
		console.log(credentials);
		if(credentials.u && credentials.p && credentials.provider) {
			$http.get('/api/pokemon', {params: credentials}).success(function(res) {
				self.list = res;
				localStorage.pokemon = JSON.stringify(res);
				defer.resolve(self.list);
				$c.broadcast('list:updated', self.list);
			});
		}
		return defer.promise;
	};
});