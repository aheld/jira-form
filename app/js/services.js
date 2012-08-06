'use strict';

/* Services */

angular.module('configServices', []).factory('ConfigService', function(){
	return {
		'jiraUrl': 'https://JIRA_DOMAIN/',
	}
})
 


angular.module('jiraServices', ['ngResource','configServices']).
   factory('JiraIssue', function($resource,ConfigService){
  //returne $resource('jira/my-issues.json', {}, {
  return $resource(ConfigService.jiraUrl + 'rest/api/2/search?jql=reporter%20=%20currentUser%28%29&jsonp-callback=JSON_CALLBACK', {}, {
    myissues: {method:'JSONP', isArray:false},
  });
});

angular.module('issueServices', ['jiraServices','ngResource']).
   factory('Issue', function(JiraIssue,$resource){
  return {
    query: JiraIssue.myissues,

  }
});

angular.module('jiraSession',['ngResource','configServices']).
	factory('JiraSession', function($resource,ConfigService){
		return    $resource(ConfigService.jiraUrl + 'rest/auth/1/session?jsonp-callback=JSON_CALLBACK',{},{
			query:{method:'JSONP', isArray:false}
		})
	});

