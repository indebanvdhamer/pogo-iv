var angular 	= require('angular');
var _ 			= require('lodash');

require('../_index.js').directive('list', function (listService) {
	return {
		templateUrl: 'list.html',	
		controller: function ($scope) {
			var self = this;
			self.settings = listService.settings;
		},
		controllerAs: 'list'
	};
});