# Jira issue submitter experiment using Angular

based on phonecat tutorial

## services

the core services to connect to JIRA should all live under services, right now we are mostly read only


## getting started 
 
### update the JIRA Domain

Before use you must edit services.js to point to your jira instance

  rename app/js/config_sample.js to config.js: and enter your jira url 
  'jiraUrl': 'https://JIRA_DOMAIN/'
  note: config.js is under .gitignore and should not get checked in or saved

### login to jira 
authentication is not supported yet, we assume you are logged in

### try it out!
Start a webserver in the checkout directory or move the files under an existing static server


    python -m SimpleHTTPServer

#### known issues:

e2e jasmine tests are assumed to be running as me, they probably won't work for you...

Form is currently mapped to EnergyPlus's specific production issuetype. the mapping is in the controller.js as

	function createJiraIssue(master){
  		var jiraPost =  {
      		"fields":{
   	       "project":{"key":"DATA"},
   	       "summary": master.summary,
   	       "description" : master.description,
   	       "priority":{"name":master.priority},
   	       "customfield_10700": master.population,
   	       "customfield_10503": master.acceptance
   		   }
  		};
  	return jiraPost;