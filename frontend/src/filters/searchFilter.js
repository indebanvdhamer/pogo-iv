var angular 	= require('angular');

require('./_index.js').filter('searchFilter', function() {
	return function(input, query) {
		return input && typeof input === 'string' ? input.replace(RegExp('('+ (query || '') + ')', 'gi'), '<span class="bold">$1</span>') : input;
	};
});