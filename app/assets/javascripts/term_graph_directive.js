// ---------- Term Graph Directive ---------- //

//directive created to connect D3 graph to scope variables
congressApp.directive("termGraph", function($window){
    return{
        restrict: "EA",
        template: "<svg width='280' height='30' id='termCanvas'></svg>",
        link: function(scope, elem, attrs){

            svg = d3.select("#termCanvas")

            svg.append("rect")
                .attr("width", "180")
                .attr("height", "3")
                .attr("fill", "rgb(150,150,150)")
                .attr("x", 50)
                .attr("y", 15);

            svg.append("text")
                .attr("x", 30)
                .attr("y", 12)
                .attr("font-size", "16")
                .attr("text-anchor", "middle")
                .attr("font-family", "Open Sans Condensed")
                .text("Term");

            svg.append("text")
                .attr("x", 30)
                .attr("y", 26)
                .attr("font-size", "16")
                .attr("font-family", "Open Sans Condensed")
                .attr("text-anchor", "middle")
                .text("Start");

            svg.append("text")
                .attr("x", 250)
                .attr("y", 12)
                .attr("font-size", "16")
                .attr("text-anchor", "middle")
                .attr("font-family", "Open Sans Condensed")
                .text("Term");

            svg.append("text")
                .attr("x", 250)
                .attr("y", 26)
                .attr("font-size", "16")
                .attr("font-family", "Open Sans Condensed")
                .attr("text-anchor", "middle")
                .text("End");

            progressBar = svg.append("rect");

            progressBar
                .attr("class", "termProgress")
                .attr("y", "3")
                .attr("width", "4")
                .attr("height", "25");

            scope.updateProgressBar = function(){

                progressBar = d3.select("rect.termProgress");

                progressBar
                    .attr("x", function(){
                        return 50 + (180*scope.termProgress)
                    })
                    .attr("fill", function(d){
                        if (scope.currentsen.party == "D"){
                            return "rgba(142,178,197,1)"
                        }
                        else if (scope.currentsen.party == "R"){
                            return "rgba(229,98,92,1)"
                        }
                        else{
                            return "rgba(182,98,144,1)"
                        }
                    });

            };

        }
    }
});