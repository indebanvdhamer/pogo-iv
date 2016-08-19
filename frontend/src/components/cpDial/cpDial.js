var angular 	= require('angular');
var $			= require('jquery');
var _ 			= require('lodash');
var d3 			= require('d3');

require('../_index.js').directive('cpDial', function ($timeout) {
	return {
		scope: {
			pokemon: '=',
		},
		link: function(scope, el, attr) {
			console.log(scope.pokemon);

			var pokemon = _.find(scope.pokemon.evolutionChain, {current: true});

			var width = 280,
				height = 140,
				animationTime = 400 * (pokemon.cp/pokemon.cpMax * 5),
				rad = 2 * Math.PI,
				arcWidth = 2;

			var svg = d3.select($(el)[0]).append('svg')
				.attr('width', width)
				.attr('height', height)
				.attr('preserveAspectRatio', 'xMinYMin meet')
				.attr('viewBox', '0 0 ' + width + ' ' + height)
				.style('overflow', 'visible');

			var arc = d3.arc().innerRadius(width/2 - arcWidth).outerRadius(width/2).startAngle(-0.25 * rad);

			//Outer ring
			var outerRing = svg.append("path")
				.datum({endAngle: 0.25 * rad})
				.attr("d", arc)
				.attr("transform", 'translate('+width/2+','+height+')')
				.attr('fill', '#ccc')
				.attr('opacity', 0.5);

			//Score indicator
			var scoreArc = svg.append("path")
				.datum({endAngle: -0.25 * rad})
				.attr("d", arc)
				.attr("transform", 'translate('+width/2+','+height+')')
				.attr('fill', 'black')

			//Group for the indicator. This group will get rotated
			var gScore = svg.append('g')
				.attr('width', width)
				.attr('height', height)

			var scoreIndicator = gScore.append('circle')
			    .style("fill", 'black')
				.attr('r', 4)
				.attr('cx', width/2)
				.attr('cy', 0)
				.attr("transform", 'rotate(-90,'+(width/2)+','+(height-1.5)+')')

			$timeout(function() {
				animateScore(pokemon.cp/pokemon.cpMax);
			}, 500);

			//Remember current angle of the indicator, to ensure it always animates from the current position.
			var currentAngle = 0;
			function animateScore(val) {
				//The arc can rotate using radians
				scoreArc.transition()
					.duration(animationTime)
					.call(arcTween, (val * rad/2) - 0.25 * rad, arc);

				//The indicator group has to rotate using degrees
				//I'm defining this function here, because the values for 'rotate' change every time when animating
				function rotTween() {
				    var i = d3.interpolate(currentAngle, (val * 180));
				    return function(t) {
				    	currentAngle = i(t)
				        return 'rotate(' + (currentAngle) + ','+(width/2)+','+(height-1.5)+')';
				    };
				}
				gScore.transition().duration(animationTime).attrTween("transform", rotTween);
			}

			//Function to animate an arc (score indicator in this case)
			function arcTween(transition, newAngle, arc) {
				transition.attrTween("d", function(d) {
					var interpolate = d3.interpolate(d.endAngle, newAngle);
					return function(t) {
						d.endAngle = interpolate(t);
						return arc(d);
					};
				});
			}
		}
	};
});


