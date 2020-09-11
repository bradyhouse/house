fiddle-0097-Protractor
======

### Title

Protractor Setup & Test


### Creation Date

09-05-17


### Location

Chicago, IL


### Issue

[Issue #198](https://github.com/bradyhouse/house/issues/198)


### Description

Shell script that automates the steps outlined in the [Protractor Getting Started Tutorial] (https://github.com/angular/protractor/blob/master/docs/tutorial.md) after installing protractor,
it uses protractor to run a simple test against the [Protractor demo app](http://juliemr.github.io/protractor-demo/).


### Prerequisites

*  Node v6.9.0
*  Java 


### Use Case

#### To Run ...

From the root directory, execute the `run.sh` script:

    ./run.sh

If everything is working properly, it should generate the following output:

     RUN.SH
     Bash version 3.2.57(1)-release...
     Port be dead!
     INSTALL.SH
     Bash version 3.2.57(1)-release...
     ┌──IS JAVA INSTALLED...
     true
     ┌──IS NPM INSTALLED...
     true
     ┌──INSTALLING PROTRACTOR...
     /Users/bradyhouse/.nvm/versions/node/v6.9.0/bin/protractor -> /Users/bradyhouse/.nvm/versions/node/v6.9.0/lib/node_modules/protractor/bin/protractor
     /Users/bradyhouse/.nvm/versions/node/v6.9.0/bin/webdriver-manager -> /Users/bradyhouse/.nvm/versions/node/v6.9.0/lib/node_modules/protractor/bin/webdriver-manager
     /Users/bradyhouse/.nvm/versions/node/v6.9.0/lib
     └── protractor@5.1.2
     
     ┌──UPDATING WEBDRIVER-MANAGER...
     [15:56:15] I/update - chromedriver: file exists /Users/bradyhouse/.nvm/versions/node/v6.9.0/lib/node_modules/protractor/node_modules/webdriver-manager/selenium/chromedriver_2.32.zip
     [15:56:15] I/update - chromedriver: unzipping chromedriver_2.32.zip
     [15:56:15] I/update - chromedriver: setting permissions to 0755 for /Users/bradyhouse/.nvm/versions/node/v6.9.0/lib/node_modules/protractor/node_modules/webdriver-manager/selenium/chromedriver_2.32
     [15:56:15] I/update - chromedriver: chromedriver_2.32 up to date
     [15:56:15] I/update - selenium standalone: file exists /Users/bradyhouse/.nvm/versions/node/v6.9.0/lib/node_modules/protractor/node_modules/webdriver-manager/selenium/selenium-server-standalone-3.5.3.jar
     [15:56:15] I/update - selenium standalone: selenium-server-standalone-3.5.3.jar up to date
     [15:56:15] I/update - geckodriver: file exists /Users/bradyhouse/.nvm/versions/node/v6.9.0/lib/node_modules/protractor/node_modules/webdriver-manager/selenium/geckodriver-v0.18.0.tar.gz
     [15:56:15] I/update - geckodriver: unzipping geckodriver-v0.18.0.tar.gz
     [15:56:15] I/update - geckodriver: setting permissions to 0755 for /Users/bradyhouse/.nvm/versions/node/v6.9.0/lib/node_modules/protractor/node_modules/webdriver-manager/selenium/geckodriver-v0.18.0
     [15:56:15] I/update - geckodriver: geckodriver-v0.18.0 up to date
     └──PROTRACTOR INSTALLED
     
     START-SERVER.SH
     Bash version 3.2.57(1)-release...
     appending output to nohup.out
     └──HTTP://LOCALHOST:4444/WD/HUB STARTED
     
     ┌──WAITING FOR SERVER ...
     ┌──STARTING PROTRACTOR ...
     [15:56:26] I/launcher - Running 1 instances of WebDriver
     [15:56:26] I/hosted - Using the selenium server at http://localhost:4444/wd/hub
     Started
     ...
     
     
     3 specs, 0 failures
     Finished in 5.328 seconds
     
     [15:56:33] I/launcher - 0 instance(s) of WebDriver still running
     [15:56:33] I/launcher - chrome #01 passed
     Port be dead!
     └──PROTRACTOR RUN SUCCEEDED


### Tags

bash, java, npm, protractor, webdriver-manager
