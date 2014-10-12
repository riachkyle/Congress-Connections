// ---------- Legend Directive ---------- //

//directive created to hold the legend canvas
congressApp.directive("legendCanvas", function($window){
	return{
		restrict: "EA",
		template: "<svg width='140' height='144' id='legendCanvas'></svg>",
		link: function(scope, elem, attrs){

			// --- Draw Canvas --- //

			var width = 140;
			var height = 144;

			var svg = d3.select("#legendCanvas")
					.attr("width", width)
					.attr("height", height);

			// Committee nodes
			var committee = svg.append("circle")
                    .attr("r", 20)
                    .attr("cx", 23)
                    .attr("cy", 24)
                    .attr("fill", function(d) {
                    	return "rgb(220,220,220)"
                    });

			// Demacrat nodes
			var dem = svg.append("circle")
					.attr("r", 6)
					.attr("cx", 23)
					.attr("cy", 65)
					.attr("fill", "rgb(142,178,197)");

			// Republican nodes
			var rep = svg.append("circle")
					.attr("r", 6)
					.attr("cx", 23)
					.attr("cy", 96)
					.attr("fill", "rgb(229,98,92)");

			// Independent/Other nodes
			var ind = svg.append("circle")
					.attr("r", 6)
					.attr("cx", 23)
					.attr("cy", 127)
					.attr("fill", "rgb(182,98,144)");

			// --- Legend Text --- //
			var legendTextGroup = svg.append("g")

			// Committee Text
			legendTextGroup.append("text")
					.attr("x", 55)
					.attr("y", 32)
					.attr("font-size", "14px")
					.attr("font-family", "Roboto")
					.text("Committee");

			// Democrat Text
			legendTextGroup.append("text")
					.attr("x", 55)
					.attr("y", 71)
					.attr("font-size", "14px")
					.attr("font-family", "Roboto")
					.text("Democrat");

			// Republican Text
			legendTextGroup.append("text")
					.attr("x", 55)
					.attr("y", 102)
					.attr("font-size", "14px")
					.attr("font-family", "Roboto")
					.text("Republican");

			// Independent Text
			legendTextGroup.append("text")
					.attr("x", 55)
					.attr("y", 133)
					.attr("font-size", "14px")
					.attr("font-family", "Roboto")
					.text("Independent");

		}
	}
})