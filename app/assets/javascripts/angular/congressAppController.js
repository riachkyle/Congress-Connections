congressApp.controller('Congress', ['$scope', '$http', 'SenateData', 'CommitteeData', 'CommitteeLinksData', 'BillsData', 'VotesData', function($scope, $http, SenateData, CommitteeData, CommitteeLinksData, BillsData, VotesData) {


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
    };

    // function to return the json and reset 'wordsdata' variable=============
    function showResponse (response) {
                RESPONSE = response;
                
                $scope.wordsdata = response.results;
                
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

                $scope.$digest();
            }



  
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

}]);