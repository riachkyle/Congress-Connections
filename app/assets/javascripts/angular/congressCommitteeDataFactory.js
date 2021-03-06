// factory for the committees data
congressApp.factory('CommitteeData', ['$http', function($http){
  var committees = {};

  committees.getData = function(){
    var url = 'http://ccproject.herokuapp.com/prod_committee_refs/';
    var endpoint = url; 
    return $http({ method: 'GET', url: endpoint });
  };

  return committees;

}]);