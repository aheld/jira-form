'use strict';

/* App Module */

angular.module('issueapp', ['issueServices','jiraSession']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/issues', {templateUrl: 'partials/issue-list.html',   controller: IssueListCtrl}).
      when('/issues/new', {templateUrl: 'partials/issue-new.html',   controller: IssueFormCtrl}).
      when('/issues/:issueID', {templateUrl: 'partials/issue-detail.html', controller: IssueDetailCtrl}).
      otherwise({redirectTo: '/issues'});
}]);
