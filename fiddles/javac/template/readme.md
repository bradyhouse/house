{{FiddleName}}
======

### Title

{{Title}}


### Creation Date

{{BornOnDate}}


### Location

Chicago, IL


### Issue

[Issue ??](https://github.com/bradyhouse/house/issues/??)


### Description

JavaC fiddle template test.  This is a smoke test of the [fiddle.sh](../../scripts/fiddle.sh) script to verify that
it supports create/delete/refactor/list functionality for "javac" based POC's aka fiddles. This is only a test.


### Use Case

Navigate to the scripts directory and execute the following command:

    ./fiddle.sh "start" "javac" "0000"
    
This should produce the following output:

    {{ ʕ・ɭ・ʔ }}
    FIDDLE.SH
    FIDDLE-START.SH
    ├────STARTSERVER
    ├────JAVACSTART
    ├────JAVACBUILD
    /usr/bin/javac -sourcepath src -classpath :/usr/local/apache-log4j-2.7-bin/log4j-api-2.7.jar:/usr/local/apache-log4j-2.7-bin/log4j-api-2.7.jar:/usr/local/apache-log4j-1.2.17/log4j-1.2.17.jar:/usr/local/apache-log4j-1.2.17/log4j-1.2.17.jar:classes src/Fiddle.java -d classes
    
    
    ├────INVOKING EXECUTABLE
    ├────JAVASTART
    /usr/bin/java Fiddle;
    
    
    template compiled!


### Tags

javac, java
