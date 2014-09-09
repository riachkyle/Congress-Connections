// factory for the votes data
congressApp.factory('VotesData', ['$http', function($http){
  var votes = {};

  votes.getData = function(){
    var url = 'http://ccproject.herokuapp.com/prod_votes/';
    var endpoint = url; 
    return $http({ method: 'GET', url: endpoint });
  };

  return votes;

}]);