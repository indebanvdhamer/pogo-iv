var angular 	= require('angular');
var _ 			= require('lodash');
var d3 			= require('d3');

require('../_index.js').constant('card', function(pokemon) {
	return {
		template: 'card.html',
		controller: ['$scope', 'api', 'pokeData', '$timeout', function($scope, api, pokeData, $timeout) {
			_.each(['standard', 'special'], function(type) {
				if(typeof pokemon.moves[type][0] === 'number' || typeof pokemon.moves[type][0] === 'string') {
					pokemon.moves[type] = _.map(pokeData.pokemon[pokemon.pokemon_id][type === 'standard' ? 'QuickMoves' : 'CinematicMoves'], function(move) {
						return _.extend(pokeData.moves[move], {id: move});
					});
				}

				pokemon.move = {
					standard: pokeData.moves[pokemon.move_1],
					special: pokeData.moves[pokemon.move_2],
				};

				$scope.items = {
					candy: {
						min: '116px',
						max: '500px'
					},
					misc: {
						min: '47px',
						max: '112px',
						active: [
							{prop: 'level', 				unit: '', 	label: 'Level'},
							{prop: 'stamina_max', 			unit: '', 	label: 'Hp'},
							{prop: 'perfection', 			unit: '%', 	label: 'IV score'},
							{prop: 'individual_attack', 	unit: '', 	label: 'Attack'},
							{prop: 'individual_defense', 	unit: '', 	label: 'Defense'},
							{prop: 'individual_stamina', 	unit: '', 	label: 'Stamina'},
						],
						passive: [
							{prop: 'level', 				unit: '', 	label: 'Level'},
							{prop: 'stamina_max', 			unit: '', 	label: 'Hp'},
							{prop: 'perfection', 			unit: '%', 	label: 'IV score'},
						]
					}
				};

				$scope.stats = [
					{name: 'misc', items: $scope.items.misc.active},
				];

				$scope.moveTypes = [
					{prop: 'standard', compare: 'move_1'},
					{prop: 'special', compare: 'move_2'}
				];

				$scope.cpFields = [
					{prop: 'cp', 			label: ''},
					{prop: 'cpPerfect', 	label: ''},

					{prop: 'cpMax', 		label: ''},
					{prop: 'cpMaxPerfect', 	label: ''},

					{prop: 'cp40', 			label: ''},
					{prop: 'cpPerfect40', 	label: ''},
				];

				var time;
				$scope.count = 0;
				$scope.expand = function(name, e) {
					$scope.items[name].isActive = !$scope.items[name].isActive;
					d3.select(e.currentTarget).transition().duration(300).style('max-height', $scope.items[name][$scope.items[name].isActive ? 'max' : 'min']);
				};

				$scope.showMoves = function() {
					$scope.movesShown = !$scope.movesShown;
				};

			});
			$scope.pokemon = pokemon;
		}]
	};
});