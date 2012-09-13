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

function MetricsCtrl($scope,Issue){
  $scope.issues = Issue.metrics({});
  $scope.$watch('issues', $scope.process);
  $scope.status_counts = {}
  $scope.process = function(x,y){
      console.log(this.issues);
     var statuses = $.map(this.issues.issues,function(i){console.log(i);var z = i.fields.status.name; return [[z,1]];});
      var status_counts = {};
      var status_points = {};
      console.log(statuses);
      this.statuses = statuses;
      statuses = this.issues.issues;
      for (var i = statuses.length - 1; i >= 0; i--) {
        console.log(statuses[i]);
        var statname = statuses[i].fields.status.name;
        status_counts[statname] = status_counts[statname] ? status_counts[statname] +1 :1;
        status_points[statname] = status_points[statname] ? status_points[statname] +1 : statuses[i].fields.customfield_10003;
        console.log(statuses[i].key + " " + statuses[i].fields.customfield_10003)
      };
      this.status_counts = status_counts;
      this.status_points, = status_points;
  };


$scope.create_chart = function () {
        
        // Build the chart
        chart = new Highcharts.Chart({
            chart: {
                renderTo: 'container',
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: 'Browser market shares at a specific website, 2010'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage}%</b>',
                percentageDecimals: 1
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true
                    },
                    showInLegend: true
                }
            },
            series: [{
                type: 'pie',
                name: 'Browser share',
                data: $scope.status_points,
                dataaa: [
                    ['Firefox',   45.0],
                    ['IE',       26.8],
                    {
                        name: 'Chrome',
                        y: 12.8,
                        sliced: true,
                        selected: true
                    },
                    ['Safari',    8.5],
                    ['Opera',     6.2],
                    ['Others',   0.7]
                ]
            }]
        });
    }


 // issuetype = "Production Issue" AND status != Canceled AND status != closed AND status != Staged AND status != "Resolved" and status !="QA Passed" AND status != "Deployed to Production" AND status != "Production Testing" and status != "Ready for Release" AND status != Complete AND status !="Acceptance Testing" AND status !="Pending PVT"  ORDER BY priority DESC, key DESC
}