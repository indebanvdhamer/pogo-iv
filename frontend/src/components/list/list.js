var angular 	= require('angular');
var _ 			= require('lodash');

require('../_index.js').directive('list', function () {
	return {
		templateUrl: 'list.html',		
	};
});