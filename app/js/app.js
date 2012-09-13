'use strict';

/* App Module */

angular.module('issueapp', ['jiraSession','jiraIssue','cache' ]).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/issues/list/', {templateUrl: 'partials/issue-list.html',   controller: IssueListCtrl}).
      when('/issues/list/:query', {templateUrl: 'partials/issue-list.html',   controller: IssueListCtrl}).
      when('/issues/new', {templateUrl: 'partials/issue-new.html',   controller: IssueFormCtrl}).
      when('/issues/:issueID', {templateUrl: 'partials/issue-detail.html', controller: IssueDetailCtrl}).
      when('/sprint/', {templateUrl: 'partials/sprint.html',   controller: MetricsCtrl}).
      otherwise({redirectTo: '/issues/list/'});
}]);
