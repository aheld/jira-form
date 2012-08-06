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


  beforeEach(module('JiraServices'));


  describe('IssueListCtrl', function(){
    var scope, ctrl, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('phones/my-issues.json').
          respond([{name: 'INBOUND-20'}, {name: 'HTTPS required'}]);

      scope = $rootScope.$new();
      ctrl = $controller(PhoneListCtrl, {$scope: scope});
    }));


    it('should list INBOUND-20', function() {
      expect(scope.phones).toEqual([]);
      $httpBackend.flush();

      expect(scope.phones).toEqualData(
          [{name: 'INBOUND-20'}, {name: 'HTTPS required'}]);
    });


  });
});
