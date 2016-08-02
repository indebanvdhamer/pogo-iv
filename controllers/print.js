const _ 			= require('lodash');

const pokeId 		= require('../data/pokemon.json');
const cpMultipliers = require('../data/cpMultipliers.json');
const baseStats 	= require('../data/baseStats.json');
const dust 			= require('../data/dust.json');

function getLevel(pokemon) {
	//TODO Better rounding?
	var f = _.find(cpMultipliers, {value: _.padEnd(_.round(pokemon.cp_multiplier, 7), 9	, '0')});
	return f ? f.level : null;
}

function printHeader() {
	console.log(
		_.padEnd('Name', 20),
		_.padEnd('Level', 8),
		_.padEnd('Cp', 8),
		_.padEnd('Attack', 8),
		_.padEnd('Defense', 8),
		_.padEnd('Stamina', 8)
	);
}

function printValues(pokemon) {
	console.log(
		_.padEnd(pokeId[pokemon.pokemon_id], 20),
		_.padEnd(getLevel(pokemon), 8),
		_.padEnd(pokemon.cp, 8),
		_.padEnd(pokemon.individual_attack, 8),
		_.padEnd(pokemon.individual_defense, 8),
		_.padEnd(pokemon.individual_stamina, 8)
	);
}

module.exports = {
	printHeader: printHeader,
	printValues: printValues,
	getLevel: getLevel
};