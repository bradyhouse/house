fiddle-0092-InitJavaProject
======

### Title

Init Java Project


### Creation Date

09-19-16


### Location

Chicago, IL


### Issue

[Issue #67](https://github.com/bradyhouse/house/issues/67)


### Description

Lately in _cubicle space/time_ I have been working with the [Spring JVM Framework](http://spring.io/).  Exposure to this framework has led me to wonder if `fiddle.sh` could be extended to provide Java based fiddle support. With that in mind, a bash POC is in order.  Specifically, can a simple Java project be initialized from the command line using Spring?

### Pre-Requisites

In order to run this POC, your machine should be configured with:

  * Java ~ verifiable by the `$JAVA_HOME` environment variable being defined
  * Gradle ~ verifiable via the `which` command
  * Git ~ verifiable via the `which` command
  
If any of these dependencies are not met, then you will not be able to execute the scripts described below.

### Procedure

#### To Run ...

To create a new Gradle based Java project, from the root directory, execute the `run.sh` script:

    ./run.sh

If everything is working properly, it should generate the following output:

    RUN.SH
    Bash version 3.2.57(1)-release...
    ┌──FIDDLE-JAVA.SH
    ├────APP NAME:
    "batchservice"
    ├────JAVACREATE
    ├────INITJAVAPROJECT
    ├────INITFIDDLECONFIGFILE
    ├────GITCLONESEEDER
    Cloning into 'tmp'...
    remote: Counting objects: 414, done.
    remote: Total 414 (delta 0), reused 0 (delta 0), pack-reused 414
    Receiving objects: 100% (414/414), 270.14 KiB | 0 bytes/s, done.
    Resolving deltas: 100% (211/211), done.
    Checking connectivity... done.
    ├────HTTPS://GITHUB.COM/SPRING-GUIDES/GS-GRADLE CLONED TO TMP.
    ├────GRADLEWCHECK
    :compileJava
    :processResources UP-TO-DATE
    :classes
    :compileTestJava
    :processTestResources UP-TO-DATE
    :testClasses
    :test
    :check
    
    BUILD SUCCESSFUL
    
    Total time: 3.863 secs
    
    This build could be faster, please consider using the Gradle Daemon: https://docs.gradle.org/2.13/userguide/gradle_daemon.html
    ├────GRADLEW CHECK - SUCCESSFUL.
    ├────"BATCHSERVICE" CREATED.
    └──FIDDLE-JAVA.SH

This will create a simple console (aka batch, aka command line) java app and then build it using Gradle.  The resulting
source code can be found in the [fiddles/java/fiddle-0001-Console/console](fiddles/java/fiddle-0001-Console/console) directory.

#### To Test ...

This POC includes all of the logic necessary to extend the `fiddle.sh` script with java fiddle support.  To see all of this
functionality in action.  Run the following command:

    ./test.sh
    
If everything is working properly, it should generate the following output:

    ┌──TEST.SH
    ├────TESTISJAVAINSTALLED
    ├────TESTISGRADLEINSTALLED
    ├────TESTISSDKINSTALLED
    ├────TESTISBREWINSTALLED
    ├────TESTISGITINSTALLED
    ├────TESTJAVACREATE
    ├────JAVACREATE
    ├────INITJAVAPROJECT
    ├────INITFIDDLECONFIGFILE
    ├────GITCLONESEEDER
    Cloning into 'tmp'...
    remote: Counting objects: 414, done.
    remote: Total 414 (delta 0), reused 0 (delta 0), pack-reused 414
    Receiving objects: 100% (414/414), 270.14 KiB | 0 bytes/s, done.
    Resolving deltas: 100% (211/211), done.
    Checking connectivity... done.
    ├────HTTPS://GITHUB.COM/SPRING-GUIDES/GS-GRADLE CLONED TO TMP.
    ├────GRADLEWCHECK
    :compileJava
    :processResources UP-TO-DATE
    :classes
    :compileTestJava
    :processTestResources UP-TO-DATE
    :testClasses
    :test
    :check
    
    BUILD SUCCESSFUL
    
    Total time: 3.774 secs
    
    This build could be faster, please consider using the Gradle Daemon: https://docs.gradle.org/2.13/userguide/gradle_daemon.html
    ├────GRADLEW CHECK - SUCCESSFUL.
    ├────"TEMPLATE" CREATED.
    ├────TESTJAVASTART
    ├────JAVASTART
    ├────GRADLEWRUN
    :compileJava UP-TO-DATE
    :processResources UP-TO-DATE
    :classes UP-TO-DATE
    :run
    The current local time is: 07:55:05.127
    Hello world!
    
    BUILD SUCCESSFUL
    
    Total time: 2.99 secs
    
    This build could be faster, please consider using the Gradle Daemon: https://docs.gradle.org/2.13/userguide/gradle_daemon.html
    ├────GRADLEW RUN - SUCCESSFUL.
    ├────TESTJAVAFORK
    ├────JAVAFORK
    ├────INITFIDDLECONFIGFILE
    ├────FIDDLE-0000-TEMPLATE FORKED TO FIDDLE-0001-TEMPLATEFORK
    ├────TEARDOWN
    └──TEST.SH


### Tags

bash, java, spring
