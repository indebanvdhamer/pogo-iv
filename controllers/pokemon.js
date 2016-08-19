const api 			= require('pokemon-go-api');
const _ 			= require('lodash');
const Long 			= require('long');
const moment 		= require('moment');
const fs 			= require('fs');

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

var perfectIv = {iv: {
	attack: 15,
	defense: 15,
	stamina: 15,
}};

function list(req, res) {
	fs.readFile('./data/inventory.json', 'utf8', function(err, content) {
		var inventory = _.map(JSON.parse(content), function(inv) {
			return inv.inventory_item_data;
		});

		var resInventory = _.remove(inventory, function(inv) {
			var pokemon = inv.pokemon_data;
			if(pokemon && pokemon.pokemon_id) {return false;}
			return true;
		});

		var eggs = _.remove(resInventory, function(inv) {
			return inv.pokemon_data && inv.pokemon_data.is_egg;
		});

		var items = _.remove(resInventory, function(inv) {
			return inv.item !== null;
		});

		var incubators = _.map(_.remove(resInventory, function(inv) {
			return inv.egg_incubators !== null;
		}), function(inv) {
			return inv.egg_incubators;
		})[0].egg_incubator;

		var pokedex = _.map(_.remove(resInventory, function(inv) {
			return inv.pokedex_entry !== null;
		}), function(inv) {
			return inv.pokedex_entry;
		});

		var player = _.map(_.remove(resInventory, function(inv) {
			return inv.player_stats !== null;
		}), function(inv) {
			return inv.player_stats;
		})[0];

		var familyInfo = _.map(_.remove(resInventory, function(inv) {
			return inv.pokemon_family !== null;
		}), function(inv) {
			return inv.pokemon_family;
		});

		fs.writeFile('./data/inventory/eggs.json', 			JSON.stringify(eggs));
		fs.writeFile('./data/inventory/familyInfo.json', 	JSON.stringify(familyInfo));
		fs.writeFile('./data/inventory/player.json', 	JSON.stringify(player));
		fs.writeFile('./data/inventory/pokedex.json', 		JSON.stringify(pokedex));
		fs.writeFile('./data/inventory/incubators.json', 	JSON.stringify(incubators));
		fs.writeFile('./data/inventory/items.json', 		JSON.stringify(items));
		fs.writeFile('./data/inventory/resInventory.json', 	JSON.stringify(resInventory));

		var myPokemon = _.map(inventory, function(inv) {
			return inv.pokemon_data;
		});

		_.each(myPokemon, function(pokemon) {
			var created = new Long(pokemon.creation_time_ms.low, pokemon.creation_time_ms.high, pokemon.creation_time_ms.unsigned).toString();
			var cellId = new Long(pokemon.captured_cell_id.low, pokemon.captured_cell_id.high, pokemon.captured_cell_id.unsigned).toString();
			var id = new Long(pokemon.id.low, pokemon.id.high, pokemon.id.unsigned).toString();
			pokemon.spawnTime = moment(parseInt(created)).format('DD-MM-YYYY HH:mm');
			pokemon.recent = moment(parseInt(created)).valueOf();
			pokemon.cellId = cellId;
			pokemon.properId = id;
			pokemon.pokedex = _.find(pokedex, {pokemon_id: pokemon.pokemon_id});
			var pokeDataMon = pokeData.pokemon[pokemon.pokemon_id];
			pokemon.name = pokeId[pokemon.pokemon_id];
			pokemon.familyId = pokeDataMon.familyId;
			pokemon.paddedFamilyId = _.padStart(pokemon.familyId, 3, '0');
			pokemon.familyName = pokeData.pokemon[pokeDataMon.familyId].Name;
			
			pokemon.individual_attack = pokemon.individual_attack || 0;
			pokemon.individual_defense = pokemon.individual_defense || 0;
			pokemon.individual_stamina = pokemon.individual_stamina || 0;
			
			pokemon.iv = {
				attack: pokemon.individual_attack,
				defense: pokemon.individual_defense,
				stamina: pokemon.individual_stamina,
			};

			pokemon.perfection = _.round((pokemon.iv.attack + pokemon.iv.defense + pokemon.iv.stamina) / 45 * 100, 1);
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
			pokemon.candy = _.find(familyInfo, {family_id: pokemon.familyId}).candy;
			pokemon.baseStats = _.find(baseStats, {name: pokemon.name});

			pokemon.powerUp = {
				stardust: pokeData.stardust[Math.floor(pokemon.level) - 1],
				candy: pokeData.candy[Math.floor(pokemon.level) - 1],
			};

				var totalDust = 0;
				_.times((81 - pokemon.level * 2), function(lvl) {
					totalDust += pokeData.stardust[Math.floor((81-lvl)/2) - 1];
				});

				var totalCandy = 0;
				_.times((81 - pokemon.level * 2), function(lvl) {
					totalCandy += pokeData.candy[Math.floor((81-lvl)/2) - 1];
				});

				pokemon.powerUpMax = {
					stardust: totalDust,
					candy: totalCandy,
				};

			function cpCalc(pkmn, pl) {
				return _.floor(
					((pkmn.baseStats.attack + pkmn.iv.attack) * 
					Math.pow((pkmn.baseStats.defense + pkmn.iv.defense), 0.5) * 
					Math.pow((pkmn.baseStats.stamina + pkmn.iv.stamina), 0.5) * 
					Math.pow(pl ? _.find(cpMultipliers, function(mult) {
						return mult.level == (pl.level + (pl.level < 40 ? 1.5 : 0.5));
					}).value : (pokemon.cp_multiplier + pokemon.additional_cp_multiplier), 2)) / 10);
			}

			pokemon.evolutionChain = _(pokeData.pokemon).filter({familyId: pokemon.familyId}).map(function(pkmn) {
				pkmn.baseStats = _.find(baseStats, {name: pkmn.Name});
				pkmn.iv = pokemon.iv;
				return {
					id: pkmn.Id,
					paddedId: _.padStart(pkmn.Id, 3, '0'),
					name: pkmn.Name,
					candyToEvolve: pkmn.CandyToEvolve,
					current: pkmn.Id === pokemon.pokemon_id,

					cp: cpCalc(pkmn),
					cpPerfect: cpCalc(_.extend(pkmn, perfectIv)),

					cpMax: cpCalc(pkmn, player),
					cpMaxPerfect: cpCalc(_.extend(pkmn, perfectIv), player),

					cp40: cpCalc(pkmn, {level: 40}),
					cpPerfect40: cpCalc(_.extend(pkmn, perfectIv), {level: 40}),
				}
			}).sortBy('Id', 'asc').value();
		});

		myPokemon = _.sortBy(myPokemon, 'perfection', 'desc');

		res.json({
			eggs: eggs,
			familyInfo: familyInfo,
			player: player,
			pokedex: pokedex,
			incubators: incubators,
			items: items,
			resInventory: resInventory,
			myPokemon: myPokemon
		});
	});
}

function callApi(req, res) {
	api.login(req.query.u, req.query.p, req.query.provider || 'google')
		.then(api.getPlayerEndpoint)
		.then(api.inventory.get)
		.then(function(inventory) {
			fs.writeFile('./data/inventory.json', JSON.stringify(inventory));
			res.json(200);
		})
		.catch(function(err) {
			console.log('error', err.stack);
		});
}
module.exports = {
	list: list,
	callApi: callApi
};
