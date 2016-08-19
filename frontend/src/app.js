//Libs
window.angular 	= require('angular');
window._ 		= require('lodash');

//Angular dependencies
var ngSanitize 	= require('angular-sanitize');
var ngDialog 	= require('ng-dialog');
var ngFilter 	= require('angular-filter');

//Submodules
var templates	= require('../temp/templates.js');
var components 	= require('./components/_index.js');
var constants 	= require('./constants/_index.js');
var filters 	= require('./filters/_index.js');
var services 	= require('./services/_index.js');
var views 		= require('./views/_index.js');

// Create and bootstrap application
angular.element(document).ready(function() {
	var requires = [
		'ngSanitize',
		'ngDialog',
		'angular.filter',

		'iv.templates',
		'iv.templates',
		'iv.components',
		'iv.constants',
		'iv.filters',
		'iv.services',
		'iv.views',
	];

	//Mount on window for testing
	window.app = angular.module('iv', requires)
		// .config(require('./config'))
		// .run(require('./run'));

	//Start
	angular.bootstrap(document, ['iv']);

});