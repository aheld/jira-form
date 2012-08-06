'use strict';

/* Controllers */

    function IssueFormCtrl($scope) {
    var master = {
	reporter:"Aaron",
	summary:"it does not work",
    };
     
   
    $scope.cancel = function() {
   	 $scope.form = angular.copy(master);
    };
     
    $scope.save = function() {
    	master = $scope.form;
    	$scope.cancel();
    };
     
     
    $scope.isCancelDisabled = function() {
  	  return angular.equals(master, $scope.form);
    };
     
    $scope.isSaveDisabled = function() {
    	return $scope.prodForm.$invalid || angular.equals(master, $scope.form);
    };
     
    $scope.cancel();
    }


function SessionCtrl($scope, JiraSession) {
  $scope.session = JiraSession.query();
}

function IssueListCtrl($scope, Issue,JiraSession) {
  $scope.issues = Issue.query();
  $scope.session = JiraSession.query();


  $scope.summaryFilter = function(elem) { 
        if(!$scope.query) return true;
        console.log(elem);
        return angular.lowercase(elem.fields.summary).indexOf( angular.lowercase($scope.query)) >= 0; 
    };     
  //$scope.orderPro = 'age';
}

//PhoneListCtrl.$inject = ['$scope', 'Phone'];



function IssueDetailCtrl($scope, $routeParams, $http, ConfigService ) {
    $http.jsonp(ConfigService.jiraUrl + 'rest/api/2/issue/' + $routeParams.issueID + '?jsonp-callback=JSON_CALLBACK').
      success(function(data) {
        $scope.issue = data;
     });
 
}

//PhoneDetailCtrl.$inject = ['$scope', '$routeParams', 'Phone'];
