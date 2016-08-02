const api 		= require('pokemon-go-api');
const _ 		= require('lodash');

const print 	= require('./print.js');
const pokeId 	= require('../data/pokemon.json');

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
				pokemon.name = pokeId[pokemon.pokemon_id];
				pokemon.individual_attack = pokemon.individual_attack || 0;
				pokemon.individual_defense = pokemon.individual_defense || 0;
				pokemon.individual_stamina = pokemon.individual_stamina || 0;
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
