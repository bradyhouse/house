Java (sample create)
======

Executing the command `./fiddle.sh "create" "java" "fiddle-0000-Template"` produces the following output.

    H o u s e
    oooooooooooo  o8o        .o8        .o8  oooo
     888       8  `"'        888        888   888
     888         oooo   .oooo888   .oooo888   888   .ooooo.
     888oooo8     888  d88   888  d88   888   888  d88   88b
     888          888  888   888  888   888   888  888ooo888
     888          888  888   888  888   888   888  888    .o
    o888o        o888o  Y8bod88P   Y8bod88P  o888o  Y8bod8P
    
    FIDDLE.SH
    FIDDLE-DELETE.SH
    
    FIDDLE-CREATE.SH
    ┌──FIDDLE-JAVA.SH
    ├────APP NAME: "TEMPLATE"
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
    
    Total time: 3.973 secs
    
    This build could be faster, please consider using the Gradle Daemon: https://docs.gradle.org/2.13/userguide/gradle_daemon.html
    ├────GRADLEW CHECK - SUCCESSFUL.
    ├────"TEMPLATE" CREATED.
    └──FIDDLE-JAVA.SH

