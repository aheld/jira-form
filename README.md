# Jira issue submitter experiment using Angular

based on phonecat tutorial

## services

the core services to connect to JIRA should all live under services, right now we are mostly read only


## getting started 
 
### update the JIRA Domain

Before use you must edit services.js to point to your jira instance

  rename app/js/config_sample.js to config.js: and enter your jira url 
  'jiraUrl': 'https://JIRA_DOMAIN/'
  note: config.js is under .gitignore and should not get checked in

### login to jira 
authentication is not supported yet, we assume you are logged in

### try it out!
Start a webserver in the checkout directory or move the files under an existing static server


    python -m SimpleHTTPServer

#### known issues:

e2e jasmine tests are assumed to be running as me, they probably won't work for you..