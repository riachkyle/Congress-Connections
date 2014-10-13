congressApp.controller('Congress', ['$scope', '$http', 'SenateData', 'CommitteeData', 'CommitteeLinksData', 'BillsData', 'VotesData', function($scope, $http, SenateData, CommitteeData, CommitteeLinksData, BillsData, VotesData) {


// ------ Views ------ //

$scope.capWordsInfoView = false;
$scope.billsInfoView = false;
$scope.senatorSearchInfoView = false;

$scope.wordsView = false;

$scope.senatorDropdownView = false;

//Tooltips
$scope.infoTooltipView = false;
$scope.noCapWordsView = false;


// ------ Map Nodes ------ //

// Mapping nodes is necessary in order to tie data together.
// Call on this function for each of the senator nodes, group nodes, and links nodes.

$scope.mapNodes = function(nodes, field){
                    
    nodesMap = d3.map()
    nodes.forEach(function(n){
        nodesMap.set(n[field], n)
    });

    return nodesMap;

};

// ------ APIs ------ //


    // --- Capitol Words API --- //
    
    $scope.words = '';
    $scope.wordsdata = {};
    $scope.senfor = {};
    $scope.senwords = {};
    $scope.billCheck = '';


    // --- Bills API --- //

    $scope.changebill = function(billCheck) {
        
        //create copies of senators and links so that we can reset them on a new search
        $scope.senators = angular.copy($scope.senatorsReset);
        $scope.links = angular.copy($scope.linksReset);


        $scope.votesFinal = [];
        $scope.votes.forEach(function(v){
            if (v.bill_id == billCheck){
                $scope.votesFinal.push(v)
            }
        });

        var votesMap = $scope.mapNodes($scope.votesFinal, "bioguide_id");

        $scope.senators.forEach(function(s){
            s.vote = votesMap.get(s.bioguide_id);
        });

        
        // Take out from senators from the senators nodes that did not vote 'Yea' for this particular bill'. Take out their links as well.
        for(i = $scope.senators.length-1; i >= 0; --i){
            if( $scope.senators[i].vote.vote !== "Yea" ){
                for (j = $scope.links.length-1; j >= 0; --j){
                    if ($scope.links[j].bioguide_id == $scope.senators[i].bioguide_id){
                        $scope.links.splice(j, 1)
                    }
                }
                $scope.senators.splice(i, 1);
            }
        };

        $scope.wordsView = true;

        $scope.unshowSenator();

    };

    //function that will make a live api call to Sunlight for individual senators======
    $scope.updatesenwords = function(){
    var query_params = { apikey: 'fa096fc2f69047c8a33d4c3862cba250',
                        entity_type: 'legislator',
                        entity_value: $scope.senfor,
                        sort: 'count desc'
                         
                       };
    var endpoint = 'http://capitolwords.org/api/phrases.json';
     
    var options = {
      data: query_params,
      type: 'GET',
      dataType: 'jsonp'      
    };

    var request = jQuery.ajax(endpoint, options)
                        .done(showResponse2);
    };

    // function to return the json and reset 'wordsdata' variable=============
    function showResponse2 (response) {
                RESPONSE = response;
                $scope.senwords = response;
                $scope.$digest();
                
                if (this && this.url && (typeof(this.url) == "string")) {
                    var anchor = jQuery("#url");
                    anchor.text(this.url.toString());
                    anchor.attr('href', this.url.toString());
                }
                jQuery("#output").text(JSON.stringify(response, null, '  '));

            }


    //function that will make a live api call to Sunlight Capitol Words======
    $scope.updatewords = function(){
        var query_params = { apikey: 'fa096fc2f69047c8a33d4c3862cba250',
                            phrase: $scope.words,
                            per_page: 10,
                            chamber: 'senate',
                            start_date: '2013-01-01',
                            end_date: '2014-12-31'
                         
                       };
        var endpoint = 'http://capitolwords.org/api/phrases/legislator.json';
         
        var options = {
          data: query_params,
          type: 'GET',
          dataType: 'jsonp' 
        };

        var request = jQuery.ajax(endpoint, options)
                            .done(showResponse);

        $scope.unshowSenator();

    };

    // function to return the json and reset 'wordsdata' variable=============
    function showResponse (response) {
                RESPONSE = response;
                
                $scope.wordsdata = response.results;

                if ($scope.wordsdata.length < 1){
                  $scope.noCapWordsView = true;
                  setTimeout( function(){
                    $scope.noCapWordsView = false
                    $scope.$digest();
                  }, 3000);
                }

                else{

                  $scope.wordsView = true;
                  $scope.noCapWordsView = false;
                
                  //create copies of senators and links so that we can reset them on a new search
                  $scope.senators = angular.copy($scope.senatorsReset);
                  $scope.links = angular.copy($scope.linksReset);

                  if (this && this.url && (typeof(this.url) == "string")) {
                      var anchor = jQuery("#url");
                      anchor.text(this.url.toString());
                      anchor.attr('href', this.url.toString());
                  }
                  jQuery("#output").text(JSON.stringify(response, null, '  '));

                  var wordsMap = $scope.mapNodes($scope.wordsdata, "legislator");

                  $scope.senators.forEach(function(s){
                      s.words = wordsMap.get(s.bioguide_id);
                  })

                  for(i = $scope.senators.length-1; i >= 0; --i){
                      if( typeof $scope.senators[i].words === "undefined" ){
                        for (j = $scope.links.length-1; j >= 0; --j){
                          if ($scope.links[j].bioguide_id == $scope.senators[i].bioguide_id){
                            $scope.links.splice(j, 1)
                          }
                        }
                        $scope.senators.splice(i, 1);
                      }
                  }

                }

                $scope.$digest();
            }

  // Click button to show all senators
  $scope.showAll = function(){
      $scope.senators = angular.copy($scope.senatorsReset);
      $scope.links = angular.copy($scope.linksReset);
      $scope.wordsView = false;
      $scope.unshowSenator();
  };


  
  // --- Senator Data API --- //

  $scope.senators = {};
  $scope.senatorsReset = {};
  

  //Get Senator data from the API
  SenateData.getData().then(function(json){
    $scope.senators = json.data;
    //create a copy so that it can be reset on a new search
    $scope.senatorsReset = angular.copy($scope.senators);
  });





  // --- Group Data API --- //

  $scope.groups = {};

  //Get Group Data from the API (including committees, industries)
  CommitteeData.getData().then(function(json){
    $scope.groups = json.data;
  });

  
  
  // --- Committee Links Data API --- //

  $scope.links = {};

  //Get Senator data from the API
  CommitteeLinksData.getData().then(function(json){
    $scope.links = json.data;
    //create a copy so that it can be reset on a new search
    $scope.linksReset = angular.copy($scope.links);
  });


  // --- Bill Data API --- //

  $scope.bills = {};

  //Get Senator data from the API
  BillsData.getData().then(function(json){
    $scope.bills = json.data;
  });


 // --- Votes Data API --- //

  $scope.votes = {};

  //Get Senator data from the API
  VotesData.getData().then(function(json){
    $scope.votes = json.data;
  });

  // --- Nodes Map --- //

  //The nodes map needs to be accessible by the links when they draw from one node to the other.

  $scope.senatorNodesMap = {};
  $scope.groupNodesMap = {};


  // ------ Senator Click function ------ //

    // To begin, senatorActive variable is false, indicating that the senator infor box should not be visible. It will become true when the senatorInfo function runs.

    $scope.senatorActive = false;

    // Sets the variable for the senator info box
    $scope.currentsen = {};
    // Will change senator info when clicked 
      
    // --- Expand the Senator Window --- //

    $scope.senatorInfo = function (info) {
        $scope.currentsen= info;
        $scope.senfor = info.bioguide_id;
        $scope.updatesenwords();

        $scope.senatorActive = true;

        $scope.termStart = new Date($scope.currentsen.term_start);
        $scope.termEnd = new Date($scope.currentsen.tern_end);
        $scope.today = new Date();

        // Find out what proportion of the way between term start date and term end date is today.

        $scope.termProgress = Math.abs($scope.today - $scope.termStart)/Math.abs($scope.termEnd - $scope.termStart);


        $scope.updateProgressBar();
         
      };

    // --- Minimize the Senator Window --- //

    $scope.minimizeSenator = function(){
        $scope.senatorActive = false;
    };



    // ------ Scoped D3 Functions ------ //

    // Current Senator node tells which senator node is currently highlighted
    $scope.currentSenatorNode = null;


    // The showSenator function is in the controller so that it can be accessed by both the senator search and the mouseover function.

    $scope.showSenator = function(d){

        // Variable representing circle with this senator's bioguide_id.
        var senatorNodeClass = "g." + d.bioguide_id + ".senator";

        if (senatorNodeClass != $scope.currentSenatorNode){

            $scope.currentSenatorNode = senatorNodeClass;

            var linkGroup = d3.selectAll("g.linkGroup");

            var linkClass = "line." + d.bioguide_id;

            var committeeNodeClass = "g." + d.bioguide_id + ".committee";

            // All Senator Nodes
            // Reduce the alpha level of every senator node to make them transparent.

            d3.selectAll("g.senator")
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
                .attr("stroke", "none")
                .attr("r", 6)
                .attr("stroke", "none");

                d3.selectAll("g.senator").select("text")
                    .remove();

                // Senator Name
                // Append the senator's name to the node

                d3.select(senatorNodeClass)
                    .append("text")
                    .text(function(d){
                        return d.nm_last
                })
                .attr("text-anchor", "middle")
                .attr("transform", "translate(0, -25)")
                .style("font-family", "Roboto")
                .style("font-size", "14px")
                .style("color", "black");

                // Senator Image
                // Fill this node with the senator's image

                d3.select(senatorNodeClass)
                    .select("circle")
                    .attr("fill", function(d){
                        return "url(#image_" + d.nm_last + ")"
                    })
                    .attr("stroke", "#ddd")
                    .transition()
                    .attr("r", 24);

                linkGroup.selectAll("line.link")
                    .attr("stroke", "rgba(255,255,255,0)");

                var linkSelected = linkGroup.selectAll(linkClass);

                linkSelected
                    .attr("stroke", "#ddd");

                // Committee Highlight
                // Show only the committees that the senator is a part of.

                d3.selectAll("circle.committee")
                    .attr("fill", "rgba(220,220,220,.2)")
                    .attr("stroke", "none");

                d3.selectAll("g.committee")
                    .select("text")
                    .remove()

                var committeeNodes = d3.selectAll(committeeNodeClass);

                committeeNodes.select("circle")
                    .attr("fill", "rgba(220,220,220,1)")
                    .transition()
                    .attr("r", 30)

                committeeNodes.append("text")
                    .text(function(d){
                        return d.committee_name
                    })
                    .attr("text-anchor", "middle")
                    .style("font-family", "Roboto")
                    .style("font-size", "14px");

            }
        };

        // The unshowSenator is in the controller so that it can be accessed by the searches and the mouseout function.

        $scope.unshowSenator = function(){

            d3.selectAll("g.senator")
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
                })
                .transition()
                .attr("r", 6)
                .attr("stroke", "none");

            d3.selectAll("g.senator")
                .select("text")
                .remove();

            d3.selectAll("g.committee")
                .select("text").remove();

            d3.selectAll("g.committee")
                .select("circle")
                .attr("fill", "rgba(220,220,220,1)")
                .transition()
                .attr("r", 20);

            d3.selectAll("g.committee")
                .append("text")
                .text(function(d){
                    return d.committee_id
                                            })   
                .attr("text-anchor", "middle")
                .attr("transform", "translate(0,5)")
                .style("font-family", "Roboto")
                .style("font-size", "14px");

            d3.selectAll("line.link")
                .attr("stroke", "rgba(220,220,220,.3)");

            $scope.currentSenatorNode = null;
        }

        // ------ Senator Search Function ------ //

        $scope.senatorSearchName = undefined;

        $scope.$watch( "senatorSearchName", function(){
            if (typeof $scope.senatorSearchName !== "undefined"){
              $scope.senatorSelect($scope.senatorSearchName)
            }
        })

        // Create the search dropdown
        $scope.senatorSelect = function(name){
            var nameArray = name.split(" ");
            var firstSenatorDropdown = [];
            if ($("#senatorSearch").is(":focus")){
              for (i = 0; i < $scope.senators.length; ++i){
                if (name.length < 1){
                    firstSenatorDropdown = [];
                    $scope.senatorDropdownView = false;
                }
                else if (nameArray.length > 0){
                    if (nameArray.length == 1){
                      if(nameArray[0].toLowerCase() == $scope.senators[i].nm_first.substring(0, name.length).toLowerCase() ||
                      nameArray[0].toLowerCase() == $scope.senators[i].nm_last.substring(0, name.length).toLowerCase()){
                        firstSenatorDropdown.push($scope.senators[i].senator_name);
                        $scope.senatorDropdownView = true;
                      }
                    }
                    else if (nameArray.length > 1){
                      if(nameArray[0].toLowerCase() == $scope.senators[i].nm_first.substring(0, nameArray[0].length).toLowerCase() &&
                      nameArray[1].toLowerCase() == $scope.senators[i].nm_last.substring(0, nameArray[1].length).toLowerCase()){
                        firstSenatorDropdown.push($scope.senators[i].senator_name);
                        $scope.senatorDropdownView = true;
                      }
                    }
                }
              }
              if (firstSenatorDropdown.length < 1){
                    $scope.senatorDropdownView = false;
              }
              $scope.senatorDropdown = firstSenatorDropdown.sort();
            }
            
        };

        // Conduct the search
        $scope.senatorSearch = function(name){
            // Loop through senators to find the senator with that name
            for (i = 0; i < $scope.senators.length; ++i){
              if (name.toLowerCase() == $scope.senators[i].senator_name.substring(0, name.length).toLowerCase()){
                $scope.showSenator($scope.senators[i]);
                $scope.currentSenatorNode = "g." + $scope.senators[i].bioguide_id + ".senator";
                break
              }
            }
            $scope.senatorDropdownView = false;
            $scope.senatorSearchName = name;
        }
        
        // Close the dropdown when clicking away
        $(document).click(function(event){
          if (!$(event.target).closest("#senatorDropdownDiv").length){
            if($scope.senatorDropdownView == true){
              $scope.senatorDropdownView = false;
              $scope.$digest();
            }
            else{
              $scope.unshowSenator()
            }
          }
          else{

          }
        })

}]);