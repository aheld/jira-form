'use strict';

/* jasmine specs for controllers go here */
describe('IssueApp controllers', function() {

  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });
 

  describe('IssueListCtrl', function(){
    var scope, ctrl, $httpBackend, JiraSession;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('https://energyplus.atlassian.net/rest/api/2/issue/INBOUND-20').
          respond([{name: 'INBOUND-20'}, {name: 'HTTPS required'}]);

      scope = $rootScope.$new();
      ctrl = $controller(IssueListCtrl, {$scope: scope});
    }));


    it('should list INBOUND-20', function() {
      expect(scope.issues).toEqual([]);
      $httpBackend.flush();

      expect(scope.issues).toEqualData(
          [{name: 'INBOUND-20'}, {name: 'HTTPS required'}]);
    });


  });

});
