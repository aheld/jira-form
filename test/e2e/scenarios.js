'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Issues App', function() {

  describe('Routing', function() {
    it('should redirect index.html to index.html#/issues/list/', function() {
      browser().navigateTo('../../app/index.html');
      expect(browser().location().url()).toBe('/issues/list/');
    });
  });

  describe('Issues list view', function() {

    beforeEach(function() {
      browser().navigateTo('../../app/index.html#/issues');
    });


    it('should filter the issues list as user types into the search box', function() {
      expect(repeater('.issues li.issue').count()).toBe(9);

      input('filterQuery').enter('grooming');
      expect(repeater('.issues li.issue').count()).toBe(1);

      input('filterQuery').enter('It works great');
      expect(repeater('.issues li.issue').count()).toBe(0);
    });


  

    it('should render issue previews', function() {
      input('filterQuery').enter('grooming');
      element('.issues li.issue a.preview').click();
      expect(browser().location().url()).toBe('/issues/PRICE-197');
    });
  });


  describe('Issue detail view', function() {

    beforeEach(function() {
      browser().navigateTo('../../app/index.html#/issues/INBOUND-20');
    });


    it('should display https page', function() {
      expect(binding('issue.fields.summary')).toBe('HTTPS is used inconsistently across all web applications and is not used for the New Inbound form');
    });


  
  });
});
