var angular 	= require('angular');
var $			= require('jquery');
var _ 			= require('lodash');

require('../_index.js').directive('candy', function (candy) {
	return {
		scope: {
			pokemon: '=',
			idx: '='
		},
		templateUrl: 'candy.html',	
		controller: function ($scope, $element) {
			var self = this;

			self.height = $($element[0]).height() + 'px';
			self.width = $($element[0]).width() + 'px';

			var images = [
				{src: 'img/candy/candy_painted_base_color.png', 		color: _.find(candy, {id: self.pokemon.familyId}).candy[0]},
				{src: 'img/candy/candy_painted_secondary_color.png', 	color: _.find(candy, {id: self.pokemon.familyId}).candy[1]},
				{src: 'img/candy/candy_painted_highlight.png', 			color: [255, 255, 255]},
			];

			_.each(images, function(img, i) {
				img.image = new	Image();
				img.image.src = img.src;
				img.image.onload = function(){alterImage(this, img.color, i);}
			});

		    function alterImage(imageObj, rgb, i){
		        var canvas = $('<canvas style="position: absolute; z-index: '+(i+1)+'"></canvas>').appendTo('.candy-' + self.idx)[0];

		        //Full px height and width of the original png file
				canvas.width  = 256;
				canvas.height = 256;

				//Height and width of the element
				canvas.style.width  = self.width;
				canvas.style.height = self.height;

		        var ctx= canvas.getContext("2d");
		        ctx.drawImage(imageObj, 0, 0);
		        var id= ctx.getImageData(0, 0, canvas.width, canvas.height);

				// Iterate over data. Data is RGBA matrix so go by +=4 to get to next pixel data.
				for (var i = 0; i < id.data.length; i += 4) {
					id.data[i] = rgb[0] * 255/id.data[i];
					id.data[i+1] = rgb[1] * 255/id.data[i+1];
					id.data[i+2] = rgb[2] * 255/id.data[i+2];
				}

		        // Redraw the altered data on the canvas.
		        ctx.putImageData(id, 0, 0);
		    }
		},
		controllerAs: 'candy',
		bindToController: true
	};
});


