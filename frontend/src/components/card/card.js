var angular 	= require('angular');
var _ 			= require('lodash');

require('../_index.js').constant('card', function(pokemon) {
	return {
		template: 'card.html',
		controller: ['$scope', 'api', 'pokeData', function($scope, api, pokeData) {
			_.each(['standard', 'special'], function(type) {
				if(typeof pokemon.moves[type][0] === 'number' || typeof pokemon.moves[type][0] === 'string') {
					pokemon.moves[type] = _.map(pokeData.pokemon[pokemon.pokemon_id][type === 'standard' ? 'QuickMoves' : 'CinematicMoves'], function(move) {
						return _.extend(pokeData.moves[move], {id: move});
					});
				}
			});
			$scope.pokemon = pokemon;
		}]
	};
});