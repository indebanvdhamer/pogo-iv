var angular 	= require('angular');
var _ 			= require('lodash');

require('./_index.js').service('$c', function() {
	var self = this;

	self.listeners = {};

	//This function 'subscribes' to an event.
		//Provide an event name (should be consistent with the notifySubs event name)
		//Provide a callback function
	self.on = function(e, fn, scope) {
		if(!self.listeners[e]) self.listeners[e] = [];
		if(scope && scope.$id) scope.$on('$destroy', function() {self.unSub(e, fn, scope.$id || null);});
		self.listeners[e].push({fn: fn, scopeId: scope ? scope.$id : null});
	};

	//Unsubscribe from an event
	self.off = function(e, fn, scopeId) {
		var i = _.findIndex(self.listeners[e], {fn: fn, scopeId: scopeId || null});
		if(i !== -1) {
			self.listeners[e].splice(i, 1);
		}
	};

	//All registered listener functions are called
	self.broadcast = function(e, args) {
		if(self.listeners[e]) {
			_.each(self.listeners[e], function(l) {
				l.fn(e, args);
			});
			return "Success";
		} else {
			return "No listeners found!";
		}
	};
});