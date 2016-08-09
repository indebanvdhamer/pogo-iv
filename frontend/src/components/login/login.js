var angular 	= require('angular');
var _ 			= require('lodash');

require('../_index.js').constant('login', function() {
	return {
		template: 'login.html',
		controller: ['$scope', 'api', function($scope, api) {

		}]
	};
});