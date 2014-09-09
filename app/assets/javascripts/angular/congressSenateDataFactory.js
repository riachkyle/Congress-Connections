// factory for the senators data
congressApp.factory('SenateData', ['$http', function($http){
  var senators = {};

  senators.getData = function(){
    var url = 'http://localhost:3000/prod_senators/';
    var endpoint = url; 
    return $http({ method: 'GET', url: endpoint });
  };

  return senators;

}]);