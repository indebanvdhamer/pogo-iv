var angular 	= require('angular');
var _ 			= require('lodash');

require('../_index.js').constant('login', function() {
	return {
		template: 'login.html',
		controller: ['$scope', 'api', 'ngDialog', function($scope, api, ngDialog) {
			$scope.login = function(credentials) {
				api.pokemon(credentials).then(ngDialog.close);
			};

			$scope.credentials = {
				provider: 'google'
			};
		}]
	};
});