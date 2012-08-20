'use strict';

/* Filters */
angular.module('fitler', []).filter('summaryFilter', function() {
  return function(elem, $scope) {
  	console.log(elem);
          //if(!$scope.fitler_query) return true;
        return angular.lowercase(elem.fields.summary).indexOf( angular.lowercase($scope.fitler_query)) >= 0; 
    };
});