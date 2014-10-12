// ---------- Network Graph Directive ---------- //

//directive created to connect D3 graph to scope variables
congressApp.directive("networkGraph", function($window){
  return{
    restrict: "EA",
    template: "<svg width='830' height='750' id='graphCanvas'></svg>",
    link: function(scope, elem, attrs){


    // --- Draw Graph --- //

    //This function checks to see if the senators, links, and groups data are all available. If they are, the draw functions will be run.

    function drawGraphs(){
        if (scope.senators.length && scope.links.length && scope.groups.length){

            drawSenators("#graphCanvas");
            drawGroups("#graphCanvas");

        }
    }


    scope.$watch( 'senators', function(){
        drawGraphs();
    });

    scope.$watch( 'wordsdata', function(){
        if (scope.senators.length && scope.wordsdata.length){
            updateSenators("#graphCanvas");
        }
    });

    scope.$watch( 'votesFinal', function(){   
        if (scope.senators.length && scope.votesFinal.length){
            updateSenators("#graphCanvas");
        }
    });

    //Watch $scope.groups variable. If it updates, run the draw senators function.
    scope.$watch( 'groups', function() {
        drawGraphs();
    });


    scope.$watch( 'links', function() {
        drawGraphs();
    })
      

      // --- Draw SVG --- //

      var width = 830;
      var height = 750;

      var svg = d3.select(svg)
                      .attr("width", width)
                      .attr("height", height);

        var linkGroup = d3.select("#graphCanvas").append("g").attr("class", "linkGroup");


      // --- Outer Force for Senators --- //
      //this force will push the senators into a circle on the outside of the visualization

      var force = d3.layout.force()
                      .charge(-40)
                      .linkDistance(0)
                      .size([width, height]);

      // --- Inner Force for Groups --- //
      //this force will group the groups (committees, industries, etc.) into a forced layout in the center of the circle

      var force2 = d3.layout.force()
                      .charge(-200)
                      .linkDistance(0)
                      .size([width, height]);


      // ------ Draw Senator Nodes ------ //

      var drawSenators = function(selection){

          // --- Scales --- //

          scope.senatorNodesMap = scope.mapNodes(scope.senators, "bioguide_id");
          
          selection = d3.select(selection);

          groupScale = d3.scale.linear()
                      .domain([0, 30])
                      .range([5, 25]);

          force
                  .nodes(scope.senators)
                  .start();

          d3.selectAll('line').remove();

          var links = scope.links;

          links.forEach(function(l){

              l.source = scope.senatorNodesMap.get(l.bioguide_id);

          });

          var link = linkGroup.selectAll("line.link")
                        .data(scope.links);

          link.enter()
                          .append("line")
                          .attr("x1", function(d){
                              return d.source.x
                          })
                          .attr("y1", function(d){
                              return d.source.y
                          })
                          .attr("class", function(d){
                            return "link " + d.bioguide_id + " " + d.committee_id
                          })
                          .attr("stroke", "rgba(220,220,220,.3")
                          .attr("stroke-opacity", 0.8);

          link.exit().remove();


          //Function to establish whether or not there is a word count for the senators

          // --- Draw Senator Nodes --- //

          
          //Add a variable that include all committees that the senator is on. This will be used to add them as classes to each node.
          scope.senators.forEach(function(s){
            s.committees = []
            scope.links.forEach(function(l){
                if (l.bioguide_id == s.bioguide_id){
                    s.committees.push(l.committee_id)
                }
            })
            s.committees = s.committees.join(" ");
          });

          // Remove past senator nodes
          selection.selectAll("g.senator").remove();

          var senatorNodeGroup = selection.selectAll("g.senator")
                          .data(scope.senators)
                      
                      senatorNodeGroup.enter()
                                .append("g")
                                .attr("class", function(d){
                                    return "senator " + d.committees + " " + d.bioguide_id;
                                })
                                .append("circle")
                                .attr("r", 6)
                                .on("click", function(d,i) { scope.senatorInfo(d); })
                                .attr("fill", function(d){
                                      if (d.party == "D"){
                                          return "rgba(142,178,197,1)"
                                      }
                                      else if (d.party == "R"){
                                        return "rgb(229,98,92)"
                                      }
                                      else{
                                        return "rgb(182,98,144)"
                                      }
                                  });

                    
                    // --- Senator Faces --- //

                    //On mouseover, the nodes will fill with the associated senator's face. The following group sets up each node to attribute it with a given image.

                    senatorNodeGroup.append("svg:defs")
                                .append("svg:pattern")
                                .attr("id", function(d){
                                    return "image_" + d.nm_last
                                })
                                .attr("patternUnits", "userSpaceOnUse")
                                .attr("width", "52")
                                .attr("height", "57")
                                .attr("x", 27)
                                .attr("y", 30)
                                .append("svg:image")
                                .attr("xlink:href", function(d){
                                    return "/assets/225x275/" + d.bioguide_id + ".jpg"
                                })
                                .attr("x", 0)
                                .attr("y", 0)
                                .attr("width", "50")
                                .attr("height", "57");
                      

                      // --- Senator MouseOver Event --- //

                      // When the user mouses over a senator node, it will increase in size, change the fill to the senator's photo, and light up and nodes that it is commected to.
                                  
                      senatorNodeGroup
                                .on("mouseover", function(d){
                                    
                                    var senatorNodeClass = "g." + d.bioguide_id + ".senator";

                                    if (senatorNodeClass != scope.currentSenatorNode){
                                        d3.selectAll("g.senator")
                                            .selectAll("circle")
                                            .attr("r", 6)
                                            .attr("stroke", "none");

                                        d3.selectAll("g.senator").select("text")
                                                .remove();
                                    }

                                    scope.showSenator(d);

                                  })
                                  .on("mouseout", function(d){

                                    scope.unshowSenator();

                                  });

                      senatorNodeGroup.exit().remove();
          

            
         

              force.on("tick", function(e) {

                     scope.senators.forEach(function(o, i){

                          keys = scope.senators.length;
                          
                          k = e.alpha * 0.1;

                          o.x += (centerPlacement(550, keys, i).x - o.x) * k;
                          o.y += (centerPlacement(550, keys, i).y - o.y) * k;
                      });
                  

                  senatorNodeGroup.attr("transform", function(d) {
                      return "translate(" + d.x + ", " + d.y + ")"
                    });

                  link.attr("x1", function(d) { return d.source.x })
                        .attr("y1", function(d) { return d.source.y });

              });


              
              //Find the center value for the nodes that they will gravitate to
              centerPlacement = function(radius, keyLength, nodeIndex){

                  //the x value is a function of cosine and the index value of the node
                  var x = (width/2 + radius * Math.cos((360/keyLength * nodeIndex) * Math.PI / 180));

                  //the y value is a function of sine and the index value they will gravitate to
                  var y = ((height/2 + radius * Math.sin((360/keyLength * nodeIndex) * Math.PI / 180)));

                  return {"x": x, "y": y}

              };
      }

      // --- Update Senators --- //

      var updateSenators = function(selection){

        //Add a variable that include all committees that the senator is on. This will be used to add them as classes to each node.
          scope.senators.forEach(function(s){
            s.committees = []
            scope.links.forEach(function(l){
                if (l.bioguide_id == s.bioguide_id){
                    s.committees.push(l.committee_id)
                }
            })
            s.committees = s.committees.join(" ")
          });

        selection = d3.select(selection);

        var link = linkGroup.selectAll("line.link")
                        .data(scope.links);

            link.attr("class", function(d){
                            return "link " + d.bioguide_id + " " + d.committee_id
                        });

            link.exit().remove();

        var senatorNodeGroup = selection.selectAll("g.senator")
                          .data(scope.senators)
                      
                    senatorNodeGroup
                                .attr("class", function(d){
                                    return "senator " + d.committees
                                })
                                .attr("r", 6)
                                .select("circle")
                                .on("click", function(d,i) { scope.senatorInfo(d); })
                                .attr("fill", function(d){
                                      if (d.party == "D"){
                                          return "rgba(142,178,197,1)"
                                      }
                                      else if (d.party == "R"){
                                        return "rgb(229,98,92)"
                                      }
                                      else{
                                        return "rgb(182,98,144)"
                                      }
                                  });

                    senatorNodeGroup.exit().remove();
                    

        force
                  .nodes(scope.senators)
                  .start();


      };

      
      // --- Draw Groups Nodes --- //

      var drawGroups = function(selection){

            //Add a variable that include all committees that the senator is on. This will be used to add them as classes to each node.
            scope.groups.forEach(function(g){
              g.senators = []
              scope.links.forEach(function(l){
                  if (l.committee_id == g.committee_id){
                      g.senators.push(l.bioguide_id)
                  }
              })
              g.senators = g.senators.join(" ");
            });


          scope.groupNodesMap = scope.mapNodes(scope.groups, "committee_id");
          
          var selection = d3.select(selection);

          var committeeNodeGroup = selection.selectAll("g.committee")
                          .data(scope.groups);
                      
              committeeNodeGroup
                          .enter()
                          .append("g")
                          .attr("class", function(d){
                            return "committee " + d.senators
                          })
                          .append("circle")
                          .attr("class", "committee")
                          .attr("r", 20)
                          .attr("fill", function(d) {
                            return "rgba(220,220,220,1)"
                          })

              committeeNodeGroup
                          .select("text").remove();

              committeeNodeGroup
                          .append("text")
                          .text(function(d){
                             return d.committee_id
                          })
                          .style("font-size", "14px")
                          .style("font-family", "Roboto")
                          .attr("text-anchor", "middle")
                          .attr("transform", "translate(0, 5)");
                          
                // -- Committee MouseOver Function -- //

                committeeNodeGroup.on("mouseover", function(d){

                                d3.selectAll("g.senator")
                                        .selectAll("circle")
                                        .attr("r", 6)
                                        .attr("stroke", "none");

                                d3.selectAll("g.senator").select("text")
                                            .remove();
                                    
                                var linkClass = "line." + d.committee_id;
                                var nodeClass = "g." + d.committee_id;
                                
                                selection.selectAll("circle.committee")
                                          .attr("fill", function(d) {
                                              return "rgba(220,220,220,.20)"
                                          })
                                          .transition()
                                          .attr("r", 20);

                                        
                                selection.selectAll("text")
                                            .remove();

                                committeeNodeGroup.append("text")
                                            .text(function(d){
                                                return d.committee_id
                                            })
                                            .style("font-size", "14px")
                                            .style("font-family", "Roboto")
                                            .attr("text-anchor", "middle")
                                            .attr("transform", "translate(0,5)");


                                selection.selectAll("g.committee")
                                        .select("text").remove();

                                d3.select(this)
                                        .append("text")
                                        .text(function(d){
                                            return d.committee_name
                                        })
                                        .attr("text-anchor", "middle")
                                        .style("font-family", "Roboto")
                                        .style("font-size", "14px");

                                d3.select(this)
                                        .select("circle")
                                        .attr("fill", "rgba(220,220,220,1)")
                                        .transition()
                                        .attr("r", 30);

                                    linkGroup.selectAll("line.link")
                                        .attr("stroke", "rgba(255,255,255,0)");

                                    var linkSelected = linkGroup.selectAll(linkClass);

                                    linkSelected
                                        .attr("stroke", "#ddd");

                                    
                                    // Senator Nodes

                                    // Deacrease the alpha level of all nodes that are not connected to this node.

                                    selection.selectAll("g.senator")
                                        .select("circle")
                                        .attr("fill", function(d){
                                            if (d.party == "D"){
                                                return "rgba(142,178,197,.2)"
                                            }
                                            else if (d.party == "R"){
                                              return "rgba(229,98,92,.2)"
                                            }
                                            else{
                                              return "rgba(182,98,144,.2)"
                                            }
                                        })
                                        .attr("stroke", "none");

                                    // Light up the senators that are connected to this node.

                                    var nodesSelected = selection.selectAll(nodeClass);

                                    nodesSelected.select("circle")
                                          .attr("fill", function(d){
                                        if (d.party == "D"){
                                            return "rgba(142,178,197,1)"
                                        }
                                        else if (d.party == "R"){
                                          return "rgba(229,98,92,1)"
                                        }
                                        else{
                                          return "rgba(182,98,144,1)"
                                        }
                                    })

                                    nodesSelected
                                        .append("text")
                                        .text(function(d){
                                            return d.nm_last
                                        })
                                        .attr("text-anchor", "middle")
                                        .attr("transform", "translate(0, -15)")
                                        .style("font-family", "Roboto")
                                        .style("font-size", "14px")
                                        .style("color", "black");

                // -- Committee MouseOut Function -- //

                                  }).on("mouseout", function(d){
                                        
                                        // All Senator Nodes
                                        // Return all senator nodes to alpha levels of 1 so that they are opaque.

                                        selection.selectAll("g.senator")
                                            .select("circle")
                                            .attr("fill", function(d){
                                                if (d.party == "D"){
                                                    return "rgba(142,178,197,1)"
                                                }
                                                else if (d.party == "R"){
                                                  return "rgba(229,98,92,1)"
                                                }
                                                else{
                                                  return "rgba(182,98,144,1)"
                                                }
                                            });

                                        d3.select(this).select("circle")
                                            .transition()
                                            .attr("r", 20);

                                        committeeNodeGroup.select("circle")
                                            .attr("fill", function(d) {
                                                return "rgba(220,220,220,1)"
                                            })


                                        linkGroup.selectAll("line.link")
                                            .attr("stroke", "rgba(220,220,220,.3)");

                                        selection.selectAll("text")
                                            .remove();

                                        committeeNodeGroup.append("text")
                                              .text(function(d){
                                                 return d.committee_id
                                              })
                                              .style("font-size", "14px")
                                              .style("font-family", "Roboto")
                                              .attr("text-anchor", "middle")
                                              .attr("transform", "translate(0, 5)");

                                  });
                                  

              committeeNodeGroup.exit().remove();


              committeeNodeGroup.append("title")
                          .text(function(d) { return d.committee_name; });

              
              var links = scope.links;

              links.forEach(function(l){

                  l.target = scope.groupNodesMap.get(l.committee_id);

              });

              var link = selection.selectAll("line.link");

              link.attr("x2", function(d){
                            return d.target.x 
                        })
                        .attr("y2", function(d){
                            return d.target.y
                        });


              force2
                  .nodes(scope.groups)
                  .start();

              force2.on("tick", function(e) {

                  committeeNodeGroup.attr("transform", function(d) {
                      return "translate(" + d.x + ", " + d.y + ")"

                    });

                  link.attr("x2", function(d) { return d.target.x })
                      .attr("y2", function(d) { return d.target.y });
              });

                  
        


      }
    }
  }

});