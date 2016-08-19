const s2 			= require('s2-geometry').S2;
const _ 			= require('lodash');
//51.894771, 4.467902

console.log(s2.fromId("5171315999624921088"));
// _.times(31, function(i) {
	console.log(s2.S2Cell.FromLatLng({ lat: 51.894771, lng: 4.467902 }, 30));
// })
// console.log(cell.idToKey("5171315999624921088"));
// console.log(cell.prototype.toString());

// console.log(s2.S2CellId_FromToken("8806542340000000").ToLatLng());
// 2/03320201221000113113