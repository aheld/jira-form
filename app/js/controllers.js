'use strict';

/* Controllers */

  function IssueFormCtrl($scope) {

    var master = {};
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

function IssueListCtrl($scope,Issue,$routeParams,HttpCache) {
  $scope.jiraQuery = $routeParams.query;
  var data = {};
  if ($scope.jiraQuery == 'prodissues'){
        data = HttpCache.get("prodissues");
        if (!data) {
          data = Issue.prodissues();
          HttpCache.put("prodissues", data);
          }
        $scope.issues = data;
  } else {
        data = HttpCache.get("myissues");
        if (!data) {
          data = Issue.myissues();
          HttpCache.put("myissues", data);
          }
        $scope.issues = data;
  }
}

function IssueDetailCtrl($scope, $routeParams, $http, ConfigService,Issue ) {
    $scope.issue = Issue.issue({issueID:$routeParams.issueID});
}