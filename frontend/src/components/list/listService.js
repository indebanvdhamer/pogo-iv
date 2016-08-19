var angular 	= require('angular');
var _ 			= require('lodash');

require('../_index.js').service('listService', function(fields) {
	var self = this;

	self.settings = {};
	self.secondSort = 'cp';

	self.sortBy = function(prop) {
		if(self.prop === prop) {
			self.ascending = !self.ascending;
		} else {
			self.prop = prop;
			self.ascending = _.find(fields, {prop: prop}).defaultSort
		}

		self.settings.sort = [(self.ascending ? '' : '-') + prop, (_.find(fields, {prop: self.secondSort}).defaultSort ? '' : '-') + 'cp'];
		self.settings.ascending = self.ascending;
	};

	self.toggleAscending = function() {
		self.sortBy(self.prop);
	};

});