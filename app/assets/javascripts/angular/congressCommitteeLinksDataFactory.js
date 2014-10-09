// factory for the committees links data
congressApp.factory('CommitteeLinksData', ['$http', function($http){
  var committeelinks = {};

  committeelinks.getData = function(){
    var url = 'http://ccproject.herokuapp.com/prod_committees/';
    var endpoint = url; 
    return $http({ method: 'GET', url: endpoint });
  };

  return committeelinks;

}]);