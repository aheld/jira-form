'use strict';

/* Services - be sure to include config.js*/

angular.module('cache',[]).
    factory('HttpCache',function($cacheFactory)
    {
           return $cacheFactory("jiracache");
    });

angular.module('jiraIssue', ['ngResource','configServices']).
   factory('Issue', function($resource,ConfigService){
    return $resource(ConfigService.jiraUrl + 'rest/api/2/:type/:issueID', {"issueID":"",type:"search","jsonp-callback":'JSON_CALLBACK',"fields":"key,status,summary,assignee","maxResults":"300"},
     {
      myissues: {method:'JSONP', isArray:false, params:{jql:"reporter=currentUser() AND resolution = Unresolved"}},
      prodissues: {method:'JSONP', isArray:false, params:{jql:'issuetype = "Production Issue" AND status != Canceled AND status != closed AND status != Staged AND status != "Resolved" and status !="QA Passed" AND status != "Deployed to Production" AND status != "Production Testing" and status != "Ready for Release" AND status != Complete AND status !="Acceptance Testing" AND status !="Pending PVT"  ORDER BY priority DESC, key DESC'}},
      issue:{method:'JSONP', isArray:false, params:{"type":"issue"}},
      metrics: {method:'JSONP', isArray:false, params:{jql:'fixVersion = 20120903',fields:'customfield_10003,status'}},
      metrics_commit: {method:'JSONP', isArray:false, params:{jql:'fixVersion was 20120903 before "2012/09/05"',fields:'customfield_10003,status'}},
    });
  });

angular.module('jiraSession',['ngResource','configServices']).
	factory('JiraSession', function($resource,ConfigService){
		return    $resource(ConfigService.jiraUrl + 'rest/auth/1/session?jsonp-callback=JSON_CALLBACK',{},{
			query:{method:'JSONP', isArray:false}
		});
  });