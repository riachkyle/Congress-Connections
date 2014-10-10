// factory for the votes data
congressApp.factory('VotesData', ['$http', function($http){
  var votes = {};

  votes.getData = function(){
    var url = 'http://localhost:3000/prod_votes/';
    var endpoint = url; 
    return $http({ method: 'GET', url: endpoint });
  };

  return votes;

}]);