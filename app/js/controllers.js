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
  $scope.issues = Issue.metrics({},function(){
      $scope.process();
    });

  $scope.status_counts = {};
  $scope.process = function(x,y){
     var statuses = $.map(this.issues.issues,function(i){
                var z = i.fields.status.name;
                return [[z,1]];
              });
      var status_counts = {};
      var status_points = {};
      statuses = this.issues.issues;
      for (var i = statuses.length - 1; i >= 0; i--) {
        var statname = statuses[i].fields.status.name;
        status_counts[statname] = status_counts[statname] ? status_counts[statname] +1 :1;
        status_points[statname] = status_points[statname] ? status_points[statname] +1 : statuses[i].fields.customfield_10003;
      }
      var data_array = [];
      $scope.total_pts = 0;
      $scope.closed_pts = 0;
      var closed_array = [];
      $.each(status_points, function(i,n){
        $scope.total_pts += n;
        if (["QA","Pending QA Build","Task Complete","Closed","QA Passed","Ready for Release", "Complete", "Canceled"].indexOf(i) != -1) {
          $scope.closed_pts += n;
          closed_array.push({name:i, y:n, sliced: true});
        }
        else
          data_array.push({name:i, y:n});
      });
      $.merge(data_array, closed_array);
      this.status_counts = status_counts;
      this.status_points = status_points;
      $scope.create_chart(data_array);
  };


$scope.create_chart = function (data_array) {
        
        // Build the chart
         var chart = new Highcharts.Chart({
            chart: {
                renderTo: 'container',
                plotShadow: false
            },
            title: {
                text: 'Points per Status'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.y} => {point.percentage}%</b>',
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
                name: 'Statuses',
                data: data_array,
            }]
        });
    }


 // issuetype = "Production Issue" AND status != Canceled AND status != closed AND status != Staged AND status != "Resolved" and status !="QA Passed" AND status != "Deployed to Production" AND status != "Production Testing" and status != "Ready for Release" AND status != Complete AND status !="Acceptance Testing" AND status !="Pending PVT"  ORDER BY priority DESC, key DESC
}