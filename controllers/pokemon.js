const api 			= require('pokemon-go-api');
const _ 			= require('lodash');
const Long 			= require('long');
const moment 		= require('moment');

const print 		= require('./print.js');
const pokeData 		= require('../data/pokeData.js');
const pokeId 		= require('../data/pokemon.json');
const cpMultipliers = require('../data/cpMultipliers.json');
const baseStats 	= require('../data/baseStats.json');
const dust 			= require('../data/dust.json');

function getLevel(pokemon) {
	//TODO Better rounding?
	var f = _.find(cpMultipliers, {value: _.padEnd(_.round(pokemon.cp_multiplier + pokemon.additional_cp_multiplier, 7), 9	, '0')});
	return f ? f.level : null;
}

function list(req, res) {
	api.login(req.query.u, req.query.p, req.query.provider)
		.then(function() {
			return api.location.set('address', req.query.location).then(api.getPlayerEndpoint);
		})
		.then(api.inventory.get)
		.then(function(inventory) {
			// print.printHeader();

			_.remove(inventory, function(inv) {
				var pokemon = inv.inventory_item_data.pokemon_data;
				if(pokemon && pokemon.pokemon_id) {return false;}
				return true;
			});

			var myPokemon = _.map(inventory, function(inv) {return inv.inventory_item_data.pokemon_data;});
			_.each(myPokemon, function(pokemon) {
				var created = new Long(pokemon.creation_time_ms.low, pokemon.creation_time_ms.high, pokemon.creation_time_ms.unsigned).toString();
				pokemon.spawnTime = moment(parseInt(created)).format('DD-MM-YYYY HH:mm');
				var pokeDataMon = pokeData.pokemon[pokemon.pokemon_id];
				pokemon.name = pokeId[pokemon.pokemon_id];
				pokemon.individual_attack = pokemon.individual_attack || 0;
				pokemon.individual_defense = pokemon.individual_defense || 0;
				pokemon.individual_stamina = pokemon.individual_stamina || 0;
				pokemon.perfection = _.round((pokemon.individual_attack + pokemon.individual_defense + pokemon.individual_stamina) / 45 * 100, 1);
				pokemon.paddedId = _.padStart(pokemon.pokemon_id, 3, '0');
				pokemon.level = getLevel(pokemon);
				pokemon.types = [];
				_.each(['Type1', 'Type2'], function(t) {
					var type = pokeDataMon[t];
					if(type !== 'None') pokemon.types.push(type);
				});
				pokemon.moves = {
					standard: pokeDataMon.QuickMoves,
					special: pokeDataMon.CinematicMoves
				};
			});
			myPokemon = _.sortBy(myPokemon, function(inv) {
				return (inv.individual_attack + inv.individual_defense + inv.individual_stamina) / 3;
			});

			// _.each(myPokemon, print.printValues);
			res.json(myPokemon);
		})
		.catch(function(err) {
			console.log('error', err.stack);
		});

}

module.exports = {
	list: list
};
