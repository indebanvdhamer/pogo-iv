var angular 	= require('angular');
var _ 			= require('lodash');

require('../_index.js').directive('listUtils', function (listService) {
	return {
		templateUrl: 'listUtils.html',	
		controller: function ($scope) {
			var self = this;
			self.settings = listService.settings;
			self.toggleAscending = listService.toggleAscending;
		},
		controllerAs: 'listUtils'
	};
});