'use strict';

/* Services - be sure to include config.js*/

angular.module('cache',[]).
    factory('HttpCache',function($cacheFactory)
    {
           return $cacheFactory("jiracache");
    });

angular.module('jiraIssue', ['ngResource','configServices']).
   factory('Issue', function($resource,ConfigService){
    return $resource(ConfigService.jiraUrl + 'rest/api/2/:type/:issueID', {"issueID":"",type:"search","jsonp-callback":'JSON_CALLBACK',"maxResults":"300"},
     {
      myissues: {method:'JSONP', isArray:false, params:{jql:"reporter=currentUser() AND resolution = Unresolved","fields":"key,status,summary,assignee"}},
      prodissues: {method:'JSONP', isArray:false, params:{jql:'issuetype = "Production Issue" AND status != Canceled AND status != closed AND status != Staged AND status != "Resolved" and status !="QA Passed" AND status != "Deployed to Production" AND status != "Production Testing" and status != "Ready for Release" AND status != Complete AND status !="Acceptance Testing" AND status !="Pending PVT"  ORDER BY priority DESC, key DESC',"fields":"key,status,summary,assignee"}},
      issue:{method:'JSONP', isArray:false, params:{"type":"issue"}}
    });
  });

angular.module('jiraSession',['ngResource','configServices']).
	factory('JiraSession', function($resource,ConfigService){
		return    $resource(ConfigService.jiraUrl + 'rest/auth/1/session?jsonp-callback=JSON_CALLBACK',{},{
			query:{method:'JSONP', isArray:false}
		});
  });