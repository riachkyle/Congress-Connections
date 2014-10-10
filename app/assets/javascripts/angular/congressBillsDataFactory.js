// factory for the bills data
congressApp.factory('BillsData', ['$http', function($http){
  var bills = {};

  bills.getData = function(){
    var url = 'http://localhost:3000/prod_bills/';
    var endpoint = url; 
    return $http({ method: 'GET', url: endpoint });
  };

  return bills;

}]);