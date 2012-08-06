'use strict';

/* Filters */
angular.module('issueFilters', []).filter('summaryFilter', function() {
  return function(elem, $scope) {
          if(!$scope.query) return true;
        return angular.lowercase(elem.fields.summary).indexOf( angular.lowercase($scope.query)) >= 0; 
    };
});