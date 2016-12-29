fiddle-0001-Log4j_1.2.x
======

### Title

logforging


### Creation Date

12-27-16


### Location

Chicago, IL


### Issue

[Issue 122](https://github.com/bradyhouse/house/issues/122)


### Description

Create a fiddle exploring how to fix Log Forging [Fortify](https://en.wikipedia.org/wiki/Fortify_Software) security violation issues.


### Prerequisites

*  [apache-log4j-1.2.17](http://logging.apache.org/log4j/1.2/download.html)
    1.  log4j-1.2.17.jar should be included in system `CLASSPATH`
    2.  root apache-log4j-1.2.17 directory should included in system `PATH`         
    

### Reference

For further log4j setup instruction, please see:

*   [tutorialspoints.com > log4j installation](https://www.tutorialspoint.com/log4j/log4j_installation.htm)
*   [stackoverflow > No appenders could be found for logger(log4j)?](http://stackoverflow.com/questions/12532339/no-appenders-could-be-found-for-loggerlog4j#12532442)     
 

### Use Case

Navigate to the scripts directory and execute the following command:

    ./fiddle.sh "start" "javac" "0001"
    
This should produce the following output:

    {{ ʕ・ɭ・ʔ }}
    FIDDLE.SH
    FIDDLE-START.SH
    ├────STARTSERVER
    ├────JAVACSTART
    ├────JAVACBUILD
    /usr/bin/javac -sourcepath src -classpath :/usr/local/apache-log4j-2.7-bin/log4j-api-2.7.jar:/usr/local/apache-log4j-2.7-bin/log4j-api-2.7.jar:/usr/local/apache-log4j-1.2.17/log4j-1.2.17.jar:/usr/local/apache-log4j-1.2.17/log4j-1.2.17.jar:libs/log4j.properties: src/Fiddle.java -d classes
    
    
    ├────INVOKING EXECUTABLE
    ├────JAVASTART
    /usr/bin/java Fiddle;
    
    
    2016/12/29 06:04:37 DEBUG	Fiddle.main	Hello this is a debug message
    2016/12/29 06:04:37 INFO	Fiddle.main	Hello this is an info message


### Tags

javac, java, log4j, apache-log4j-2.7-bin
