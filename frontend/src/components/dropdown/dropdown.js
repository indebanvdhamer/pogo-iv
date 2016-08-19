var angular 	= require('angular');
var _ 			= require('lodash');
var $			= require('jquery');

require('../_index.js').directive('dropdown', function (fields, listService) {
	return {
		templateUrl: 'dropdown.html',	
		controller: function ($scope) {
			var self = this;
			self.options = fields;
			self.toggleDropdown = function() {
				self.toggle = !self.toggle;
				if(self.toggle) {
					$(document).one('mousedown', function(e) {
						var target = $(e.target);
						if(!target.hasClass('container') && !target.hasClass('option') && !target.hasClass('selected')) {
							$scope.$apply(self.toggleDropdown);
						}
					});
				}
			};
			self.select = function(item) {
				listService.sortBy(item.prop);
				self.toggle = false;
				self.prop = item.prop;
				self.selected = item;
			};

			self.select(_.find(fields, {prop: 'perfection'}));
		},
		controllerAs: 'dropdown'
	};
});