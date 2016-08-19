var angular 	= require('angular');
var _ 			= require('lodash');

require('../_index.js').constant('login', function() {
	return {
		template: 'login.html',
		controller: ['$scope', 'api', 'ngDialog', function($scope, api, ngDialog) {
			$scope.login = function(credentials) {
				$scope.isLoggingIn = true;

				api.pokemon(credentials).then(function() {
					$scope.isLoggingIn = false;
					ngDialog.close();
				});
			};

			$scope.refresh = function(credentials) {
				$scope.isLoggingIn = true;

				api.refresh(credentials).then(function() {
					$scope.isLoggingIn = false;
					ngDialog.close();
				});
			};

			$scope.credentials = {
				provider: 'google'
			};
		}]
	};
});