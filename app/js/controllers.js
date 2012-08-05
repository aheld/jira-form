'use strict';

/* Controllers */

  function IssueFormCtrl($scope,JiraSession) {
    $scope.session = JiraSession.query();

    var master = {
	
    };
     
   
    $scope.cancel = function() {
   	 $scope.form = angular.copy(master);
    };
     
    $scope.save = function() {
    	master = $scope.form;
      $scope.jiraPost = createJiraIssue($scope.form);
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


function createJiraIssue(master){
  var jiraPost =  {
      "fields":{
          "project":{"key":"DATA"},
          "summary": master.summary,
          "description" : master.description,
          "priority":{"name":master.priority},
          "customfield_10700": master.population,
          "customfield_10503": master.acceptance
      }
  };
  return jiraPost;
/*
{
  "fields":{
        "project":{ "key":"DATA"},
        "summary": "This is a test",
        "description":"this is the description of the test",
        "issuetype": {"name":"Production Issue"},
        "customfield_10700": "This affects the entire Population.",
        "customfield_10503": "Acceptance Criteria is that it works."
        }
}
*/


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
