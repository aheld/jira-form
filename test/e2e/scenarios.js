'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Issues App', function() {

  it('should redirect index.html to index.html#/issues/new', function() {
    browser().navigateTo('../../app/index.html');
    expect(browser().location().url()).toBe('/issues');
  });


  describe('Issues list view', function() {

    beforeEach(function() {
      browser().navigateTo('../../app/index.html#/issues');
    });


    it('should filter the issues list as user types into the search box', function() {
      expect(repeater('.issues li.issue').count()).toBe(7);

      input('query').enter('https');
      expect(repeater('.issues li.issue').count()).toBe(1);

      input('query').enter('It works great');
      expect(repeater('.issues li.issue').count()).toBe(0);
    });


    it('should be possible to control order via the drop down select box', function() {
      input('query').enter(''); 

      expect(repeater('.issues li.issue').column('issue.key')).
          toEqual(["INBOUND-20","EPRT-119","EPPRO-317","EPPRO-196","EPPRO-132","EPINF-27","CISCO-135"]);

      //select('orderProp').option('Priority');
      //later on this one

    });


    it('should render issue previews', function() {
      input('query').enter('https');
      element('.issues li.issue a.preview').click();
      expect(browser().location().url()).toBe('/issues/INBOUND-20');
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
